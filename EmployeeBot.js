var Discord = require("discord.js");

var employeeDatabase = require('./database/EmployeeDatabase');
var questDatabase = require('./database/QuestDatabase');
var itemInfoDatabase = require('./database/ItemInfoDatabase');
var weaponDatabase = require('./database/WeaponDatabase');
var armorDatabase = require('./database/ArmorDatabase');
var accessoryDatabase = require('./database/AccessoryDatabase');
var skillDatabase = require('./database/SkillDatabase');

var playerManager = require('./managers/PlayerManager');
var userManager = require('./managers/UserManager');
var backgroundManager = require('./managers/BackgroundManager');
var auctionManager = require('./managers/AuctionManager');
var imageManager = require('./managers/ImageManager');

var imageHelper = require('./helpers/ImageHelper');
var functionHelper = require('./helpers/FunctionHelper');
var urlHelper = require('./helpers/UrlHelper');
var fs = require('fs');
var Jimp = require("jimp");

var dailyCommand = require('./commands/DailyCommand');
var maintenanceCommand = require('./commands/MaintenanceCommand');
var basicGreetingCommand = require('./commands/BasicGreetingCommand');
var specialCommand = require('./commands/SpecialCommand');
var breadCommand = require('./commands/BreadCommand');
var assignRoleCommand = require('./commands/AssignRoleCommand');
var giveBreadCommand = require('./commands/GiveBreadCommand');
var charaCommand = require('./commands/CharaCommand');
var meCommand = require('./commands/MeCommand');
var topCommand = require('./commands/TopCommand');
var myTopCommand = require('./commands/MyTopCommand');
var rollCommand = require('./commands/RollCommand');
var takeCommand = require('./commands/TakeCommand');
var grindCommand = require('./commands/GrindCommand');
var adminCommand = require('./commands/AdminCommand');
var questCommand = require('./commands/QuestCommand');
var inventoryCommand = require('./commands/InventoryCommand');
var sellCommand = require('./commands/SellCommand');
var useCommand = require('./commands/UseCommand');
var craftCommand = require('./commands/CraftCommand');
var inventoryEquipmentCommand = require('./commands/InventoryEquipmentCommand');
var equipCommand = require('./commands/EquipCommand');
var reportCommand = require('./commands/ReportCommand');
var setDailyGiftCommand = require('./commands/SetDailyGiftCommand');
var dailyGiftCommand = require('./commands/DailyGiftCommand');
var effectCommand = require('./commands/EffectCommand');
var toFrontCommand = require('./commands/ToFrontCommand');
var toBackCommand = require('./commands/ToBackCommand');
var itemDropCommand = require('./commands/ItemDropCommand');
var unsubscribeCommand = require('./commands/UnsubscribeCommand');
var retreatCommand = require('./commands/RetreatCommand');
var xmasTreeCommand = require('./commands/XmasTreeCommand');
var weaponCommand = require('./commands/WeaponCommand');
var armorCommand = require('./commands/ArmorCommand');
var accessoryCommand = require('./commands/AccessoryCommand');
var setAuctionCommand = require('./commands/SetAuctionCommand');
var auctionCommand = require('./commands/AuctionCommand');
var bidCommand = require('./commands/BidCommand');
var wakeUpCommand = require('./commands/WakeUpCommand');
var aromaCommand = require('./commands/AromaCommand');
var sellPageCommand = require('./commands/SellPageCommand');
var ceoPowerCommand = require('./commands/CEOPowerCommand');
var kettleCommand = require('./commands/KettleCommand');
var shopCommand = require('./commands/ShopCommand');
var buyCommand = require('./commands/BuyCommand');
var promoteCommand = require('./commands/PromoteCommand');

var attackCommand = require('./commands/AttackCommand');
var healCommand = require('./commands/HealCommand');
var trainerCommand = require('./commands/TrainerCommand');
var joinTrainingCommand = require('./commands/JoinTrainingCommand');
var quitTrainingCommand = require('./commands/QuitTrainingCommand');
var ceoReviveCommand = require('./commands/CeoReviveCommand');
var swapCommand = require('./commands/SwapCommand');
var encourageCommand = require('./commands/EncourageCommand');
var sneakCommand = require('./commands/SneakCommand');
var focusCommand = require('./commands/FocusCommand');

function EmployeeBot() {
    this.token = null;

    this.dmmChannelName = "dmm_games";
    this.nutakuChannelName = "kanpani_girls";
    this.bot = new Discord.Client();
    
    this.employeeDatabase = employeeDatabase;
    this.questDatabase = questDatabase;
    this.itemInfoDatabase = itemInfoDatabase;
    this.weaponDatabase = weaponDatabase;
    this.armorDatabase = armorDatabase;
    this.accessoryDatabase = accessoryDatabase;
    this.skillDatabase = skillDatabase;

    this.imageHelper = imageHelper;
    this.functionHelper = functionHelper;
    this.urlHelper = urlHelper;
    
    this.playerManager = playerManager;
    playerManager.bot = this;
    this.userManager = userManager;
    userManager.bot = this;
    this.backgroundManager = backgroundManager;
    this.auctionManager = auctionManager;
    this.imageManager = imageManager;
    imageManager.bot = this;
    imageManager.init();

    this.battleController = null;

    this.dmmMaintenanceList = [
        {
            name: "DMM KG Maintenance",
            startTime: "Feb 17 2017 14:00:00 GMT+0900",
            endTime: "Feb 17 2017 17:00:00 GMT+0900"
        }
    ];
    this.nutakuDaily = {
        name: "Nutaku KG Daily Draw Reset",
        time: "Oct 20 2016 4:00:00 GMT+0000",
    };
    this.dmmDaily = {
        name: "DMM KG Daily Draw Reset",
        time: "Oct 20 2016 4:00:00 GMT+0900", 
    };
    this.nutakuDailyRemind = "Oct 20 2016 3:45:00 GMT+0000";
    this.dmmDailyRemind = "Oct 20 2016 3:45:00 GMT+0900";
    this.nutakuMaintenanceList = [];
    this.greetings = [];
    this.idleTalks = [];
    this.commonGreetings = [
        "Hi",
        "Hi, how are you?",
        "Hello"
    ];
    this.commonGoodMorning = [
        "Good Morning",
        "Good Morning :sunflower: "
    ];
    this.commonGoodNight = [
        "Good Night",
        "Have a sweet dream",
        "Good Night :crescent_moon: ",
        "Have a sweet dream :crescent_moon: ",
        "See you again"
    ];
    this.commonThanks = [
        "You are welcomed",
        "You are welcomed :heart:",
        "No problem",
    ];
    // this.halloween = [
    //     "Happy Halloween",
    //     "Happy Halloween :jack_o_lantern:",
    //     "Happy Halloween :ghost:",
    //     "Happy Halloween :spider_web:",
    //     "Happy Halloween :bat:",
    //     ":jack_o_lantern:",
    //     ":ghost:",
    //     ":spider_web: ",
    //     ":bat: "
    // ];
    // this.trickortreat = [
    //     "",
    //     "*gives* :candy:",
    //     "*gives* :cookie:",
    //     ":p",
    //     ";p",
    // ];
    
    this.hasNewMessage = false;
    this.lastTimeSayingHi = 0;
    this.lastTimeGoodMorning = 0;
    this.lastTimeGoodNight = 0;
    this.lastTimeThanks = 0;
    this.lastTimeSayingHiToPlayers = {};
    this.lastTimeGoodMorningToPlayers = {};
    this.lastTimeGoodNightToPlayers = {};
    this.lastTimeGiveCandyToPlayers = {};

    this.startBread = 3;
    this.cappedBread = 5;
    this.replenishTime = 60*60*1000; // 1 hours
    this.remainingBread = {};
    this.breadReceived = {};
    this.total_bread = 0;
    this.declineNotEnoughBread = [
        "You don't have enough bread."
    ];

    this.hasSoul = {};
    this.report = {};
    this.dailyGift = {
        item: "",
        quantity: 0,
        playerReceived: {}
    };
    this.pendingPartnerRequest = {};

    this.firstTimeReady = true;
    
    this.freeRoll = {};
    this.rollResult = {};
    this.canUseBreadToRoll = false;

    this.silenced = {}
    this.runQuestStatus = {};
    this.freeMe = {};
    this.mailboxEffect = {};
    this.hammerEffect = {};
    this.forgeEffect = {};
    this.grindEffect = {};
    this.expTicketEffect = {};
    this.unsubscribe = {};
    this.grindId = {};
    this.auctionId = {};
    this.shop = {};

    this.logChannel = null;
    this.battleChannel = null;

    this.disconnectTimer = null;
    // Event stuffs
    // this.christmasTreeContribution = {};
    // this.christmasTreeMilestones = {
    //     "10": {
    //         itemName: "Black Pearl",
    //         amount: 10
    //     },
    //     "50": {
    //         itemName: "Unmelting Ice",
    //         amount: 20
    //     },
    //     "100": {
    //         itemName: "Gold Mailbox",
    //         amount: 1
    //     },
    //     "500": {
    //         itemName: "Weapon Hammer",
    //         amount: 5
    //     },
    //     "1000": {
    //         itemName: "Forge",
    //         amount: 1
    //     },
    //     "3000": {
    //         itemName: "Forge",
    //         amount: 3
    //     }
    // }
    //this.aromaEffect = null;
    //this.aromaTimeout = null;

    // this.aromaRewardList = [
    //     "Gold Ore","Ominous Cloth","Chimera Horn","Luxurious Leather","Full Moon Fragment","Magical Water","Ebony Branch",
    //     "Crystal","Ruby","Onyx","Aquamarine","Topaz","Turquoise",
    //     "Diamond","Rose Quartz","Black Pearl","Lapis Lazuli","Garnet","Emerald",
    //     "Magnificent Silver Coin",
    //     "Gold Ore","Ominous Cloth","Chimera Horn","Luxurious Leather","Full Moon Fragment","Magical Water","Ebony Branch",
    //     "Crystal","Ruby","Onyx","Aquamarine","Topaz","Turquoise",
    //     "Diamond","Rose Quartz","Black Pearl","Lapis Lazuli","Garnet","Emerald",
    //     "Magnificent Silver Coin",
    //     "Gold Ore","Ominous Cloth","Chimera Horn","Luxurious Leather","Full Moon Fragment","Magical Water","Ebony Branch",
    //     "Crystal","Ruby","Onyx","Aquamarine","Topaz","Turquoise",
    //     "Diamond","Rose Quartz","Black Pearl","Lapis Lazuli","Garnet","Emerald",
    //     "Magnificent Silver Coin",
    //     "Gold Ore","Ominous Cloth","Chimera Horn","Luxurious Leather","Full Moon Fragment","Magical Water","Ebony Branch",
    //     "Crystal","Ruby","Onyx","Aquamarine","Topaz","Turquoise",
    //     "Diamond","Rose Quartz","Black Pearl","Lapis Lazuli","Garnet","Emerald",
    //     "Magnificent Silver Coin",
    //     "Gold Ore","Ominous Cloth","Chimera Horn","Luxurious Leather","Full Moon Fragment","Magical Water","Ebony Branch",
    //     "Crystal","Ruby","Onyx","Aquamarine","Topaz","Turquoise",
    //     "Diamond","Rose Quartz","Black Pearl","Lapis Lazuli","Garnet","Emerald",
    //     "Magnificent Silver Coin",
    //     "Gold Ore","Ominous Cloth","Chimera Horn","Luxurious Leather","Full Moon Fragment","Magical Water","Ebony Branch",
    //     "Crystal","Ruby","Onyx","Aquamarine","Topaz","Turquoise",
    //     "Diamond","Rose Quartz","Black Pearl","Lapis Lazuli","Garnet","Emerald",
    //     "Magnificent Silver Coin",
    //     "Gold Ore","Ominous Cloth","Chimera Horn","Luxurious Leather","Full Moon Fragment","Magical Water","Ebony Branch",
    //     "Crystal","Ruby","Onyx","Aquamarine","Topaz","Turquoise",
    //     "Diamond","Rose Quartz","Black Pearl","Lapis Lazuli","Garnet","Emerald",
    //     "Magnificent Silver Coin",
    //     "Gold Ore","Ominous Cloth","Chimera Horn","Luxurious Leather","Full Moon Fragment","Magical Water","Ebony Branch",
    //     "Crystal","Ruby","Onyx","Aquamarine","Topaz","Turquoise",
    //     "Diamond","Rose Quartz","Black Pearl","Lapis Lazuli","Garnet","Emerald",
    //     "Magnificent Silver Coin",
    //     "Weapon Hammer",
    //     "Armor Hammer",
    //     "Accessory Hammer",
    //     "Forge"
    // ];

    // this.aromaLimitReward = {
    //     "Weapon Hammer": 5,
    //     "Armor Hammer": 5,
    //     "Accessory Hammer": 5,
    //     "Forge": 1
    // }
    this.kettle = {
        totalCacao: 0,
        contribution: {},
        chocolate: {}
    };
}

EmployeeBot.prototype.randomArmor = function(classId) {
    return "310" + classId + this.functionHelper.randomObject(["08", "09", "10", "11", "12", "13", "073"]);
}

EmployeeBot.prototype.isPM = function(message) {
    return ((typeof message.guild === "undefined") || message.guild == null);
}

EmployeeBot.prototype.preventPM = function(message) {
    if (this.isPM(message)) {
        message.reply("You can't ask me in Private Message.");
        return true;
    } else return false;
}

EmployeeBot.prototype.checkNoSoul = function(message) {
    var userId = message.author.id;
    if (typeof this.hasSoul[userId] === "undefined") this.hasSoul[userId] = true;
    if (!this.hasSoul[userId]) {
        message.reply("Your Soul has been taken. You can't use bread now.");
        return true;
    }
    return false;
}

EmployeeBot.prototype.isAdmin = function(message) {
    return (message.author.id === "162995652152786944");
}

EmployeeBot.prototype.handleSleepCommand = function(message) {
    if (message.author.id != "162995652152786944") return;
    //message.channel.sendMessage("I'm going to sleep now~");
    //this.bot.destroy();
}

EmployeeBot.prototype.initBreadIfNeed = function(userId) {
    if (typeof this.remainingBread[userId] === "undefined") {
        this.remainingBread[userId] = this.startBread;
    }
}

EmployeeBot.prototype.createRemainingBreadLine = function(message) {
    var userId = message.author.id;
    if (this.isPM(message)) {
        return "Remaining Bread: " + this.remainingBread[userId];
    } else {
        const breadEmoji = message.guild.emojis.find('name', 'kbread');
        return "Remaining Bread: " + breadEmoji + " x" + this.remainingBread[userId];    
    }
}

EmployeeBot.prototype.consumeBread = function(message, amount = 1) {
    var userId = message.author.id;
    this.initBreadIfNeed(userId);
    if (this.checkNoSoul(message)) return false;
    if (message.author.id === "146556639342755840") return true;
    if (amount < 1) return true;
    if (this.remainingBread[userId] >= amount) {
        this.remainingBread[userId] -= amount;
        this.saveBread();
        return true;
    } else {
        message.reply("You don't have enough bread.");
        return false;
    }
}

EmployeeBot.prototype.getItemNameFromAuction = function(auction) {
    var itemName = "";
    if (auction.itemType === "material") {
        var currentItemInfo = this.itemInfoDatabase.getItemInfoById(auction.itemId);
        if (currentItemInfo) {
            itemName = currentItemInfo.itemName;
        } else {
            this.log("[SetAuction] Cannot find item with ID: " + auction.itemId);
        }
    } else if (auction.itemType === "weapon") {
        var currentItemInfo = this.weaponDatabase.getWeaponById(auction.itemId);
        if (currentItemInfo) {
            itemName = currentItemInfo.name + " +" + auction.plus;
        } else {
            this.log("[SetAuction] Cannot find weapon with ID: " + auction.itemId);
        }
    } else if (auction.itemType === "armor") {
        var currentItemInfo = this.armorDatabase.getArmorById(auction.itemId);
        if (currentItemInfo) {
            itemName = currentItemInfo.name + " +" + auction.plus;
        } else {
            this.log("[SetAuction] Cannot find armor with ID: " + auction.itemId);
        }
    } else if (auction.itemType === "accessory") {
        var currentItemInfo = this.accessoryDatabase.getAccessoryById(auction.itemId);
        if (currentItemInfo) {
            itemName = currentItemInfo.name + " +" + auction.plus;
        } else {
            this.log("[SetAuction] Cannot find accessory with ID: " + auction.itemId);
        }
    } else {
        this.log("[SetAuction] Wrong Item Type: " + auction.itemType);
    }
    return itemName;
}

EmployeeBot.prototype.handleCommonCommand = function(message) {
    if (message.author.bot === true) return;
    
    try {
        dailyCommand.handle(message, this);
        maintenanceCommand.handle(message, this);
        basicGreetingCommand.handle(message, this);
        specialCommand.handle(message, this);
        breadCommand.handle(message, this);
        assignRoleCommand.handle(message, this);
        // giveBreadCommand.handle(message, this);
        charaCommand.handle(message, this);
        meCommand.handle(message, this);
        topCommand.handle(message, this);
        myTopCommand.handle(message, this);
        rollCommand.handle(message, this);
        takeCommand.handle(message, this);
        grindCommand.handle(message, this);
        adminCommand.handle(message, this);
        questCommand.handle(message, this);
        inventoryCommand.handle(message, this);
        sellCommand.handle(message, this);
        useCommand.handle(message, this);
        craftCommand.handle(message, this);
        inventoryEquipmentCommand.handle(message, this);
        equipCommand.handle(message, this);
        reportCommand.handle(message, this);
        setDailyGiftCommand.handle(message, this);
        dailyGiftCommand.handle(message, this);
        effectCommand.handle(message, this);
        toFrontCommand.handle(message, this);
        toBackCommand.handle(message, this);
        itemDropCommand.handle(message, this);
        unsubscribeCommand.handle(message, this);
        retreatCommand.handle(message, this);
        // xmasTreeCommand.handle(message, this);
        weaponCommand.handle(message, this);
        armorCommand.handle(message, this);
        accessoryCommand.handle(message, this);
        setAuctionCommand.handle(message, this);
        auctionCommand.handle(message, this);
        bidCommand.handle(message, this);
        wakeUpCommand.handle(message, this);
        aromaCommand.handle(message, this);
        sellPageCommand.handle(message, this);
        ceoPowerCommand.handle(message, this);
        attackCommand.handle(message, this);
        healCommand.handle(message, this);
        trainerCommand.handle(message, this);
        joinTrainingCommand.handle(message, this);
        quitTrainingCommand.handle(message, this);
        ceoReviveCommand.handle(message, this);
        swapCommand.handle(message, this);
        encourageCommand.handle(message, this);
        sneakCommand.handle(message, this);
        focusCommand.handle(message, this);
        kettleCommand.handle(message, this);
        shopCommand.handle(message, this);
        buyCommand.handle(message, this);
        promoteCommand.handle(message, this);
    }
    catch (err) {
        this.log("===========COMMAND ERROR========\n" + err.stack);
    }
}

EmployeeBot.prototype.getRandomMessages = function(messageList) {
    var length = messageList.length;
    if (length > 0) {
        return messageList[Math.floor(Math.random() * length)];    
    }
    return "";
}

EmployeeBot.prototype.sayRandomMessages = function(channel, messageList) {
    var length = messageList.length;
    if (length > 0) {
        var message = this.getRandomMessages(messageList);
        channel.sendMessage(message);    
    }
}

EmployeeBot.prototype.greeting = function(channel) {
    this.sayRandomMessages(channel, this.greetings);
}

EmployeeBot.prototype.setDailyDrawReminderForNutaku = function() {
    var time = this.functionHelper.getTimeUntilDaily(this.nutakuDailyRemind); 
    var that = this;
    setTimeout(function() {
        var channels = that.bot.channels.array();
        for(var i=0;i<channels.length;i++) {
            if (channels[i].type === "text" && channels[i].name === that.nutakuChannelName) {
                var nutakuRole = channels[i].guild.roles.find('name', 'Nutaku');
                channels[i].sendMessage(nutakuRole + "\n**Reminder: 15 minutes until Daily Draw Reset**")
            }
        }
        setTimeout(function(){
            that.setDailyDrawReminderForNutaku();    
        }, 30*1000);
    }, time);
}

EmployeeBot.prototype.setDailyDrawReminderForDmm = function() {
    var time = this.functionHelper.getTimeUntilDaily(this.dmmDailyRemind); 
    var that = this;
    setTimeout(function() {
        var channels = that.bot.channels.array();
        for(var i=0;i<channels.length;i++) {
            if (channels[i].type === "text" && channels[i].name === that.nutakuChannelName) {
                var dmmRole = channels[i].guild.roles.find('name', 'DMM');
                channels[i].sendMessage(dmmRole + "\n**Reminder: 15 minutes until Daily Draw Reset**")
            }
        }
        setTimeout(function(){
            that.setDailyDrawReminderForDmm();
        }, 30*1000);
    }, time);
}

EmployeeBot.prototype.setBreadRegeneration = function() {
    var that = this;
    setTimeout(function() {
        for(key in that.remainingBread) {
            var userId = key;
            that.remainingBread[userId] = Math.min(that.remainingBread[userId] + 1, that.cappedBread);
        }
        that.startBread = Math.min(that.startBread + 1, that.cappedBread);
        that.saveBread();
        that.log("1 bread is given to each player");
        that.setBreadRegeneration();
    }, that.replenishTime);
}

var soulFileName = "soul.json";
EmployeeBot.prototype.saveSoul = function() {
    var textToWrite = JSON.stringify(this.hasSoul, null, 4);
    var that = this;
    fs.writeFile(soulFileName, textToWrite, function(err) {
        if(err) {
            that.log(err);
            return;
        }
    }); 
}

EmployeeBot.prototype.loadSoul = function() {
    var that = this;
    fs.readFile(soulFileName, 'utf8', function (err, data) {
        if (err) {
            that.log(err);
            return;
        }
        that.hasSoul = JSON.parse(data);
    });
}

var silencedFileName = "silenced.json";
EmployeeBot.prototype.saveSilenced = function() {
    var textToWrite = JSON.stringify(this.silenced, null, 4);
    var that = this;
    fs.writeFile(silencedFileName, textToWrite, function(err) {
        if(err) {
            that.log(err);
            return;
        }
        that.log("Saved Silenced");
    }); 
}

EmployeeBot.prototype.loadSilenced = function() {
    var that = this;
    fs.readFile(silencedFileName, 'utf8', function (err, data) {
        if (err) {
            that.log(err);
            return;
        }
        that.silenced = JSON.parse(data);
    });
}

var breadFileName = "bread.json";
EmployeeBot.prototype.saveBread = function() {
    var textToWrite = JSON.stringify(this.remainingBread, null, 4);
    var that = this;
    fs.writeFile(breadFileName, textToWrite, function(err) {
        if(err) {
            that.log(err);
            return;
        }
    }); 
}

EmployeeBot.prototype.loadBread = function() {
    var that = this;
    fs.readFile(breadFileName, 'utf8', function (err, data) {
        if (err) {
            that.log(err);
            return;
        }
        that.remainingBread = JSON.parse(data);
        for(key in that.remainingBread) {
            var userId = key;
            if (that.remainingBread[userId] < that.cappedBread) {
                that.remainingBread[userId] = Math.min(that.cappedBread, that.remainingBread[userId] + 3);    
            }
        }
        that.saveBread();
    });
}

var unsubscribeFileName = "unsubscribe.json";
EmployeeBot.prototype.saveUnsubscribe = function() {
    var textToWrite = JSON.stringify(this.unsubscribe, null, 4);
    var that = this;
    fs.writeFile(unsubscribeFileName, textToWrite, function(err) {
        if(err) {
            that.log(err);
            return;
        }
    }); 
}

EmployeeBot.prototype.loadUnsubscribe = function() {
    var that = this;
    fs.readFile(unsubscribeFileName, 'utf8', function (err, data) {
        if (err) {
            that.log(err);
            return;
        }
        try {
            that.unsubscribe = JSON.parse(data);
        }
        catch (err) {
            that.log(err);
            that.unsubscribe = {};   
        }
    });
}

var playerFileName = "player.json";
EmployeeBot.prototype.savePlayer = function() {
    var textToWrite = JSON.stringify(this.playerManager.playerDict, null, 4);
    var that = this;
    fs.writeFile(playerFileName, textToWrite, function(err) {
        if(err) {
            that.log(err);
            return;  
        } 
    }); 
}

EmployeeBot.prototype.loadPlayer = function(callback) {
    console.log("loadPlayer")
    var that = this;
    fs.readFile(playerFileName, 'utf8', function (err, data) {

        if (err) {
            console.log(err);
            return;
        }
        try {
            that.playerManager.playerDict = JSON.parse(data);
        }
        catch (err) {
            that.playerManager.playerDict = {};
            that.log(err);
        }
        // migration
        for(key in that.playerManager.playerDict) {
            var userId = key;
            var player = that.playerManager.playerDict[userId];
            player.exp = Math.floor(player.exp);
            var characterClassId = player.characterId.substring(2,3);
            if (player.equipedWeapon && characterClassId != player.equipedWeapon._id.substring(3,4)) {
                that.playerManager.unequipWeapon(userId);
                var user = that.userManager.getUser(userId);
                if (user) that.log("Unequip Weapon for " + user.username);
            }
            if (player.equipedArmor && characterClassId != player.equipedArmor._id.substring(3,4)) {
                that.playerManager.unequipArmor(userId);
                var user = that.userManager.getUser(userId);
                if (user) that.log("Unequip Armor for " + user.username);
            }
            if (typeof player.promotion === "undefined") {
                player.promotion = 0;
            }
        }
        that.log("Number of players: " + Object.keys(that.playerManager.playerDict).length);

        for(key in that.playerManager.playerDict) {
            var userId = key;
            var player = that.playerManager.getPlayer(userId);
            that.playerManager.createUnitForPlayer(player);
            var unit = that.playerManager.getPlayerUnit(userId);
        }
        if (typeof callback == "function") callback();
    });
}

var dailyGiftFileName = "dailygift.json";
EmployeeBot.prototype.saveDailyGift = function() {
    var textToWrite = JSON.stringify(this.dailyGift, null, 4);
    var that = this;
    fs.writeFile(dailyGiftFileName, textToWrite, function(err) {
        if(err) {
            that.log(err);
            return;  
        } 
    }); 
}

EmployeeBot.prototype.loadDailyGift = function() {
    var that = this;
    fs.readFile(dailyGiftFileName, 'utf8', function (err, data) {
        if (err) {
            that.log("[loadDailyGift] Read file error.\n" + err);
            return;
        }
        try {
            that.dailyGift = JSON.parse(data);
        }
        catch (err) {
            that.log(err);
        }
    });
}

var shopFileName = "shop.json";
EmployeeBot.prototype.saveShop = function() {
    var textToWrite = JSON.stringify(this.shop, null, 4);
    var that = this;
    fs.writeFile(shopFileName, textToWrite, function(err) {
        if(err) {
            that.log(err);
            return;  
        } 
    }); 
}

EmployeeBot.prototype.loadShop = function() {
    var that = this;
    this.log("loadShop");
    console.log("loadShop");
    fs.readFile(shopFileName, 'utf8', function (err, data) {
        if (err) {
            that.log("[loadShop] Read file error.\n" + err);
            return;
        }
        try {
            that.shop = JSON.parse(data);
        }
        catch (err) {
            console.log(err);
            that.log(err);
        }
    });
}

// var christmasTreeFileName = "christmasTree.json";
// EmployeeBot.prototype.saveChristmasTree = function() {
//     var textToWrite = JSON.stringify(this.christmasTreeContribution, null, 4);
//     var that = this;
//     fs.writeFile(christmasTreeFileName, textToWrite, function(err) {
//         if(err) {
//             that.log(err);
//             return;  
//         } 
//     }); 
// }

// EmployeeBot.prototype.loadChristmasTree = function() {
//     var that = this;
//     fs.readFile(christmasTreeFileName, 'utf8', function (err, data) {
//         if (err) {
//             that.log("[loadChristmasTree] Read file error.\n" + err);
//             return;
//         }
//         try {
//             that.christmasTreeContribution = JSON.parse(data);
//         }
//         catch (err) {
//             that.log(err);
//         }
//     });
// }

var aromaFileName = "aroma.json";
EmployeeBot.prototype.saveAroma = function() {
    var textToWrite = JSON.stringify(this.aromaEffect, null, 4);
    var that = this;
    fs.writeFile(aromaFileName, textToWrite, function(err) {
        if(err) {
            that.log(err);
            return;  
        } 
    });
}

EmployeeBot.prototype.loadAroma = function() {
    var that = this;
    this.log("loadAroma");
    console.log("loadAroma");
    fs.readFile(aromaFileName, 'utf8', function (err, data) {
        if (err) {
            that.log("[loadAroma] Read file error.\n" + err);
            return;
        }
        try {
            that.aromaEffect = JSON.parse(data);
            useCommand.setAromaTimeout(that);
        }
        catch (err) {
            that.log(err);
        }
    });
}

var kettleFileName = "kettle.json";
EmployeeBot.prototype.saveKettle = function() {
    var textToWrite = JSON.stringify(this.kettle, null, 4);
    var that = this;
    fs.writeFile(kettleFileName, textToWrite, function(err) {
        if(err) {
            that.log(err);
            return;  
        } 
    });
}

EmployeeBot.prototype.loadKettle = function() {
    var that = this;
    this.log("loadKettle");
    console.log("load Kettle")
    fs.readFile(kettleFileName, 'utf8', function (err, data) {
        console.log("Read Kettle");
        if (err) {
            that.log("[loadKettle] Read file error.\n" + err);
            that.startKettle();
            return;
        }
        try {
            that.kettle = JSON.parse(data);
            that.startKettle();
        }
        catch (err) {
            that.log(err);
            console.log(err);
        }
    });
}

var cacaoRequiredForLevel = [
    0, 6, 16, 33, 60, 105, 177, 295, 488, 802,
    1313, 2148, 3507, 5723, 9336, 15224, 24821, 40465, 65964, 107528
];

var productionForLevel = [
    60, 120, 240, 360, 480, 600, 900, 1200, 1500, 1800,
    2100, 2400, 2880, 3360, 3840, 4320, 4800, 5280, 5760, 6720
];

EmployeeBot.prototype.getKettleLevel = function() {
    for(var i=0;i<cacaoRequiredForLevel.length;i++) {
        if (cacaoRequiredForLevel[i] > this.kettle.totalCacao) return i;
    }
    return cacaoRequiredForLevel.length;
}

EmployeeBot.prototype.getCacaoRequiredUntilNextLevel = function() {
    var curLevel = this.getKettleLevel();
    var nextLevel = Math.min(curLevel+1, cacaoRequiredForLevel.length);
    return Math.max(0, cacaoRequiredForLevel[nextLevel-1] - this.kettle.totalCacao);
}

EmployeeBot.prototype.getKettleProduction = function() {
    return productionForLevel[this.getKettleLevel() - 1];
}

EmployeeBot.prototype.startKettle = function() {
    console.log("started Kettle")
    var that = this;
    setInterval(function() {
        var production = that.getKettleProduction();
        for(key in that.kettle.contribution) {
            var userId = key;
            if (that.kettle.contribution[userId] > 0) {
                that.kettle.contribution[userId]--;

                if (typeof that.kettle.chocolate[userId] == "undefined") {
                    that.kettle.chocolate[userId] = 0;
                }
                that.kettle.chocolate[userId] += production;
            }
        }

        that.saveKettle();
    }, 60*1000);
}

var runQuestStatusFileName = "runQuestStatus.json";
EmployeeBot.prototype.saveRunQuestStatus = function() {
    var textToWrite = JSON.stringify(this.runQuestStatus, null, 4);
    var that = this;
    fs.writeFile(runQuestStatusFileName, textToWrite, function(err) {
        if(err) {
            that.log(err);
            return;  
        } 
    }); 
}

EmployeeBot.prototype.loadRunQuestStatus = function() {
    var that = this;
    this.log("loadRunQuestStatus");
    console.log("loadRunQuestStatus");
    fs.readFile(runQuestStatusFileName, 'utf8', function (err, data) {
        if (err) {
            that.log("[loadRunQuestStatus] " + err);
            return;
        }
        try {
            that.runQuestStatus = JSON.parse(data);
        }
        catch (err) {
            that.runQuestStatus = {};
            that.log(err);
        }
        var text = "";
        for(key in that.userManager.members) {
            var userId = key;
            that.initBreadIfNeed(userId);
            var member = that.userManager.members[userId];

            if ((typeof that.runQuestStatus[userId] !== "undefined") && (that.runQuestStatus[userId].quest != "")) {
                var questName = that.runQuestStatus[userId].quest;
                var endTime = that.runQuestStatus[userId].endTime;
                var now = new Date();
                var remainingTime = endTime - now.valueOf();
                var time = that.functionHelper.parseTime(remainingTime);
                var bread = -1;
                if (typeof that.runQuestStatus[userId].bread != "undefined") {
                    bread = that.runQuestStatus[userId].bread;
                }
                grindCommand.runQuest(that, questName, bread, member.user, false, remainingTime);

                text = "Resume quest " + questName + " for player " + member.user.username + " (Bread: " + bread + "). Remaining Time: " + time + "\n";
                that.log(text);
            }
        }
        // if (text != "") that.log(text);
    });
}

var auctionFileName = "auction.json";
EmployeeBot.prototype.saveAuction = function() {
    var textToWrite = JSON.stringify(this.auctionManager.auctions, null, 4);
    var that = this;
    fs.writeFile(auctionFileName, textToWrite, function(err) {
        if(err) {
            that.log(err);
            return;  
        } 
    }); 
}

EmployeeBot.prototype.loadAuction = function() {
    var that = this;
    this.log("loadAuction");
    console.log("loadAuction");
    fs.readFile(auctionFileName, 'utf8', function (err, data) {
        if (err) {
            that.log("[loadAuction] " + err);
            return;
        }
        try {
            that.auctionManager.auctions = JSON.parse(data);
        }
        catch (err) {
            that.auctionManager.auctions = {};
            that.log(err);
        }
        var text = "";
        for(key in that.auctionManager.auctions) {
            var userId = key;
            setAuctionCommand.setNotice(that, userId);
        }
    });
}

EmployeeBot.prototype.sendMessageToMainChannel = function(text) {
    var channels = this.bot.channels.array();
    for(var i=0;i<channels.length;i++) {
        if (channels[i].type === "text" && channels[i].name === this.nutakuChannelName) {
            channels[i].sendMessage(text);
            return;
        }
    }
}

EmployeeBot.prototype.removeFaintedRole = function() {
    for(key in this.userManager.members) {
        var userId = key;
        this.userManager.removeRole(userId, "Fainted");
    }
}

EmployeeBot.prototype.postKoImage = function(userId, koList) {
    if (koList && koList.length > 0) {
        var queue = [];
        var queueToRead = [];
        for(var i=0;i<koList.length;i++) {
            var koUserId = koList[i];
            var koUnit = this.playerManager.getPlayerUnit(koUserId);
            var imgUrl = this.urlHelper.getIllustURL(koUnit, "chara_ko");
            var fileName = "images/chara_ko/" + koUnit.characterId + ".png";
            queue.push({ fileToDownload: imgUrl,   fileToSave: fileName});
            queueToRead.push(fileName);
        }

        var that = this;
        this.imageHelper.download(queue, function(err) {
            if (err) {
                that.log(err);
                return;
            }

            that.imageHelper.read(queueToRead, function (err, imageList) {
                if (err) {
                    that.log(err);
                    return;
                }
                image = new Jimp(1001 * koList.length, 1162, 0xFFFFFF00, function (err, image) {
                    for(var i=0;i<koList.length;i++) {
                        var koUserId = koList[i];
                        var koUnit = that.playerManager.getPlayerUnit(koUserId);
                        var fileName = "images/chara_ko/" + koUnit.characterId + ".png";
                        image.composite(imageList[fileName], 1001 * i, 0);
                    }
                    var imageName = "images/battle_ko/" + userId + ".png";
                    image.write(imageName, function() {
                        that.battleChannel.sendFile(imageName, "png", "");
                    });
                });
            });
        });
    }
}

EmployeeBot.prototype.ready = function() {
    if (this.firstTimeReady) {
        var channels = this.bot.channels.array();
        for(var i=0;i<channels.length;i++) {
            // if (channels[i].type === "text" && channels[i].name === this.nutakuChannelName) {
            //     // this.greeting(channels[i]);
            // }
            if (channels[i].type === "text" && channels[i].name === "log") {
                this.logChannel = channels[i];
            }
            if (channels[i].type === "text" && channels[i].name === "battlefield") {
                this.battleChannel = channels[i];
            }
        }
        console.log("logChannel is " + (this.logChannel?"on":"off"));    
        console.log("battleChannel is " + (this.battleChannel?"on":"off"));    
        
        var text = "Bot is on. Serving on " + channels.length + " channels\n";
        // for(var i=0;i<channels.length;i++) {
        //     var channelName = (channels[i].name ? channels[i].name : channels[i].recipient.username);
        //     text += (i+1) + ". " + channelName + " (" + (channels[i].guild ? channels[i].guild.name : "PM") + ")\n";
        // }
        text += "-----";
        this.log(text);
        console.log(text);

        var that = this;

        //this.setIdleTalk();
        this.setDailyDrawReminderForNutaku();
        this.setDailyDrawReminderForDmm();
        this.setBreadRegeneration();
        this.firstTimeReady = false;
        this.loadSoul();
        this.loadBread();
        this.loadDailyGift();
        this.loadUnsubscribe();
        this.loadShop();
        this.loadSilenced();
        // this.loadChristmasTree();
        this.loadPlayer(function() {
            that.userManager.fetchAllMembers(function() {
                that.loadRunQuestStatus();
                that.loadAuction();
                //that.loadAroma();
                that.removeFaintedRole();
                that.saveSilenced();
            });
        });
        this.loadKettle();

        return true;
    } else {
        this.log("Bot is restarted");
        return false;
    }
}

EmployeeBot.prototype.log = function(text) {
    if (this.logChannel) this.logChannel.sendMessage(text);
}

EmployeeBot.prototype.login = function() {
    if (this.token) this.bot.login(this.token);
}

var employee = new EmployeeBot();

employee.bot.on('guildMemberAdd', (member) => {
    var channels = member.guild.channels.array();
    for(var i=0;i<channels.length;i++) {
        if (channels[i].type === "text" && channels[i].name === "player_join_leave_server") {
            var text = "**" + member.user.username + "** has joined.\n";
            text += "Member count: " + member.guild.memberCount;
            channels[i].sendMessage(text);
        } 
    }
    employee.userManager.fetchAllMembers();
});

employee.bot.on('guildMemberRemove', (member) => {
    var channels = member.guild.channels.array();
    for(var i=0;i<channels.length;i++) {
        if (channels[i].type === "text" && channels[i].name === "player_join_leave_server") {
            var text = "**" + member.user.username + "** has leaved.\n";
            text += "Member count: " + member.guild.memberCount;
            channels[i].sendMessage(text);
        } 
    }
});

employee.bot.on('disconnect', (event) => {
    console.log("disconnected");
    employee.disconnectTimer = setTimeout(function() {
        if (employee.battleController && employee.battleController.type == "training") {
            employee.battleController.saveSession(function() {
                console.log("killed process");
                process.exit();
            });
        }
    }, 60*1000);
});

employee.bot.on('reconnecting', (event) => {
    console.log("reconnecting");
    clearTimeout(employee.disconnectTimer);
});

process.on('uncaughtException', function (err) {
    employee.log('Uncaught Exception: \n' + err.stack);
    console.log('Uncaught Exception: \n' + err.stack)
});

process.on("unhandledRejection", err => {
    employee.log("Uncaught Promise Error: \n" + err.stack);
    console.log("Uncaught Promise Error: \n" + err.stack)
});

module.exports = employee;