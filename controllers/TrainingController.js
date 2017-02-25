var BattleField = require('../classes/BattleField');
var BattlePainter = require('./BattlePainter');
var Jimp = require("jimp");
var fs = require('fs');

function TrainingController() {
    this.type = "training";
    this.bot = null;
    this.trainerField = [
        [null,null,null],
        [null,null,null]
    ];
    this.trainingSession = {
        contribution: {},
        trainerHP: {},
        endTime: null,
        respawnTime: null
    }
    this.endTimer = null;
    this.respawnTimer = null;
}

TrainingController.prototype.resetAllTrainers = function() {
    if (!this.bot) return;
    for(var i=0;i<2;i++) {
        for (var j=0;j<3;j++) {
            var trainer = this.bot.playerManager.getPlayerUnit(this.trainerField[i][j]);
            if (trainer) trainer.fullHeal();
        }
    }
    clearTimeout(this.respawnTimer);
    this.trainingSession.respawnTime = null;
}

var trainingSessionFileName = "trainingSession.json";
TrainingController.prototype.loadSession = function() {
    var that = this;
    fs.readFile(trainingSessionFileName, 'utf8', function (err, data) {
        if (err && that.bot) {
            that.bot.log(err);
            return;
        }
        that.trainingSession = JSON.parse(data);
        for(key in that.trainingSession.trainerHP) {
            var trainerId = key;
            var trainerHP = that.trainingSession.trainerHP[key];
            var trainer = that.bot.playerManager.getPlayerUnit(trainerId);
            if (trainer) trainer.currentHP = trainerHP;
        }
        var now = new Date();
        if (!that.trainingSession.endTime && !that.trainingSession.respawnTime) {
            that.setEndTimer();
            that.resetAllTrainers();
            return;
        }

        if (that.trainingSession.endTime) {
            var remainEndTime = Math.max(0, that.trainingSession.endTime - now.valueOf());
            that.setEndTimer(remainEndTime);
        }
        if (that.trainingSession.respawnTime) {
            var remainRespawnTime = Math.max(0, that.trainingSession.respawnTime - now.valueOf());
            that.setRespawnTimer(remainRespawnTime);
        }
    });
}


TrainingController.prototype.saveSession = function(callback) {
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            var trainer = this.bot.playerManager.getPlayerUnit(this.trainerField[i][j]);
            if (trainer) {
                this.trainingSession.trainerHP[trainer.playerId] = trainer.getCurrentHP();
            }
        }
    }

    var textToWrite = JSON.stringify(this.trainingSession, null, 4);
    var that = this;
    fs.writeFile(trainingSessionFileName, textToWrite, function(err) {
        if(err && that.bot) {
            that.bot.log(err);
            return;
        }
        if (typeof callback == "function") callback();
    }); 
}

TrainingController.prototype.setEndTimer = function(duration) {
    var numTrainer = 0;
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            if (this.trainerField[i][j]) numTrainer++;
        }
    }
    if (typeof duration == "undefined") {
        duration = numTrainer * 60 * 60 * 1000;
    }
    
    var now = new Date();
    this.trainingSession.endTime = now.valueOf() + duration;
    this.trainingSession.respawnTime = null;
    
    var that = this;
    this.endTimer = setTimeout(function() {
        that.endBattle(true);
    }, duration);
}

TrainingController.prototype.setRespawnTimer = function(duration) {
    if (typeof duration == "undefined") {
        duration = this.bot.playerManager.TRAINER_RESPAWN_TIME;
    }

    var now = new Date();
    this.trainingSession.endTime = null;
    this.trainingSession.respawnTime = now.valueOf() + duration;
    
    var that = this;
    this.respawnTimer = setTimeout(function() {
        for(key in that.bot.playerManager.playerUnits) {
            var userId = key;
            var userUnit = that.bot.playerManager.playerUnits[userId];
            if (userUnit) {
                userUnit.fullHeal();
                if (that.bot.userManager.doesMemberHaveRole(userId, "Fainted")) {
                    that.bot.userManager.removeRole(userId, "Fainted")
                }
            }
        }

        var traineeRole = that.bot.battleChannel.guild.roles.find('name', 'Trainee');
        that.bot.battleChannel.sendMessage(traineeRole + " All Trainers are ready for new battle.");
        that.setEndTimer();
    }, duration);
}

TrainingController.prototype.endBattle = function(endBattleByTimeout) {
    if (this.endTimer) {
        clearTimeout(this.endTimer);
    }

    for(key in this.bot.playerManager.playerUnits) {
        var userId = key;
        var userUnit = this.bot.playerManager.playerUnits[userId];
        if (userUnit) {
            if (!userUnit.isTrainer) {
                userUnit.fullHeal();
                if (this.bot.userManager.doesMemberHaveRole(userId, "Fainted")) {
                    this.bot.userManager.removeRole(userId, "Fainted")
                }
            } else {
                userUnit.currentHP = 0;
                if (!this.bot.userManager.doesMemberHaveRole(userId, "Fainted")) {
                    this.bot.userManager.addRole(userId, "Fainted")
                }
            }
        }
    }
    
    this.setRespawnTimer();

    var endBattleFactor = (endBattleByTimeout ? 0.5 : 1.0);
    var expReward = Math.floor((EXP_REWARD + this.bot.functionHelper.randomInt(Math.floor(EXP_REWARD*0.1))) * endBattleFactor);
    for(key in this.trainingSession.contribution) {
        var userId = key;
        if (this.trainingSession.contribution[userId] > 0) {
            var itemAmount = Math.floor(this.trainingSession.contribution[userId] * 5 * factor * endBattleFactor);
            this.trainingSession.contribution[userId] = 0;
            var itemReceived = {};
            for(var i=0;i<itemAmount;i++) {
                var itemName = this.bot.functionHelper.randomObject(rewardList);
                if (typeof itemReceived[itemName] === "undefined") itemReceived[itemName] = 0;
                itemReceived[itemName]++;
            }
            var text = "You have received **" + itemAmount + " items** and **" + expReward + " EXP** for defeating all Trainers:\n";
            for(itemKey in itemReceived) {
                var itemName = itemKey;
                text += itemName + " x" + itemReceived[itemName] + "\n";
                this.bot.playerManager.addItem(userId, itemName, itemReceived[itemName]);
            }
            this.bot.playerManager.addExp(userId, expReward);
            var user = this.bot.userManager.getUser(userId);
            if (user) {
                user.sendMessage(text);
            }
            this.bot.playerManager.refreshUnitForPlayerId(userId);
        }
    }
    this.saveSession();
    this.bot.savePlayer();
}

TrainingController.prototype.didAllTrainersDie = function() {
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            var trainerId = this.trainerField[i][j];
            var unit = this.bot.playerManager.getPlayerUnit(trainerId);
            if (unit && unit.getCurrentHP() > 0) return false;
        }
    }
    return true;
}

var rewardList = [
    "Gold Ore",
    "Mithril Ore",
    "Ominous Cloth",
    "Holy Cloth",
    "Chimera Horn",
    "Dragon Horn",
    "Diamond",
    "Rose Quartz",
    "Black Pearl",
    "Lapis Lazuli",
    "Garnet",
    "Emerald",
    "Luxurious Leather",
    "Rare Species Leather",
    "Full Moon Fragment",
    "Sun Fragment",
    "Magical Water",
    "Holy Water",
    "Ebony Branch",
    "Yggdrasil Branch"
];

var factor = 1;
var EXP_REWARD = 48216 * factor;

TrainingController.prototype.didPlayerDie = function(playerId) {
    var unit = this.bot.playerManager.getPlayerUnit(playerId);
    if (unit && unit.isTrainer && this.didAllTrainersDie()) {
        this.endBattle(false);
    }
}

function FieldPosition(row, column) {
    this.row = row;
    this.column = column;
}

FieldPosition.prototype.isBackline = function() {
    return this.row === 1;
}

FieldPosition.prototype.isFrontline = function() {
    return this.row === 0;
}

function getPosOnField(unit, field) {
    for(var i=0;i<field.length;i++) {
        for(var j=0;j<field[i].length;j++) {
            if (field[i][j] === unit.playerId) return new FieldPosition(i, j);
        }
    }
    return null;
}

TrainingController.prototype.hasFrontlineUnit = function(field) {
    for(var i=0;i<3;i++) {
        var unit = this.bot.playerManager.getPlayerUnit(field[0][i]);
        if (unit && !unit.isFainted()) return true;
    }
    return false;
}

TrainingController.prototype.checkMask = function(skillPhase, mask, mainTargetPos, field) {
    if (!mainTargetPos) return false;
    if (mask[mainTargetPos.row][mainTargetPos.column]) {
        if (!skillPhase.isShortAttack()) return true;

        if (this.hasFrontlineUnit(field)) {
            for(var i=0;i<3;i++) {
                var unit = this.bot.playerManager.getPlayerUnit(field[0][i]);
                if (mask[0][i] && unit && !unit.isFainted()) return true;
            }
            return false;
        } else {
            return true;
        }
    }
    return false;
}

TrainingController.prototype.selectMask = function(skillPhase, idx, mainTargetPos, field) {
    var masks = skillPhase.getPatternMask(idx);
    for(var i=0;i<masks.length;i++) {
        if (this.checkMask(skillPhase, masks[i], mainTargetPos, field)) {
            return masks[i];
        }
    }

    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            var unit = this.bot.playerManager.getPlayerUnit(field[i][j]);
            if (unit && !unit.isFainted()) {
                for(var k=0;k<masks.length;k++) {
                    var pos = {
                        row: i,
                        column: j
                    }
                    if (this.checkMask(skillPhase, masks[k], pos, field)) {
                        return masks[k];
                    }
                }                
            }
        }
    }
    return null;
}

TrainingController.prototype.resolveArea = function(skillPhase, idx, attacker, mainTarget, field) {
    var mainTargetPos = getPosOnField(mainTarget, field);
    var mask = this.selectMask(skillPhase, idx, mainTargetPos, field);

    var result = [];
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            if (mask && mask[i][j]) {
                result.push(new FieldPosition(i, j));
            }
        }
    }
    return result;
}

TrainingController.prototype.resolveTargets = function(skillPhase, idx, attacker, mainTarget, field) {
    var resolvedArea = this.resolveArea(skillPhase, idx, attacker, mainTarget, field);
    var result = [];
    for(var i=0;i<resolvedArea.length;i++) {
        var userId = field[resolvedArea[i].row][resolvedArea[i].column];
        var unit = this.bot.playerManager.getPlayerUnit(userId);
        if (unit && (!unit.isFainted() || (skillPhase.status["Resurrection"] && !unit.status["Resurrected"]))) {
            result.push(resolvedArea[i]);    
        }
    }
    return result;
}

TrainingController.prototype.isUnderAttack = function(unit, skillPhase, attacker, mainTarget, field) {
    for(var i=0;i<skillPhase.attackInstances.length;i++) {
        var targets = this.resolveTargets(skillPhase, i, attacker, mainTarget, field);
        for(var j=0;j<targets.length;j++) {
            if (unit.playerId == field[targets[j].row][targets[j].column]) return true;
        }
    }
    return false;
}

TrainingController.prototype.attackRecursively = function(skill, attacker, targetUnitList, battleField, iter, result, koResult, callback) {
    if (iter == skill.phases.length) {
        callback();
        return;
    }

    var text = "";
    var attackerName = attacker.shortName;
    var attackerUser = this.bot.userManager.getUser(attacker.playerId);
    if (attackerUser) attackerName += " (" + attackerUser.username + ")";
    
    var skillPhase = skill.phases[iter];

    var mainTargetUnit = targetUnitList[iter];
    if (mainTargetUnit.isFainted() && !skillPhase.status["Resurrection"]) {
        this.attackRecursively(skill, attacker, targetUnitList, battleField, iter+1, result, koResult, callback);
        return;
    }

    var actionOnEnemySide = battleField.isEnemy(mainTargetUnit.playerId);
    var field = (actionOnEnemySide? battleField.enemySide: battleField.allySide);
    //var targets = this.resolveTargets(skillPhase, attacker, mainTargetUnit, field);

    var isParalyzed = (attacker.isParalyzed() && attacker.status["Paralyze"].evoke());
    var isCharmed = attacker.isCharmed();

    if (isCharmed) {
        var charmOwnerId = attacker.status["Charm"].ownerId;
        var charmOwner = this.bot.playerManager.getPlayerUnit(charmOwnerId);
        attacker.status["Charm"].evoke();

        if (skillPhase.canAttack()) {
            if (this.isUnderAttack(charmOwner, skillPhase, attacker, mainTargetUnit, field)) {
                text = attackerName + " is charmed.\n";
                result.push({
                    text: text,
                    image: null
                });
                this.attackRecursively(skill, attacker, targetUnitList, battleField, iter+1, result, koResult, callback);
                return
            } 
        } else {    // Healing
            var charmOwnerUnit = this.bot.playerManager.getPlayerUnit(charmOwnerId);
            if (charmOwnerUnit && (!charmOwnerUnit.isFainted() || skillPhase.status["Resurrection"])) {
                var newMainTargetUnit = charmOwnerUnit;
                var newActionOnEnemySide = battleField.isEnemy(newMainTargetUnit.playerId);
                var newField = (newActionOnEnemySide? battleField.enemySide: battleField.allySide);                
                //var newTargets = this.resolveTargets(skillPhase, attacker, newMainTargetUnit, newField);
                if (getPosOnField(newMainTargetUnit, newField)) {
                    mainTargetUnit = newMainTargetUnit
                    actionOnEnemySide = newActionOnEnemySide;
                    field = newField;
                    //targets = newTargets;
                }
            }
        }
    }

    if (attacker.isStunned()) {
        attacker.status["Stun"].destroy();
        text = attackerName + " is stunned.\n";
        result.push({
            text: text,
            image: null
        });
        this.attackRecursively(skill, attacker, targetUnitList, battleField, iter+1, result, koResult, callback);
        return;
    }
    
    if (isParalyzed) {
        text = attackerName + " is paralyzed.\n";
        result.push({
            text: text,
            image: null
        });
        this.attackRecursively(skill, attacker, targetUnitList, battleField, iter+1, result, koResult, callback);
        return;    
    }

    var area = this.resolveArea(skillPhase, 0, attacker, mainTargetUnit, field);
    if (area.length <= 0) {
        this.attackRecursively(skill, attacker, targetUnitList, battleField, iter+1, result, koResult, callback);
        return; 
    }

    var average_column = 0;
    for(var i=0;i<area.length;i++) average_column += area[i].column;
    average_column = average_column / area.length;

    var expGained = {};

    var painter = new BattlePainter(this.bot);
    if (skillPhase.hasAnimation) {
        painter.skillNameToAnimate = skill.name + "_" + (actionOnEnemySide?"ally":"enemy") + "_" + iter;
        painter.offsetX = (actionOnEnemySide ? skillPhase.allyOffsetX : skillPhase.enemyOffsetX);
        painter.offsetY = (actionOnEnemySide ? skillPhase.allyOffsetY : skillPhase.enemyOffsetY);
        painter.opacity = skillPhase.opacity;
        if (actionOnEnemySide) {
            painter.focusPointRow = 1 - area[area.length-1].row;
            painter.focusPointColumn = 2 - area[area.length-1].column;
        } else {
            painter.focusPointRow = area[0].row + 4;
            painter.focusPointColumn = area[0].column;
        }
    }

    var isKOed = {};

    text += attackerName + " used **" + skill.name + "**\n";
    if (typeof expGained[attacker.playerId] === "undefined") expGained[attacker.playerId] = 0;

    var damageList = {};
    var hitRateOnTargets = {};
    var critRateOnTargets = {};
    
    var stunResult = {};
    var poisonResult = {};
    var paralyzeResult = {};
    var curseResult = {};
    var resurrectionResult = {};
    var darknessResult = {};
    var patkDownResult = {};
    var pdefDownResult = {};
    var matkDownResult = {};
    var mdefDownResult = {};
    var charmResult = {};

    var doesHitMainTarget = false;

    var focusModifier       = (attacker.status["Focus"] ? attacker.status["Focus"].power / 100 : 1.0);
    var darknessModifier    = (attacker.status["Darkness"] ? 0.15 : 1);
    var encourageModifier   = (attacker.status["Encourage"] ? 2.0 : 1.0);
    var patkDownModifier    = (attacker.status["Patk Down"] ? 0.5 : 1.0);
    var matkDownModifier    = (attacker.status["Matk Down"] ? 0.5 : 1.0);
    
    // Damage calculation
    for(var k=0;k<skillPhase.attackInstances.length;k++) {
        var skillModifier = skillPhase.attackInstances[k].modifier;
        var targets = this.resolveTargets(skillPhase, k, attacker, mainTargetUnit, field);

        for(var i=0;i<targets.length;i++) {
            var targetFieldPos = targets[i];
            var targetUnit = this.bot.playerManager.getPlayerUnit(field[targetFieldPos.row][targetFieldPos.column]);
            if (!targetUnit) continue;

            var targetName = targetUnit.shortName;
            var targetUser = this.bot.userManager.getUser(targetUnit.playerId);
            
            if (skillPhase.canAttack()) {
                if (targetUnit.isFainted()) continue;
                
                var isPdefDownUsed = false;
                var isMdefDownUsed = false;
                var pdefDownModifier    = (targetUnit.status["Pdef Down"] ? 0.5 : 1.0);
                var mdefDownModifier    = (targetUnit.status["Mdef Down"] ? 0.5 : 1.0);

                var atk = attacker.getAtk();
                var critRate = Math.floor(attacker.getCrit()*0.35 - (targetUnit.getLUK()*0.1));
                critRate = Math.max(5, critRate);
                critRate = Math.min(95, critRate);
                critRateOnTargets[targetUnit.playerId] = critRate;
                var elementAdvantage = skillPhase.getElementFactor(targetUnit.element);
                var def = targetUnit.getDef();

                if (skillPhase.useMagicalDamage()) {
                    atk = attacker.getMAtk() * matkDownModifier;
                    def = targetUnit.getMDef() * mdefDownModifier;
                    if (targetUnit.status["Mdef Down"]) isMdefDownUsed = true;
                } else {
                    atk = attacker.getAtk() * patkDownModifier;
                    def = targetUnit.getDef() * pdefDownModifier;
                    if (targetUnit.status["Pdef Down"]) isPdefDownUsed = true;
                }

                if (attacker.status["Resurrected"]) atk = atk * 0.8;
                if (targetUnit.status["Resurrected"]) def = def * 0.8;

                var hitValue = (attacker.getHit() + attacker.getDEX()*0.65) * darknessModifier;
                var evadeValue = targetUnit.getEva() + targetUnit.getAGI()*0.20;
                var hitRate = Math.floor(60 + (hitValue - evadeValue)*0.2);
                hitRate = Math.max(10, hitRate);
                hitRate = Math.min(99, hitRate);
                if (skillPhase.isSpellAttack()) hitRate = 100;

                hitRateOnTargets[targetUnit.playerId] = hitRate;

                var randomFactor = this.bot.functionHelper.randomArbitrary(1/1.1, 1.1);
                var isCrit = (this.bot.functionHelper.randomInt(100) < critRate);
                var critModifier = (isCrit ? 1.5 : 1.0);

                var damageBeforeDef = atk * skillModifier * encourageModifier * focusModifier * randomFactor * elementAdvantage;
                var critDamageBeforeDef = damageBeforeDef * critModifier;

                var rawDamage = Math.max(
                    0.0001 * damageBeforeDef,
                    critDamageBeforeDef - 0.00115 * def * damageBeforeDef - def / 4
                );
                rawDamage = Math.max(1, rawDamage);
                    
                var frontUnit = null;
                if (targetFieldPos.row === 1 && field[0][targetFieldPos.column]) {
                    frontUnit = this.bot.playerManager.getPlayerUnit(field[0][targetFieldPos.column]);
                }
                var hasSomeoneInFront = (frontUnit && !frontUnit.isFainted());
                rawDamage *= (hasSomeoneInFront ? 0.7 : 1.0);

                var doesHit = (this.bot.functionHelper.randomInt(100) < hitRate);
                if (!doesHit) {
                    damageBeforeDef = 0;
                    rawDamage = 0;
                } else {
                    doesHitMainTarget |= (mainTargetUnit === targetUnit);
                }
                    
                if (targetUnit.getClassId() === 4) {    // soldier
                    if (typeof expGained[field[targetFieldPos.row][targetFieldPos.column]] === "undefined") {
                        expGained[field[targetFieldPos.row][targetFieldPos.column]] = 0;
                    }
                    expGained[field[targetFieldPos.row][targetFieldPos.column]] += Math.floor(critDamageBeforeDef);
                } 

                if (rawDamage > 0 && hasSomeoneInFront) {
                    if (frontUnit && frontUnit.getClassId() === 4 && !frontUnit.isFainted()) {
                        var damageToFrontSoldier = Math.max(1, Math.floor(rawDamage * 0.58));
                        rawDamage *= 0.42;
                        if (typeof damageList[field[0][targetFieldPos.column]] === "undefined") damageList[field[0][targetFieldPos.column]] = [];
                        damageList[field[0][targetFieldPos.column]].push({
                            damage: damageToFrontSoldier,
                            type: "normal"
                        });
                        if (typeof expGained[field[0][targetFieldPos.column]] === "undefined") {
                            expGained[field[0][targetFieldPos.column]] = 0;
                        }
                        expGained[field[0][targetFieldPos.column]] += damageToFrontSoldier * 4;
                    }                    
                }
                var damage = (doesHit? Math.max(1, Math.floor(rawDamage)): 0);
                if (typeof damageList[targetUnit.playerId] === "undefined") damageList[targetUnit.playerId] = [];
                damageList[targetUnit.playerId].push({
                    damage: damage,
                    type: (doesHit?(isCrit?"crit":"normal"):"miss")
                });

                if (doesHit) {
                    var STUN_CHANCE = (isNaN(skillPhase.status["Stun"]) ? 0 : skillPhase.status["Stun"]);
                    var POISON_CHANCE = (isNaN(skillPhase.status["Poison"]) ? 0 : skillPhase.status["Poison"]);
                    var CURSE_CHANCE = (isNaN(skillPhase.status["Curse"]) ? 0 : skillPhase.status["Curse"]);
                    var PARALYZE_CHANCE = (isNaN(skillPhase.status["Paralyze"]) ? 0 : skillPhase.status["Paralyze"]);
                    var DARKNESS_CHANCE = (isNaN(skillPhase.status["Darkness"]) ? 0 : skillPhase.status["Darkness"]);
                    var PATK_DOWN_CHANCE = (isNaN(skillPhase.status["Patk Down"]) ? 0 : skillPhase.status["Patk Down"]);
                    var PDEF_DOWN_CHANCE = (isNaN(skillPhase.status["Pdef Down"]) ? 0 : skillPhase.status["Pdef Down"]);
                    var MATK_DOWN_CHANCE = (isNaN(skillPhase.status["Matk Down"]) ? 0 : skillPhase.status["Matk Down"]);
                    var MDEF_DOWN_CHANCE = (isNaN(skillPhase.status["Mdef Down"]) ? 0 : skillPhase.status["Mdef Down"]);
                    var CHARM_CHANCE = (isNaN(skillPhase.status["Charm"]) ? 0 : skillPhase.status["Charm"]);

                    if (!targetUnit.status["Stun"]) {
                        var doesStun = (this.bot.functionHelper.randomInt(100) < STUN_CHANCE);
                        if (doesStun) {
                            this.bot.playerManager.applyStun(attacker.playerId, targetUnit.playerId);
                            stunResult[targetUnit.playerId] = true;
                            expGained[attacker.playerId] += 2000;
                        }
                    }
                    if (!targetUnit.status["Poison"]) {
                        var doesPoison = (this.bot.functionHelper.randomInt(100) < POISON_CHANCE);
                        if (doesPoison) {
                            this.bot.playerManager.applyPoison(attacker.playerId, targetUnit.playerId);
                            poisonResult[targetUnit.playerId] = true;
                        }
                    }
                    if (!targetUnit.status["Paralyze"]) {
                        var doesParalyze = (this.bot.functionHelper.randomInt(100) < PARALYZE_CHANCE);
                        if (doesParalyze) {
                            this.bot.playerManager.applyParalyze(attacker.playerId, targetUnit.playerId);
                            paralyzeResult[targetUnit.playerId] = true;
                            expGained[attacker.playerId] += 2000;
                        }
                    }
                    if (!targetUnit.status["Curse"]) {
                        var doesCurse = (this.bot.functionHelper.randomInt(100) < CURSE_CHANCE);
                        if (doesCurse) {
                            this.bot.playerManager.applyCurse(attacker.playerId, targetUnit.playerId);
                            curseResult[targetUnit.playerId] = true;
                        }
                    }
                    if (!targetUnit.status["Darkness"]) {
                        var doesDarkness = (this.bot.functionHelper.randomInt(100) < DARKNESS_CHANCE);
                        if (doesDarkness) {
                            this.bot.playerManager.applyDarkness(attacker.playerId, targetUnit.playerId);
                            darknessResult[targetUnit.playerId] = true;
                            expGained[attacker.playerId] += 2000;
                        }
                    }
                    if (!targetUnit.status["Patk Down"]) {
                        var doesPatkDown = (this.bot.functionHelper.randomInt(100) < PATK_DOWN_CHANCE);
                        if (doesPatkDown) {
                            this.bot.playerManager.applyPatkDown(attacker.playerId, targetUnit.playerId);
                            patkDownResult[targetUnit.playerId] = true;
                            expGained[attacker.playerId] += 2000;
                        }
                    }
                    if (!targetUnit.status["Pdef Down"]) {
                        var doesPdefDown = (this.bot.functionHelper.randomInt(100) < PDEF_DOWN_CHANCE);
                        if (doesPdefDown) {
                            this.bot.playerManager.applyPdefDown(attacker.playerId, targetUnit.playerId);
                            pdefDownResult[targetUnit.playerId] = true;
                            expGained[attacker.playerId] += 1000;
                        }
                    }
                    if (!targetUnit.status["Matk Down"]) {
                        var doesMatkDown = (this.bot.functionHelper.randomInt(100) < MATK_DOWN_CHANCE);
                        if (doesMatkDown) {
                            this.bot.playerManager.applyMatkDown(attacker.playerId, targetUnit.playerId);
                            matkDownResult[targetUnit.playerId] = true;
                            expGained[attacker.playerId] += 2000;
                        }
                    }
                    if (!targetUnit.status["Mdef Down"]) {
                        var doesMdefDown = (this.bot.functionHelper.randomInt(100) < MDEF_DOWN_CHANCE);
                        if (doesMdefDown) {
                            this.bot.playerManager.applyMdefDown(attacker.playerId, targetUnit.playerId);
                            mdefDownResult[targetUnit.playerId] = true;
                            expGained[attacker.playerId] += 1000;
                        }
                    }
                    if (!targetUnit.status["Charm"]) {
                        var doesCharm = (this.bot.functionHelper.randomInt(100) < CHARM_CHANCE);
                        if (doesCharm && (!targetUnit.accessory || !targetUnit.accessory.effect["Charm Defence"])) {
                            this.bot.playerManager.applyCharm(attacker.playerId, targetUnit.playerId);
                            charmResult[targetUnit.playerId] = true;
                            expGained[attacker.playerId] += 2000;
                        }
                    }
                }
                
                if (isMdefDownUsed && targetUnit.status["Mdef Down"] && targetUnit.status["Mdef Down"].ownerId != attacker.playerId) {
                    targetUnit.status["Mdef Down"].absorbDamage(damage);
                }
                if (isPdefDownUsed && targetUnit.status["Pdef Down"] && targetUnit.status["Pdef Down"].ownerId != attacker.playerId) {
                    targetUnit.status["Pdef Down"].absorbDamage(damage);
                }

            } else {

                hitRateOnTargets[targetUnit.playerId] = 100;
                var isResurrected = false;
                if (targetUnit.isFainted() && !targetUnit.status["Resurrected"] && skillPhase.status["Resurrection"]) {
                    this.bot.playerManager.applyResurrected(attacker.playerId, targetUnit.playerId);
                    resurrectionResult[targetUnit.playerId] = true;
                    if (this.bot.userManager.doesMemberHaveRole(targetUnit.playerId, "Fainted")) {
                        this.bot.userManager.removeRole(targetUnit.playerId, "Fainted")
                    }
                    isResurrected = true;
                }

                var matk = attacker.getMAtk();
                var healHp = Math.floor(matk * skillModifier);
                
                if (isResurrected) healHp = 9999999;
                healHp = this.bot.playerManager.healPlayerUnit(targetUnit.playerId, healHp);

                if (skillPhase.status["Cleanse"]) {
                    targetUnit.cleanse();
                }

                if (typeof damageList[targetUnit.playerId] === "undefined") damageList[targetUnit.playerId] = [];
                damageList[targetUnit.playerId].push({
                    damage: healHp,
                    type: "heal"
                });
            }
        }
    }

    

    if (attacker.getClassId() === 1 && !mainTargetUnit.status["Stun"] && doesHitMainTarget) {
        // fighter class trait
        var doesStun = (this.bot.functionHelper.randomInt(100) < 30);
        if (doesStun) {
            for(var i=0;i<targets.length;i++) {
                var targetFieldPos = targets[i];
                var targetUnit = this.bot.playerManager.getPlayerUnit(field[targetFieldPos.row][targetFieldPos.column]);
                if (mainTargetUnit === targetUnit) {
                    this.bot.playerManager.applyStun(attacker.playerId, targetUnit.playerId);
                    stunResult[targetUnit.playerId] = true;
                    expGained[attacker.playerId] += 2000;
                    break;
                }
            }
        }
    }

    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            var enemyUnit = this.bot.playerManager.getPlayerUnit(battleField.enemySide[i][j]);
            if (enemyUnit && enemyUnit.getCurrentHP() > 0) {
                if (enemyUnit === attacker) {
                    painter.setEnemyState(i, j, enemyUnit, skillPhase.state, skillPhase.frame);
                    if (skillPhase.doesApproach) {
                        painter.moveToFrontOfAllyField(i, j, average_column);
                    }
                } else {
                    painter.setEnemyState(i, j, enemyUnit);
                }
            }
            var allyUnit = this.bot.playerManager.getPlayerUnit(battleField.allySide[i][j]);
            if (allyUnit && !allyUnit.isFainted()) {
                if (allyUnit === attacker) {
                    painter.setAllyState(i, j, allyUnit, skillPhase.state, skillPhase.frame);
                    if (skillPhase.doesApproach) {
                        painter.moveToFrontOfEnemyField(i, j, average_column);
                    }
                } else {
                    painter.setAllyState(i, j, allyUnit);
                }
            }
        }
    }

    var allDamage = 0;
    for(key in damageList) {
        var targetId = key;
        var targetUnit = this.bot.playerManager.getPlayerUnit(targetId);

        var targetFieldPos = getPosOnField(targetUnit, field);
        
        var targetName = targetUnit.shortName;
        var targetUser = this.bot.userManager.getUser(targetUnit.playerId);
        if (targetUser) targetName += " (" + targetUser.username + ")";

        if (skillPhase.canAttack()) {        
            text += "\tdealing **";

            var onEnemySide = (field === battleField.enemySide);
            var totalDamage = 0;

            for(var i=0;i<damageList[targetId].length;i++) {
                var damage = damageList[targetId][i].damage;
                var type = damageList[targetId][i].type;
                totalDamage += damage;
                allDamage += damage;
                if (i === damageList[targetId].length - 1) {
                    text += damage + "";    
                } else if (i < damageList[targetId].length - 2) {
                    text += damage + ", ";    
                } else {
                    text += damage + " and ";    
                }
                if (onEnemySide) {
                    painter.addEnemyDamage(targetFieldPos.row, targetFieldPos.column, damage, type);
                } else {
                    painter.addAllyDamage(targetFieldPos.row, targetFieldPos.column, damage, type);
                }
                var prevHP = targetUnit.getCurrentHP();
                var isFainted = this.bot.playerManager.takeDamagePlayerUnit(targetUnit.playerId, damage);
                
                var exp = (prevHP - targetUnit.getCurrentHP()) * 3;
                expGained[attacker.playerId] += exp;

                if (isFainted) isKOed[targetUnit.playerId] = true;
            }
            text += " damage** to " + targetName;
            if (hitRateOnTargets[targetId]) {
                text += " (Hit: " + hitRateOnTargets[targetId] + "%, Crit: " + critRateOnTargets[targetId] + "%)\n";
            } else {
                text += "\n";
            }

            if (onEnemySide) {
                painter.setEnemyState(targetFieldPos.row, targetFieldPos.column, targetUnit, (totalDamage>0?"damage":"idle"));
            } else {
                painter.setAllyState(targetFieldPos.row, targetFieldPos.column, targetUnit, (totalDamage>0?"damage":"idle"));
            }

        } else {
            var onEnemySide = (field === battleField.enemySide);

            text += "\thealing **";
            for(var i=0;i<damageList[targetId].length;i++) {
                var healHp = damageList[targetId][i].damage;
                
                if (!onEnemySide) expGained[attacker.playerId] += healHp * 4;

                if (i === damageList[targetId].length - 1) {
                    text += healHp + "";    
                } else if (i < damageList[targetId].length - 2) {
                    text += healHp + ", ";    
                } else {
                    text += healHp + " and ";    
                }
                if (onEnemySide) {
                    painter.addEnemyDamage(targetFieldPos.row, targetFieldPos.column, healHp, "heal");
                } else {
                    painter.addAllyDamage(targetFieldPos.row, targetFieldPos.column, healHp, "heal");
                }
            }
            text += " HP** for " + targetName + "\n";
        }

        if (stunResult[targetId]) text += "\t\t" + targetName + " is stunned.\n";
        if (poisonResult[targetId]) text += "\t\t" + targetName + " is poisoned.\n";
        if (paralyzeResult[targetId]) text += "\t\t" + targetName + " is paralyzed.\n";
        if (curseResult[targetId]) text += "\t\t" + targetName + " is cursed.\n";
        if (resurrectionResult[targetId]) text += "\t\t" + targetName + " is resurrected.\n";
        if (darknessResult[targetId]) text += "\t\t" + targetName + " is under Darkness's effect.\n";
        if (patkDownResult[targetId]) text += "\t\t" + targetName + " is under Patk Down's effect.\n";
        if (pdefDownResult[targetId]) text += "\t\t" + targetName + " is under Pdef Down's effect.\n";
        if (matkDownResult[targetId]) text += "\t\t" + targetName + " is under Matk Down's effect.\n";
        if (mdefDownResult[targetId]) text += "\t\t" + targetName + " is under Mdef Down's effect.\n";
        if (charmResult[targetId]) text += "\t\t" + targetName + " is charmed.\n";
    }
    if (Object.keys(expGained).length > 0) text += "\n";

    if (attacker.status["Curse"]) {
        attacker.status["Curse"].evoke(allDamage);
    }

    for(key in expGained) {
        var userId = key;
        var user = this.bot.userManager.getUser(userId);
        var unit = this.bot.playerManager.getPlayerUnit(userId);
        var player = this.bot.playerManager.getPlayer(userId);
        if (player) {
            var preLevel = unit.levelCached;
            this.bot.playerManager.addExp(userId, expGained[userId]);
            this.bot.playerManager.refreshUnitForPlayerId(userId);
            unit = this.bot.playerManager.getPlayerUnit(userId);
            if (preLevel < unit.levelCached) {
                this.bot.userManager.announceLevel(userId, unit.levelCached);
            }
            text += unit.shortName + " (" + user.username + ") gained " + expGained[userId] + " exp.\n";    
        }
    }
    this.bot.savePlayer();

    var that = this;
    painter.draw(function(image) {
        result.push({
            text: text,
            image: image
        });
        for(key in isKOed) koResult.push(key);
        that.attackRecursively(skill, attacker, targetUnitList, battleField, iter+1, result, koResult, callback);
    });
}

TrainingController.prototype.randomField = function(middlePlayerId, secondaryPlayerIdOnTheField) {
    var field = [[null,null,null],[null,null,null]];
    var groups = {};
    for(key in this.bot.playerManager.playerDict) {
        var userId = key;
        var player = this.bot.playerManager.getPlayer(userId);
        var playerUnit = this.bot.playerManager.getPlayerUnit(userId);
        var hasJoinedTraining = this.bot.userManager.doesMemberHaveRole(userId, "Trainee");
        if (playerUnit && hasJoinedTraining) {
            var groupId = (groups[player.partnerId]? player.partnerId: userId);
        
            if (userId === middlePlayerId || player.partnerId === middlePlayerId) {
                if (player.position === "front") {
                    field[0][1] = userId;
                } else {
                    field[1][1] = userId;
                }
                continue;
            }

            if (secondaryPlayerIdOnTheField && (userId === secondaryPlayerIdOnTheField || player.partnerId === secondaryPlayerIdOnTheField)) {
                if (player.position === "front") {
                    field[0][2] = userId;
                } else {
                    field[1][2] = userId;
                }
                continue;
            }

            if (typeof groups[groupId] === "undefined") {
                groups[groupId] = {
                    frontline: null,
                    backline: null
                }
            }

            if (player.position === "front") {
                groups[groupId].frontline = userId;
            } else {
                groups[groupId].backline = userId;
            }    
        } 
    }
    var groupList = [];
    for(key in groups) groupList.push(groups[key]);
    if (groupList.length > 0) {
        var chosenGroupIndex = this.bot.functionHelper.randomInt(groupList.length);
        var chosenGroup = groupList[chosenGroupIndex];
        field[0][0] = chosenGroup.frontline;
        field[1][0] = chosenGroup.backline;
        groupList.splice(chosenGroupIndex, 1);
    }
    if (groupList.length > 0 && !field[0][2] && !field[1][2]) {
        var chosenGroupIndex = this.bot.functionHelper.randomInt(groupList.length);
        var chosenGroup = groupList[chosenGroupIndex];
        field[0][2] = chosenGroup.frontline;
        field[1][2] = chosenGroup.backline;
        groupList.splice(chosenGroupIndex, 1);
    }
    return field;
}

TrainingController.prototype.randomTrainer = function() {
    var trainerIdList = [];
    var now = new Date();

    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            if (this.trainerField[i][j]) {
                var trainerUnit = this.bot.playerManager.getPlayerUnit(this.trainerField[i][j]);
                if (!trainerUnit.isFainted() && trainerUnit.cooldownEndTime <= now.valueOf()) {
                    trainerIdList.push(this.trainerField[i][j]);    
                }
            }
        }
    }
    if (trainerIdList.length > 0) {
        var trainerId = this.bot.functionHelper.randomObject(trainerIdList);
        return this.bot.playerManager.getPlayerUnit(trainerId);
    }
    return null;
}

TrainingController.prototype.attack = function(attacker, targetUnitList, callback) {
    var skillName = attacker.getCurrentSkill();
    if (!skillName) {
        callback(null, "You need to equip weapon first.", null, null, true);
        return;
    }
    var skill = this.bot.skillDatabase.getSkill(attacker.getClassId(), skillName);
    if (!skill) {
        callback(null, "The skill **" + skillName + "** is not available yet. Please change to different weapon.", null, null, true);
        return;
    }

    if (!skill.canAttack) {
        callback(null, "You cannot use **" + skillName + "** to attack.", null, null, true);
        return;
    }

    var now = new Date();
    if (now.valueOf() < attacker.cooldownEndTime) {
        var time = this.bot.functionHelper.parseTime(attacker.cooldownEndTime - now.valueOf());
        callback(null, "You have to wait for **" + time + "** before executing the next action.", null, null, true);
        return;   
    }

    var secondaryPlayerIdOnTheField = null;
    while(targetUnitList.length < skill.phases.length) {
        targetUnitList.push(targetUnitList[targetUnitList.length-1]);
    }
    for (var i = 0; i < skill.phases.length; i++) {
        var skillPhase = skill.phases[i];
        if (skillPhase.canAttack()) {
            var targetPos = getPosOnField(targetUnitList[i], this.trainerField);
            if (!targetPos) {
                callback(null, "You can only attack the trainer.", null, null, true);
                return;
            }
        } else {
            if (skillPhase.isSelfTarget()) {
                if (targetUnitList[i] !== attacker) {
                    targetUnitList.splice(i, 0, attacker);
                }
            } else {
                var targetPos = getPosOnField(targetUnitList[i], this.trainerField);
                if (targetPos) {
                    targetUnitList[i] = attacker;
                } else {
                    if (targetUnitList[i].playerId != attacker.playerId) {
                        secondaryPlayerIdOnTheField = targetUnitList[i].playerId;    
                    }
                }
            }
        }
    };

    var cooldownTime = skill.cooldown * 60 * 1000;
    if (attacker.status["Sneak"]) {
        cooldownTime *= 0.5;
        attacker.status["Sneak"].destroy();
    }
    attacker.cooldownEndTime = now.valueOf() + Math.floor(cooldownTime);
    
    var result1 = [];
    var result2 = [];
    var koResult = [];
    var that = this;

    var battleField = new BattleField();
    battleField.enemySide = this.trainerField;
    battleField.allySide = this.randomField(attacker.playerId, secondaryPlayerIdOnTheField);

    if (typeof that.trainingSession.contribution[attacker.playerId] === "undefined") {
        that.trainingSession.contribution[attacker.playerId] = 0;
    }
    that.trainingSession.contribution[attacker.playerId]++;
    this.saveSession();

    var playerTurn = {
        side: "PLAYER",
        skill: skill,
        attacker: attacker,
        targetUnitList: targetUnitList,
        result: result1
    };
    var trainerTurn = null;
    var turnQueue = [];

    var trainerToAttack = that.randomTrainer();
    var isTrainerSkillReady = (trainerToAttack && trainerToAttack.cooldownEndTime <= now.valueOf());
    var trainerSkill = null;

    if (trainerToAttack && !trainerToAttack.isFainted() && isTrainerSkillReady) {
        var trainerSkillName = trainerToAttack.getCurrentSkill();
        trainerSkill = that.bot.skillDatabase.getSkill(trainerToAttack.getClassId(), trainerSkillName);

        var trainerTargetList = [];
        for (var i = 0; i < trainerSkill.phases.length; i++) {
            var trainerSkillPhase = trainerSkill.phases[i];

            if (trainerSkillPhase.canHeal()) {
                var trainerToHealList = [];
                for(var j=0;j<2;j++) {
                    for(var k=0;k<3;k++) {
                        if (this.trainerField[j][k]) {
                            var trainerToHeal = this.bot.playerManager.getPlayerUnit(this.trainerField[j][k]);
                            var canHeal = (!trainerToHeal.isFainted());
                            canHeal = (canHeal || (trainerToHeal.isFainted() && !trainerToHeal.status["Resurrected"] && trainerSkillPhase.status["Resurrection"]));

                            if (canHeal) {
                                trainerToHealList.push(trainerToHeal);
                            }
                        }
                    }
                }
                trainerToHealList.sort(function(a, b) {
                    return a.getCurrentHP() - b.getCurrentHP();
                });

                if (trainerToHealList[0]) {
                    trainerTargetList.push(trainerToHealList[0]);
                } else {
                    trainerTargetList.push(trainerToAttack);
                }
            } else {
                trainerTargetList.push(attacker);
            }
        }
        trainerToAttack.cooldownEndTime = now.valueOf() + Math.floor(trainerSkill.cooldown * 60 * 1000 / 2);
        trainerTurn = {
            side: "TRAINER",
            skill: trainerSkill,
            attacker: trainerToAttack,
            targetUnitList: trainerTargetList,
            result: result2
        };
        
    }   

    var isAttackerFaster = true;
    var isAttackerPreepmtive = (skill && skill.effect && skill.effect["Pre-emption"]);
    var isTrainerPreepmtive = (trainerSkill && trainerSkill.effect && trainerSkill.effect["Pre-emption"]);
    if (isAttackerPreepmtive == isTrainerPreepmtive) {
        if (trainerToAttack) {
            isAttackerFaster = attacker.getAGI() >= trainerToAttack.getAGI();    
        } else {
            isAttackerFaster = true;
        }
        
    } else {
        isAttackerFaster = isAttackerPreepmtive;
    }

    if (!trainerToAttack || isAttackerFaster) {
        turnQueue.push(playerTurn);
        if (trainerToAttack && trainerTurn) turnQueue.push(trainerTurn);
        if (attacker.getClassId() === 7 && attacker.position === "front") {
            turnQueue.push(playerTurn);
        }
        if (trainerToAttack && trainerToAttack.getClassId() === 7 && trainerToAttack.position === "front") {
            turnQueue.push(trainerTurn);
        }
    } else {
        if (trainerToAttack && trainerTurn) turnQueue.push(trainerTurn);
        turnQueue.push(playerTurn);
        if (trainerToAttack && trainerToAttack.getClassId() === 7 && trainerToAttack.position === "front") {
            turnQueue.push(trainerTurn);
        }
        if (attacker.getClassId() === 7 && attacker.position === "front") {
            turnQueue.push(playerTurn);
        }
    }  

    this.executeBattle(turnQueue, 0, battleField, koResult, "", [], function(text, imageName) {
        callback(null, text, imageName, koResult);
    });
}

TrainingController.prototype.executeBattle = function(turnQueue, iter, battleField, koResult, resultText, imageList, callback) {
    if (iter >= turnQueue.length) {
        var userId = turnQueue[0].attacker.playerId;
        if (imageList && imageList.length > 0) {
            image = new Jimp(950, 590 * imageList.length, 0xFFFFFF00, function (err, image) {
                for(var i=0;i<imageList.length;i++) {
                    image.composite(imageList[i], 0, 590 * i);
                }
                var imageName = "images/battle/" + userId + ".png";
                image.write(imageName, function() {
                    callback(resultText, imageName);
                });
            });    
        } else {
            callback(resultText, null);
        }
        return;
    }
    var turn = turnQueue[iter];
    var that = this;
    if (turn && turn.attacker && !turn.attacker.isFainted()) {
        this.attackRecursively(turn.skill, turn.attacker, turn.targetUnitList, battleField, 0, turn.result, koResult, function() {
            for(var i=0;i<turn.result.length;i++) {
                resultText += "=======" + turn.side + "'S PHASE " + (i+1) + "=======\n";
                resultText += turn.result[i].text + "\n";
            }
            for(var i=0;i<turn.result.length;i++) {
                if (turn.result[i].image) imageList.push(turn.result[i].image);
            }
            turn.result = [];
            if (turn.attacker.status["Darkness"]) turn.attacker.status["Darkness"].evoke();
            if (turn.attacker.status["Focus"]) turn.attacker.status["Focus"].destroy();

            that.executeBattle(turnQueue, iter+1, battleField, koResult, resultText, imageList, callback);
        });    
    } else {
        that.executeBattle(turnQueue, iter+1, battleField, koResult, resultText, imageList, callback);
    }
}

TrainingController.prototype.heal = function(attacker, targetUnitList, callback) {
    var skillName = attacker.getCurrentSkill();
    if (!skillName) {
        callback(null, "You need to equip weapon first.", null, null, true);
        return;
    }
    var skill = this.bot.skillDatabase.getSkill(attacker.getClassId(), skillName);
    if (!skill) {
        callback(null, "The skill **" + skillName + "** is not available yet. Please change to different weapon.", null, null, true);
        return;
    }
    if (!skill.canHeal) {
        callback(null, "You cannot use **" + skillName + "** to heal.", null, null, true);
        return;
    }

    var now = new Date();
    if (now.valueOf() < attacker.cooldownEndTime) {
        var time = this.bot.functionHelper.parseTime(attacker.cooldownEndTime - now.valueOf());
        callback(null, "You have to wait for **" + time + "** before executing the next action.", null, null, true);
        return;   
    }

    while(targetUnitList.length < skill.phases.length) {
        targetUnitList.push(targetUnitList[targetUnitList.length-1]);
    }
    for (var i = 0; i < skill.phases.length; i++) {
        var skillPhase = skill.phases[i];
        if (skillPhase.canAttack()) {
            var targetPos = getPosOnField(targetUnitList[i], this.trainerField);
            if (!targetPos) {
                callback(null, "You can only attack the trainer.", null, null, true);
                return;
            }
        } else {
            if (skillPhase.isSelfTarget()) {
                if (targetUnitList[i] !== attacker) {
                    targetUnitList.splice(i, 0, attacker);
                }
            } else {
                if (targetUnitList[i].isFainted() && (!skillPhase.status["Resurrection"] || targetUnitList[i].status["Resurrected"])) {
                    callback(null, "You cannot heal a fainted trainer.", null, null, true);
                    return;
                }
            }
        }
    };

    var cooldownTime = skill.cooldown * 60 * 1000;
    if (attacker.status["Sneak"]) {
        cooldownTime *= 0.5;
        attacker.status["Sneak"].destroy();
    }
    attacker.cooldownEndTime = now.valueOf() + Math.floor(cooldownTime);

    var result1 = [];
    var result2 = [];
    var koResult = [];
    var that = this;

    var battleField = new BattleField();
    battleField.enemySide = this.trainerField;
    battleField.allySide = this.randomField(attacker.playerId);

    for (var i = 0; i < skill.phases.length; i++) {
        var skillPhase = skill.phases[i];
        if (!skillPhase.canAttack()) {
            var targetPosOnEnemySide = getPosOnField(targetUnitList[i], battleField.enemySide);
            var targetPosOnAllySide = getPosOnField(targetUnitList[i], battleField.allySide);
            if (!targetPosOnEnemySide && !targetPosOnAllySide) {
                var playerId = targetUnitList[i].playerId;
                var player = this.bot.playerManager.getPlayer(playerId);
                if (player.position === "front") {
                    battleField.allySide[0][0] = playerId;
                    battleField.allySide[1][0] = player.partnerId;
                } else {
                    battleField.allySide[1][0] = playerId;
                    battleField.allySide[0][0] = player.partnerId;
                }
            }
        }
    };
    
    if (!this.didAllTrainersDie()) {
        if (typeof that.trainingSession.contribution[attacker.playerId] === "undefined") {
            that.trainingSession.contribution[attacker.playerId] = 0;
        }
        that.trainingSession.contribution[attacker.playerId]++;
        this.saveSession();
    }
    
    var playerTurn = {
        side: "PLAYER",
        skill: skill,
        attacker: attacker,
        targetUnitList: targetUnitList,
        result: result1
    };
    var trainerTurn = null;
    var turnQueue = [playerTurn];

    var trainerToAttack = that.randomTrainer();
    var isTrainerSkillReady = (trainerToAttack && trainerToAttack.cooldownEndTime <= now.valueOf());
    if (trainerToAttack && !trainerToAttack.isFainted() && isTrainerSkillReady && skill.canAttack) {
        var trainerSkillName = trainerToAttack.getCurrentSkill();
        var trainerSkill = that.bot.skillDatabase.getSkill(trainerToAttack.getClassId(), trainerSkillName);

        var trainerTarget = attacker;
        if (trainerSkill.canHeal) {
            trainerTarget = trainerToAttack;
        }
        trainerToAttack.cooldownEndTime = now.valueOf() + Math.floor(trainerSkill.cooldown * 60 * 1000 / 2);
        trainerTurn = {
            side: "TRAINER",
            skill: trainerSkill,
            attacker: trainerToAttack,
            targetUnitList: [trainerTarget],
            result: result2
        };
        turnQueue.push(trainerTurn);
    }

    if (attacker.getClassId() === 7 && attacker.position === "front") {
        turnQueue.push(playerTurn);
    }
    if (trainerToAttack && trainerToAttack.getClassId() === 7 && trainerToAttack.position === "front" && skill.canAttack) {
        turnQueue.push(trainerTurn);
    }

    this.executeBattle(turnQueue, 0, battleField, koResult, "", [], function(text, imageName) {
        callback(null, text, imageName, koResult);
    });
}

module.exports = new TrainingController();