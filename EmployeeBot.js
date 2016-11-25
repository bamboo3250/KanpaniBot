var Discord = require("discord.js");

var employeeDatabase = require('./database/EmployeeDatabase');
var questDatabase = require('./database/QuestDatabase');
var itemInfoDatabase = require('./database/ItemInfoDatabase');
var Employee = require('./classes/Employee');

var playerManager = require('./managers/PlayerManager');

var imageHelper = require('./ImageHelper');
var fs = require('fs');
var helper = require('./FunctionHelper')

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
var totalBreadCommand = require('./commands/TotalBreadCommand');
var questCommand = require('./commands/QuestCommand');
var inventoryCommand = require('./commands/InventoryCommand');
var sellCommand = require('./commands/SellCommand');
var useCommand = require('./commands/UseCommand');

function EmployeeBot() {
    this.dmmChannelName = "dmm_games";
    this.nutakuChannelName = "kanpani_girls";
    this.bot = new Discord.Client();
    this.employeeDatabase = employeeDatabase;
    this.questDatabase = questDatabase;
    this.itemInfoDatabase = itemInfoDatabase;
    this.imageHelper = imageHelper;
    this.playerManager = playerManager;
    this.functionHelper = helper;

    this.dmmMaintenanceList = [
        {
            name: "DMM Maintenance",
            startTime: "Nov 30 2016 13:00:00 GMT+0900",
            endTime: "Nov 30 2016 17:00:00 GMT+0900"
        }
    ];
    this.nutakuDaily = {
        name: "Nutaku Daily Draw Reset",
        time: "Oct 20 2016 4:00:00 GMT+0000",
    };
    this.dmmDaily = {
        name: "DMM Daily Draw Reset",
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

    this.firstTimeReady = true;
    
    this.freeRoll = {};
    this.rollResult = {};
    this.canUseBreadToRoll = false;

    this.runQuestStatus = {};
    this.freeMe = {};
    this.mailboxEffect = {};

    this.logChannel = null;

    this.backgroundFileNames = [
        "arena.jpg",
        "battlefield_01.jpg",
        "battlefield_02.png",
        "beach_01.jpg",
        "beach_02.jpg",
        "beach_03.jpg",
        "cape.jpg",
        "cave_01.jpg",
        "cave_02.jpg",
        "cave_03.jpg",
        "classroom.jpg",
        "desert.jpg",
        "elf_village.jpg",
        "farm_road.jpg",
        "festival_01.png",
        "forest_01.jpg",
        "forest_02.jpg",
        "forest_03.jpg",
        "graveyard.jpg",
        "hot_spring_01.jpg",
        "hot_spring_02.jpg",
        "hot_spring_03.jpg",
        "hot_spring_04.jpg",
        "kemomin_forest.jpg",
        "labyrinth_01.jpg",
        "labyrinth_02.jpg",
        "labyrinth_03.jpg",
        "labyrinth_04.jpg",
        "open_deck.jpg",
        "orphanage.jpg",
        "promotion.png",
        "ship.jpg",
        "shrine.jpg",
        "theater.jpg",
        "town_road_01.jpg",
        "town_road_02.jpg",
        "town_road_03.jpg",
        "training_place.jpg",
        "volcano.jpg"
    ];
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
        return true;
    } else {
        message.reply("You don't have enough bread.");
        return false;
    }
}

EmployeeBot.prototype.createEmployeeFromPlayer = function(player) {
    var employeeInfo = this.employeeDatabase.getEmployeeById(player.characterId)
    var employee = new Employee(employeeInfo);
    employee.setExp(player.exp);

    return employee;
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
        giveBreadCommand.handle(message, this);
        charaCommand.handle(message, this);
        meCommand.handle(message, this);
        topCommand.handle(message, this);
        myTopCommand.handle(message, this);
        rollCommand.handle(message, this);
        takeCommand.handle(message, this);
        grindCommand.handle(message, this);
        totalBreadCommand.handle(message, this);
        questCommand.handle(message, this);
        inventoryCommand.handle(message, this);
        sellCommand.handle(message, this);
        useCommand.handle(message, this);
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
    var time = helper.getTimeUntilDaily(this.nutakuDailyRemind); 
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
    var time = helper.getTimeUntilDaily(this.dmmDailyRemind); 
    var that = this;
    setTimeout(function() {
        var channels = that.bot.channels.array();
        for(var i=0;i<channels.length;i++) {
            if (channels[i].type === "text" && channels[i].name === that.dmmChannelName) {
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
            that.remainingBread[key] = Math.min(that.remainingBread[key] + 1, that.cappedBread);
        }
        that.startBread = Math.min(that.startBread + 1, that.cappedBread);
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

EmployeeBot.prototype.loadPlayer = function() {
    var that = this;
    fs.readFile(playerFileName, 'utf8', function (err, data) {
        if (err) return;
        try {
            that.playerManager.playerDict = JSON.parse(data);
        }
        catch (err) {
            that.playerManager.playerDict = {};
            that.log(err);
        }
        // migration
        for(key in that.playerManager.playerDict) {
            if (typeof that.playerManager.playerDict[key].gold === "undefined") {
                that.playerManager.playerDict[key].gold = 0;
            }
            if (that.playerManager.playerDict[key].materialList instanceof Array) {
                that.playerManager.playerDict[key].materialList = {};
            }
            for(materialKey in that.playerManager.playerDict[key].materialList) {
                if (materialKey.startsWith("Forge")) {
                    that.playerManager.playerDict[key].materialList["Forge"] = that.playerManager.playerDict[key].materialList[materialKey];
                    delete that.playerManager.playerDict[key].materialList[materialKey];
                }
            }
        }
    });
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
    fs.readFile(runQuestStatusFileName, 'utf8', function (err, data) {
        if (err) return;
        try {
            that.runQuestStatus = JSON.parse(data);
        }
        catch (err) {
            that.runQuestStatus = {};
            that.log(err);
        }
        
        var guilds = that.bot.guilds.array();
        for(var i=0;i<guilds.length;i++) {
            guilds[i].fetchMembers().then(guild => {
                var members = guild.members.array();

                for(var i=0;i<members.length;i++) {
                    var userId = members[i].id;
                    if ((typeof that.runQuestStatus[userId] !== "undefined") && (that.runQuestStatus[userId].quest != "")) {
                        members[i].user.sendMessage("Your quest has been cancelled! Please run again.");
                        that.log("Notified user " + members[i].user.username);
                    }
                }
                that.runQuestStatus = {};
                that.saveRunQuestStatus();
            }).catch(err => {
                that.log("[loadRunQuestStatus] Fetching member error!");
            });
        }
    });
}

EmployeeBot.prototype.ready = function() {
    if (this.firstTimeReady) {
        var channels = this.bot.channels.array();
        for(var i=0;i<channels.length;i++) {
            if (channels[i].type === "text" && channels[i].name === this.nutakuChannelName) {
                this.greeting(channels[i]);
            }
            if (channels[i].type === "text" && channels[i].name === "log") {
                this.logChannel = channels[i];
            } 
        }
        this.log("Bot is on. Serving on " + this.bot.channels.array().length + " channels");
        this.log("-----");
        
        //this.setIdleTalk();
        this.setDailyDrawReminderForNutaku();
        this.setDailyDrawReminderForDmm();
        this.setBreadRegeneration();
        this.firstTimeReady = false;
        this.loadSoul();
        this.loadPlayer();
        this.loadRunQuestStatus();
    } else {
        this.log("Bot is restarted");
    }
}

EmployeeBot.prototype.log = function(text) {
    if (this.logChannel) this.logChannel.sendMessage(text);
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

process.on('uncaughtException', function (err) {
    employee.log('Uncaught Exception: ' + err.stack);
});

process.on("unhandledRejection", err => {
    employee.log("Uncaught Promise Error: \n" + err.stack);
});

module.exports = employee;