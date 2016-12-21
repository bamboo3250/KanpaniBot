function PlayerManager() {
    this.playerDict = {};
}

PlayerManager.prototype.createNewPlayer = function(userId) {
    this.playerDict[userId] = {
        _id: userId,
        characterId: "",
        exp: 0,
        gold: 0,
        equipedWeapon: null,
        equipedArmor: null,
        equipedAccessory: null,
        materialList: {},
        weaponList: {},
        armorList: {},
        accessoryList: {},
        position: "front",
        partnerId: null
    };
    return this.playerDict[userId];
}

PlayerManager.prototype.getPlayer = function(userId) {
    if (!userId) return null;
    var player = this.playerDict[userId];
    if (typeof player === "undefined") return null;
    return player;
}

PlayerManager.prototype.addItem = function(userId, itemName, amount = 1) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (amount <= 0) return;
    if (typeof player.materialList[itemName] === "undefined") {
        player.materialList[itemName] = 0;
    }
    
    player.materialList[itemName] = Math.max(0, player.materialList[itemName] + amount);
}

PlayerManager.prototype.spendItem = function(userId, itemName, amount = 1) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (amount <= 0) return;
    if (typeof player.materialList[itemName] === "undefined") return;
    
    player.materialList[itemName] = Math.max(0, player.materialList[itemName] - amount);
}

PlayerManager.prototype.getItemAmount = function(userId, itemName) {
    var player = this.getPlayer(userId);
    if (!player) return 0;
    if (typeof player.materialList[itemName] === "undefined") return 0;
    return player.materialList[itemName];
}

PlayerManager.prototype.removeWeapon = function(userId, weaponId, plus, amount = 1) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (amount <= 0) return;
    if (typeof player.weaponList[weaponId] === "undefined") return;
    
    player.weaponList[weaponId]["+"+plus] = Math.max(0, player.weaponList[weaponId]["+"+plus] - amount);
}

PlayerManager.prototype.getWeaponAmount = function(userId, weaponId, plus) {
    var player = this.getPlayer(userId);
    if (!player) return 0;
    if (typeof player.weaponList[weaponId] === "undefined") return 0;
    return player.weaponList[weaponId]["+"+plus];
}

PlayerManager.prototype.getArmorAmount = function(userId, armorId, plus) {
    var player = this.getPlayer(userId);
    if (!player) return 0;
    if (typeof player.armorList[armorId] === "undefined") return 0;
    return player.armorList[armorId]["+"+plus];
}

PlayerManager.prototype.getAccessoryAmount = function(userId, accId, plus) {
    var player = this.getPlayer(userId);
    if (!player) return 0;
    if (typeof player.accessoryList[accId] === "undefined") return 0;
    return player.accessoryList[accId]["+"+plus];
}

PlayerManager.prototype.removeArmor = function(userId, armorId, plus, amount = 1) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (amount <= 0) return;
    if (typeof player.armorList[armorId] === "undefined") return;
    
    player.armorList[armorId]["+"+plus] = Math.max(0, player.armorList[armorId]["+"+plus] - amount);
}

PlayerManager.prototype.removeAccessory = function(userId, accessoryId, plus, amount = 1) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (amount <= 0) return;
    if (typeof player.accessoryList[accessoryId] === "undefined") return;
    
    player.accessoryList[accessoryId]["+"+plus] = Math.max(0, player.accessoryList[accessoryId]["+"+plus] - amount);
}

PlayerManager.prototype.addGold = function(userId, amount = 0) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (amount <= 0) return;
    player.gold = player.gold + amount;
}

PlayerManager.prototype.spendGold = function(userId, amount = 0) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (amount <= 0) return;
    player.gold = Math.max(0, player.gold - amount);
}

PlayerManager.prototype.addWeapon = function(userId, weaponId, plus, amount = 1) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (typeof player.weaponList[weaponId] === "undefined") {
        player.weaponList[weaponId] = {
            "+0": 0, "+1": 0, "+2": 0, "+3": 0, "+4": 0, 
        }
    }
    player.weaponList[weaponId]["+" + plus] += amount;
}

PlayerManager.prototype.addArmor = function(userId, armorId, plus, amount = 1) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (typeof player.armorList[armorId] === "undefined") {
        player.armorList[armorId] = {
            "+0": 0, "+1": 0, "+2": 0, "+3": 0, "+4": 0, 
        }
    }
    player.armorList[armorId]["+" + plus] += amount;
}

PlayerManager.prototype.addAccessory = function(userId, accId, plus, amount = 1) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (typeof player.accessoryList[accId] === "undefined") {
        player.accessoryList[accId] = {
            "+0": 0, "+1": 0, "+2": 0, "+3": 0, "+4": 0, 
        }
    }
    player.accessoryList[accId]["+" + plus] += amount;
}

PlayerManager.prototype.equipWeapon = function(userId, weaponId, plus) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (typeof player.weaponList[weaponId] === "undefined") return;
    if (typeof player.weaponList[weaponId]["+" + plus] === "undefined") return;
    if (player.weaponList[weaponId]["+" + plus] <= 0) return;
    
    this.unequipWeapon(userId);
    player.equipedWeapon = {
        _id: weaponId,
        plus: plus
    }
    player.weaponList[weaponId]["+" + plus]--;
}

PlayerManager.prototype.unequipWeapon = function(userId) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (player.equipedWeapon) {
        this.addWeapon(userId, player.equipedWeapon._id, player.equipedWeapon.plus);
        player.equipedWeapon = null;
    }
}

PlayerManager.prototype.equipArmor = function(userId, armorId, plus) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (typeof player.armorList[armorId] === "undefined") return;
    if (typeof player.armorList[armorId]["+" + plus] === "undefined") return;
    if (player.armorList[armorId]["+" + plus] <= 0) return;
    
    this.unequipArmor(userId);
    player.equipedArmor = {
        _id: armorId,
        plus: plus
    }
    player.armorList[armorId]["+" + plus]--;
}

PlayerManager.prototype.unequipArmor = function(userId) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (player.equipedArmor) {
        this.addArmor(userId, player.equipedArmor._id, player.equipedArmor.plus);
        player.equipedArmor = null;
    }
}

PlayerManager.prototype.equipAccessory = function(userId, accId, plus) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (typeof player.accessoryList[accId] === "undefined") return;
    if (typeof player.accessoryList[accId]["+" + plus] === "undefined") return;
    if (player.accessoryList[accId]["+" + plus] <= 0) return;
    
    this.unequipAcccessory(userId);
    player.equipedAccessory = {
        _id: accId,
        plus: plus
    }
    player.accessoryList[accId]["+" + plus]--;
}

PlayerManager.prototype.unequipAcccessory = function(userId) {
    var player = this.getPlayer(userId);
    if (!player) return;
    if (player.equipedAccessory) {
        this.addAccessory(userId, player.equipedAccessory._id, player.equipedAccessory.plus);
        player.equipedAccessory = null;
    }
}

PlayerManager.prototype.setPartner = function(frontPlayerId, backPlayerId) {
    this.unsetPartner(frontPlayerId);
    this.unsetPartner(backPlayerId);
    var frontPlayer = this.getPlayer(frontPlayerId);
    var backPlayer = this.getPlayer(backPlayerId);
    if (!frontPlayer || !backPlayer) return;
    frontPlayer.position = "front";
    frontPlayer.partnerId = backPlayerId;
    backPlayer.position = "back";
    backPlayer.partnerId = frontPlayerId;
}

PlayerManager.prototype.unsetPartner = function(playerId) {
    var player = this.getPlayer(playerId);
    if (!player) return;
    if (!player.partnerId) return;
    var partner = this.getPlayer(player.partnerId);
    player.partnerId = null;
    partner.partnerId = null;
}

module.exports = new PlayerManager();