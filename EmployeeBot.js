var Discord = require("discord.js");
var employeeDatabase = require('./database/EmployeeDatabase');
var Employee = require('./classes/Employee');
var imageHelper = require('./ImageHelper');
var Jimp = require("jimp");
var fs = require('fs');
var helper = require('./FunctionHelper')

function EmployeeBot() {
    this.dmmChannelName = "dmm_games";
    this.nutakuChannelName = "kanpani_girls";
    this.bot = new Discord.Client();
    this.employeeDatabase = employeeDatabase;
    this.imageHelper = imageHelper;

    this.dmmEventList = [
        {
            name: "Hotsprings, Monique, and Bath Towels",
            startTime: "Oct 28 2016 17:00:00 GMT+0900",
            endTime: "Nov 18 2016 14:00:00 GMT+0900"
        }
    ];
    this.nutakuEventList = [
    ];
    this.dmmMaintenanceList = [
        {
            name: "DMM Maintenance",
            startTime: "Nov 18 2016 14:00:00 GMT+0900",
            endTime: "Nov 18 2016 17:00:00 GMT+0900"
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
    this.replenishTime = 2*60*60*1000; // 2 hours
    this.remainingBread = {};
    this.total_bread = 0;
    this.declineNotEnoughBread = [
        "You don't have enough bread."
    ];

    this.hasSoul = {};
    this.player = {};

    this.firstTimeReady = true;
    
    this.freeRoll = {};
    this.rollResult = {};
    this.canUseBreadToRoll = false;

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

EmployeeBot.prototype.handleEventCommand = function(message) {

    var text = message.content.trim().toLowerCase();
    if (text !== "~event") return;
    if (this.preventPM(message)) return;

    var now = new Date();
    var eventList = [];
    if (message.channel.name === this.dmmChannelName) {
        eventList = this.dmmEventList;
    } else if (message.channel.name === this.nutakuChannelName) {
        eventList = this.nutakuEventList;
    } else {
        return;
    }

    text = "\n" + eventList.length + " active event(s)\n";
    for(var i=0;i<eventList.length;i++) {
        var startTime = new Date(eventList[i].startTime);
        var endTime = new Date(eventList[i].endTime);
        text += "**" + eventList[i].name + "**\n";

        if (now.valueOf() < startTime.valueOf()) {
            var time = helper.parseTime(startTime.valueOf() - now.valueOf());
            text += "Start in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                    + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
        } else if (startTime.valueOf() <= now.valueOf() && now.valueOf() <= endTime.valueOf()) {
            var time = helper.parseTime(endTime.valueOf() - now.valueOf());
            text += "End in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                    + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
        } 
    }
    if (text.length > 1) {
        message.channel.sendMessage(text);
    }
}

EmployeeBot.prototype.handleDailyCommand = function(message) {

    var text = message.content.trim().toLowerCase();
    if (text !== "~daily") return;
    if (this.preventPM(message)) return;

    var dailyEvent = null;
    if (message.channel.name === this.dmmChannelName) {
        dailyEvent = this.dmmDaily;
    } else if (message.channel.name === this.nutakuChannelName) {
        dailyEvent = this.nutakuDaily;
    } else {
        return;
    }
    text = "\n**" + dailyEvent.name + "**\n";
    nextDaily = helper.getTimeUntilDaily(dailyEvent.time);
    var time = helper.parseTime(nextDaily);
    text += "Reset in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
            + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
    message.channel.sendMessage(text);
}

EmployeeBot.prototype.handleMaintenanceCommand = function(message) {

    var text = message.content.trim().toLowerCase();
    if (text !== "~maint" && text !== "~maintenance") return;
    if (this.preventPM(message)) return;

    var now = new Date();
    var maintenanceList = [];
    if (message.channel.name === this.dmmChannelName) {
        maintenanceList = this.dmmMaintenanceList;
    } else if (message.channel.name === this.nutakuChannelName) {
        maintenanceList = this.nutakuMaintenanceList;
    } else {
        return;
    }

    text = "\n";
    for(var i=0;i<maintenanceList.length;i++) {
        var startTime = new Date(maintenanceList[i].startTime);
        var endTime = new Date(maintenanceList[i].endTime);
        text += "**" + maintenanceList[i].name + "**\n";

        if (now.valueOf() < startTime.valueOf()) {
            var time = helper.parseTime(startTime.valueOf() - now.valueOf());
            text += "Start in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                    + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
        } else if (startTime.valueOf() <= now.valueOf() && now.valueOf() <= endTime.valueOf()) {
            var time = helper.parseTime(endTime.valueOf() - now.valueOf());
            text += "End in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                    + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
        } 
    }
    if (text.length > 1) {
        message.channel.sendMessage(text);
    }
}

EmployeeBot.prototype.handleBasicGreetingCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    cleanedText = helper.cleanText(text);
    
    if (cleanedText === "") return;
    var now = new Date();
    var userId = message.author.id;

    // if (cleanedText === "hi" || cleanedText === "hello" || cleanedText === "hai") {
    //     if (now.valueOf() - this.lastTimeSayingHi < 60*1000) return;
    //     if (typeof this.lastTimeSayingHiToPlayers[userId] == "undefined") {
    //         this.lastTimeSayingHiToPlayers[userId] = 0;
    //     }
    //     if (now.valueOf() - this.lastTimeSayingHiToPlayers[userId] < 60*60*1000) return;
    //     this.lastTimeSayingHiToPlayers[userId] = now.valueOf();

    //     var reply = this.getRandomMessages(this.commonGreetings);
    //     message.channel.sendMessage(reply);
    //     this.lastTimeSayingHi = now.valueOf();
    // } else if (cleanedText === "gm" || cleanedText === "good morning" || cleanedText === "morning") {
    //     if (now.valueOf() - this.lastTimeGoodMorning < 60*1000) return;
    //     if (typeof this.lastTimeGoodMorningToPlayers[userId] == "undefined") {
    //         this.lastTimeGoodMorningToPlayers[userId] = 0;
    //     }
    //     if (now.valueOf() - this.lastTimeGoodMorningToPlayers[userId] < 60*60*1000) return;
    //     this.lastTimeGoodMorningToPlayers[userId] = now.valueOf();
        
    //     var reply = this.getRandomMessages(this.commonGoodMorning);
    //     message.channel.sendMessage(reply);
    //     this.lastTimeGoodMorning = now.valueOf();
    // } else if (cleanedText === "gn" || cleanedText === "good night" || cleanedText === "nite" || cleanedText === "night") {
    //     if (now.valueOf() - this.lastTimeGoodNight < 60*1000) return;
    //     if (typeof this.lastTimeGoodNightToPlayers[userId] == "undefined") {
    //         this.lastTimeGoodNightToPlayers[userId] = 0;
    //     }
    //     if (now.valueOf() - this.lastTimeGoodNightToPlayers[userId] < 60*60*1000) return;
    //     this.lastTimeGoodNightToPlayers[userId] = now.valueOf();
        
    //     var reply = this.getRandomMessages(this.commonGoodNight);
    //     message.channel.sendMessage(reply);
    //     this.lastTimeGoodNight = now.valueOf();
    // } else 
    if (text === "~thank" || text === "~thanks" || text === "~tks" || text === "~ty") {
        if (now.valueOf() - this.lastTimeThanks < 60*1000) return;
        var reply = this.getRandomMessages(this.commonThanks);
        message.channel.sendMessage(reply);
        this.lastTimeThanks = now.valueOf();
    } 
    // else if (cleanedText === "happy halloween") {
    //     var reply = this.getRandomMessages(this.halloween);
    //     message.channel.sendMessage(reply);
    // } else if (cleanedText === "trick or treat" || cleanedText === "treat or trick") {
    //     if (typeof this.lastTimeGiveCandyToPlayers[userId] == "undefined") {
    //         this.lastTimeGiveCandyToPlayers[userId] = 0;
    //     }
    //     if (now.valueOf() - this.lastTimeGiveCandyToPlayers[userId] < 60*1000) return;

    //     var reply = this.getRandomMessages(this.trickortreat);
    //     if (reply === "") {
    //         this.remainingBread[userId]++;
    //         reply = "*gives* :bread:"
    //     }
    //     message.reply(reply);
    //     this.lastTimeGiveCandyToPlayers[userId] = now.valueOf();
    // }
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

function checkCanManageSoul(message) {
    if (message.author.id != "146556639342755840") {
        message.guild.fetchMember("146556639342755840").then(member => {
            message.reply("You are not qualified for this. Only " + member + " is allowed to manage your souls.");
        }).catch(err => {
            console.log("Error in fetching member. " + err)
        });
        return false;
    }
    return true;
}

EmployeeBot.prototype.handleSpecialCase = function(message) {
    if (message.author.id === "147305572012654592") {   // uzies special case
        var text = message.content.trim().toLowerCase();
        if (text === ":p" || text === ";p") {
            message.channel.sendMessage(text);
        }
        return;
    }

    var text = message.content.trim().toLowerCase();
    if (text.startsWith("-eatsoul ")) {
        if (this.preventPM(message)) return;
        if (!checkCanManageSoul(message)) return;

        const breadEmoji = message.guild.emojis.find('name', 'kbread');
        const lolEmoji = message.guild.emojis.find('name', 'klol');

        var content = text.substring(9);
        var targetId = helper.getIdFromMention(content);
        if (targetId === "") return;
        if (targetId === message.author.id) {
            message.channel.sendMessage("Ewww " + message.author + ", that's disgusting... Are you sure you want to do that?");
            return;
        }

        if (typeof this.hasSoul[targetId] === "undefined") this.hasSoul[targetId] = true;
        if (this.hasSoul[targetId]) {
            this.hasSoul[targetId] = false;
            this.saveSoul();

            message.guild.fetchMember(targetId).then(targetMember => {
                message.channel.sendMessage(targetMember + " is now haunted. " + message.author + " devoured your Soul :ghost: and rendered the " + breadEmoji + " useless! " + lolEmoji);
            }).catch(err => {
                console.log("Error in fetching member. " + err)
            });
        } else {
            message.channel.sendMessage(message.author + ", I understand that your hunger is insatiable, but only one Soul :ghost: for each person. Relax a bit!")
        }
        
    } else if (text.startsWith("-givesoul ")) {
        if (this.preventPM(message)) return;
        if (!checkCanManageSoul(message)) return;

        const breadEmoji = message.guild.emojis.find('name', 'kbread');

        var content = text.substring(10);
        var targetId = helper.getIdFromMention(content);
        if (targetId === "") return;
        if (targetId === message.author.id) {
            message.channel.sendMessage("Whose soul should I get for you, master " + message.author + "?");
            return;
        }

        if (typeof this.hasSoul[targetId] === "undefined") this.hasSoul[targetId] = true;
        if (!this.hasSoul[targetId]) {
            this.hasSoul[targetId] = true;
            this.saveSoul();

            message.guild.fetchMember(targetId).then(targetMember => {
                message.channel.sendMessage(message.author + " decided to return the Soul :ghost: back to " + targetMember + ". Use it wisely. The same with the " + breadEmoji + "!");
            }).catch(err => {
                console.log("Error in fetching member.")
            });
        } else {
            message.guild.fetchMember(targetId).then(targetMember => {
                message.channel.sendMessage(targetMember + " already has a Soul :ghost: . There's only so many that can fit in a single body.")    
            }).catch(err => {
                console.log("Error in fetching member.")
            });
        }
    }
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

EmployeeBot.prototype.handleBreadCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    if (text !== "~bread") return;
    
    var authorId = message.author.id;
    message.reply(this.createRemainingBreadLine(message));
}

EmployeeBot.prototype.handleTotalBreadCommand = function(message) {
    if (!this.isAdmin(message)) return;
    var text = message.content.trim().toLowerCase();
    if (text === "~totalbread") {
        message.reply("\nTotal bread received: " + this.total_bread);
    }
}

EmployeeBot.prototype.handleAssignRoleCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    var member = message.member;
    if (member == null) return;

    switch(text) {
    case '~setnutaku':
        if (this.preventPM(message)) return;

        var nutakuRole = message.guild.roles.find('name', 'Nutaku');
        member.addRole(nutakuRole).then(output => {
            message.reply("Nutaku Role added.");
        }).catch(err => {
            message.reply("Sorry, I don't have permission to add this Role.");
        });
        break;
    case '~removenutaku':
        if (this.preventPM(message)) return;

        var nutakuRole = message.guild.roles.find('name', 'Nutaku');
        member.removeRole(nutakuRole).then(output => {
            message.reply("Nutaku Role removed.");
        }).catch(err => {
            message.reply("Sorry, I don't have permission to remove this Role.");
        });
        break;
    case '~setdmm':
        if (this.preventPM(message)) return;

        var dmmRole = message.guild.roles.find('name', 'DMM');
        member.addRole(dmmRole).then(output => {
            message.reply("DMM Role added.");
        }).catch(err => {
            message.reply("Sorry, I don't have permission to add this Role.");
        });
        break;
    case '~removedmm':
        if (this.preventPM(message)) return;

        var dmmRole = message.guild.roles.find('name', 'DMM');
        member.removeRole(dmmRole).then(output => {
            message.reply("DMM Role removed.");
        }).catch(err => {
            message.reply("Sorry, I don't have permission to remove this Role.");
        });
        break;
    }
}

EmployeeBot.prototype.consumeBread = function(message, amount = 1) {
    var userId = message.author.id;
    this.initBreadIfNeed(userId);
    if (this.checkNoSoul(message)) return false;
    if (message.author.id === "146556639342755840") return true;
    if (this.remainingBread[userId] >= amount) {
        this.remainingBread[userId] -= amount;
        return true;
    } else {
        message.reply("You don't have enough bread.");
        return false;
    }
}

EmployeeBot.prototype.handleGiveBreadCommand = function(message) {
    var text = helper.removeExtraSpace(message.content.trim().toLowerCase());
    var args = text.split(" ");
    if (args[0] !== "~givebread") return;
    if (args.length < 2 || args.length > 3) return;
    var giverId = message.author.id;

    var receiverId = "";
    var amount = 1;

    if (args.length === 2) {
        receiverId = helper.getIdFromMention(args[1]);
        if (receiverId === "") return;
    } else if (args.length === 3) {
        if (!isNaN(args[1]) && helper.isMention(args[2])) {
            amount = Math.floor(parseInt(args[1]));
            // amount = Math.min(amount, this.remainingBread[giverId]);
            // amount = Math.max(amount, 1);
            receiverId = helper.getIdFromMention(args[2]);
        } else if (!isNaN(args[2]) && helper.isMention(args[1])) {
            amount = Math.floor(parseInt(args[2]));
            // amount = Math.min(amount, this.remainingBread[giverId]);
            // amount = Math.max(amount, 1);
            receiverId = helper.getIdFromMention(args[1]);
        } else {
            return;
        }
    }
    
    if (amount < 1) {
        message.reply("The amount of bread should be at least 1.");
        return;
    } else if (amount > this.remainingBread[giverId]) {
        var text = "The amount of bread should not be more than what you have.";
        if (this.remainingBread[giverId] <= 0) {
            message.reply("You have **no Bread**. " + text);
        } else {
            message.reply("You only have **" + this.remainingBread[giverId] + " Bread**. " + text);
        }
        return;
    }

    if (this.consumeBread(message, amount)) {
        this.initBreadIfNeed(receiverId);
        this.remainingBread[receiverId] += amount;
        message.reply(amount + " Bread has been transfered.");
    }
}

EmployeeBot.prototype.handleCharaCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    if (!text.startsWith("~chara ")) return;
    
    var name = helper.removeExtraSpace(text.substring(6));
    if (name === "") return;
    if (name.length > 100) {
        message.reply("The name is too long!");
        return;
    }

    var employee = this.employeeDatabase.getEmployeeByCommonName(name);
    if (employee == null) {
        var classId = -1;
        if (name == "fighter") classId = 1;
        if (name == "ronin") classId = 2;
        if (name == "archer") classId = 3;
        if (name == "soldier") classId = 4;
        if (name == "warrior") classId = 5;
        if (name == "cleric" || name == "healer") classId = 6;
        if (name == "rogue" || name == "assassin") classId = 7;
        if (name == "magician" || name == "mage") classId = 8;

        var suggestions = [];
        if (classId > 0) {
            suggestions = this.employeeDatabase.getSuggestionsByClass(classId);
        } else {
            suggestions = this.employeeDatabase.getSuggestionsByName(name);
        }
        text = "Do you mean: ";
        for(var i=0;i<suggestions.length;i++) {
            text += "**" + suggestions[i] + "**" + (i<suggestions.length-1 ? (i<suggestions.length-2?", ":" or ") : "?");
        }
        message.reply(text);

    } else {
        if (!this.isPM(message) && !this.consumeBread(message, 1)) return;

        employee = new Employee(employee);

        var bustupUrl = employee.getIllustURL("bustup");
        var star = 6;
        if (employee.getBaseRarity() === 5) star++;
        var enemySpriteUrl = employee.getSpriteImageURL(star, true, true);
        var allySpriteUrl = employee.getSpriteImageURL(star, false, true);

        var bustupFileName = "images/bustup/" + employee._id + ".png";
        var enemySpriteFileName = "images/enemy/" + employee.getSpriteImageName(star, true);
        var allySpriteFileName = "images/ally/" + employee.getSpriteImageName(star, true);

        var that = this;
        var queue = [
            { fileToDownload: enemySpriteUrl,   fileToSave: enemySpriteFileName},
            { fileToDownload: allySpriteUrl,    fileToSave: allySpriteFileName},
            { fileToDownload: bustupUrl,        fileToSave: bustupFileName}
        ];
        this.imageHelper.download(queue, function(err) {
            if (err) {
                message.reply("Error happened. Try again.");
                return;
            }

            that.imageHelper.read([enemySpriteFileName, allySpriteFileName, bustupFileName], function (err, imageList) {
                if (err) { console.log(err); return }
                enemySpriteImage = imageList[0];
                allySpriteImage = imageList[1];
                bustupImage = imageList[2];

                allySpriteImage.crop(0, 0, 360, 270);
                enemySpriteImage.crop(0, 0, 360, 270);
                bustupImage.resize(Jimp.AUTO, 600).opacity(0.3);

                var imageName = "images/chara/" + employee._id + ".png";
                var image = new Jimp(480, 290, function (err, image) {

                    image.composite(bustupImage, 
                        -Math.floor((bustupImage.bitmap.width - image.bitmap.width)/2), 
                        -Math.floor((bustupImage.bitmap.height - image.bitmap.height)/2) - 20
                    )
                    .composite(enemySpriteImage, 160, 0)
                    .composite(allySpriteImage, -60, 40)
                    .crop(1, 0, 478, 290)
                    .write(imageName, function() {
                        var channel = message.channel;
                        if (channel.type === "text" || channel.type === "dm") {
                            var emojiName = 'k' + employee.getClass().toLowerCase();
                            const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
                            
                            var text = "\n";
                            text += "Employee **No." + (employee.isEx()?"EX":"") + (employee._no == 0? "???":employee._no)  + "**\n";
                            text += "Name: **" + employee.fullName + " (" + employee.japaneseName + ")**\n";
                            text += "Class: **" + employee.getClass() + "** " +  (classEmoji != null? classEmoji : "") + "\n";
                            text += "Rarity: ";
                            for(var i=0;i<employee.getBaseRarity();i++) text += ":star:";
                            text += "\n";
                            channel.sendFile(imageName, "png", text);
                        }    
                    });
                });
            });
        });
    }
}

EmployeeBot.prototype.handleMeCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    if (text != "~me") return;

    var userId = message.author.id;
    if (typeof this.player[userId] === "undefined") {
        message.reply("You haven't selected your character.");
        return;
    }

    var employee = new Employee(this.employeeDatabase.getEmployeeById(this.player[userId].characterId));
    employee.setExp(this.player[userId].exp);

    var enemySpriteUrl = employee.getSpriteImageURL(employee.getRarity(), true, false, 2);
    var enemySpriteFileName = "images/enemy/" + employee.getSpriteImageName(employee.getRarity(), false, 2);
    
    var that = this;
    var queue = [
        { fileToDownload: enemySpriteUrl,   fileToSave: enemySpriteFileName}
    ];
    this.imageHelper.download(queue, function(err) {
        if (err) {
            message.reply("Error happened. Try again.");
            return;
        }

        var itemCellFileName = "images/misc/itemCell.png";
        var backgroundFileName = "images/misc/background/" + that.backgroundFileNames[helper.randomInt(that.backgroundFileNames.length)];

        that.imageHelper.read([enemySpriteFileName, itemCellFileName, backgroundFileName], function (err, imageList) {
            if (err) { console.log(err); return }
            enemySpriteImage = imageList[0];
            itemCellImage = imageList[1];
            backgroundImage = imageList[2];

            backgroundImage.crop(250,100, 310,270);
            enemySpriteImage.crop(20, 0, 310, 270);

            backgroundImage.composite(enemySpriteImage, 0, 0)
            .composite(itemCellImage, 10, 10)
            .composite(itemCellImage, 10, 60)
            .composite(itemCellImage, 10, 110);

            var imageName = "images/me/" + message.author.id + ".png";
            backgroundImage.write(imageName, function() {
                var channel = message.channel;
                if (channel.type === "text" || channel.type === "dm") {
                    
                    var emojiName = 'k' + employee.getClass().toLowerCase();
                    const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
                    const hpEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'khp'));
                    const atkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'katk'));
                    const defEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kdef'));
                    const matkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmatk'));
                    const mdefEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmdef'));

                    var text = "\n";
                    text += "Player: **" + message.author.username + "**\n";
                    text += "Character: **" + employee.fullName + "** (Lv.**" + employee.levelCached  + "**)\n";
                    text += "Rarity: ";
                    for(var i=0;i<employee.getBaseRarity();i++) text += ":star:";
                    text += "\n";

                    text += "Class: **" + employee.getClass() + "** " + (classEmoji != null? classEmoji : "")  + "\n";
                    text += "Exp: **" + employee.exp + "**\n";
                    text += (hpEmoji != null? hpEmoji + " " : "") + "HP: **" + employee.getHP() + "**\n";
                    text += (atkEmoji != null? atkEmoji + " " : "") + "Atk: **" + employee.getAtk() + "**\t";
                    text += (matkEmoji != null? matkEmoji + " " : "") + "M.Atk: **" + employee.getMAtk() + "**\n";
                    text += (defEmoji != null? defEmoji + " " : "") + "Def: **" + employee.getDef() + "**\t";
                    text += (mdefEmoji != null? mdefEmoji + " " : "") + "M.Def: **" + employee.getMDef() + "**\n";

                    if (that.isPM(message)) {
                        text += "**STR: " + employee.getSTR() + "**\t\t";
                        text += "**INT: " + employee.getINT() + "**\n";
                        text += "**VIT: " + employee.getVIT() + "**\t\t";
                        text += "**PIE: " + employee.getPIE() + "**\n";
                        text += "**AGI: " + employee.getAGI() + "**\t\t";
                        text += "**LUK: " + employee.getLUK() + "**\n";
                        text += "**DEX: " + employee.getDEX() + "**\n";
                    }
                    channel.sendFile(imageName, "png", text);
                }
            });
        });
    });
}


EmployeeBot.prototype.handleTopCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    if (text != "~top") return;
    if (this.preventPM(message)) return;

    var result = [];
    for (key in this.player) {
        var employee = new Employee(this.employeeDatabase.getEmployeeById(this.player[key].characterId));
        employee.setExp(this.player[key].exp);
        result.push({
            userId: key,
            employee: employee
        });
    }
    result.sort(function(a, b) {
        if (a.employee.levelCached != b.employee.levelCached) {
            return b.employee.levelCached - b.employee.levelCached;    
        } else {
            return b.employee.getBaseRarity() - a.employee.getBaseRarity();
        }
    })
    var count = 0;
    var text = "Top 10 players:\n";
    
    message.guild.fetchMembers().then(guild => {
        for(var i=0;i<Math.min(result.length, 10);i++) {
            if (i==0 || result[i-1].employee.levelCached != result[i].employee.levelCached) count = i;
            var member = guild.members.find('id', result[i].userId);
            var emojiName = 'k' + result[i].employee.getClass().toLowerCase();
            const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
            if (member) {
                text += (count+1) + ". " + member.user.username + " (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", Lv.**" + result[i].employee.levelCached + "**)\n";
            }
        }
        message.channel.sendMessage(text);
    }).catch(err => {
        message.channel.sendMessage("Fetching member error! " + err);
    });
}

EmployeeBot.prototype.handleMyTopCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    if (text != "~mytop") return;
    if (this.preventPM(message)) return;

    var result = [];
    for (key in this.player) {
        var employee = new Employee(this.employeeDatabase.getEmployeeById(this.player[key].characterId));
        employee.setExp(this.player[key].exp);
        result.push({
            userId: key,
            employee: employee
        });
    }
    result.sort(function(a, b) {
        if (a.employee.levelCached != b.employee.levelCached) {
            return b.employee.levelCached - b.employee.levelCached;    
        } else {
            return b.employee.getBaseRarity() - a.employee.getBaseRarity();
        }
    })
    
    message.guild.fetchMembers().then(guild => {
        var count = 0;
        var text = "Your Ranking:\n";
        var userId = message.author.id;
        var userOrder = 0;
        for(;userOrder<result.length;userOrder++) {
            if (result[userOrder].userId === userId) break;
        }
        if (userOrder == result.length) {
            message.reply("You are not in the ranking.");
            return;
        } else {
            var count = 0;
            var text = "Your ranking:\n";
            var lower_bound = Math.min(userOrder + 4, result.length-1);
            var upper_bound = Math.max(lower_bound - 9, 0);
            lower_bound = Math.min(upper_bound + 9, result.length-1);
            for(var i=0;i<result.length;i++) {
                if (i==0 || result[i-1].point != result[i].point) count = i;
                var member = guild.members.find('id', result[i].userId);
                var emojiName = 'k' + result[i].employee.getClass().toLowerCase();
                const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
                if (member && (upper_bound <= i) && (i<=lower_bound)) {
                    if (i === userOrder) {
                        text += "**" + (count+1) + ". " + member.user.username + "** (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", Lv.**" + result[i].employee.levelCached + "**)\n";
                    } else {
                        text += (count+1) + ". " + member.user.username + " (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", Lv.**" + result[i].employee.levelCached + "**)\n";
                    }
                }
            }
            message.channel.sendMessage(text);
        }
    }).catch(err => {
        message.channel.sendMessage("Fetching member error! " + err);
    });
}

EmployeeBot.prototype.handleRollCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    if (text != "~roll") return;
    if (message.channel.name === this.dmmChannelName || message.channel.name === this.nutakuChannelName) {
        return;
    }
    var userId = message.author.id;
    if (typeof this.freeRoll[userId] === "undefined") this.freeRoll[userId] = 4;

    if (this.freeRoll[userId] <= 0 && !this.canUseBreadToRoll) {
        message.reply("You have used all free draws today!");
        return;
    }
    
    var rarity = helper.randomDist([17, 17, 10, 5, 1]) + 1;
    var employeeList = this.employeeDatabase.getEmployeesByRarirty(rarity);
    var rolledEmployee = new Employee(employeeList[helper.randomInt(employeeList.length)]);

    var photoUrl = rolledEmployee.getIllustURL('photo');
    var photoFileName = "images/photo/" + rolledEmployee._id + ".png";

    var spriteUrl = rolledEmployee.getSpriteImageURL(rolledEmployee.getBaseRarity(), true, false, 2);
    var spriteFileName = "images/enemy/" + rolledEmployee.getSpriteImageName(rolledEmployee.getBaseRarity(), false, 2);

    var that = this;
    var queue = [
        { fileToDownload: photoUrl,     fileToSave: photoFileName},
        { fileToDownload: spriteUrl,    fileToSave: spriteFileName}
    ];

    var classFileName = "images/misc/" + rolledEmployee.getClass().toLowerCase() + ".png";
    var normalStarFileName = "images/misc/normalStar.png";
    var highlightStarFileName = "images/misc/highlightStar.png";
    var resumeFileName = "images/misc/resumeForm.png";
    this.imageHelper.download(queue, function(err) {
        if (err) {
            message.reply("Envelope got lost. Try again.");
            console.log(err); 
            return;
        }
        var imageFileNameQueue = [
            photoFileName, 
            spriteFileName, 
            classFileName, 
            normalStarFileName, 
            highlightStarFileName, 
            resumeFileName
        ];
        that.imageHelper.read(imageFileNameQueue, function (err, imageList) {
            if (err) { 
                message.reply("Envelope got lost. Try again.");
                console.log(err); 
                return 
            }
            var photoImage = imageList[0];
            var spriteImage = imageList[1];
            var classImage = imageList[2];
            var normalStarImage = imageList[3];
            var highlightStarImage = imageList[4];
            var resume = imageList[5];

            var resumeFileName = "images/resume/" + rolledEmployee._id + ".png";

            spriteImage.crop(0, 0, 360, 270);

            Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function (font) {
                resume.print(font, 240, 102, rolledEmployee.fullName);

                resume.composite(classImage, 232, 140)
                    .composite(spriteImage, -20, 50)
                    .composite(photoImage, 18, 90);
                
                for(var i=0;i<(rolledEmployee.getBaseRarity() === 5?7:6);i++) {
                    if (i < rolledEmployee.getBaseRarity()) {
                        resume.composite(highlightStarImage, 270+ i*13, 160);
                    } else {
                        resume.composite(normalStarImage, 270 + i*13, 160);
                    }
                }

                resume.print(font, 272, 140, rolledEmployee.getClass());

                resume.print(font, 285, 185, "" + rolledEmployee.getHP());
                resume.print(font, 285, 208, "" + rolledEmployee.getAtk());
                resume.print(font, 285, 231, "" + rolledEmployee.getMAtk());

                resume.print(font, 415, 208, "" + rolledEmployee.getDef());
                resume.print(font, 415, 231, "" + rolledEmployee.getMDef());

                resume.print(font, 20, 273, "Use \"~take\" to select this employee.");

                resume.write(resumeFileName, function() {
                    var channel = message.channel;
                    if (channel.type === "text" || channel.type === "dm") {
                        if (message.author.id != "146556639342755840") {
                            if (that.freeRoll[userId] > 0) {
                                that.freeRoll[userId]--;
                            } else {
                                if (!that.consumeBread(message)) return;
                            }    
                        }
                        that.rollResult[userId] = rolledEmployee._id;
                        channel.sendFile(resumeFileName, "png", "The resume is in! " + message.author);    
                    }    
                });
            });
        });
    });
}

EmployeeBot.prototype.handleTakeCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    if (text != "~take") return;
    var userId = message.author.id;

    if (typeof this.rollResult[userId] === "undefined" || this.rollResult[userId] === null) {
        message.reply("You have to roll first.");
        this.rollResult[userId] = null;
        return;
    }

    if (typeof this.player[userId] === "undefined") {
        this.player[userId] = {
            characterId: "",
            exp: 0,
            equipedWeapon: null,
            equipedArmor: null,
            equipedAccessory: null,
            materialList: [],
            weaponList: [],
            armorList: [],
            accessoryList: []
        };
    }
    this.player[userId].characterId = this.rollResult[userId];
    this.player[userId].exp = Math.floor(this.player[userId].exp/2);
    if (this.player[userId].equipedWeapon) {
        this.player[userId].weaponList.push(this.player[userId].equipedWeapon);
        this.player[userId].equipedWeapon = null;
    }
    if (this.player[userId].equipedArmor) {
        this.player[userId].armorList.push(this.player[userId].equipedArmor);
        this.player[userId].equipedArmor = null;
    }
    this.savePlayer();
    var employee = new Employee(this.employeeDatabase.getEmployeeById(this.rollResult[userId]));
    message.reply("Congratulation! You have selected **" + employee.fullName + "** as your character.");
    this.rollResult[userId] = null;
}

EmployeeBot.prototype.handleCommonCommand = function(message) {
    if (message.author.bot === true) return;
    this.handleEventCommand(message);
    this.handleMaintenanceCommand(message);
    this.handleDailyCommand(message);
    this.handleBasicGreetingCommand(message);
    //this.handleSleepCommand(message);
    this.handleBreadCommand(message);
    this.handleTotalBreadCommand(message);
    this.handleAssignRoleCommand(message);
    this.handleGiveBreadCommand(message);
    this.handleCharaCommand(message);
    this.handleMeCommand(message);
    this.handleTopCommand(message);
    this.handleMyTopCommand(message);
    this.handleRollCommand(message);
    this.handleTakeCommand(message);
    this.handleSpecialCase(message);
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

// EmployeeBot.prototype.setIdleTalk = function() {
//     this.hasNewMessage = false;
//     var time = Math.floor(Math.random() * (15*60*1000) + 15*60*1000);
//     console.log(time);
//     var that = this;
//     setTimeout(function() {
//         console.log("triggered " + that.hasNewMessage);
//         if (that.hasNewMessage) {
//             var channels = that.bot.channels.array();
//             for(var i=0;i<channels.length;i++) {
//                 if (channels[i].type === "text" && channels[i].name === that.nutakuChannelName) {
//                     that.sayRandomMessages(channels[i], that.idleTalks);
//                 }
//             }
//         }
//         that.setIdleTalk();
//     }, time);  // 15 - 30 mins
// }

EmployeeBot.prototype.setDailyDrawReminderForNutaku = function() {
    var time = helper.getTimeUntilDaily(this.nutakuDailyRemind); 
    var that = this;
    console.log("time: " + time);
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
            if (that.remainingBread[key] < that.cappedBread) {
                that.remainingBread[key]++;
            }
        }
        if (that.startBread < that.cappedBread) {
            that.startBread++;
        }
        console.log("1 bread is given to each player");
        that.setBreadRegeneration();
    }, that.replenishTime);
}

var soulFileName = "soul.json";

EmployeeBot.prototype.saveSoul = function() {
    var textToWrite = JSON.stringify(this.hasSoul, null, 4);
    fs.writeFile(soulFileName, textToWrite, function(err) {
        if(err) return console.log(err);
        console.log("The Soul file was saved!");
    }); 
}

EmployeeBot.prototype.loadSoul = function() {
    var that = this;
    fs.readFile(soulFileName, 'utf8', function (err, data) {
        if (err) return;
        that.hasSoul = JSON.parse(data);
        console.log("Soul file:");
    });
}

var playerFileName = "player.json";

EmployeeBot.prototype.savePlayer = function() {
    var textToWrite = JSON.stringify(this.player, null, 4);
    fs.writeFile(playerFileName, textToWrite, function(err) {
        if(err) return console.log(err);
        console.log("The file was saved!");
    }); 
}

EmployeeBot.prototype.loadPlayer = function() {
    var that = this;
    fs.readFile(playerFileName, 'utf8', function (err, data) {
        if (err) return;
        try {
            that.player = JSON.parse(data);
            console.log(that.player);    
        }
        catch (err) {
            that.player = {};
            console.log(err);
        }
        
    });
}

EmployeeBot.prototype.ready = function() {
    if (this.firstTimeReady) {
        console.log("Bot is on. Serving on " + this.bot.channels.array().length + " channels");
        console.log("-----");
        var channels = this.bot.channels.array();
        for(var i=0;i<channels.length;i++) {
            if (channels[i].type === "text" && channels[i].name === this.nutakuChannelName) {
                this.greeting(channels[i]);
            }
        }
        //this.setIdleTalk();
        this.setDailyDrawReminderForNutaku();
        this.setDailyDrawReminderForDmm();
        this.setBreadRegeneration();
        this.firstTimeReady = false;
        this.loadSoul();
        this.loadPlayer();
    } else {
        console.log("Bot is restarted");
    }
}

var employee = new EmployeeBot();

employee.bot.on('guildMemberAdd', (guild, member) => {
    var channels = guild.channels.array();
    for(var i=0;i<channels.length;i++) {
        if (channels[i].type === "text" && channels[i].name === "player_join_leave_server") {
            var text = "**" + member.user.username + "** has joined.\n";
            text += "Member count: " + member.guild.memberCount;
            channels[i].sendMessage(text);
        } 
    }
});

employee.bot.on('guildMemberRemove', (guild, member) => {
    var channels = guild.channels.array();
    for(var i=0;i<channels.length;i++) {
        if (channels[i].type === "text" && channels[i].name === "player_join_leave_server") {
            var text = "**" + member.user.username + "** has leaved.\n";
            text += "Member count: " + guild.memberCount;
            channels[i].sendMessage(text);
        } 
    }
});

module.exports = employee;