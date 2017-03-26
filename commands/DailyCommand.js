module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName !== "~daily") return;
        
        var text = "```Markdown\n";

        text += "<" + bot.nutakuDaily.name + ">\n";
        nextDaily = bot.functionHelper.getTimeUntilDaily(bot.nutakuDaily.time);
        var time = bot.functionHelper.parseTime(nextDaily);
        text += "[Resets in][" + time + "]\n\n";

        text += "<" + bot.dmmDaily.name + ">\n";
        nextDaily = bot.functionHelper.getTimeUntilDaily(bot.dmmDaily.time);
        var time = bot.functionHelper.parseTime(nextDaily);
        text += "[Resets in][" + time + "]\n\n";

        text += "```";
        message.channel.sendMessage(text);
    }
}