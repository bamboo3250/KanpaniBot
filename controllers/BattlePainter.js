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
        readQueue.push(backgroundFileName);
        var effectFileName = null;
        if (that.skillNameToAnimate) {
            effectFileName = "images/misc/skill_animation/" + that.skillNameToAnimate + ".png";
            readQueue.push(effectFileName);
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

                        imageList[spriteFileName].crop((frameNo%5) * 360, Math.floor(frameNo/5) * 270, 360, 270);
                        background
                            .composite(shadow, coord.x + 110, coord.y + 160)
                            .composite(imageList[spriteFileName], coord.x, coord.y);
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

            callback(background);
        });
    });
}

module.exports = BattlePainter;