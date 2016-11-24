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
    var player = this.playerDict[userId];
    if (typeof player === "undefined") return null;
    return player;
}

PlayerManager.prototype.spendItem = function(userId, itemName, amount = 1) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (amount <= 0) return;
    if (typeof player.materialList[itemName] === "undefined") return;
    
    player.materialList[itemName] -= amount;
    if (player.materialList[itemName] == 0) {
        delete player.materialList[itemName];
    }
}

module.exports = new PlayerManager();