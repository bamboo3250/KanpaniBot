function ResurrectedStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = false;
}

ResurrectedStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Resurrected"] === this) unit.status["Resurrected"] = null;    
}

ResurrectedStatus.prototype.toString = function() {
    return "[Resurrected]";
}

module.exports = ResurrectedStatus;