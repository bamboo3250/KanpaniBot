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
        weaponList: {},
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
}

PlayerManager.prototype.spendGold = function(userId, amount = 0) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (amount <= 0) return;
    player.gold -= amount;
}

PlayerManager.prototype.addWeapon = function(userId, weaponId, plus) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (typeof player.weaponList[weaponId] === "undefined") {
        player.weaponList[weaponId] = {
            "+0": 0, "+1": 0, "+2": 0, "+3": 0, "+4": 0, 
        }
    }
    player.weaponList[weaponId]["+" + plus]++;
}

PlayerManager.prototype.equipWeapon = function(userId, weaponId, plus) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (typeof player.weaponList[weaponId] === "undefined") return;
    if (typeof player.weaponList[weaponId]["+" + plus] === "undefined") return;
    if (player.weaponList[weaponId]["+" + plus] <= 0) return;
    
    if (player.equipedWeapon) {
        this.addWeapon(userId, player.equipedWeapon._id, player.equipedWeapon.plus);
        player.equipedWeapon = null;
    }

    player.equipedWeapon = {
        _id: weaponId,
        plus: plus
    }
    player.weaponList[weaponId]["+" + plus]--;
}


module.exports = new PlayerManager();