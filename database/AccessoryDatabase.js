var accessoryDict = require('./AccessoryList');

function AccessoryDatabase() {
    this.accessoryDict = accessoryDict;
}

function hasName(accessory, name) {
    var lowerCaseName = name.toLowerCase();
    if (accessory.name.toLowerCase() == lowerCaseName) return true;
    for(var i=0;i<accessory.commonNames.length;i++) {
        if (accessory.commonNames[i].toLowerCase() == lowerCaseName) return true;
    }
    return false;
}

AccessoryDatabase.prototype.getAccessoryByName = function(name) {
    for(key in this.accessoryDict) {
        var accessoryList = this.accessoryDict[key];
        for(var i=0;i<accessoryList.length;i++) {
            if (hasName(accessoryList[i], name)) return accessoryList[i];
        }
    }
    
    return null;
}

AccessoryDatabase.prototype.getAccessoryById = function(id) {
    for(key in this.accessoryDict) {
        var accessoryList = this.accessoryDict[key];
        for(var i=0;i<accessoryList.length;i++) {
            if (accessoryList[i]._id == id) return accessoryList[i];
        }
    }
    return null;
}

AccessoryDatabase.prototype.getCodeNameForAccessory = function(id) {
    for(key in this.accessoryDict) {
        var accessoryList = this.accessoryDict[key];
        for(var i=0;i<accessoryList.length;i++) {
            if (accessoryList[i]._id === id) return accessoryList[i].commonNames[0];
        }
    }
    return null;
}

module.exports = new AccessoryDatabase();