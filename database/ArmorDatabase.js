var armorDict = require('./ArmorList');

function ArmorDatabase() {
    this.armorDict = armorDict;
}

function hasName(armor, name) {
    var lowerCaseName = name.toLowerCase();
    if (armor.name.toLowerCase() == lowerCaseName) return true;
    for(var i=0;i<armor.commonNames.length;i++) {
        if (armor.commonNames[i].toLowerCase() == lowerCaseName) return true;
    }
    return false;
}

ArmorDatabase.prototype.getArmorByName = function(name) {
    for(key in this.armorDict) {
        var armorList = this.armorDict[key];
        for(var i=0;i<armorList.length;i++) {
            if (hasName(armorList[i], name)) return armorList[i];
        }
    }
    
    return null;
}

ArmorDatabase.prototype.getArmorByCodeName = function(codeName, classId) {
    var lowerCaseCodeName = codeName.toLowerCase();
    var armorList = this.armorDict[lowerCaseCodeName];
    if (typeof armorList === "undefined") return null;

    for(var i=0;i<armorList.length;i++) {
        if (codeName != "ca") {
            if (armorList[i].classId == classId) {
                return armorList[i];
            }    
        } else {
            if (armorList[i].characterId == classId) {
                return armorList[i];
            }
        }
    }
    return null;
}

ArmorDatabase.prototype.getArmorById = function(id) {
    for(key in this.armorDict) {
        var armorList = this.armorDict[key];
        for(var i=0;i<armorList.length;i++) {
            if (armorList[i]._id == id) return armorList[i];
        }
    }
    return null;
}

ArmorDatabase.prototype.getCodeNameForArmor = function(id) {
    for(key in this.armorDict) {
        var armorList = this.armorDict[key];
        for(var i=0;i<armorList.length;i++) {
            if (armorList[i]._id === id) return key;
        }
    }
    return null;
}

module.exports = new ArmorDatabase();