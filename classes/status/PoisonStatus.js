function PoisonStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.counter = 20;

    var that = this;
    var INTERVAL = 60*1000;
    that.timer = setInterval(function(){
        var targetUnit = that.bot.unitManager.getPlayerUnit(that.targetId);
        var targetUser = that.bot.userManager.getUser(that.targetId);
        var attackerUnit = that.bot.unitManager.getPlayerUnit(that.ownerId);
        var attackerUser = that.bot.userManager.getUser(that.ownerId);
        
        if (!targetUnit.isFainted()) {
            var damage = Math.min(200, Math.ceil(targetUnit.getMaxHP() * 0.03));
            
            var prevHP = targetUnit.getCurrentHP();
            var isKoed = that.bot.unitManager.takeDamagePlayerUnit(targetId, damage);
            var exp = (prevHP - targetUnit.getCurrentHP()) * 3;

            var targetName = targetUnit.shortName;
            if (targetUser) targetName += " (" + targetUser.username + ")";
            var attackerName = attackerUnit.shortName;
            if (attackerUser) attackerName += " (" + attackerUser.username + ")";

            that.counter--;
            var text = targetName + " took " + damage + " damage from Poison. (" + that.counter + ")\n";
            text += attackerName + " gained " + exp + " exp.";
            that.bot.battleChannel.sendMessage(text);
            
            if (isKoed) that.bot.postKoImage(that.ownerId, [that.targetId]);
            if (that.counter === 0 || isKoed) {
                clearInterval(that.timer);
                that.destroy();
            }
        }
        
    }, INTERVAL);
}

PoisonStatus.prototype.destroy = function() {
    var unit = this.bot.unitManager.getPlayerUnit(this.targetId);
    if (unit.status["Poison"] === this) {
        unit.status["Poison"] = null;    
    }
}

module.exports = PoisonStatus;