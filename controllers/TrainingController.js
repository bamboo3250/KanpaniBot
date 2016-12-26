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

TrainingController.prototype.attackRecursively = function(skill, attacker, mainTarget, field, iter, result, callback) {
    if (iter == skill.phases.length) {
        callback();
        return;
    }

    var text = "";
    var attackerName = attacker.shortName;
    var attackerUser = this.bot.userManager.getUser(attacker.playerId);
    if (attackerUser) attackerName += " (" + attackerUser.username + ")";
    
    var skillPhase = skill.phases[iter];
    
    var targets = resolveTargets(skillPhase, attacker, mainTarget, field);
    for(var i=0;i<targets.length;i++) {
        var targetFieldPos = targets[i];
        var targetUnit = this.bot.unitManager.getPlayerUnit(field[targetFieldPos.row][targetFieldPos.column]);

        var targetName = targetUnit.shortName;
        var targetUser = this.bot.userManager.getUser(targetUnit.playerId);
        if (targetUser) targetName += " (" + targetUser.username + ")";

        text += attackerName + " used **" + skill.name + "**, ";
        if (skillPhase.canAttack()) {        
            text += "dealing **";
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
            }
            text += " damage** to " + targetName + ".\n";

        } else {
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
            }
            text += " HP** for " + targetName + ".\n";
        }
    }
    
    result.push({
        text: text,
        image: null
    })
    this.attackRecursively(skill, attacker, mainTarget, field, iter+1, result, callback);
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

TrainingController.prototype.attack = function(attacker, target, callback) {
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

    var mainTargetPos = getPosOnField(target, this.trainerField);
    if (!mainTargetPos) {
        callback(null, "You can only attack the trainer.", null, true);
        return;
    }

    var result1 = [];
    var result2 = [];
    var that = this;
    this.attackRecursively(skill, attacker, target, this.trainerField, 0, result1, function() {

        var trainerSkillName = target.getCurrentSkill();
        var trainerSkill = that.bot.skillDatabase.getSkill(target.getClassId(), trainerSkillName);
        var field = that.randomField(attacker.playerId);
        that.attackRecursively(trainerSkill, target, attacker, field, 0, result2, function() {

            var text = "";
            for(var i=0;i<result1.length;i++) {
                text += "=======PLAYER'S PHASE " + (i+1) + "=======\n";
                text += result1[i].text + "\n";
            }
            for(var i=0;i<result2.length;i++) {
                text += "=======TRAINER'S PHASE " + (i+1) + "=======\n";
                text += result2[i].text + "\n";
            }
            callback(null, text, null);
        });    
    });

    
}

module.exports = new TrainingController();