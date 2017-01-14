function StunStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
}

StunStatus.prototype.destroy = function() {
    var unit = this.bot.unitManager.getPlayerUnit(this.targetId);
    if (unit.status["Stun"] === this) {
        unit.status["Stun"] = null;    
    }
}

module.exports = StunStatus;