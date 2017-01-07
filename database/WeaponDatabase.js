var weaponDict = require('./WeaponList');

function WeaponDatabase() {
    this.weaponDict = weaponDict;
}

function hasName(weapon, name) {
    var lowerCaseName = name.toLowerCase();
    if (weapon.name.toLowerCase() == lowerCaseName) return true;
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
        if (codeName != "cw") {
            if (weaponList[i].classId == classId) {
                return weaponList[i];
            }    
        } else {
            if (weaponList[i].characterId == classId) {
                return weaponList[i];
            }
        }
        
    }
    return null;
}

WeaponDatabase.prototype.getWeaponById = function(id) {
    for(key in this.weaponDict) {
        var weaponList = this.weaponDict[key];
        for(var i=0;i<weaponList.length;i++) {
            if (weaponList[i]._id == id) return weaponList[i];
        }
    }
    return null;
}

WeaponDatabase.prototype.getCodeNameForWeapon = function(id) {
    for(key in this.weaponDict) {
        var weaponList = this.weaponDict[key];
        for(var i=0;i<weaponList.length;i++) {
            if (weaponList[i]._id === id) return key;
        }
    }
    return null;
}

module.exports = new WeaponDatabase();