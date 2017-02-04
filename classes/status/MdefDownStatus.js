function MDefDownStatus(bot, ownerId, targetId) {
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
        
        var text = "Mdef Down has expired on " + targetName + ".";
        that.bot.battleChannel.sendMessage(text);
        that.destroy();
    }, INTERVAL);
}

MDefDownStatus.prototype.absorbDamage = function(damage) {
    var exp = Math.ceil(damage/10);

    var attackerUnit = that.bot.playerManager.getPlayerUnit(that.ownerId);
    var attackerUser = that.bot.userManager.getUser(that.ownerId);
    var attackerName = attackerUnit.shortName;
    if (attackerUser) attackerName += " (" + attackerUser.username + ")";

    if (!attackerUnit.isTrainer) {
        var text = attackerName + " gained " + exp + " exp from Mdef Down.\n";    
        this.bot.playerManager.addExp(this.ownerId, exp);
        this.bot.playerManager.refreshUnitForPlayerId(this.ownerId);
        this.bot.battleChannel.sendMessage(text);
    }
}

MDefDownStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Mdef Down"] === this) unit.status["Mdef Down"] = null;    
    if (this.timer) clearInterval(this.timer);
}

MDefDownStatus.prototype.toString = function() {
    var now = new Date();
    var time = this.bot.functionHelper.parseTime(this.endTime - now.valueOf());
    return "[Mdef Down (" + time + ")]";
}

module.exports = MDefDownStatus;