function ParalyzeStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = true;
    this.counter = 3;
}

ParalyzeStatus.prototype.evoke = function() {
    this.counter--;
    if (this.counter <= 0) this.destroy();
    return (this.bot.functionHelper.randomInt(100) < 33);
}

ParalyzeStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Paralyze"] === this) {
        unit.status["Paralyze"] = null;    
    }
}

ParalyzeStatus.prototype.toString = function() {
    return "[Paralyze (" + this.counter + ")]";
}

module.exports = ParalyzeStatus;