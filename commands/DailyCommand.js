module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName !== "~daily") return;
        
        var text = "```Markdown\n";

        text += "<" + bot.daily.name + ">\n";
        nextDaily = bot.functionHelper.getTimeUntilDaily(bot.daily.time);
        var time = bot.functionHelper.parseTime(nextDaily);
        text += "[Resets in][" + time + "]\n\n";

        text += "```";
        message.channel.send(text);
    }
}