var BattleField = require('../classes/BattleField');
var BattlePainter = require('./BattlePainter');
var Jimp = require("jimp");

function TrainingController() {
    this.type = "training";
    this.bot = null;
    this.trainerField = [
        [null,null,null],
        [null,null,null]
    ];
    this.contribution = {};
}

TrainingController.prototype.didAllTrainersDie = function() {
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            var trainerId = this.trainerField[i][j];
            var unit = this.bot.unitManager.getPlayerUnit(trainerId);
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

var EXP_REWARD = 48216;

TrainingController.prototype.didPlayerDie = function(playerId) {
    var unit = this.bot.unitManager.getPlayerUnit(playerId);
    if (unit && unit.isTrainer && this.didAllTrainersDie()) {
        for(key in this.bot.unitManager.playerUnits) {
            var userId = key;
            var userUnit = this.bot.unitManager.playerUnits[userId];
            if (userUnit) {
                if (!userUnit.isTrainer) {
                    userUnit.fullHeal();
                    if (this.bot.userManager.doesMemberHaveRole(userId, "Fainted")) {
                        this.bot.userManager.removeRole(userId, "Fainted")
                    }
                } else {
                    this.bot.unitManager.setRespawn(userId);
                }
            }
        }
        var that = this;
        setTimeout(function() {
            var traineeRole = that.bot.battleChannel.guild.roles.find('name', 'Trainee');
            that.bot.battleChannel.sendMessage(traineeRole + " All Trainers are ready for new battle.");
        }, that.bot.unitManager.TRAINER_RESPAWN_TIME);

        var expReward = EXP_REWARD + this.bot.functionHelper.randomInt(Math.floor(EXP_REWARD*0.1));
        for(key in this.contribution) {
            var userId = key;
            var itemAmount = this.contribution[userId] * 5;
            this.contribution[userId] = 0;
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
            var player = this.bot.playerManager.getPlayer(userId);
            this.bot.unitManager.refreshUnitForPlayer(player);
        }
        this.contribution = {};
        this.bot.savePlayer();
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
        var unit = this.bot.unitManager.getPlayerUnit(field[0][i]);
        if (unit && !unit.isFainted()) return true;
    }
    return false;
}

TrainingController.prototype.resolveArea = function(skillPhase, attacker, mainTarget, field) {
    var mainTargetPos = getPosOnField(mainTarget, field);
    
    if (skillPhase.isShortAttack()) {   // short attack
        if (mainTargetPos.isBackline() && this.hasFrontlineUnit(field)) {
            mainTargetPos.row = 0;
        }
        if (!field[mainTargetPos.row][mainTargetPos.column]) {
            for(var i=0;i<3;i++) if (field[mainTargetPos.row][i]) {
                mainTargetPos.column = i;
                break;
            }
        }
    }
    var masks = skillPhase.getPatternMask();
    var chosenMaskIndex = -1;
    for(var i=0;i<masks.length;i++) {
        if (masks[i][mainTargetPos.row][mainTargetPos.column]) {
            chosenMaskIndex = i;
            break;
        }
    }

    var result = [];
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            if (masks[chosenMaskIndex][i][j]) {
                result.push(new FieldPosition(i, j));
            }
        }
    }
    return result;
}

TrainingController.prototype.resolveTargets = function(skillPhase, attacker, mainTarget, field) {
    var resolvedArea = this.resolveArea(skillPhase, attacker, mainTarget, field);
    var result = [];
    for(var i=0;i<resolvedArea.length;i++) {
        var userId = field[resolvedArea[i].row][resolvedArea[i].column];
        if (userId) {
            var unit = this.bot.unitManager.getPlayerUnit(userId);
            if (!unit.isFainted()) {
                result.push(resolvedArea[i]);    
            }
        }
    }
    return result;
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
    if (mainTargetUnit.isFainted()) {
        this.attackRecursively(skill, attacker, targetUnitList, battleField, iter+1, result, koResult, callback);
        return;
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

    var actionOnEnemySide = battleField.isEnemy(mainTargetUnit.playerId);
    var field = (actionOnEnemySide? battleField.enemySide: battleField.allySide);
    var targets = this.resolveTargets(skillPhase, attacker, mainTargetUnit, field);
    var area = this.resolveArea(skillPhase, attacker, mainTargetUnit, field);
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
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            var enemyUnit = this.bot.unitManager.getPlayerUnit(battleField.enemySide[i][j]);
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
            var allyUnit = this.bot.unitManager.getPlayerUnit(battleField.allySide[i][j]);
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

    var isKOed = {};

    text += attackerName + " used **" + skill.name + "**\n";
    if (typeof expGained[attacker.playerId] === "undefined") expGained[attacker.playerId] = 0;

    var damageList = {};
    var hitRateOnTargets = {};
    var critRateOnTargets = {};
    
    var stunResult = {};
    var poisonResult = {};

    for(var i=0;i<targets.length;i++) {
        var targetFieldPos = targets[i];
        var targetUnit = this.bot.unitManager.getPlayerUnit(field[targetFieldPos.row][targetFieldPos.column]);

        var targetName = targetUnit.shortName;
        var targetUser = this.bot.userManager.getUser(targetUnit.playerId);
    
        if (skillPhase.canAttack()) {

            var atk = attacker.getAtk();
            var skillModifier = skillPhase.modifier;
            var critRate = Math.floor(attacker.getCrit()*0.35 - (targetUnit.getLUK()*0.1));
            critRate = Math.max(5, critRate);
            critRate = Math.min(95, critRate);
            critRateOnTargets[targetUnit.playerId] = critRate;
            var elementAdvantage = skillPhase.getElementFactor(targetUnit.element);
            var def = targetUnit.getDef();

            if (skillPhase.useMagicalDamage()) {
                atk = attacker.getMAtk();
                def = targetUnit.getMDef();
            }
            var hitValue = attacker.getHit() + attacker.getDEX()*0.65;
            var evadeValue = targetUnit.getEva() + targetUnit.getAGI()*0.20;
            var hitRate = Math.floor(60 + (hitValue - evadeValue)*0.2);
            hitRate = Math.max(10, hitRate);
            hitRate = Math.min(99, hitRate);
            if (skillPhase.isSpellAttack()) {
                hitRate = 100;
            }
            hitRateOnTargets[targetUnit.playerId] = hitRate;

            for(var j=0;j<skillPhase.attackTimes;j++) {
                var randomFactor = this.bot.functionHelper.randomArbitrary(1/1.1, 1.1);
                var isCrit = (this.bot.functionHelper.randomInt(100) < critRate);
                
                var rawDamage = Math.max(1, (1 - 0.00115 * def) * atk * skillModifier * randomFactor * elementAdvantage * (isCrit?2.0:1.0) - def / 4);
                var hasSomeoneInFront = (targetFieldPos.row === 1 && field[0][targetFieldPos.column]);
                rawDamage *= (hasSomeoneInFront ? 0.7 : 1.0);

                var doesHit = (this.bot.functionHelper.randomInt(100) < hitRate);
                if (!doesHit) rawDamage = 0;

                if (rawDamage > 0 && hasSomeoneInFront) {
                    var frontUnit = this.bot.unitManager.getPlayerUnit(field[0][targetFieldPos.column]);
                    if (frontUnit.getClassId() === 4) {
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
                    var STUN_CHANCE = 20;
                    var POISON_CHANCE = 20;

                    if (attacker.getClassId() === 1 && !targetUnit.status["Stun"]) {
                        // fighter
                        var doesStun = (this.bot.functionHelper.randomInt(100) < STUN_CHANCE);
                        if (doesStun) {
                            this.bot.unitManager.applyStun(attacker.playerId, targetUnit.playerId);
                            stunResult[targetUnit.playerId] = true;
                        }    
                    }
                    if (skillPhase.status["Stun"] && !targetUnit.status["Stun"]) {
                        var doesStun = (this.bot.functionHelper.randomInt(100) < STUN_CHANCE);
                        if (doesStun) {
                            this.bot.unitManager.applyStun(attacker.playerId, targetUnit.playerId);
                            stunResult[targetUnit.playerId] = true;
                        }    
                    }
                    if (skillPhase.status["Poison"] && !targetUnit.status["Poison"]) {
                        var doesPoison = (this.bot.functionHelper.randomInt(100) < POISON_CHANCE);
                        if (doesPoison) {
                            this.bot.unitManager.applyPoison(attacker.playerId, targetUnit.playerId);
                            poisonResult[targetUnit.playerId] = true;
                        }    
                    }
                }
            }
        } else {

            hitRateOnTargets[targetUnit.playerId] = 100;

            for(var j=0;j<skillPhase.attackTimes;j++) {
                var matk = attacker.getMAtk();
                var skillModifier = skillPhase.modifier;
                var healHp = Math.floor(matk * skillModifier);
                
                healHp = this.bot.unitManager.healPlayerUnit(targetUnit.playerId, healHp);
                if (typeof damageList[targetUnit.playerId] === "undefined") damageList[targetUnit.playerId] = [];
                damageList[targetUnit.playerId].push({
                    damage: healHp,
                    type: "heal"
                });
            }
        }
    }

    for(key in damageList) {
        var targetId = key;
        var targetUnit = this.bot.unitManager.getPlayerUnit(targetId);

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
                var isFainted = this.bot.unitManager.takeDamagePlayerUnit(targetUnit.playerId, damage);
                
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
                
                if (!onEnemySide) expGained[attacker.playerId] += healHp * 2;

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
    }
    
    if (Object.keys(expGained).length > 0) text += "\n";
    for(key in expGained) {
        var userId = key;
        var user = this.bot.userManager.getUser(userId);
        var unit = this.bot.unitManager.getPlayerUnit(userId);
        var player = this.bot.playerManager.getPlayer(userId);
        if (player) {
            var preLevel = unit.levelCached;
            this.bot.playerManager.addExp(userId, expGained[userId]);
            this.bot.unitManager.refreshUnitForPlayer(player);
            unit = this.bot.unitManager.getPlayerUnit(userId);
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

TrainingController.prototype.randomField = function(middlePlayerId) {
    var field = [[null,null,null],[null,null,null]];
    var groups = {};
    for(key in this.bot.playerManager.playerDict) {
        var userId = key;
        var player = this.bot.playerManager.getPlayer(userId);
        var playerUnit = this.bot.unitManager.getPlayerUnit(userId);
        var hasJoinedTraining = this.bot.userManager.doesMemberHaveRole(userId, "Trainee");
        if (playerUnit && !playerUnit.isFainted() && hasJoinedTraining) {
            var groupId = (groups[player.partnerId]? player.partnerId: userId);
        
            if (userId === middlePlayerId || player.partnerId === middlePlayerId) {
                if (player.position === "front") {
                    field[0][1] = userId;
                } else {
                    field[1][1] = userId;
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
    if (groupList.length > 0) {
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
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            if (this.trainerField[i][j]) {
                var trainerUnit = this.bot.unitManager.getPlayerUnit(this.trainerField[i][j]);
                if (!trainerUnit.isFainted()) {
                    trainerIdList.push(this.trainerField[i][j]);    
                }
            }
        }
    }
    if (trainerIdList.length > 0) {
        var trainerId = this.bot.functionHelper.randomObject(trainerIdList);
        return this.bot.unitManager.getPlayerUnit(trainerId);
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
                }
            }
        }
    };

    attacker.cooldownEndTime = now.valueOf() + Math.floor(skill.cooldown * 60 * 1000);
    
    var result1 = [];
    var result2 = [];
    var koResult = [];
    var that = this;

    var battleField = new BattleField();
    battleField.enemySide = this.trainerField;
    battleField.allySide = this.randomField(attacker.playerId);

    if (typeof that.contribution[attacker.playerId] === "undefined") {
        that.contribution[attacker.playerId] = 0;
    }
    that.contribution[attacker.playerId]++;

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
    if (trainerToAttack && !trainerToAttack.isFainted() && isTrainerSkillReady) {
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
    if (trainerToAttack && trainerToAttack.getClassId() === 7 && trainerToAttack.position === "front") {
        turnQueue.push(trainerTurn);
    }

    this.executeBattle(turnQueue, 0, battleField, koResult, "", [], function(text, imageName) {
        callback(null, text, imageName, koResult);
    });
}

TrainingController.prototype.executeBattle = function(turnQueue, iter, battleField, koResult, resultText, imageList, callback) {
    if (iter >= turnQueue.length) {
        var userId = turnQueue[0].attacker.playerId;
        image = new Jimp(950, 590 * imageList.length, 0xFFFFFF00, function (err, image) {
            for(var i=0;i<imageList.length;i++) {
                image.composite(imageList[i], 0, 590 * i);
            }
            var imageName = "images/battle/" + userId + ".png";
            image.write(imageName, function() {
                callback(resultText, imageName);
            });
        });
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
            }
        }
    };

    attacker.cooldownEndTime = now.valueOf() + Math.floor(skill.cooldown * 60 * 1000);

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
    
    if (typeof that.contribution[attacker.playerId] === "undefined") {
        that.contribution[attacker.playerId] = 0;
    }
    if (!this.didAllTrainersDie()) {
        that.contribution[attacker.playerId]++;
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