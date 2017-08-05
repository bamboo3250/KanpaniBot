function PDefDownStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = true;
    this.totalAbsorbDamage = 0;

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
            var text = "Pdef Down has expired on " + targetName + ".";
            that.bot.battleChannel.send(text);    
        }
        that.destroy();
    }, INTERVAL);
}

PDefDownStatus.prototype.absorbDamage = function(damage) {
    this.totalAbsorbDamage += damage;
}

PDefDownStatus.prototype.destroy = function() {
    var exp = Math.ceil(this.totalAbsorbDamage/2);

    var attackerUnit = this.bot.playerManager.getPlayerUnit(this.ownerId);
    var attackerUser = this.bot.userManager.getUser(this.ownerId);
    var attackerName = attackerUnit.shortName;
    if (attackerUser) attackerName += " (" + attackerUser.username + ")";

    if (!attackerUnit.isTrainer) {
        var text = attackerName + " gained " + exp + " exp from Pdef Down.\n";    
        this.bot.playerManager.addExp(this.ownerId, exp);
        this.bot.playerManager.refreshUnitForPlayerId(this.ownerId);
        this.bot.battleChannel.send(text);
    }

    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Pdef Down"] === this) unit.status["Pdef Down"] = null;    
    if (this.timer) clearTimeout(this.timer);
}

PDefDownStatus.prototype.toString = function() {
    var now = new Date();
    var time = this.bot.functionHelper.parseTime(this.endTime - now.valueOf());
    return "[Pdef Down (" + time + ")]";
}

module.exports = PDefDownStatus;