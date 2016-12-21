var Employee = require('../classes/Employee');

function UnitManager(bot) {
    this.playerUnits = {};
    this.mobUnits = {};
    this.bot = bot;
}

UnitManager.prototype.createUnitForPlayer = function(player) {
    if (!player) return null;
    if (!this.playerUnits[player._id]) {
        var employeeInfo = this.bot.employeeDatabase.getEmployeeById(player.characterId)
        var employee = new Employee(employeeInfo);
        employee.setExp(player.exp);
        employee.position = player.position;

        if (player.equipedWeapon) {
            var weapon = this.bot.weaponDatabase.getWeaponById(player.equipedWeapon._id);
            employee.weapon = weapon.stats["+" + player.equipedWeapon.plus];
        }

        if (player.equipedArmor) {
            var armor = this.bot.armorDatabase.getArmorById(player.equipedArmor._id);
            employee.armor = armor.stats["+" + player.equipedArmor.plus];
            employee.element = armor.element;
        }

        if (player.equipedAccessory) {
            var accessory = this.bot.accessoryDatabase.getAccessoryById(player.equipedAccessory._id);
            employee.accessory = accessory.stats["+" + player.equipedAccessory.plus];
        }

        this.playerUnits[player._id] = employee;    
    }
    return this.playerUnits[player._id];
}

UnitManager.prototype.setWeapon = function(userId, weaponId, plus) {
    var weapon = this.bot.weaponDatabase.getWeaponById(weaponId);
    if (weapon && this.playerUnits[userId]) {
        this.playerUnits[userId].weapon = weapon.stats["+" + plus];
    }
}

UnitManager.prototype.setArmor = function(userId, armorId, plus) {
    var armor = this.bot.armorDatabase.getArmorById(armorId);
    if (armor && this.playerUnits[userId]) {
        this.playerUnits[userId].armor = armor.stats["+" + plus];
        this.playerUnits[userId].element = armor.element;
    }
}

UnitManager.prototype.setAccessory = function(userId, accessoryId, plus) {
    var accessory = this.bot.accessoryDatabase.getAccessoryById(accessoryId);
    if (accessory && this.playerUnits[userId]) {
        this.playerUnits[userId].accessory = accessory.stats["+" + plus];
    }
}

module.exports = new UnitManager();