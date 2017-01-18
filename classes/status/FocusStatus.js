function FocusStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.power = 0;
    this.canBeCleansed = false;
    
    var that = this;
    var INTERVAL = 1000;    //1s
    that.timer = setInterval(function(){
        var targetUnit = that.bot.playerManager.getPlayerUnit(that.targetId);
        var targetUser = that.bot.userManager.getUser(that.targetId);
        
        if (!targetUnit.isFainted()) {
            that.power = Math.min(that.power + 1, 250);
        } else {
            that.destroy();
        }
        
    }, INTERVAL);
}

FocusStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Focus"] === this) unit.status["Focus"] = null;    
    if (this.timer) clearInterval(this.timer);
}

FocusStatus.prototype.toString = function() {
    return "[Focus (" + (this.power) + "%)]";
}

module.exports = FocusStatus;