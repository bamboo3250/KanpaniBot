var weaponDict = require('./WeaponList');

function WeaponDatabase() {
    this.weaponDict = weaponDict;
}

function hasName(weapon, name) {
    var lowerCaseName = name.toLowerCase();
    if (weapon.weaponName.toLowerCase() == lowerCaseName) return true;
    for(var i=0;i<weapon.commonNames.length;i++) {
        if (weapon.commonNames[i].toLowerCase() == lowerCaseName) return true;
    }
    return false;
}

WeaponDatabase.prototype.getWeaponByName = function(name) {
    for(key in this.weaponDict) {
        var weaponList = this.weaponDict[key];
        for(var i=0;i<weaponList.length;i++) {
            if (hasName(weaponList[i], name)) return weaponList[i];
        }
    }
    
    return null;
}

WeaponDatabase.prototype.getWeaponByCodeName = function(codeName, classId) {
    var lowerCaseCodeName = codeName.toLowerCase();
    var weaponList = this.weaponDict[lowerCaseCodeName];
    if (typeof weaponList === "undefined") return null;

    for(var i=0;i<weaponList.length;i++) {
        if (weaponList[i].classId == classId) {
            return weaponList[i];
        }
    }
    return null;
}

module.exports = new WeaponDatabase();