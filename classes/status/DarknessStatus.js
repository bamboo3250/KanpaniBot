function DarknessStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = true;
    this.counter = 3;
}

DarknessStatus.prototype.evoke = function() {
    this.counter--;
    if (this.counter <= 0) this.destroy();
}

DarknessStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Darkness"] === this) {
        unit.status["Darkness"] = null;    
    }
}

DarknessStatus.prototype.toString = function() {
    return "[Darkness (" + this.counter + ")]";
}

module.exports = DarknessStatus;