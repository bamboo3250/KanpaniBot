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
        text += "Reset in: " + time + "\n\n";
        message.channel.sendMessage(text);
    }
}