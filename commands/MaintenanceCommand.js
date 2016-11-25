module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text !== "~maint" && text !== "~maintenance") return;
        if (bot.preventPM(message)) return;

        var now = new Date();
        var maintenanceList = [];
        if (message.channel.name === bot.dmmChannelName) {
            maintenanceList = bot.dmmMaintenanceList;
        } else if (message.channel.name === bot.nutakuChannelName) {
            maintenanceList = bot.nutakuMaintenanceList;
        } else {
            return;
        }

        text = "\n";
        for(var i=0;i<maintenanceList.length;i++) {
            var startTime = new Date(maintenanceList[i].startTime);
            var endTime = new Date(maintenanceList[i].endTime);
            text += "**" + maintenanceList[i].name + "**\n";

            if (now.valueOf() < startTime.valueOf()) {
                var time = bot.functionHelper.parseTime(startTime.valueOf() - now.valueOf());
                text += "Start in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                        + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
            } else if (startTime.valueOf() <= now.valueOf() && now.valueOf() <= endTime.valueOf()) {
                var time = bot.functionHelper.parseTime(endTime.valueOf() - now.valueOf());
                text += "End in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                        + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
            } 
        }
        if (text.length > 1) {
            message.channel.sendMessage(text);
        }
    }
}