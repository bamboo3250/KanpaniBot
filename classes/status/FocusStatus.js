function FocusStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = false;
}

FocusStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Focus"] === this) unit.status["Focus"] = null;    
}

FocusStatus.prototype.toString = function() {
    return "[Focus]";
}

module.exports = FocusStatus;