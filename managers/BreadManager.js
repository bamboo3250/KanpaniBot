var fs = require('fs');

function BreadManager(bot) {
    this.bot = bot;

    this.REPLENISH_TIME = 60*60*1000; // 1 hours
    
    this.startBread = 3;
    this.cappedBread = 5;
    this.bread = {};
    this.breadReceived = {};
    this.total_bread = 0;
    
    this.ingameBread = {};
}

BreadManager.prototype.initBreadIfNeed = function(userId) {
    if (typeof this.bread[userId] === "undefined") {
        this.bread[userId] = this.startBread;
    }
}

BreadManager.prototype.getBread = function(userId) {
    this.initBreadIfNeed(userId);
    return this.bread[userId];
}

BreadManager.prototype.consumeBreadIfEnough = function(userId, amount = 1) {
    if (amount < 1) return true;
    if (this.getBread(userId) < amount) return false;

    this.bread[userId] -= amount;
    this.saveBread();
    return true;
}

BreadManager.prototype.setBread = function(userId, amount = 1) {
    this.bread[userId] = amount;
    return this.bread[userId];
}

BreadManager.prototype.addBread = function(userId, amount = 1) {
    this.initBreadIfNeed(userId);
    this.bread[userId] += amount;
    return this.bread[userId];
}

BreadManager.prototype.isBreadUnderCap = function(userId) {
    return (this.getBread(userId) < this.cappedBread);
}

BreadManager.prototype.setBreadRegeneration = function() {
    var that = this;
    setInterval(function() {
        for(key in that.bread) {
            var userId = key;
            if (that.isBreadUnderCap(userId)) that.addBread(userId);
        }
        that.startBread = Math.min(that.startBread + 1, that.cappedBread);
        that.saveBread();
    }, that.REPLENISH_TIME);
}

const BREAD_FILE_NAME = "bread.json";
BreadManager.prototype.saveBread = function() {
    var textToWrite = JSON.stringify(this.bread, null, 4);
    var that = this;
    fs.writeFile(BREAD_FILE_NAME, textToWrite, function(err) {
        if (err) { 
            that.bot.log('[saveBread]: ' +err); 
            return; 
        }
    }); 
}

BreadManager.prototype.loadBread = function() {
    var that = this;
    fs.readFile(BREAD_FILE_NAME, 'utf8', function (err, data) {
        if (err) { 
            that.bot.log('[loadBread]: ' + err); 
            return; 
        }
        that.bread = JSON.parse(data);
        for(key in that.bread) {
            var userId = key;
            if (that.isBreadUnderCap(userId)) {
                that.bread[userId] = Math.min(that.cappedBread, that.addBread(userId, 3));    
            }
        }
        that.saveBread();
    });
}

////////////// INGAME BREAD ////////////////

BreadManager.prototype.initIngameBreadIfNeed = function(userId) {
    if (typeof this.ingameBread[userId] === 'undefined' || typeof this.ingameBread[userId].setAt === 'undefined') {
        var now = new Date();
        this.ingameBread[userId] = {
            setAt: now.valueOf(),
            breadAtSet: 0,
            currentBread: 0,
            maxBread: 9000,
            regenRate: 80
        }
    }
}

BreadManager.prototype.syncBread = function(userId) {
    this.initIngameBreadIfNeed(userId);
    var breadInfo = this.ingameBread[userId];
    var breadAtSet = breadInfo.breadAtSet;

    var setAtTime = new Date();
    setAtTime.setTime(breadInfo.setAt);
    setAtTime.setUTCSeconds(0, 0);
    setAtTime.setTime(setAtTime.getTime() + 60*1000);

    var now = new Date();
    while((setAtTime.getUTCMinutes() % 3) != 0) setAtTime.setTime(setAtTime.getTime() + 60*1000);
    if (setAtTime.valueOf() < now.valueOf()) {
        breadAtSet = Math.min(breadAtSet + breadInfo.regenRate, breadInfo.maxBread);
    }

    while(setAtTime.valueOf() + 3*60*1000 < now.valueOf()) {
        setAtTime.setTime(setAtTime.getTime() + 3*60*1000);
        breadAtSet = Math.min(breadAtSet + breadInfo.regenRate, breadInfo.maxBread);
    }
    breadInfo.currentBread = breadAtSet;
    breadInfo.breadAtSet = breadAtSet;
    breadInfo.setAt = now.valueOf();
    this.saveIngameBread();
}

BreadManager.prototype.setTimer = function() {
    var now = new Date();
    var nextTick = new Date();
    nextTick.setUTCSeconds(0, 0);
    while((nextTick.getUTCMinutes() % 3) != 0) nextTick.setTime(nextTick.getTime() + 60*1000);
    while(nextTick.valueOf() < now.valueOf()) nextTick.setTime(nextTick.getTime() + 3*60*1000);
    var that = this;
    
    setTimeout(function() {
        for(key in that.ingameBread) {
            var userId = key;
            var breadInfo = that.ingameBread[userId];
            breadInfo.currentBread = Math.min(breadInfo.currentBread + breadInfo.regenRate, breadInfo.maxBread);
            if (breadInfo.currentBread < breadInfo.maxBread && (breadInfo.maxBread - breadInfo.currentBread) <= breadInfo.regenRate) {
                that.bot.sendPM(userId, 'Your bread will be full soon.');
            }
        }
        that.saveIngameBread();
        setTimeout(function() {
            that.setTimer();
        }, 1000);
    }, nextTick.valueOf() - now.valueOf());

}

const INGAME_BREAD_FILE_NAME = "ingameBread.json";
BreadManager.prototype.saveIngameBread = function() {
    var textToWrite = JSON.stringify(this.ingameBread, null, 4);
    var that = this;
    fs.writeFile(INGAME_BREAD_FILE_NAME, textToWrite, function(err) {
        if (err) { 
            that.bot.log('[saveIngameBread]: ' + err); 
            return;
        }
    }); 
}

BreadManager.prototype.loadIngameBread = function() {
    var that = this;
    fs.readFile(INGAME_BREAD_FILE_NAME, 'utf8', function (err, data) {
        if (err) {
            that.bot.log('[loadIngameBread]: ' + err); 
            return; 
        }
        that.ingameBread = JSON.parse(data);
    });
}

module.exports = BreadManager;
