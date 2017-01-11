var Employee = require('../classes/Employee');
var Weapon = require('../classes/Weapon');
var Armor = require('../classes/Armor');
var Accessory = require('../classes/Accessory');

function UnitManager() {
    this.playerUnits = {};
    this.mobUnits = {};
    this.bot = null;
}

UnitManager.prototype.createUnitForPlayer = function(player) {
    if (!player) return null;    
    var employeeInfo = this.bot.employeeDatabase.getEmployeeById(player.characterId)
    this.playerUnits[player._id] = new Employee(employeeInfo, player._id);
    if (player.isTrainer) {
        this.playerUnits[player._id].isTrainer = true;
    }
    this.refreshUnitForPlayer(player);
    this.playerUnits[player._id].fullHeal();
    return this.playerUnits[player._id];
}

UnitManager.prototype.refreshUnitForPlayer = function(player) {
    if (!player) return null;
    if (this.playerUnits[player._id]) {
        var employee = this.playerUnits[player._id];
        employee.setExp(player.exp);
        employee.position = player.position;

        if (player.equipedWeapon) this.setWeapon(player._id, player.equipedWeapon._id, player.equipedWeapon.plus);
        if (player.equipedArmor) this.setArmor(player._id, player.equipedArmor._id, player.equipedArmor.plus);
        if (player.equipedAccessory) this.setAccessory(player._id, player.equipedAccessory._id, player.equipedAccessory.plus);
    }
    return this.playerUnits[player._id];
}

UnitManager.prototype.getPlayerUnit = function(userId) {
    if (this.playerUnits[userId]) {
        return this.playerUnits[userId];
    }
    return null;
}

UnitManager.prototype.setWeapon = function(userId, weaponId, plus) {
    var weapon = this.bot.weaponDatabase.getWeaponById(weaponId);
    if (weapon && this.playerUnits[userId]) {
        this.playerUnits[userId].weapon = new Weapon(weapon, plus);
    }
}

UnitManager.prototype.setArmor = function(userId, armorId, plus) {
    var armor = this.bot.armorDatabase.getArmorById(armorId);
    if (armor && this.playerUnits[userId]) {
        this.playerUnits[userId].armor = new Armor(armor, plus);
        this.playerUnits[userId].element = armor.element;
    }
}

UnitManager.prototype.setAccessory = function(userId, accessoryId, plus) {
    var accessory = this.bot.accessoryDatabase.getAccessoryById(accessoryId);
    if (accessory && this.playerUnits[userId]) {
        this.playerUnits[userId].accessory = new Accessory(accessory, plus);
    }
}

UnitManager.prototype.takeDamagePlayerUnit = function(userId, damage) {
    var unit = this.playerUnits[userId];
    if (unit && damage > 0) {
        var prevHP = unit.currentHP;
        unit.currentHP = Math.max(0, unit.currentHP - damage);
        if (prevHP > 0 && unit.getCurrentHP() === 0) {
            this.bot.battleController.didPlayerDie(userId);
        }
        return (unit.getCurrentHP() === 0);
    }
    return false;
}

UnitManager.prototype.healPlayerUnit = function(userId, healHP) {
    var unit = this.playerUnits[userId];
    var prevHP = unit.currentHP;
    if (unit && healHP > 0) {
        unit.currentHP = Math.min(unit.getMaxHP(), unit.currentHP + healHP);
    }
    return unit.currentHP - prevHP;
}

UnitManager.prototype.setRespawn = function(userId) {
    var unit = this.playerUnits[userId];
    var user = this.bot.userManager.getUser(userId);
    if (unit && unit.currentHP === 0) {
        var now = new Date();
        var respawnDuration = (unit.isTrainer ? 4*60*60*1000 : (60 + unit.levelCached*20) * 1000);
        unit.respawnTime = now.valueOf() + respawnDuration;
        
        var that = this;
        setTimeout(function(){
            unit.fullHeal();
            unit.respawnTime = null;
            if (user) {
                that.bot.userManager.removeRole(userId, "Fainted");
                user.sendMessage("Your character has respawned.");
            }
        }, respawnDuration);
    }
}

module.exports = new UnitManager();