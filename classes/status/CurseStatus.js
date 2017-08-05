function CurseStatus(bot, ownerId, targetId) {
    this.bot = bot;
    this.ownerId = ownerId;
    this.targetId = targetId;
    this.canBeCleansed = true;
    this.counter = 2;
}

CurseStatus.prototype.evoke = function(damage) {
    this.counter--;
    damage = Math.ceil(damage * 0.8);
    
    var targetUnit = this.bot.playerManager.getPlayerUnit(this.targetId);
    var targetUser = this.bot.userManager.getUser(this.targetId);
    var attackerUnit = this.bot.playerManager.getPlayerUnit(this.ownerId);
    var attackerUser = this.bot.userManager.getUser(this.ownerId);

    var prevHP = targetUnit.getCurrentHP();
    var isKO = this.bot.playerManager.takeDamagePlayerUnit(this.targetId, damage);
    var exp = (prevHP - targetUnit.getCurrentHP()) * 2;

    var targetName = targetUnit.shortName;
    if (targetUser) targetName += " (" + targetUser.username + ")";
    var attackerName = attackerUnit.shortName;
    if (attackerUser) attackerName += " (" + attackerUser.username + ")";

    var text = targetName + " took " + damage + " damage from Curse.\n";
    if (!attackerUnit.isTrainer) {
        text += attackerName + " gained " + exp + " exp.\n";    
        this.bot.playerManager.addExp(this.ownerId, exp);
        this.bot.playerManager.refreshUnitForPlayerId(this.ownerId);
    }

    if (isKO) {
        this.bot.postKoImage(this.ownerId, [this.targetId]);
        text += targetName + " is KO-ed by Curse from " + attackerName + "!\n";
        this.bot.userManager.addRole(this.targetId, "Fainted");
    }
    this.bot.battleChannel.send(text);

    if (this.counter <= 0 || isKO) {
        this.destroy();
    }
}

CurseStatus.prototype.destroy = function() {
    var unit = this.bot.playerManager.getPlayerUnit(this.targetId);
    if (unit.status["Curse"] === this) {
        unit.status["Curse"] = null;    
    }
}

CurseStatus.prototype.toString = function() {
    return "[Curse (" + this.counter + ")]";
}

module.exports = CurseStatus;