var fs = require('fs');

var Employee = require('../classes/Employee');
var Weapon = require('../classes/Weapon');
var Armor = require('../classes/Armor');
var Accessory = require('../classes/Accessory');

var StunStatus = require('../classes/status/StunStatus');
var PoisonStatus = require('../classes/status/PoisonStatus');
var EncourageStatus = require('../classes/status/EncourageStatus');
var SneakStatus = require('../classes/status/SneakStatus');
var FocusStatus = require('../classes/status/FocusStatus');
var ParalyzeStatus = require('../classes/status/ParalyzeStatus');
var CurseStatus = require('../classes/status/CurseStatus');
var ResurrectedStatus = require('../classes/status/ResurrectedStatus');
var DarknessStatus = require('../classes/status/DarknessStatus');
var PatkDownStatus = require('../classes/status/PatkDownStatus');
var PdefDownStatus = require('../classes/status/PdefDownStatus');
var MatkDownStatus = require('../classes/status/MatkDownStatus');
var MdefDownStatus = require('../classes/status/MdefDownStatus');
var CharmStatus = require('../classes/status/CharmStatus');

function PlayerManager(bot) {
    this.TRAINER_RESPAWN_TIME = 8*60*60*1000;

    this.bot = bot;
    this.playerDict = {};
    this.playerUnits = {};
    this.mobUnits = {};
}

PlayerManager.prototype.createNewPlayer = function(userId) {
    this.playerDict[userId] = {
        _id: userId,
        characterId: "",
        promotion: 0,
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
        partnerId: null,
        ceoPower: false
    };
    return this.playerDict[userId];
}

PlayerManager.prototype.getPlayer = function(userId) {
    if (!userId) return null;
    var player = this.playerDict[userId];
    if (typeof player === "undefined") return null;
    return player;
}

var playerFileName = "player.json";
PlayerManager.prototype.savePlayer = function() {
    var textToWrite = JSON.stringify(this.playerDict, null, 4);
    var that = this;
    fs.writeFile(playerFileName, textToWrite, function(err) {
        if(err) {
            that.bot.log(err);
            return;  
        } 
    }); 
}

PlayerManager.prototype.loadPlayer = function(callback) {
    console.log("loadPlayer")
    var that = this;
    fs.readFile(playerFileName, 'utf8', function (err, data) {
        if (err) { console.log(err); return; }

        try {
            that.playerDict = JSON.parse(data);
        }
        catch (err) {
            that.bot.log(err);
        }

        // migration
        for(key in that.playerDict) {
            var userId = key;
            var player = that.getPlayer(userId);
            player.exp = Math.floor(player.exp);
            
            var characterClassId = player.characterId.substring(2,3);
            if (player.equipedWeapon && characterClassId != player.equipedWeapon._id.substring(3,4)) {
                that.unequipWeapon(userId);
                var user = that.bot.getUser(userId);
                if (user) that.bot.log("Unequip Weapon for " + user.username);
            }
            if (player.equipedArmor && characterClassId != player.equipedArmor._id.substring(3,4)) {
                that.unequipArmor(userId);
                var user = that.bot.getUser(userId);
                if (user) that.bot.log("Unequip Armor for " + user.username);
            }
        }
        that.bot.log("Number of players: " + Object.keys(that.playerDict).length);

        for(key in that.playerDict) {
            var userId = key;
            var player = that.getPlayer(userId);
            that.createUnitForPlayer(player);
        }
        if (typeof callback == "function") callback();
    });
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

PlayerManager.prototype.setExp = function(playerId, setExp) {
    var player = this.getPlayer(playerId);
    if (!player) return;
    player.exp = setExp;
}

PlayerManager.prototype.addExp = function(playerId, gainedExp) {
    var player = this.getPlayer(playerId);
    var unit = this.getPlayerUnit(playerId);
    if (!player || !unit) return;
    player.exp = Math.min(unit.getMaxExp(), player.exp + gainedExp);
}

// UNIT MANAGER

PlayerManager.prototype.createUnitForPlayer = function(player) {
    if (!player) return null;    
    var employeeInfo = this.bot.employeeDatabase.getEmployeeById(player.characterId)
    this.playerUnits[player._id] = new Employee(employeeInfo, player._id);
    if (player.isTrainer) {
        this.playerUnits[player._id].isTrainer = true;
    }
    this.refreshUnitForPlayer(player);
    this.playerUnits[player._id].fullHeal();
    return this.playerUnits[player._id];
}

PlayerManager.prototype.refreshUnitForPlayerId = function(playerId) {
    var player = this.getPlayer(playerId);
    if (player) {
        return this.refreshUnitForPlayer(player);    
    } else return null;
}

PlayerManager.prototype.refreshUnitForPlayer = function(player) {
    if (!player) return null;
    if (this.playerUnits[player._id]) {
        var employee = this.playerUnits[player._id];
        employee.promotion = player.promotion;
        employee.setExp(player.exp);
        employee.position = player.position;

        if (player.equipedWeapon) this.setWeapon(player._id, player.equipedWeapon._id, player.equipedWeapon.plus);
        if (player.equipedArmor) this.setArmor(player._id, player.equipedArmor._id, player.equipedArmor.plus);
        if (player.equipedAccessory) this.setAccessory(player._id, player.equipedAccessory._id, player.equipedAccessory.plus);
    }
    return this.playerUnits[player._id];
}


PlayerManager.prototype.getPlayerUnit = function(userId) {
    if (this.playerUnits[userId]) {
        return this.playerUnits[userId];
    }
    return null;
}

PlayerManager.prototype.setWeapon = function(userId, weaponId, plus) {
    var weapon = this.bot.weaponDatabase.getWeaponById(weaponId);
    if (weapon && this.playerUnits[userId]) {
        this.playerUnits[userId].weapon = new Weapon(weapon, plus);
    }
}

PlayerManager.prototype.setArmor = function(userId, armorId, plus) {
    var armor = this.bot.armorDatabase.getArmorById(armorId);
    if (armor && this.playerUnits[userId]) {
        this.playerUnits[userId].armor = new Armor(armor, plus);
        this.playerUnits[userId].element = armor.element;
    }
}

PlayerManager.prototype.setAccessory = function(userId, accessoryId, plus) {
    var accessory = this.bot.accessoryDatabase.getAccessoryById(accessoryId);
    if (accessory && this.playerUnits[userId]) {
        this.playerUnits[userId].accessory = new Accessory(accessory, plus);
    }
}

PlayerManager.prototype.takeDamagePlayerUnit = function(userId, damage) {
    var unit = this.playerUnits[userId];
    if (unit && damage > 0) {
        var prevHP = unit.currentHP;
        unit.currentHP = Math.max(0, unit.currentHP - damage);
        if (prevHP > 0 && unit.getCurrentHP() === 0) {
            this.bot.battleController.didPlayerDie(userId);
        }
        return (unit.getCurrentHP() <= 0);
    }
    return false;
}

PlayerManager.prototype.healPlayerUnit = function(userId, healHP) {
    var unit = this.playerUnits[userId];
    var prevHP = unit.currentHP;
    if (unit && healHP > 0) {
        unit.currentHP = Math.min(unit.getMaxHP(), unit.currentHP + healHP);
    }
    return unit.currentHP - prevHP;
}

PlayerManager.prototype.setRespawn = function(userId) {
    var unit = this.playerUnits[userId];
    var user = this.bot.userManager.getUser(userId);
    if (unit && unit.currentHP === 0) {
        var now = new Date();
        var respawnDuration = (unit.isTrainer ? this.TRAINER_RESPAWN_TIME : (60 + unit.levelCached*20) * 1000);
        unit.respawnTime = now.valueOf() + respawnDuration;
        
        var that = this;
        setTimeout(function(){
            unit.fullHeal();
            unit.respawnTime = null;
            if (user) {
                that.bot.userManager.removeRole(userId, "Fainted");
                user.sendMessage("Your character has respawned.");
            }
        }, respawnDuration);
    }
}

PlayerManager.prototype.applyStun = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Stun"]) {
        targetUnit.status["Stun"] = new StunStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyPoison = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Poison"]) {
        targetUnit.status["Poison"] = new PoisonStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyEncourage = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Encourage"]) {
        targetUnit.status["Encourage"] = new EncourageStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applySneak = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Sneak"]) {
        targetUnit.status["Sneak"] = new SneakStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyFocus = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Focus"]) {
        targetUnit.status["Focus"] = new FocusStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyParalyze = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Paralyze"]) {
        targetUnit.status["Paralyze"] = new ParalyzeStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyCurse = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Curse"]) {
        targetUnit.status["Curse"] = new CurseStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyResurrected = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Resurrected"]) {
        targetUnit.status["Resurrected"] = new ResurrectedStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyDarkness = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Darkness"]) {
        targetUnit.status["Darkness"] = new DarknessStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyPatkDown = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Patk Down"]) {
        targetUnit.status["Patk Down"] = new PatkDownStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyPdefDown = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Pdef Down"]) {
        targetUnit.status["Pdef Down"] = new PdefDownStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyMatkDown = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Matk Down"]) {
        targetUnit.status["Matk Down"] = new MatkDownStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyMdefDown = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Mdef Down"]) {
        targetUnit.status["Mdef Down"] = new MdefDownStatus(this.bot, fromUserId, toUserId);
    }
}

PlayerManager.prototype.applyCharm = function(fromUserId, toUserId) {
    var targetUnit = this.getPlayerUnit(toUserId);
    if (!targetUnit.status["Charm"]) {
        targetUnit.status["Charm"] = new CharmStatus(this.bot, fromUserId, toUserId);
    }
}

module.exports = PlayerManager;