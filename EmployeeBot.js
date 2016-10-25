var Discord = require("discord.js");

function Employee() {
    this.dmmChannelName = "dmm_games";
    this.nutakuChannelName = "kanpani_girls";
    this.bot = new Discord.Client();
    this.dmmEventList = [
        {
            name: "Triple Throne Campaign",
            startTime: "Oct 21 2016 17:00:00 GMT+0900",
            endTime: "Oct 28 2016 14:00:00 GMT+0900"
        }, {
            name: "Demon From Another World - Season 5",
            startTime: "Oct 7 2016 17:00:00 GMT+0900",
            endTime: "Oct 28 2016 14:00:00 GMT+0900"
        }
    ];
    this.nutakuEventList = [
    ];
    this.dmmMaintenanceList = [
        {
            name: "DMM Maintenance",
            startTime: "Oct 28 2016 14:00:00 GMT+0900",
            endTime: "Oct 28 2016 17:00:00 GMT+0900"
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
        "Good Morning"
    ];
    this.commonGoodNight = [
        "Good Night",
        "Have a sweet dream",
        "See you again"
    ];
    this.commonThanks = [
        "You are welcomed :heart:",
        "No problem",
    ];
    
    this.hasNewMessage = false;
    this.lastTimeSayingHi = 0;
    this.lastTimeGoodMorning = 0;
    this.lastTimeGoodNight = 0;
    this.lastTimeThanks = 0;
    this.lastTimeSayingHiToPlayers = {
    };
    this.lastTimeGoodMorningToPlayers = {
    };
    this.lastTimeGoodNightToPlayers = {
    };
    
}

Employee.prototype.parseTime = function(millisec) {
    return {
        day: Math.floor(millisec/(24*60*60*1000)),
        hour: Math.floor((millisec%(24*60*60*1000))/(60*60*1000)),
        min: Math.floor((millisec%(60*60*1000))/(60*1000)),
        sec: Math.floor((millisec%(60*1000))/(1000))
    };
}

Employee.prototype.handleEventCommand = function(message) {

    var text = message.content.trim().toLowerCase();
    if (text === "~event") {
        var now = new Date();
        var eventList = [];
        if (message.channel.name === this.dmmChannelName) {
            eventList = this.dmmEventList;
        } else if (message.channel.name === this.nutakuChannelName) {
            eventList = this.nutakuEventList;
        } else {
            return;
        }

        var text = "\n" + eventList.length + " active event(s)\n";
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
    if (text === "~daily") {
        var dailyEvent = null;
        if (message.channel.name === this.dmmChannelName) {
            dailyEvent = this.dmmDaily;
        } else if (message.channel.name === this.nutakuChannelName) {
            dailyEvent = this.nutakuDaily;
        } else {
            return;
        }

        nextDaily = getTimeUntilDaily(dailyEvent.time)
        var time = this.parseTime(nextDaily);
        text += "Reset in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
        message.channel.sendMessage(text);
    }
}

Employee.prototype.handleMaintenanceCommand = function(message) {

    var text = message.content.trim().toLowerCase();
    if (text === "~maint" || text === "~maintenance") {
        var now = new Date();
        var maintenanceList = [];
        if (message.channel.name === this.dmmChannelName) {
            maintenanceList = this.dmmMaintenanceList;
        } else if (message.channel.name === this.nutakuChannelName) {
            maintenanceList = this.nutakuMaintenanceList;
        } else {
            return;
        }

        var text = "\n";
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
}

function isAlphabet(c) {
    return ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z');
}

function cleanText(text) {
    return text.replace(/[^A-Za-z]+/g,' ').trim().replace(/\s+/g,' ');
}

Employee.prototype.handleBasicGreetingCommand = function(message) {
    var text = message.content.trim().toLowerCase();
    cleanedText = cleanText(text);
    
    if (cleanedText === "") return;
    var now = new Date();

    if (cleanedText === "hi" || cleanedText === "hello") {
        if (now.valueOf() - this.lastTimeSayingHi < 60*1000) return;
        if (typeof this.lastTimeSayingHiToPlayers[message.author.id] == "undefined") {
            this.lastTimeSayingHiToPlayers[message.author.id] = 0;
        }
        if (now.valueOf() - this.lastTimeSayingHiToPlayers[message.author.id] < 6*60*60*1000) return;
        this.lastTimeSayingHiToPlayers[message.author.id] = now.valueOf();

        var reply = this.getRandomMessages(this.commonGreetings);
        message.channel.sendMessage(reply);
        this.lastTimeSayingHi = now.valueOf();
    } else if (cleanedText === "gm" || cleanedText === "good morning" || cleanedText === "morning") {
        if (now.valueOf() - this.lastTimeGoodMorning < 60*1000) return;
        if (typeof this.lastTimeGoodMorningToPlayers[message.author.id] == "undefined") {
            this.lastTimeGoodMorningToPlayers[message.author.id] = 0;
        }
        if (now.valueOf() - this.lastTimeGoodMorningToPlayers[message.author.id] < 6*60*60*1000) return;
        this.lastTimeGoodMorningToPlayers[message.author.id] = now.valueOf();
        
        var reply = this.getRandomMessages(this.commonGoodMorning);
        message.channel.sendMessage(reply);
        this.lastTimeGoodMorning = now.valueOf();
    } else if (cleanedText === "gn" || cleanedText === "good night" || cleanedText === "nite" || cleanedText === "night") {
        if (now.valueOf() - this.lastTimeGoodNight < 60*1000) return;
        if (typeof this.lastTimeGoodNightToPlayers[message.author.id] == "undefined") {
            this.lastTimeGoodNightToPlayers[message.author.id] = 0;
        }
        if (now.valueOf() - this.lastTimeGoodNightToPlayers[message.author.id] < 6*60*60*1000) return;
        this.lastTimeGoodNightToPlayers[message.author.id] = now.valueOf();
        
        var reply = this.getRandomMessages(this.commonGoodNight);
        message.channel.sendMessage(reply);
        this.lastTimeGoodNight = now.valueOf();
    } else if (text === "~thank" || text === "~thanks" || text === "~tks") {
        if (now.valueOf() - this.lastTimeThanks < 60*1000) return;
        var reply = this.getRandomMessages(this.commonThanks);
        message.channel.sendMessage(reply);
        this.lastTimeThanks = now.valueOf();
    }
}

Employee.prototype.handleCommonCommand = function(message) {
    if (message.author.bot === true) return;
    this.handleEventCommand(message);
    this.handleMaintenanceCommand(message);
    this.handleDailyCommand(message);
    this.handleBasicGreetingCommand(message);
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

Employee.prototype.setIdleTalk = function() {
    this.hasNewMessage = false;
    var time = Math.floor(Math.random() * (15*60*1000) + 15*60*1000);
    console.log(time);
    var that = this;
    setTimeout(function() {
        console.log("triggered " + that.hasNewMessage);
        if (that.hasNewMessage) {
            var channels = that.bot.channels.array();
            for(var i=0;i<channels.length;i++) {
                if (channels[i].type === "text" && channels[i].name === that.nutakuChannelName) {
                    that.sayRandomMessages(channels[i], that.idleTalks);
                }
            }
        }
        that.setIdleTalk();
    }, time);  // 15 - 30 mins
}

Employee.prototype.setDailyDrawReminderForNutaku = function() {
    var time = getTimeUntilDaily(this.nutakuDailyRemind); 
    var that = this;
    console.log("time: " + time);
    setTimeout(function() {
        var channels = that.bot.channels.array();
        for(var i=0;i<channels.length;i++) {
            if (channels[i].type === "text" && channels[i].name === that.nutakuChannelName) {
                channels[i].sendMessage("**Reminder: 15 minutes until Nutaku Daily Draw Reset**")
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
                channels[i].sendMessage("**Reminder: 15 minutes until DMM Daily Draw Reset**")
            }
        }
        setTimeout(function(){
            that.setDailyDrawReminderForDmm();
        }, 30*1000);
    }, time);
}

Employee.prototype.ready = function() {
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
}

module.exports = new Employee();