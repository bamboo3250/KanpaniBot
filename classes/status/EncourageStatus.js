function EncourageStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = false;
    
    var that = this;
    var INTERVAL = 10*60*1000;
    that.timer = setTimeout(function(){
        var targetUnit = that.bot.playerManager.getPlayerUnit(that.targetId);
        var targetUser = that.bot.userManager.getUser(that.targetId);
        
        var targetName = targetUnit.shortName;
        if (targetUser) targetName += " (" + targetUser.username + ")";
        
        var text = "Encourage has expired on " + targetName + ".";
        that.bot.battleChannel.sendMessage(text);
        that.destroy();
    }, INTERVAL);
}

EncourageStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Encourage"] === this) unit.status["Encourage"] = null;    
    if (this.timer) clearInterval(this.timer);
}

module.exports = EncourageStatus;