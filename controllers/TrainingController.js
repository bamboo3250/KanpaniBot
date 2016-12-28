var BattleField = require('../classes/BattleField');
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
    console.log(mainTarget);
    console.log(field);
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
    
    var enemyList = battleField.getEnemyList();
    var allyList = battleField.getAllyList();

    var queue = [];
    var spriteFileNameList = [];

    for(var i=0;i<enemyList.length;i++) {
        var enemyUnit = this.bot.unitManager.getPlayerUnit(enemyList[i]);
        var spriteUrl = this.bot.urlHelper.getSpriteImageURL(enemyUnit, true, "damage");
        var spriteFileName = "images/enemy/" + this.bot.urlHelper.getSpriteImageName(enemyUnit, "damage");
        spriteFileNameList.push(spriteFileName);
        queue.push({
            fileToDownload: spriteUrl,   fileToSave: spriteFileName
        });
        spriteUrl = this.bot.urlHelper.getSpriteImageURL(enemyUnit);
        spriteFileName = "images/enemy/" + this.bot.urlHelper.getSpriteImageName(enemyUnit);
        spriteFileNameList.push(spriteFileName);
        queue.push({
            fileToDownload: spriteUrl,   fileToSave: spriteFileName
        });
        if (enemyList[i] === attacker.playerId) {
            spriteUrl = this.bot.urlHelper.getSpriteImageURL(enemyUnit, true, "attack01");
            spriteFileName = "images/enemy/" + this.bot.urlHelper.getSpriteImageName(enemyUnit, "attack01");
            spriteFileNameList.push(spriteFileName);
            queue.push({
                fileToDownload: spriteUrl,   fileToSave: spriteFileName
            }); 
        }
    }
    
    for(var i=0;i<allyList.length;i++) {
        var allyUnit = this.bot.unitManager.getPlayerUnit(allyList[i]);
        var spriteUrl = this.bot.urlHelper.getSpriteImageURL(allyUnit, false, "damage");
        var spriteFileName = "images/ally/" + this.bot.urlHelper.getSpriteImageName(allyUnit, "damage");
        spriteFileNameList.push(spriteFileName);
        queue.push({
            fileToDownload: spriteUrl,   fileToSave: spriteFileName
        });
        spriteUrl = this.bot.urlHelper.getSpriteImageURL(allyUnit, false);
        spriteFileName = "images/ally/" + this.bot.urlHelper.getSpriteImageName(allyUnit);
        spriteFileNameList.push(spriteFileName);
        queue.push({
            fileToDownload: spriteUrl,   fileToSave: spriteFileName
        });
        if (allyList[i] === attacker.playerId) {
            spriteUrl = this.bot.urlHelper.getSpriteImageURL(allyUnit, false, "attack01");
            spriteFileName = "images/ally/" + this.bot.urlHelper.getSpriteImageName(allyUnit, "attack01");
            spriteFileNameList.push(spriteFileName);
            queue.push({
                fileToDownload: spriteUrl,   fileToSave: spriteFileName
            }); 
        }
    }

    var that = this;
    this.bot.imageHelper.download(queue, function(err) {
        if (err) {
            message.reply("Error happened. Try again.");
            bot.log(err);
            return;
        }

        var backgroundFileName = "images/misc/background/battlefield_01.jpg";
        
        var fileNameQueue = [
            backgroundFileName,
        ];
        for(var i=0;i<spriteFileNameList.length;i++) fileNameQueue.push(spriteFileNameList[i]);

        that.bot.imageHelper.read(fileNameQueue, function (err, imageList) {
            if (err) {
                message.reply("Error happened. Try again.");
                that.bot.log(err); 
                return;
            }

            var background = imageList[backgroundFileName];
            var shadow = that.bot.imageManager.getShadow();

            var OFFSET_X = 175;
            var OFFSET_Y = -40;
            // enemy

            var targetMask = [[false,false,false],[false,false,false]];
            for(var i=0;i<targets.length;i++) {
                targetMask[targets[i].row][targets[i].column] = true;
            }
            for(var i=1;i>=0;i--) {
                for(var j=0;j<3;j++) {
                    var enemyUnit = that.bot.unitManager.getPlayerUnit(battleField.enemySide[i][j]);
                    if (enemyUnit) {
                        var spriteFileName, posX, posY;
                        var frameNo = 0;
                        if (enemyUnit.playerId === attacker.playerId) {
                            frameNo = 3;
                            spriteFileName = "images/enemy/" + that.bot.urlHelper.getSpriteImageName(enemyUnit, "attack01");
                            var average_column = 0;
                            var average_row = 3;
                            for(var k=0;k<targets.length;k++) {
                                average_column += targets[k].column;
                            }
                            average_column = average_column / targets.length;


                            posX = OFFSET_X + 102*(average_row) - 137*(average_column);
                            posY = OFFSET_Y + 65*(average_row) + 37*(average_column);
                        } else {
                            if (battleField.isEnemy(mainTargetUnit.playerId)) {
                                if (targetMask[i][j]) {
                                    spriteFileName = "images/enemy/" + that.bot.urlHelper.getSpriteImageName(enemyUnit, "damage");
                                } else {
                                    spriteFileName = "images/enemy/" + that.bot.urlHelper.getSpriteImageName(enemyUnit);
                                }
                            } else {
                                spriteFileName = "images/enemy/" + that.bot.urlHelper.getSpriteImageName(enemyUnit);
                            }
                            posX = OFFSET_X + 102*(1-i) - 137*j;
                            posY = OFFSET_Y + 65*(1-i) + 37*j;
                        }

                        imageList[spriteFileName].crop((frameNo%5) * 360, Math.floor(frameNo/5) * 270, 360, 270);
                        background
                            .composite(shadow, posX + 110, posY + 160)
                            .composite(imageList[spriteFileName], posX, posY);
                    }
                }
            }

            // ally
            for(var i=0;i<2;i++) {
                for(var j=2;j>=0;j--) {
                    var allyUnit = that.bot.unitManager.getPlayerUnit(battleField.allySide[i][j]);
                    if (allyUnit) {
                        var spriteFileName, posX, posY;
                        var frameNo = 0;
                        if (allyUnit.playerId === attacker.playerId) {
                            frameNo = 3;
                            spriteFileName = "images/ally/" + that.bot.urlHelper.getSpriteImageName(allyUnit, "attack01");
                            var average_column = 0;
                            var average_row = 2;
                            for(var k=0;k<targets.length;k++) {
                                average_column += targets[k].column;
                            }
                            average_column = average_column / targets.length;


                            posX = OFFSET_X + 102*(average_row) - 137*(average_column);
                            posY = OFFSET_Y + 65*(average_row) + 37*(average_column);
                        } else {
                            if (battleField.isAlly(mainTargetUnit.playerId)) {
                                if (targetMask[i][j]) {
                                    spriteFileName = "images/ally/" + that.bot.urlHelper.getSpriteImageName(allyUnit, "damage");
                                } else {
                                    spriteFileName = "images/ally/" + that.bot.urlHelper.getSpriteImageName(allyUnit);
                                }
                            } else {
                                spriteFileName = "images/ally/" + that.bot.urlHelper.getSpriteImageName(allyUnit);
                            }
                            posX = OFFSET_X + 102*(4+i) - 137*j;
                            posY = OFFSET_Y + 65*(4+i) + 37*j;
                        }

                        imageList[spriteFileName].crop((frameNo%5) * 360, Math.floor(frameNo/5) * 270, 360, 270);
                        background
                            .composite(shadow, posX + 110, posY + 160)
                            .composite(imageList[spriteFileName], posX, posY);
                    }
                }
            }

            result.push({
                text: text,
                image: background
            })
            that.attackRecursively(skill, attacker, targetUnitList, battleField, iter+1, result, callback);
        });
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