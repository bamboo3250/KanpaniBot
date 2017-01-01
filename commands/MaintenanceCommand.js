module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text !== "~maint" && text !== "~maintenance") return;
        
        var now = new Date();
        var maintenanceList = [];
        for(var i=0;i<bot.dmmMaintenanceList.length;i++) {
            maintenanceList.push(bot.dmmMaintenanceList[i]);
        }
        for(var i=0;i<bot.nutakuMaintenanceList.length;i++) {
            maintenanceList.push(bot.nutakuMaintenanceList[i]);
        }

        text = "\n";
        for(var i=0;i<maintenanceList.length;i++) {
            var startTime = new Date(maintenanceList[i].startTime);
            var endTime = new Date(maintenanceList[i].endTime);
            text += "**" + maintenanceList[i].name + "**\n";

            if (now.valueOf() < startTime.valueOf()) {
                var time = bot.functionHelper.parseTime(startTime.valueOf() - now.valueOf());
                text += "Start in: " + time + "\n\n";
            } else if (startTime.valueOf() <= now.valueOf() && now.valueOf() <= endTime.valueOf()) {
                var time = bot.functionHelper.parseTime(endTime.valueOf() - now.valueOf());
                text += "End in: " + time + "\n\n";
            } 
        }
        if (text.length > 1) {
            message.channel.sendMessage(text);
        }
    }
}