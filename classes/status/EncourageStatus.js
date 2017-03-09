function EncourageStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = false;
}

EncourageStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Encourage"] === this) unit.status["Encourage"] = null;    
}

EncourageStatus.prototype.toString = function() {
    return "[Encourage]";
}

module.exports = EncourageStatus;