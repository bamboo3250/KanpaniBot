module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text !== "~daily") return;
        if (bot.preventPM(message)) return;

        var dailyEvent = null;
        if (message.channel.name === bot.dmmChannelName) {
            dailyEvent = bot.dmmDaily;
        } else if (message.channel.name === bot.nutakuChannelName) {
            dailyEvent = bot.nutakuDaily;
        } else {
            return;
        }
        text = "\n**" + dailyEvent.name + "**\n";
        nextDaily = bot.functionHelper.getTimeUntilDaily(dailyEvent.time);
        var time = bot.functionHelper.parseTime(nextDaily);
        text += "Reset in: " + (time.day>0? time.day + " day(s) ":"") + (time.hour>0? time.hour + " hour(s) ":"") 
                + (time.min>0? time.min + " min(s) ":"") + (time.sec>0? time.sec + " sec(s) ":"") + "\n\n";
        message.channel.sendMessage(text);
    }
}