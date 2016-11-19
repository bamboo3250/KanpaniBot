//var questList = require('./QuestList');

function PlayerManager() {
    this.playerDict = {};
}

PlayerManager.prototype.createNewPlayer = function(userId) {
    this.playerDict[userId] = {
        characterId: "",
        exp: 0,
        gold: 0,
        equipedWeapon: null,
        equipedArmor: null,
        equipedAccessory: null,
        materialList: {},
        weaponList: [],
        armorList: [],
        accessoryList: []
    };
    return this.playerDict[userId];
}

PlayerManager.prototype.getPlayer = function(userId) {
    if (typeof this.playerDict[userId] === "undefined") return null;
    return this.playerDict[userId];
}


module.exports = new PlayerManager();