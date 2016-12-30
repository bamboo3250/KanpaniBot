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

function hasFrontlineUnit(field) {
    for(var i=0;i<3;i++) if (field[0][i]) return true;
    return false;
}

function resolveTargets(skillPhase, attacker, mainTarget, field) {
    var mainTargetPos = getPosOnField(mainTarget, field);
    
    if (skillPhase.isShortAttack()) {   // short attack
        if (mainTargetPos.isBackline() && hasFrontlineUnit(field)) {
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
            if (masks[chosenMaskIndex][i][j] && field[i][j]) {
                result.push(new FieldPosition(i, j));
            }
        }
    }
    return result;

}

TrainingController.prototype.attackRecursively = function(skill, attacker, targetUnitList, battleField, iter, result, callback) {
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
    var field = (battleField.isEnemy(mainTargetUnit.playerId)? battleField.enemySide: battleField.allySide);
    var targets = resolveTargets(skillPhase, attacker, mainTargetUnit, field);
    var average_column = 0;
    for(var i=0;i<targets.length;i++) average_column += targets[i].column;
    average_column = average_column / targets.length;

    var painter = new BattlePainter(this.bot);
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            var enemyUnit = this.bot.unitManager.getPlayerUnit(battleField.enemySide[i][j]);
            if (enemyUnit) {
                if (enemyUnit === attacker) {
                    painter.setEnemyState(i, j, enemyUnit, "attack01", 3);
                    if (skillPhase.isShortAttack()) {
                        painter.moveToFrontOfAllyField(i, j, average_column);
                    }
                } else {
                    painter.setEnemyState(i, j, enemyUnit);
                }
            }
            var allyUnit = this.bot.unitManager.getPlayerUnit(battleField.allySide[i][j]);
            if (allyUnit) {
                if (allyUnit === attacker) {
                    painter.setAllyState(i, j, allyUnit, "attack01", 3);
                    if (skillPhase.isShortAttack()) {
                        painter.moveToFrontOfEnemyField(i, j, average_column);
                    }
                } else {
                    painter.setAllyState(i, j, allyUnit);
                }
            }
        }
    }

    for(var i=0;i<targets.length;i++) {
        var targetFieldPos = targets[i];
        var targetUnit = this.bot.unitManager.getPlayerUnit(field[targetFieldPos.row][targetFieldPos.column]);

        var targetName = targetUnit.shortName;
        var targetUser = this.bot.userManager.getUser(targetUnit.playerId);
        if (targetUser) targetName += " (" + targetUser.username + ")";

        text += attackerName + " used **" + skill.name + "**, ";
        if (skillPhase.canAttack()) {        
            text += "dealing **";

            var onEnemySide = (field === battleField.enemySide);

            for(var j=0;j<skillPhase.attackTimes;j++) {

                // damage = atk * modier * random * crit * buff * element - def
                var damage = 123;   // TODO

                if (j === skillPhase.attackTimes - 1) {
                    text += damage + "";    
                } else if (j < skillPhase.attackTimes - 2) {
                    text += damage + ", ";    
                } else {
                    text += damage + " and ";    
                }
                if (onEnemySide) {
                    painter.addEnemyDamage(targetFieldPos.row, targetFieldPos.column, damage, "normal");
                } else {
                    painter.addAllyDamage(targetFieldPos.row, targetFieldPos.column, damage, "crit");
                }
            }
            text += " damage** to " + targetName + ".\n";

            if (onEnemySide) {
                painter.setEnemyState(targetFieldPos.row, targetFieldPos.column, targetUnit, "damage");
            } else {
                painter.setAllyState(targetFieldPos.row, targetFieldPos.column, targetUnit, "damage");
            }

        } else {
            var onEnemySide = (field === battleField.enemySide);

            text += "healing **";
            for(var j=0;j<skillPhase.attackTimes;j++) {
                var healHp = 123;
                if (j === skillPhase.attackTimes - 1) {
                    text += healHp + "";    
                } else if (j < skillPhase.attackTimes - 2) {
                    text += healHp + ", ";    
                } else {
                    text += healHp + " and ";    
                }
                if (onEnemySide) {
                    painter.addEnemyDamage(targetFieldPos.row, targetFieldPos.column, damage, "heal");
                } else {
                    painter.addAllyDamage(targetFieldPos.row, targetFieldPos.column, damage, "heal");
                }
            }
            text += " HP** for " + targetName + ".\n";
        }
    }
    
    var that = this;
    painter.draw(function(image) {
        result.push({
            text: text,
            image: image
        })
        that.attackRecursively(skill, attacker, targetUnitList, battleField, iter+1, result, callback);
    });
}

TrainingController.prototype.randomField = function(middlePlayerId) {
    var field = [[null,null,null],[null,null,null]];
    var groups = {};
    for(key in this.bot.playerManager.playerDict) {
        var userId = key;
        var player = this.bot.playerManager.getPlayer(userId);
        var groupId = (player.partnerId? player.partnerId: userId);
        
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
            if (this.trainerField[i][j]) trainerIdList.push(this.trainerField[i][j]);
        }
    }
    var trainerId = this.bot.functionHelper.randomObject(trainerIdList);
    var trainer = this.bot.unitManager.getPlayerUnit(trainerId);
    return trainer;
}

TrainingController.prototype.attack = function(attacker, targetUnitList, callback) {
    var skillName = attacker.getCurrentSkill();
    if (!skillName) {
        callback(null, "You need to equip weapon first.", null, true);
        return;
    }
    var skill = this.bot.skillDatabase.getSkill(attacker.getClassId(), skillName);
    if (!skill.canAttack) {
        callback(null, "You cannot use **" + skillName + "** to attack.", null, true);
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
                callback(null, "You can only attack the trainer.", null, true);
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

    var result1 = [];
    var result2 = [];
    var that = this;

    var battleField = new BattleField();
    battleField.enemySide = this.trainerField;
    battleField.allySide = this.randomField(attacker.playerId);

    this.attackRecursively(skill, attacker, targetUnitList, battleField, 0, result1, function() {

        var trainerToAttack = that.randomTrainer();
        var trainerSkillName = trainerToAttack.getCurrentSkill();
        var trainerSkill = that.bot.skillDatabase.getSkill(trainerToAttack.getClassId(), trainerSkillName);
        
        var trainerTarget = attacker;
        if (trainerSkill.canHeal) {
            trainerTarget = trainerToAttack;
        }

        that.attackRecursively(trainerSkill, trainerToAttack, [trainerTarget], battleField, 0, result2, function() {

            var text = "";
            for(var i=0;i<result1.length;i++) {
                text += "=======PLAYER'S PHASE " + (i+1) + "=======\n";
                text += result1[i].text + "\n";
            }
            for(var i=0;i<result2.length;i++) {
                text += "=======TRAINER'S PHASE " + (i+1) + "=======\n";
                text += result2[i].text + "\n";
            }

            var imageList = [];
            for(var i=0;i<result1.length;i++) {
                if (result1[i].image) imageList.push(result1[i].image);
            }
            for(var i=0;i<result2.length;i++) {
                if (result2[i].image) imageList.push(result2[i].image);
            }

            image = new Jimp(950, 590 * imageList.length, 0xFFFFFF00, function (err, image) {
                for(var i=0;i<imageList.length;i++) {
                    image.composite(imageList[i], 0, 590 * i);
                }
                var imageName = "images/battle/" + attacker.playerId + ".png";
                image.write(imageName, function() {
                    callback(null, text, imageName);
                });
            });
        });    
    });

    
}

module.exports = new TrainingController();