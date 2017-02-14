function PAtkDownStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = true;
    
    var that = this;
    var INTERVAL = 10*60*1000;
    var now = new Date();
    that.endTime = now.valueOf() + INTERVAL;

    that.timer = setTimeout(function(){
        var targetUnit = that.bot.playerManager.getPlayerUnit(that.targetId);
        var targetUser = that.bot.userManager.getUser(that.targetId);
        
        var targetName = targetUnit.shortName;
        if (targetUser) targetName += " (" + targetUser.username + ")";
        
        if (!targetUnit.isFainted()) {
            var text = "Patk Down has expired on " + targetName + ".";
            that.bot.battleChannel.sendMessage(text);
        }
        that.destroy();
    }, INTERVAL);
}

PAtkDownStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Patk Down"] === this) unit.status["Patk Down"] = null;    
    if (this.timer) clearTimeout(this.timer);
}

PAtkDownStatus.prototype.toString = function() {
    var now = new Date();
    var time = this.bot.functionHelper.parseTime(this.endTime - now.valueOf());
    return "[Patk Down (" + time + ")]";
}

module.exports = PAtkDownStatus;