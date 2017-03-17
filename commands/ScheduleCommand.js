module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text !== "~schedule") return;
        
        var now = new Date();

        text = "";
        for(var i=0;i<bot.schedule.length;i++) {
            var startTime = new Date(bot.schedule[i].startTime);
            var endTime = new Date(bot.schedule[i].endTime);
            text += "**" + bot.schedule[i].name + "**\n";

            if (now.valueOf() < startTime.valueOf()) {
                var time = bot.functionHelper.parseTime(startTime.valueOf() - now.valueOf());
                text += "Starts in: " + time + "\n";
            } else if (now.valueOf() < endTime.valueOf()) {
                var time = bot.functionHelper.parseTime(endTime.valueOf() - now.valueOf());
                text += "Ends in: " + time + "\n";
            } else {
                text += "Not Available.";
            }
            text += '\n';
        }
        if (text.length > 1) {
            message.channel.sendMessage(text);
        }
    }
}