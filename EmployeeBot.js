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
    this.nutakuMaintenanceList = [];
    this.greetings = [];
    this.idleTalks = [];
    this.hasNewMessage = false;
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

            console.log(now.valueOf() + " " + startTime.valueOf() + " " + endTime.valueOf());
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

Employee.prototype.handleCommonCommand = function(message) {
    this.handleEventCommand(message);
    this.handleMaintenanceCommand(message);
}

Employee.prototype.sayRandomMessages = function(channel, messageList) {
    var length = messageList.length;
    if (length > 0) {
        channel.sendMessage(messageList[Math.floor(Math.random() * length)]);    
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

Employee.prototype.ready = function() {
    console.log("Bot is on. Serving on " + this.bot.channels.array().length + " channels");
    console.log("-----");
    var channels = this.bot.channels.array();
    for(var i=0;i<channels.length;i++) {
        if (channels[i].type === "text" && channels[i].name === this.nutakuChannelName) {
            this.greeting(channels[i]);
        } 
    }
    this.setIdleTalk();
}

module.exports = new Employee();