function StunStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = true;
}

StunStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Stun"] === this) {
        unit.status["Stun"] = null;    
    }
}

StunStatus.prototype.toString = function() {
    return "[Stun]";
}

module.exports = StunStatus;