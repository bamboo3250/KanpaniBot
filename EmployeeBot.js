var Discord = require("discord.js");

function Employee() {
    this.dmmChannelName = "dmm_games";
    this.nutakuChannelName = "kanpani_girls";
    this.bot = new Discord.Client();
    this.dmmEventList = [
        {
            name: "Hotsprings, Monique, and Bath Towels",
            startTime: "Oct 28 2016 17:00:00 GMT+0900",
            endTime: "Nov 18 2016 13:00:00 GMT+0900"
        }
    ];
    this.nutakuEventList = [
    ];
    this.dmmMaintenanceList = [
        {
            name: "DMM Maintenance",
            startTime: "Nov 4 2016 14:00:00 GMT+0900",
            endTime: "Nov 4 2016 17:00:00 GMT+0900"
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

    this.firstTimeReady = true;
}

Employee.prototype.parseTime = function(millisec) {
    return {
        day: Math.floor(millisec/(24*60*60*1000)),
        hour: Math.floor((millisec%(24*60*60*1000))/(60*60*1000)),
        min: Math.floor((millisec%(60*60*1000))/(60*1000)),
        sec: Math.floor((millisec%(60*1000))/(1000))
    };
}

Employee.prototype.isPM = function(message) {
    return ((typeof message.guild === "undefined") || message.guild == null);
}

Employee.prototype.preventPM = function(message) {
    if (this.isPM(message)) {
        message.reply("You can't ask me in Private Message.");
        return true;
    } else return false;
}

Employee.prototype.handleEventCommand = function(message) {

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
            var time = this.parseTime(startTime.valueOf() - now.valueOf());
            text += "Start in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                    + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
        } else if (startTime.valueOf() <= now.valueOf() && now.valueOf() <= endTime.valueOf()) {
            var time = this.parseTime(endTime.valueOf() - now.valueOf());
            text += "End in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                    + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
        } 
    }
    if (text.length > 1) {
        message.channel.sendMessage(text);
    }
}

function getTimeUntilDaily(timeInString) {
    var startTime = new Date(timeInString);
    var now = new Date();
    var timeUntil = Math.floor((now.valueOf() - startTime.valueOf())/(24*60*60*1000)) + 1;
    timeUntil = startTime.valueOf() + timeUntil*(24*60*60*1000) - now.valueOf();
    return timeUntil;
}

Employee.prototype.handleDailyCommand = function(message) {

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
    nextDaily = getTimeUntilDaily(dailyEvent.time)
    var time = this.parseTime(nextDaily);
    text += "Reset in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
            + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
    message.channel.sendMessage(text);
}

Employee.prototype.handleMaintenanceCommand = function(message) {

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
            var time = this.parseTime(startTime.valueOf() - now.valueOf());
            text += "Start in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                    + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
        } else if (startTime.valueOf() <= now.valueOf() && now.valueOf() <= endTime.valueOf()) {
            var time = this.parseTime(endTime.valueOf() - now.valueOf());
            text += "End in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                    + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
        } 
    }
    if (text.length > 1) {
        message.channel.sendMessage(text);
    }
}

function removeExtraSpace(text) {
    return text.trim().replace(/\s+/g,' ');
}

function cleanText(text) {
    return removeExtraSpace(text.replace(/[^A-Za-z]+/g,' '));
}

Employee.prototype.handleBasicGreetingCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    cleanedText = cleanText(text);
    
    if (cleanedText === "") return;
    var now = new Date();
    var userId = message.author.id;

    if (cleanedText === "hi" || cleanedText === "hello" || cleanedText === "hai") {
        if (now.valueOf() - this.lastTimeSayingHi < 60*1000) return;
        if (typeof this.lastTimeSayingHiToPlayers[userId] == "undefined") {
            this.lastTimeSayingHiToPlayers[userId] = 0;
        }
        if (now.valueOf() - this.lastTimeSayingHiToPlayers[userId] < 60*60*1000) return;
        this.lastTimeSayingHiToPlayers[userId] = now.valueOf();

        var reply = this.getRandomMessages(this.commonGreetings);
        message.channel.sendMessage(reply);
        this.lastTimeSayingHi = now.valueOf();
    } else if (cleanedText === "gm" || cleanedText === "good morning" || cleanedText === "morning") {
        if (now.valueOf() - this.lastTimeGoodMorning < 60*1000) return;
        if (typeof this.lastTimeGoodMorningToPlayers[userId] == "undefined") {
            this.lastTimeGoodMorningToPlayers[userId] = 0;
        }
        if (now.valueOf() - this.lastTimeGoodMorningToPlayers[userId] < 60*60*1000) return;
        this.lastTimeGoodMorningToPlayers[userId] = now.valueOf();
        
        var reply = this.getRandomMessages(this.commonGoodMorning);
        message.channel.sendMessage(reply);
        this.lastTimeGoodMorning = now.valueOf();
    } else if (cleanedText === "gn" || cleanedText === "good night" || cleanedText === "nite" || cleanedText === "night") {
        if (now.valueOf() - this.lastTimeGoodNight < 60*1000) return;
        if (typeof this.lastTimeGoodNightToPlayers[userId] == "undefined") {
            this.lastTimeGoodNightToPlayers[userId] = 0;
        }
        if (now.valueOf() - this.lastTimeGoodNightToPlayers[userId] < 60*60*1000) return;
        this.lastTimeGoodNightToPlayers[userId] = now.valueOf();
        
        var reply = this.getRandomMessages(this.commonGoodNight);
        message.channel.sendMessage(reply);
        this.lastTimeGoodNight = now.valueOf();
    } else if (text === "~thank" || text === "~thanks" || text === "~tks" || text === "~ty") {
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

Employee.prototype.handleSpecialCase = function(message) {
    if (message.author.id === "147305572012654592") {   // uzies special case
        var text = message.content.trim().toLowerCase();
        if (text === ":p" || text === ";p") {
            message.channel.sendMessage(text);
        }
    }
}

Employee.prototype.isAdmin = function(message) {
    return (message.author.id === "162995652152786944");
}

Employee.prototype.handleSleepCommand = function(message) {
    if (message.author.id != "162995652152786944") return;
    //message.channel.sendMessage("I'm going to sleep now~");
    //this.bot.destroy();
}

Employee.prototype.initBreadIfNeed = function(userId) {
    if (typeof this.remainingBread[userId] === "undefined") {
        this.remainingBread[userId] = this.startBread;
    }
}

Employee.prototype.createRemainingBreadLine = function(message) {
    var userId = message.author.id;
    if (this.isPM(message)) {
        return "Remaining Bread: " + this.remainingBread[userId];
    } else {
        const breadEmoji = message.guild.emojis.find('name', 'kbread');
        return "Remaining Bread: " + breadEmoji + " x" + this.remainingBread[userId];    
    }
}

Employee.prototype.handleBreadCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    if (text !== "~bread") return;
    
    var authorId = message.author.id;
    message.reply(this.createRemainingBreadLine(message));
}

Employee.prototype.handleTotalBreadCommand = function(message) {
    if (!this.isAdmin(message)) return;
    var text = message.content.trim().toLowerCase();
    if (text === "~totalbread") {
        message.reply("\nTotal bread received: " + this.total_bread);
    }
}

Employee.prototype.handleAssignRoleCommand = function(message) {
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

function getIdFromMention(text) {
    if (text.length < 3) return "";
    if (text.startsWith("<@") && text.endsWith(">")) {
        return text.substring(2, text.length - 1);
    } else return "";
}

Employee.prototype.handleGiveBreadCommand = function(message) {
    var text = removeExtraSpace(message.content.trim().toLowerCase());
    var args = text.split(" ");
    if (args[0] !== "~givebread") return;
    if (args.length < 2) return;
    var giverId = message.author.id;
    var receiverId = getIdFromMention(args[1]);
    if (receiverId === "") return;

    this.initBreadIfNeed(receiverId);
    if (this.remainingBread[giverId] > 0) {
        this.remainingBread[giverId]--;
        this.remainingBread[receiverId]++;
        message.reply("Your bread has been transfered.");
    }
}

Employee.prototype.handleCommonCommand = function(message) {
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
    this.handleSpecialCase(message);
}

Employee.prototype.getRandomMessages = function(messageList) {
    var length = messageList.length;
    if (length > 0) {
        return messageList[Math.floor(Math.random() * length)];    
    }
    return "";
}

Employee.prototype.sayRandomMessages = function(channel, messageList) {
    var length = messageList.length;
    if (length > 0) {
        var message = this.getRandomMessages(messageList);
        channel.sendMessage(message);    
    }
}

Employee.prototype.greeting = function(channel) {
    this.sayRandomMessages(channel, this.greetings);
}

// Employee.prototype.setIdleTalk = function() {
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

Employee.prototype.setDailyDrawReminderForNutaku = function() {
    var time = getTimeUntilDaily(this.nutakuDailyRemind); 
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

Employee.prototype.setDailyDrawReminderForDmm = function() {
    var time = getTimeUntilDaily(this.dmmDailyRemind); 
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

Employee.prototype.setBreadRegeneration = function() {
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

Employee.prototype.ready = function() {
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
    } else {
        console.log("Bot is restarted");
    }
}

var employee = new Employee();

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