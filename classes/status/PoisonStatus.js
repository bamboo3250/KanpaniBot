function PoisonStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.counter = 10;
    this.canBeCleansed = true;
    
    var that = this;
    var INTERVAL = 60*1000;
    that.timer = setInterval(function(){
        var targetUnit = that.bot.playerManager.getPlayerUnit(that.targetId);
        var targetUser = that.bot.userManager.getUser(that.targetId);
        var attackerUnit = that.bot.playerManager.getPlayerUnit(that.ownerId);
        var attackerUser = that.bot.userManager.getUser(that.ownerId);
        
        if (!targetUnit.isFainted()) {
            var damage = Math.min(200, Math.ceil(targetUnit.getMaxHP() * 0.06));
            
            var prevHP = targetUnit.getCurrentHP();
            var isKoed = that.bot.playerManager.takeDamagePlayerUnit(targetId, damage);
            var exp = (prevHP - targetUnit.getCurrentHP()) * 2;

            var targetName = targetUnit.shortName;
            if (targetUser) targetName += " (" + targetUser.username + ")";
            var attackerName = attackerUnit.shortName;
            if (attackerUser) attackerName += " (" + attackerUser.username + ")";

            that.counter--;
            if (!attackerUnit.isTrainer) {
                // var text = targetName + " took " + damage + " damage from Poison. (" + that.counter + ")\n";
                // text += attackerName + " gained " + exp + " exp.\n";    
                that.bot.playerManager.addExp(that.ownerId, exp);
                that.bot.playerManager.refreshUnitForPlayerId(that.ownerId);
                // attackerUser.sendMessage(text);
            }

            if (isKoed) {
                that.bot.postKoImage(that.ownerId, [that.targetId]);
                var text = targetName + " is KO-ed by poison from " + attackerUser.username + "!\n";
                that.bot.battleChannel.sendMessage(text);
                bot.userManager.addRole(that.targetId, "Fainted");
            }

            if (that.counter === 0 || isKoed) that.destroy();
            
        } else {
            that.destroy();
        }
        
    }, INTERVAL);
}

PoisonStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Poison"] === this) unit.status["Poison"] = null;    
    if (this.timer) clearInterval(this.timer);
}

PoisonStatus.prototype.toString = function() {
    return "[Poison (" + this.counter + ")]";
}

module.exports = PoisonStatus;