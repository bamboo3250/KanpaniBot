function FocusStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.power = 0;
    this.canBeCleansed = false;
    
    var that = this;
    var INTERVAL = 1000;    //1s
    that.counter = 300;

    that.timer = setInterval(function(){
        var targetUnit = that.bot.playerManager.getPlayerUnit(that.targetId);
        var targetUser = that.bot.userManager.getUser(that.targetId);
        
        that.counter--;
        if (!targetUnit.isFainted() && that.counter >= 0) {
            that.power = Math.min(that.power + 1, 250);
        } else {
            if (that.counter < 0) {
                var targetName = targetUnit.shortName;
                if (targetUser) targetName += " (" + targetUser.username + ")";
                
                var text = "Focus has expired on " + targetName + ".";
                that.bot.battleChannel.sendMessage(text);
            }
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
    var now = new Date();
    var time = this.bot.functionHelper.parseTime(this.counter * 1000);
    return "[Focus (" + this.power + "%, " + time + ")]";
}

module.exports = FocusStatus;