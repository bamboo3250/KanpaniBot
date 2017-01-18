function SneakStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = false;
}

SneakStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Sneak"] === this) unit.status["Sneak"] = null;    
}

SneakStatus.prototype.toString = function() {
    return "[Sneak]";
}

module.exports = SneakStatus;