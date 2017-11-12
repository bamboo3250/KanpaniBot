const Discord = require('discord.js');

const Jimp              = require('jimp');
const imageHelper       = require('./helpers/ImageHelper');
const functionHelper    = require('./helpers/FunctionHelper');
const urlHelper         = require('./helpers/UrlHelper');
const https             = require('https');

const employeeDatabase    = require('./database/EmployeeDatabase');
const questDatabase       = require('./database/QuestDatabase');
const itemInfoDatabase    = require('./database/ItemInfoDatabase');
const weaponDatabase      = require('./database/WeaponDatabase');
const armorDatabase       = require('./database/ArmorDatabase');
const accessoryDatabase   = require('./database/AccessoryDatabase');
const skillDatabase       = require('./database/SkillDatabase');

const PlayerManager       = require('./managers/PlayerManager');
const UserManager         = require('./managers/UserManager');
const BackgroundManager   = require('./managers/BackgroundManager');
const AuctionManager      = require('./managers/AuctionManager');
const ImageManager        = require('./managers/ImageManager');
const BreadManager        = require('./managers/BreadManager');
const NewsManager         = require('./managers/NewsManager');

const dailyCommand                = require('./commands/DailyCommand');
const scheduleCommand             = require('./commands/ScheduleCommand');
const basicGreetingCommand        = require('./commands/BasicGreetingCommand');
const specialCommand              = require('./commands/SpecialCommand');
const breadCommand                = require('./commands/BreadCommand');
const setBreadCommand             = require('./commands/SetBreadCommand');
const ingameBreadCommand          = require('./commands/InGameBreadCommand');
const giveBreadCommand            = require('./commands/GiveBreadCommand');
const charaCommand                = require('./commands/CharaCommand');
const meCommand                   = require('./commands/MeCommand');
const topCommand                  = require('./commands/TopCommand');
const myTopCommand                = require('./commands/MyTopCommand');
const rollCommand                 = require('./commands/RollCommand');
const takeCommand                 = require('./commands/TakeCommand');
const grindCommand                = require('./commands/GrindCommand');
const adminCommand                = require('./commands/AdminCommand');
const questCommand                = require('./commands/QuestCommand');
const inventoryCommand            = require('./commands/InventoryCommand');
const sellCommand                 = require('./commands/SellCommand');
const useCommand                  = require('./commands/UseCommand');
const craftCommand                = require('./commands/CraftCommand');
const inventoryEquipmentCommand   = require('./commands/InventoryEquipmentCommand');
const equipCommand                = require('./commands/EquipCommand');
const reportCommand               = require('./commands/ReportCommand');
const setDailyGiftCommand         = require('./commands/SetDailyGiftCommand');
const dailyGiftCommand            = require('./commands/DailyGiftCommand');
const effectCommand               = require('./commands/EffectCommand');
const toFrontCommand              = require('./commands/ToFrontCommand');
const toBackCommand               = require('./commands/ToBackCommand');
const itemDropCommand             = require('./commands/ItemDropCommand');
const unsubscribeCommand          = require('./commands/UnsubscribeCommand');
const retreatCommand              = require('./commands/RetreatCommand');
const xmasTreeCommand             = require('./commands/XmasTreeCommand');
const weaponCommand               = require('./commands/WeaponCommand');
const armorCommand                = require('./commands/ArmorCommand');
const accessoryCommand            = require('./commands/AccessoryCommand');
const setAuctionCommand           = require('./commands/SetAuctionCommand');
const auctionCommand              = require('./commands/AuctionCommand');
const bidCommand                  = require('./commands/BidCommand');
const wakeUpCommand               = require('./commands/WakeUpCommand');
const aromaCommand                = require('./commands/AromaCommand');
const sellPageCommand             = require('./commands/SellPageCommand');
const ceoPowerCommand             = require('./commands/CEOPowerCommand');
const shopCommand                 = require('./commands/ShopCommand');
const buyCommand                  = require('./commands/BuyCommand');
const promoteCommand              = require('./commands/PromoteCommand');

const attackCommand               = require('./commands/AttackCommand');
const healCommand                 = require('./commands/HealCommand');
const trainerCommand              = require('./commands/TrainerCommand');
const joinTrainingCommand         = require('./commands/JoinTrainingCommand');
const quitTrainingCommand         = require('./commands/QuitTrainingCommand');
const ceoReviveCommand            = require('./commands/CeoReviveCommand');
const swapCommand                 = require('./commands/SwapCommand');
const encourageCommand            = require('./commands/EncourageCommand');
const sneakCommand                = require('./commands/SneakCommand');
const focusCommand                = require('./commands/FocusCommand');

const setCEOCommand               = require('./commands/SetCEOCommand');
const removeCEOCommand            = require('./commands/RemoveCEOCommand');
const setServerCommand               = require('./commands/SetServerCommand');
const removeServerCommand            = require('./commands/RemoveServerCommand');

const helpCommand                = require('./commands/HelpCommand');

function EmployeeBot() {
    this.token = null;
    this.dmmChannelName = "dmm_games";
    this.mainChannelName = "kanpani_girls";
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

    this.fs = require('fs');

    this.playerManager      = new PlayerManager(this);
    this.userManager        = new UserManager(this);
    this.backgroundManager  = new BackgroundManager();
    this.auctionManager     = new AuctionManager();
    this.breadManager       = new BreadManager(this);
    this.imageManager       = new ImageManager(this);
    this.newsManager        = new NewsManager(this);
    this.imageManager.init();

    this.battleController = null;

    this.schedule = [];
    this.daily = {
        name: "Kanpani☆Girls Daily Draw Reset",
        time: "Mar 18 2017 4:00:00 GMT+0900", 
    };
    this.dailyRemind = "Mar 18 2017 3:45:00 GMT+0900";
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
    
    this.hasNewMessage = false;
    this.lastTimeSayingHi = 0;
    this.lastTimeGoodMorning = 0;
    this.lastTimeGoodNight = 0;
    this.lastTimeThanks = 0;
    this.lastTimeSayingHiToPlayers = {};
    this.lastTimeGoodMorningToPlayers = {};
    this.lastTimeGoodNightToPlayers = {};
    this.lastTimeGiveCandyToPlayers = {};

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
    this.freeChara = {};
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

    this.mainChannel = null;
    this.logChannel = null;
    this.marketChannel = null;
    this.battleChannel = null;
    this.joinLeaveChannel = null;
    this.floatingContinentChannel = null;

    this.disconnectTimer = null;
   
    // this.kettle = {
    //     totalCacao: 0,
    //     contribution: {},
    //     chocolate: {}
    // };
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

EmployeeBot.prototype.sendPM = function(userId, text, photoFileName) {
    var user = this.userManager.getUser(userId);
    if (!user) return;

    if (photoFileName) {
        user.sendFile(photoFileName, 'png', text);
        user.send(text, { 'files': [photoFileName] });
    } else {
        if (!text || !text.toString().trim()) {
            console.trace();
            return;
        }
        user.send(text);
    }
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

EmployeeBot.prototype.isHR = function(message) {
    if (!message.guild) return false;
    var hrRole = message.guild.roles.find('name', 'HR Manager');
    return (hrRole && message.member && message.member.roles.has(hrRole.id));
}

EmployeeBot.prototype.isAdmin = function(message) {
    return (message.author.id === "162995652152786944");
}

EmployeeBot.prototype.initBreadIfNeed = function(userId) {
    this.breadManager.initBreadIfNeed(userId);
}

EmployeeBot.prototype.createRemainingBreadLine = function(message) {
    var userId = message.author.id;
    if (this.isPM(message)) {
        return "Remaining Bread: " + this.breadManager.getBread(userId);
    } else {
        return "Remaining Bread: " + this.getEmoji('kbread') + " x" + this.breadManager.getBread(userId);    
    }
}

EmployeeBot.prototype.consumeBread = function(message, amount = 1) {
    var userId = message.author.id;
    if (this.checkNoSoul(message)) return false;
    if (userId === "146556639342755840") return true;
    if (!this.breadManager.consumeBreadIfEnough(userId, amount)) {
        message.reply("You don't have enough bread.");
        return false;
    }
    return true;
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

const COMMAND_LIST = [
    dailyCommand,
    scheduleCommand,
    basicGreetingCommand,
    specialCommand,
    
    breadCommand,
    setBreadCommand,
    ingameBreadCommand,
    charaCommand,
    
    rollCommand,
    takeCommand,
    meCommand,
    grindCommand,
    retreatCommand,
    ceoPowerCommand,
    questCommand,
    itemDropCommand,
    equipCommand,
    topCommand,
    myTopCommand,
    
    adminCommand,
    
    inventoryCommand,
    craftCommand,
    sellCommand,
    useCommand,
    effectCommand,
    inventoryEquipmentCommand,
    setDailyGiftCommand,
    dailyGiftCommand,
    unsubscribeCommand,
    
    toFrontCommand,
    toBackCommand,
    swapCommand,
    
    weaponCommand,
    armorCommand,
    accessoryCommand,
    
    setAuctionCommand,
    auctionCommand,
    bidCommand,
    sellPageCommand,
    //attackCommand,
    //healCommand,
    //trainerCommand,
    //joinTrainingCommand,
    //quitTrainingCommand,
    //ceoReviveCommand,
    //encourageCommand,
    //sneakCommand,
    //focusCommand,
    shopCommand,
    buyCommand,
    promoteCommand,
    
    setCEOCommand,
    removeCEOCommand,
    setServerCommand,
    removeServerCommand,

    reportCommand,
    helpCommand
];

EmployeeBot.prototype.commands = function() {
    return COMMAND_LIST;
}

EmployeeBot.prototype.handleCommonCommand = function(message) {
    if (message.author.bot) return;
    
    try {
        for (var i=0;i<COMMAND_LIST.length;i++) {
            COMMAND_LIST[i].handle(message, this);
        }
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
        channel.send(message);    
    }
}

EmployeeBot.prototype.greeting = function(channel) {
    this.sayRandomMessages(channel, this.greetings);
}

EmployeeBot.prototype.setDailyDrawReminder = function() {
    var time = this.functionHelper.getTimeUntilDaily(this.dailyRemind); 
    var self = this;
    self.bot.setTimeout(function() {
        self.sendMessageToMainChannel(self.getRole('CEO') + "\n**Reminder: 15 minutes until Daily Draw Reset**");
        self.bot.setTimeout(function(){
            self.setDailyDrawReminder();
        }, 30*1000);
    }, time);
}

EmployeeBot.prototype.setAlarm = function(text, time) {
    var self = this;
    this.bot.setTimeout(function() {
        self.sendMessageToMainChannel(self.getRole('CEO') + '\n' + text)
    }, time);
}

EmployeeBot.prototype.setAlarmForSchedule = function() {
    var now = new Date();
    for(var i=0;i<this.schedule.length;i++) {
        var name = this.schedule[i].title;
        var startTime = new Date(this.schedule[i].start_time);
        
        startTime.setTime(startTime.getTime() - 15*60*1000);
        if (now.valueOf() < startTime.valueOf()) {
            this.setAlarm('**' + name + '** will start in 15 minutes', startTime.valueOf() - now.valueOf());
        }
    }
}

var soulFileName = "soul.json";
EmployeeBot.prototype.saveSoul = function() {
    var textToWrite = JSON.stringify(this.hasSoul, null, 4);
    var self = this;
    this.fs.writeFile(soulFileName, textToWrite, function(err) {
        if (err) {
            self.log('[saveSoul]: ' + err);
            return;
        }
    }); 
}

EmployeeBot.prototype.loadSoul = function() {
    var self = this;
    this.fs.readFile(soulFileName, 'utf8', function (err, data) {
        if (err) {
            self.log('[loadSoul]: ' + err);
            return;
        }
        self.hasSoul = JSON.parse(data);
    });
}

var silencedFileName = "silenced.json";
EmployeeBot.prototype.saveSilenced = function() {
    var textToWrite = JSON.stringify(this.silenced, null, 4);
    var self = this;
    this.fs.writeFile(silencedFileName, textToWrite, function(err) {
        if (err) {
            self.log('[saveSilenced]: ' + err);
            return;
        }
        self.log("Saved Silenced");
    }); 
}

EmployeeBot.prototype.loadSilenced = function() {
    var self = this;
    this.fs.readFile(silencedFileName, 'utf8', function (err, data) {
        if (err) {
            self.log('[loadSilenced]: ' + err);
            return;
        }
        self.silenced = JSON.parse(data);
    });
}

var unsubscribeFileName = "unsubscribe.json";
EmployeeBot.prototype.saveUnsubscribe = function() {
    var textToWrite = JSON.stringify(this.unsubscribe, null, 4);
    var self = this;
    this.fs.writeFile(unsubscribeFileName, textToWrite, function(err) {
        if(err) {
            self.log('[saveUnsubscribe]: ' + err);
            return;
        }
    }); 
}

EmployeeBot.prototype.loadUnsubscribe = function() {
    var self = this;
    this.fs.readFile(unsubscribeFileName, 'utf8', function (err, data) {
        if (err) {
            self.log('[loadUnsubscribe]: ' + err);
            return;
        }
        try {
            self.unsubscribe = JSON.parse(data);
        }
        catch (err) {
            self.log('[loadUnsubscribe]: ' + err);
            self.unsubscribe = {};   
        }
    });
}

EmployeeBot.prototype.savePlayer = function() {
    this.playerManager.savePlayer();
}

EmployeeBot.prototype.saveBread = function() {
    this.breadManager.saveBread();
}

EmployeeBot.prototype.getUser = function(userId) {
    return this.userManager.getUser(userId);
}

var dailyGiftFileName = "dailygift.json";
EmployeeBot.prototype.saveDailyGift = function() {
    var textToWrite = JSON.stringify(this.dailyGift, null, 4);
    var self = this;
    this.fs.writeFile(dailyGiftFileName, textToWrite, function(err) {
        if(err) {
            self.log('[saveDailyGift]: ' + err);
            return;  
        } 
    }); 
}

EmployeeBot.prototype.loadDailyGift = function() {
    var self = this;
    this.fs.readFile(dailyGiftFileName, 'utf8', function (err, data) {
        if (err) {
            self.log("[loadDailyGift]: " + err);
            return;
        }
        try {
            self.dailyGift = JSON.parse(data);
        }
        catch (err) {
            self.log('[loadDailyGift]: ' + err);
        }
    });
}

var shopFileName = "shop.json";
EmployeeBot.prototype.saveShop = function() {
    var textToWrite = JSON.stringify(this.shop, null, 4);
    var self = this;
    this.fs.writeFile(shopFileName, textToWrite, function(err) {
        if(err) {
            self.log('[saveShop]: ' + err);
            return;  
        } 
    }); 
}

EmployeeBot.prototype.loadShop = function() {
    var self = this;
    this.log("loadShop");
    console.log("loadShop");
    this.fs.readFile(shopFileName, 'utf8', function (err, data) {
        if (err) {
            self.log('[loadShop]: ' + err);
            return;
        }
        try {
            self.shop = JSON.parse(data);
        }
        catch (err) {
            self.log('[loadShop]: ' + err);
        }
    });
}

var kettleFileName = "kettle.json";
EmployeeBot.prototype.saveKettle = function() {
    var textToWrite = JSON.stringify(this.kettle, null, 4);
    var self = this;
    this.fs.writeFile(kettleFileName, textToWrite, function(err) {
        if(err) {
            self.log('[saveKettle]: ' + err);
            return;  
        } 
    });
}

EmployeeBot.prototype.loadKettle = function() {
    var self = this;
    this.log("loadKettle");
    console.log("load Kettle")
    this.fs.readFile(kettleFileName, 'utf8', function (err, data) {
        if (err) {
            self.log("[loadKettle] Read file error.\n" + err);
            self.startKettle();
            return;
        }
        try {
            self.kettle = JSON.parse(data);
            self.startKettle();
        }
        catch (err) {
            self.log('[loadKettle]: ' + err);
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
    var self = this;
    setInterval(function() {
        var production = self.getKettleProduction();
        for(key in self.kettle.contribution) {
            var userId = key;
            if (self.kettle.contribution[userId] > 0) {
                self.kettle.contribution[userId]--;

                if (typeof self.kettle.chocolate[userId] == "undefined") {
                    self.kettle.chocolate[userId] = 0;
                }
                self.kettle.chocolate[userId] += production;
            }
        }

        self.saveKettle();
    }, 60*1000);
}

var runQuestStatusFileName = "runQuestStatus.json";
EmployeeBot.prototype.saveRunQuestStatus = function() {
    var textToWrite = JSON.stringify(this.runQuestStatus, null, 4);
    var self = this;
    this.fs.writeFile(runQuestStatusFileName, textToWrite, function(err) {
        if(err) {
            self.log('[saveRunQuestStatus]: ' + err);
            return;  
        } 
    }); 
}

EmployeeBot.prototype.loadRunQuestStatus = function() {
    var self = this;
    this.log("loadRunQuestStatus");
    console.log("loadRunQuestStatus");
    this.fs.readFile(runQuestStatusFileName, 'utf8', function (err, data) {
        if (err) {
            self.log("[loadRunQuestStatus] " + err);
            return;
        }
        try {
            self.runQuestStatus = JSON.parse(data);
        }
        catch (err) {
            self.runQuestStatus = {};
            self.log('[loadRunQuestStatus]: ' + err);
        }
        var text = "";
        for(key in self.userManager.members) {
            var userId = key;
            self.initBreadIfNeed(userId);
            var member = self.userManager.members[userId];

            if ((typeof self.runQuestStatus[userId] !== "undefined") && (self.runQuestStatus[userId].quest != "")) {
                var questName = self.runQuestStatus[userId].quest;
                var endTime = self.runQuestStatus[userId].endTime;
                var now = new Date();
                var remainingTime = endTime - now.valueOf();
                var time = self.functionHelper.parseTime(remainingTime);
                var bread = -1;
                if (typeof self.runQuestStatus[userId].bread != "undefined") {
                    bread = self.runQuestStatus[userId].bread;
                }
                grindCommand.runQuest(self, questName, bread, member.user, false, remainingTime);

                text = "Resume quest " + questName + " for player " + member.user.username + " (Bread: " + bread + "). Remaining Time: " + time + "\n";
                self.log(text);
            }
        }
    });
}

var auctionFileName = "auction.json";
EmployeeBot.prototype.saveAuction = function() {
    var textToWrite = JSON.stringify(this.auctionManager.auctions, null, 4);
    var self = this;
    this.fs.writeFile(auctionFileName, textToWrite, function(err) {
        if(err) {
            self.log('[saveAuction]: ' + err);
            return;  
        } 
    }); 
}

EmployeeBot.prototype.loadAuction = function() {
    var self = this;
    this.log("loadAuction");
    console.log("loadAuction");
    this.fs.readFile(auctionFileName, 'utf8', function (err, data) {
        if (err) {
            self.log("[loadAuction] " + err);
            return;
        }
        try {
            self.auctionManager.auctions = JSON.parse(data);
        }
        catch (err) {
            self.auctionManager.auctions = {};
            self.log('[loadAuction]: ' + err);
        }
        var text = "";
        for(key in self.auctionManager.auctions) {
            var userId = key;
            setAuctionCommand.setNotice(self, userId);
        }
    });
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

        var self = this;
        this.imageHelper.download(queue, function(err) {
            if (err) {
                self.log('[postKoImage]: ' + err);
                return;
            }

            self.imageHelper.read(queueToRead, function (err, imageList) {
                if (err) {
                    self.log('[postKoImage]: ' + err);
                    return;
                }
                image = new Jimp(1001 * koList.length, 1162, 0xFFFFFF00, function (err, image) {
                    for(var i=0;i<koList.length;i++) {
                        var koUserId = koList[i];
                        var koUnit = self.playerManager.getPlayerUnit(koUserId);
                        var fileName = "images/chara_ko/" + koUnit.characterId + ".png";
                        image.composite(imageList[fileName], 1001 * i, 0);
                    }
                    var imageName = "images/battle_ko/" + userId + ".png";
                    image.write(imageName, function() {
                        self.battleChannel.send({ 'files': [imageName] });
                    });
                });
            });
        });
    }
}

EmployeeBot.prototype.sendGetRequest = function(url, callback) {
    const self = this;
    var data = '';
    https.get(url, (res) => {
        res.on('data', (d) => {
            data += d;
        });

        res.on('end', function() {
            callback(data);
        });

    }).on('error', (e) => {
        self.log('[GET ' + url + ']: ' + e);
        callback(null);
    });
}

EmployeeBot.prototype.retrieveSchedule = function(callback) {
    var self = this;
    this.sendGetRequest('https://kanpanitools.com/schedule_list', function(data) {
        try {
            self.schedule = JSON.parse(data);
        }
        catch (err) {
            self.bot.log('[retrieveSchedule]: ' + err);
        }
        callback();
    });
}

EmployeeBot.prototype.ready = function() {
    clearTimeout(employee.disconnectTimer);
    console.log('ready');

    if (this.firstTimeReady) {
        var channels = this.bot.channels.array();
        for(var i=0;i<channels.length;i++) {
            if (channels[i].type === "text" && channels[i].name === this.mainChannelName) {
                this.mainChannel = channels[i];
            }
            if (channels[i].type === "text" && channels[i].name === "log") {
                this.logChannel = channels[i];
            }
            // if (channels[i].type === "text" && channels[i].name === "battlefield") {
            //     this.battleChannel = channels[i];
            // }
            if (channels[i].type === "text" && channels[i].name === "player_join_leave_server") {
                this.joinLeaveChannel = channels[i];
            }
            if (channels[i].type === "text" && channels[i].name === "market") {
                this.marketChannel = channels[i];
            }
            if (channels[i].type === "text" && channels[i].name === "floating_continent") {
                this.floatingContinentChannel = channels[i];
            }
        }
        console.log("mainChannel is " + (this.mainChannel?"on":"off"));    
        console.log("logChannel is " + (this.logChannel?"on":"off"));    
        //console.log("battleChannel is " + (this.battleChannel?"on":"off"));
        console.log("marketChannel is " + (this.marketChannel?"on":"off"));
        console.log("joinLeaveChannel is " + (this.joinLeaveChannel?"on":"off"));
        console.log("floatingContinentChannel is " + (this.floatingContinentChannel?"on":"off"));
        
        var text = "Bot is on. Serving on " + channels.length + " channels\n-----";
        this.log(text);
        console.log(text);

        var self = this;

        this.retrieveSchedule(function() {
            self.setAlarmForSchedule();
        })
        this.setDailyDrawReminder();
        this.breadManager.setBreadRegeneration();
        this.newsManager.startTimer();

        this.firstTimeReady = false;
        this.loadSoul();
        this.breadManager.loadBread();
        this.breadManager.loadIngameBread();
        this.loadDailyGift();
        this.loadUnsubscribe();
        this.loadShop();
        this.loadSilenced();
        this.playerManager.loadPlayer(function() {
            self.userManager.fetchAllMembers(function() {
                self.loadRunQuestStatus();
                self.loadAuction();
                self.removeFaintedRole();
                self.saveSilenced();
                self.breadManager.setTimer();
            });
        });
        //this.loadKettle();

        return true;
    } else {
        this.log("Bot is restarted");
        return false;
    }
}

EmployeeBot.prototype.getEmoji = function(emojiName) {
    if (!this.mainChannel) return null;
    return this.mainChannel.guild.emojis.find('name', emojiName);    
}

EmployeeBot.prototype.getRole = function(roleName) {
    if (!this.mainChannel) return null;
    return this.mainChannel.guild.roles.find('name', roleName);    
}

EmployeeBot.prototype.sendMessageToMainChannel = function(text, options) {
    if (!text || !text.toString().trim()) {
        console.trace();
        return;
    }
    if (!this.mainChannel) return;

    this.mainChannel.send(text, options);
}

EmployeeBot.prototype.sendMessageToFloatingContinentChannel = function(text) {
    if (!text || !text.toString().trim()) {
        console.trace();
        return;
    }
    if (!this.floatingContinentChannel) return;

    this.floatingContinentChannel.send(text);
}

EmployeeBot.prototype.sendMessageToMarketChannel = function(text) {
    if (!text || !text.toString().trim()) {
        console.trace();
        return;
    }
    if (!this.marketChannel) return;

    this.marketChannel.send(text);
}

EmployeeBot.prototype.log = function(text) {
    if (!text || !text.toString().trim()) {
        console.trace();
        return;
    }
    if (!this.logChannel) return;

    this.logChannel.send(text);
}

EmployeeBot.prototype.login = function() {
    if (!this.token) return;

    this.bot.login(this.token);
}

var employee = new EmployeeBot();

employee.bot.on('guildMemberAdd', (member) => {
    
    if (employee.joinLeaveChannel) {
        var text = "**" + member.user.username + "** has joined.\n";
        text += "Member count: " + member.guild.memberCount;
        employee.joinLeaveChannel.send(text);
    }

    member.send(
        'Welcome ' + member.user.username + '-san~!\n\n' 
        + 'Message me with a `~roll` and try to find your dream waifu. ' 
        + 'You can ask more about them and be more involved in `#kanpani_girls`, talk about other dmm games on `#dmm_games` or talk everything random in `#offtopic_general`.\n\n'
        + 'Chats are SFW!\n\n'
        + 'Regards,\n' + employee.name);

    employee.userManager.fetchAllMembers();
});

employee.bot.on('guildMemberRemove', (member) => {
    
    if (employee.joinLeaveChannel) {
        var text = "**" + member.user.username + "** has left.\n";
        text += "Member count: " + member.guild.memberCount;
        employee.joinLeaveChannel.send(text);
    }
});

employee.bot.on('disconnect', (event) => {
    console.log("disconnected");
    employee.disconnectTimer = setTimeout(function() {
        // if (employee.battleController && employee.battleController.type == "training") {
        //     employee.battleController.saveSession(function() {
        //         console.log("killed process");
        //         process.exit();
        //     });
        // }
        process.exit();
    }, 60*1000);
});

employee.bot.on('reconnecting', (event) => {
    console.log("reconnecting");
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
