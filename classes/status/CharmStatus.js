function CharmStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = true;
    this.counter = 2;
}

CharmStatus.prototype.evoke = function() {
    this.counter--;
    if (this.counter <= 0) this.destroy();
}

CharmStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Charm"] === this) {
        unit.status["Charm"] = null;    
    }
}

CharmStatus.prototype.toString = function() {
    return "[Charm (" + this.counter + ")]";
}

module.exports = CharmStatus;