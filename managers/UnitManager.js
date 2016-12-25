var Employee = require('../classes/Employee');
var Weapon = require('../classes/Weapon');
var Armor = require('../classes/Armor');
var Accessory = require('../classes/Accessory');

function UnitManager(bot) {
    this.playerUnits = {};
    this.mobUnits = {};
    this.bot = bot;
}

UnitManager.prototype.createUnitForPlayer = function(player) {
    if (!player) return null;
    if (!this.playerUnits[player._id]) {
        var employeeInfo = this.bot.employeeDatabase.getEmployeeById(player.characterId)
        this.playerUnits[player._id] = new Employee(employeeInfo);
        this.refreshUnitForPlayer(player);
        this.playerUnits[player._id].fullHeal();
    }
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

module.exports = new UnitManager();