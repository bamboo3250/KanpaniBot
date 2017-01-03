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
    this.bot = bot;
}

BattlePainter.prototype.setEnemyState = function(row, column, unit, state = "idle", frame = 0) {
    this.states["enemy"][row][column] = {
        unit: unit,
        state: state,
        frame: frame,
        row: 1-row,
        column: column
    };
}

BattlePainter.prototype.setAllyState = function(row, column, unit, state = "idle", frame = 0) {
    this.states["ally"][row][column] = {
        unit: unit,
        state: state,
        frame: frame,
        row: 4+row,
        column: 2-column
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
        this.states["ally"][row][column].column = newColumn;
    }
}

BattlePainter.prototype.moveToFrontOfAllyField = function(row, column, newColumn) {
    if (this.states["enemy"][row][column]) {
        this.states["enemy"][row][column].row = 3;
        this.states["enemy"][row][column].column = 2-newColumn;
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
        readQueue.push(backgroundFileName)
        console.log(readQueue);
        that.bot.imageHelper.read(readQueue, function (err, imageList) {
            if (err) {
                message.reply("Error happened. Try again.");
                that.bot.log(err);
                return;
            }

            var background = imageList[backgroundFileName];
            var shadow = that.bot.imageManager.getShadow();

            var OFFSET_X = 175;
            var OFFSET_Y = -40;

            console.log(that.states);
            // enemy
            for(var i=1;i>=0;i--) {
                for(var j=0;j<3;j++) {
                    if (that.states["enemy"][i][j]) {
                        var unit = that.states["enemy"][i][j].unit;
                        var state = that.states["enemy"][i][j].state;
                        var spriteFileName = "images/enemy/" + that.bot.urlHelper.getSpriteImageName(unit, state);
                        var frameNo = that.states["enemy"][i][j].frame;
                        var posX = OFFSET_X + 102*(that.states["enemy"][i][j].row) - 137*(that.states["enemy"][i][j].column);
                        var posY = OFFSET_Y + 65*(that.states["enemy"][i][j].row) + 37*(that.states["enemy"][i][j].column);
                        
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
                    if (that.states["ally"][i][j]) {
                        var unit = that.states["ally"][i][j].unit;
                        var state = that.states["ally"][i][j].state;
                        var spriteFileName = "images/ally/" + that.bot.urlHelper.getSpriteImageName(unit, state);
                        var frameNo = that.states["ally"][i][j].frame;
                        var posX = OFFSET_X + 102*(that.states["ally"][i][j].row) - 137*(that.states["ally"][i][j].column);
                        var posY = OFFSET_Y + 65*(that.states["ally"][i][j].row) + 37*(that.states["ally"][i][j].column);
                        
                        imageList[spriteFileName].crop((frameNo%5) * 360, Math.floor(frameNo/5) * 270, 360, 270);
                        background
                            .composite(shadow, posX + 110, posY + 160)
                            .composite(imageList[spriteFileName], posX, posY);
                    }
                }
            }            

            // draw damage
            // enemy
            for(var i=1;i>=0;i--) {
                for(var j=0;j<3;j++) {
                    for(var k=0;k<that.damages["enemy"][i][j].length;k++) {
                        var damage = that.damages["enemy"][i][j][k].damage;
                        var type = that.damages["enemy"][i][j][k].type;

                        var posX = OFFSET_X + 102*(that.states["enemy"][i][j].row) - 137*(that.states["enemy"][i][j].column);
                        var posY = OFFSET_Y + 65*(that.states["enemy"][i][j].row) + 37*(that.states["enemy"][i][j].column);
                        
                        if (type != "miss") {
                            if (damage > 0) {
                                while (damage > 0) {
                                    var digit = damage % 10;
                                    var digitImage = that.bot.imageManager.getDamage(type, digit);
                                    background.composite(digitImage, posX + 190, posY + k*20);
                                    damage = Math.floor(damage/10);
                                    posX -= 20;
                                }    
                            } else {
                                var digitImage = that.bot.imageManager.getDamage(type, 0);
                                background.composite(digitImage, posX + 190, posY + k*20);
                            }
                        } else {
                            var digitImage = that.bot.imageManager.getDamage(type, digit);
                            background.composite(digitImage, posX + 190, posY + k*20);
                        }
                    }
                }
            }

            // ally
            for(var i=0;i<2;i++) {
                for(var j=2;j>=0;j--) {
                    for(var k=0;k<that.damages["ally"][i][j].length;k++) {
                        var damage = that.damages["ally"][i][j][k].damage;
                        var type = that.damages["ally"][i][j][k].type;

                        var posX = OFFSET_X + 102*(that.states["ally"][i][j].row) - 137*(that.states["ally"][i][j].column);
                        var posY = OFFSET_Y + 65*(that.states["ally"][i][j].row) + 37*(that.states["ally"][i][j].column);
                        
                        if (type != "miss") {
                            if (damage > 0) {
                                while (damage > 0) {
                                    var digit = damage % 10;
                                    var digitImage = that.bot.imageManager.getDamage(type, digit);
                                    background.composite(digitImage, posX + 190, posY + k*20);
                                    damage = Math.floor(damage/10);
                                    posX -= 20;
                                }    
                            } else {
                                var digitImage = that.bot.imageManager.getDamage(type, 0);
                                background.composite(digitImage, posX + 190, posY + k*20);
                            } 
                        } else {
                            var digitImage = that.bot.imageManager.getDamage(type, digit);
                            background.composite(digitImage, posX + 190, posY + k*20);
                        }
                    }
                }
            }            

            callback(background);
        });
    });
}

module.exports = BattlePainter;