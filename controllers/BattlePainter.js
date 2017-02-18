var Jimp = require("jimp");

function BattlePainter(bot) {
    this.states = {
        "enemy": [
            [null,null,null],
            [null,null,null]
        ],
        "ally": [
            [null,null,null],
            [null,null,null]
        ]
    };
    this.damages = {
        "enemy": [
            [[],[],[]],
            [[],[],[]]
        ],
        "ally": [
            [[],[],[]],
            [[],[],[]]
        ]
    };
    this.skillNameToAnimate = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.focusPointRow = 0;
    this.focusPointColumn = 0;
    this.opacity = 1.0;
    this.bot = bot;
}

BattlePainter.prototype.setEnemyState = function(row, column, unit, state = "idle", frame = 0) {
    this.states["enemy"][row][column] = {
        unit: unit,
        state: state,
        frame: frame,
        row: 1-row,
        column: 2-column
    };
}

BattlePainter.prototype.setAllyState = function(row, column, unit, state = "idle", frame = 0) {
    this.states["ally"][row][column] = {
        unit: unit,
        state: state,
        frame: frame,
        row: 4+row,
        column: column
    };
}

BattlePainter.prototype.addEnemyDamage = function(row, column, damage, type = "normal") {
    this.damages["enemy"][row][column].push({
        damage: damage,
        type: type
    });
}

BattlePainter.prototype.addAllyDamage = function(row, column, damage, type = "normal") {
    this.damages["ally"][row][column].push({
        damage: damage,
        type: type
    });
}

BattlePainter.prototype.moveToFrontOfEnemyField = function(row, column, newColumn) {
    if (this.states["ally"][row][column]) {
        this.states["ally"][row][column].row = 2;
        this.states["ally"][row][column].column = 2-newColumn;
    }
}

BattlePainter.prototype.moveToFrontOfAllyField = function(row, column, newColumn) {
    if (this.states["enemy"][row][column]) {
        this.states["enemy"][row][column].row = 3;
        this.states["enemy"][row][column].column = newColumn;
    }
}

function convertCoordinate(row, column) {
    var OFFSET_X = -50;
    var OFFSET_Y = 40;
    return {
        x: OFFSET_X + 102*row + 137*column,
        y: OFFSET_Y + 65*row - 37*column
    }
}

BattlePainter.prototype.draw = function(callback) {

    var queue = [];
    var readQueue = [];
    var statusAppear = [];
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) {
            if (this.states["enemy"][i][j]) {
                var unit = this.states["enemy"][i][j].unit;
                var state = this.states["enemy"][i][j].state;
                var spriteUrl = this.bot.urlHelper.getSpriteImageURL(unit, true, state);
                var spriteFileName = "images/enemy/" + this.bot.urlHelper.getSpriteImageName(unit, state);
                readQueue.push(spriteFileName);
                queue.push({
                    fileToDownload: spriteUrl,   fileToSave: spriteFileName
                });
                var thumbnailUrl = this.bot.urlHelper.getIllustURL(unit, "thumbnail");
                var thumbnailFileName = "images/thumbnail/" + unit.characterId + ".png";
                readQueue.push(thumbnailFileName);
                queue.push({
                    fileToDownload: thumbnailUrl,   fileToSave: thumbnailFileName
                });
                for(key in unit.status) statusAppear[key] = true;
            }

            if (this.states["ally"][i][j]) {
                unit = this.states["ally"][i][j].unit;
                state = this.states["ally"][i][j].state;
                spriteUrl = this.bot.urlHelper.getSpriteImageURL(unit, false, state);
                spriteFileName = "images/ally/" + this.bot.urlHelper.getSpriteImageName(unit, state);
                readQueue.push(spriteFileName);
                queue.push({
                    fileToDownload: spriteUrl,   fileToSave: spriteFileName
                });
                var thumbnailUrl = this.bot.urlHelper.getIllustURL(unit, "thumbnail");
                var thumbnailFileName = "images/thumbnail/" + unit.characterId + ".png";
                readQueue.push(thumbnailFileName);
                queue.push({
                    fileToDownload: thumbnailUrl,   fileToSave: thumbnailFileName
                });
                for(key in unit.status) statusAppear[key] = true;
            }
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
        // var backgroundFileName = "images/misc/background/valentine_forest.jpg";
        readQueue.push(backgroundFileName);

        var effectFileName = null;
        if (that.skillNameToAnimate) {
            effectFileName = "images/misc/skill_animation/" + that.skillNameToAnimate + ".png";
            readQueue.push(effectFileName);
        }

        var enemyPanelFileName = "images/misc/battle_status_enemy_base.png";
        readQueue.push(enemyPanelFileName);
        var allyPanelFileName = "images/misc/battle_status_ally_base.png";
        readQueue.push(allyPanelFileName);
        var enemyUnitPanelFileName = "images/misc/battle_status_enemy_chara_base.png";
        readQueue.push(enemyUnitPanelFileName);
        var allyUnitPanelFileName = "images/misc/battle_status_ally_chara_base.png";
        readQueue.push(allyUnitPanelFileName);

        var hpBarFileName = "images/misc/hp_bar.png";
        readQueue.push(hpBarFileName);
        var koFileName = "images/misc/ko.png";
        readQueue.push(koFileName);

        for(key in statusAppear) {
            var statusFileName = "images/misc/status/"+key+".png";
            readQueue.push(statusFileName);
        }
        that.bot.imageHelper.read(readQueue, function (err, imageList) {
            if (err) {
                message.reply("Error happened. Try again.");
                that.bot.log(err);
                return;
            }

            var background = imageList[backgroundFileName];
            var shadow = that.bot.imageManager.getShadow();
            var effect = (effectFileName?imageList[effectFileName]:null);

            // enemy
            for(var i=1;i>=0;i--) {
                for(var j=0;j<3;j++) {
                    if (that.states["enemy"][i][j]) {
                        var unit = that.states["enemy"][i][j].unit;
                        var state = that.states["enemy"][i][j].state;
                        var spriteFileName = "images/enemy/" + that.bot.urlHelper.getSpriteImageName(unit, state);
                        var frameNo = that.states["enemy"][i][j].frame;
                        var coord = convertCoordinate(that.states["enemy"][i][j].row, that.states["enemy"][i][j].column);

                        imageList[spriteFileName].crop((frameNo%5) * 360, Math.floor(frameNo/5) * 270, 360, 270);
                        background
                            .composite(shadow, coord.x + 110, coord.y + 160)
                            .composite(imageList[spriteFileName], coord.x, coord.y);
                    }
                }
            }

            // ally
            for(var i=0;i<2;i++) {
                for(var j=2;j>=0;j--) {
                    if (that.states["ally"][i][j]) {
                        var unit = that.states["ally"][i][j].unit;
                        var state = that.states["ally"][i][j].state;
                        var spriteFileName = "images/ally/" + that.bot.urlHelper.getSpriteImageName(unit, state);
                        var frameNo = that.states["ally"][i][j].frame;
                        var coord = convertCoordinate(that.states["ally"][i][j].row, that.states["ally"][i][j].column);

                        if (imageList[spriteFileName]) {
                                imageList[spriteFileName].crop((frameNo%5) * 360, Math.floor(frameNo/5) * 270, 360, 270);
                                background
                                    .composite(shadow, coord.x + 110, coord.y + 160)
                                    .composite(imageList[spriteFileName], coord.x, coord.y);    
                        }
                    }
                }
            }

            if (effect) {
                effect.opacity(that.opacity);
                var coord = convertCoordinate(that.focusPointRow, that.focusPointColumn);
                background.composite(effect, that.offsetX + coord.x, that.offsetY + coord.y);
            }

            // draw damage
            // enemy
            ["enemy", "ally"].forEach(function(side, index) {
                for(var i=1;i>=0;i--) {
                    for(var j=0;j<3;j++) {
                        for(var k=0;k<that.damages[side][i][j].length;k++) {
                            var damage = that.damages[side][i][j][k].damage;
                            var type = that.damages[side][i][j][k].type;

                            var coord = convertCoordinate(that.states[side][i][j].row, that.states[side][i][j].column);

                            var DAMAGE_OFFSET_X = 140;
                            var DAMAGE_OFFSET_y = 0;
                            if (type != "miss") {
                                if (damage > 0) {
                                    var digitList = [];
                                    while (damage > 0) {
                                        digitList.push(damage%10);
                                        damage = Math.floor(damage/10);
                                    }

                                    for(var l=digitList.length-1;l>=0;l--) {
                                        var digit = digitList[l];
                                        var digitImage = that.bot.imageManager.getDamage(type, digit);
                                        background.composite(digitImage, coord.x + DAMAGE_OFFSET_X, DAMAGE_OFFSET_y + coord.y + k*20);
                                        coord.x += 20;
                                    }
                                } else {
                                    var digitImage = that.bot.imageManager.getDamage(type, 0);
                                    background.composite(digitImage, coord.x + DAMAGE_OFFSET_X, DAMAGE_OFFSET_y + coord.y + k*20);
                                }
                            } else {
                                var digitImage = that.bot.imageManager.getDamage(type, digit);
                                background.composite(digitImage, coord.x + DAMAGE_OFFSET_X, DAMAGE_OFFSET_y + coord.y + k*20);
                            }
                        }
                    }
                }
            });

            const PANEL_PADDING = 10;
            const enemyPanelCoordX = PANEL_PADDING;
            const enemyPanelCoordY = 462 - PANEL_PADDING;
            const allyPanelCoordX = 632 - PANEL_PADDING;
            const allyPanelCoordY = PANEL_PADDING;

            background
                .composite(imageList[enemyPanelFileName], enemyPanelCoordX, enemyPanelCoordY)
                .composite(imageList[allyPanelFileName], allyPanelCoordX, allyPanelCoordY);
            
            const UNIT_PANEL_WIDTH = 104;
            const UNIT_PANEL_HEIGHT = 50;                
            const PANEL_INNER_TOP = 29;
            const PANEL_INNER_LEFT = 5;

            Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(function (font) {

                background.print(font, enemyPanelCoordX + 5, enemyPanelCoordY + 5, "TRAINER");
                background.print(font, allyPanelCoordX + 250, allyPanelCoordY + 5, "PLAYER");
                
                for(var i=0;i<2;i++) {
                    for(var j=0;j<3;j++) {
                        var allyUnitPanelCoordX = allyPanelCoordX + PANEL_INNER_LEFT + j*UNIT_PANEL_WIDTH;
                        var allyUnitPanelCoordY = allyPanelCoordY + PANEL_INNER_TOP + i*UNIT_PANEL_HEIGHT;
                        background.composite(imageList[allyUnitPanelFileName], allyUnitPanelCoordX, allyUnitPanelCoordY);
                        if (that.states["ally"][i][j]) {
                            var unit = that.states["ally"][i][j].unit;
                            var user = that.bot.userManager.getUser(unit.playerId);
                            var thumbnailFileName = "images/thumbnail/" + unit.characterId + ".png";
                            background.composite(imageList[thumbnailFileName], allyUnitPanelCoordX + 2, allyUnitPanelCoordY)
                            background.print(font, allyUnitPanelCoordX + 44, allyUnitPanelCoordY + 2, that.bot.functionHelper.trimIfLong(user.username, 4));
                            var cloneHpBar = imageList[hpBarFileName].clone();
                            var percentHP = unit.getCurrentHP() / unit.getMaxHP();
                            cloneHpBar.crop(0,0,percentHP*cloneHpBar.bitmap.width,cloneHpBar.bitmap.height);
                            background.composite(cloneHpBar, allyUnitPanelCoordX + 44, allyUnitPanelCoordY + 39);

                            var statusCount = 0;
                            for(key in unit.status) {
                                if (unit.status[key]) {
                                    var statusName = key;
                                    var statusFileName = "images/misc/status/" + statusName + ".png";
                                    var statusImage = imageList[statusFileName];
                                    if (statusImage) {
                                        background.composite(statusImage, allyUnitPanelCoordX + 44 + statusCount*17, allyUnitPanelCoordY + 22);                                
                                        statusCount++;
                                        if (statusCount > 2) break;    
                                    }
                                }
                            }

                            if (unit.isFainted()) {
                                background.composite(imageList[koFileName], allyUnitPanelCoordX + 5, allyUnitPanelCoordY + 5);
                            }
                        }
                    }
                }
                for(var i=0;i<2;i++) {
                    for(var j=0;j<3;j++) {
                        var enemyUnitPanelCoordX = enemyPanelCoordX + PANEL_INNER_LEFT + j*UNIT_PANEL_WIDTH;
                        var enemyUnitPanelCoordY = enemyPanelCoordY + PANEL_INNER_TOP + i*UNIT_PANEL_HEIGHT;
                        background.composite(imageList[enemyUnitPanelFileName], enemyUnitPanelCoordX, enemyUnitPanelCoordY)
                        
                        if (that.states["enemy"][1-i][2-j]) {
                            var unit = that.states["enemy"][1-i][2-j].unit;
                            var user = that.bot.userManager.getUser(unit.playerId);
                            var thumbnailFileName = "images/thumbnail/" + unit.characterId + ".png";
                            background.composite(imageList[thumbnailFileName], enemyUnitPanelCoordX + 2, enemyUnitPanelCoordY)
                            background.print(font, enemyUnitPanelCoordX + 44, enemyUnitPanelCoordY + 2, that.bot.functionHelper.trimIfLong(user.username, 4));
                            var cloneHpBar = imageList[hpBarFileName].clone();
                            var percentHP = unit.getCurrentHP() / unit.getMaxHP();
                            cloneHpBar.crop(0,0,percentHP*cloneHpBar.bitmap.width,cloneHpBar.bitmap.height);
                            background.composite(cloneHpBar, enemyUnitPanelCoordX + 44, enemyUnitPanelCoordY + 39);
                            
                            var statusCount = 0;
                            for(key in unit.status) {
                                if (unit.status[key]) {
                                    var statusName = key;
                                    var statusFileName = "images/misc/status/" + statusName + ".png";
                                    if (imageList[statusFileName]) {
                                        background.composite(imageList[statusFileName], enemyUnitPanelCoordX + 44 + statusCount*17, enemyUnitPanelCoordY + 22);                                
                                        statusCount++;
                                    }
                                }
                            }

                            if (unit.isFainted()) {
                                background.composite(imageList[koFileName], enemyUnitPanelCoordX + 5, enemyUnitPanelCoordY + 5);
                            }
                        }
                    }
                }

                callback(background);
            });
        });
    });
}

module.exports = BattlePainter;