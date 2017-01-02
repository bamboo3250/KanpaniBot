module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName !== "~daily") return;
        
        var text = "\n**" + bot.nutakuDaily.name + "**\n";
        nextDaily = bot.functionHelper.getTimeUntilDaily(bot.nutakuDaily.time);
        var time = bot.functionHelper.parseTime(nextDaily);
        text += "Reset in: " + time + "\n\n";

        text += "**" + bot.dmmDaily.name + "**\n";
        nextDaily = bot.functionHelper.getTimeUntilDaily(bot.dmmDaily.time);
        var time = bot.functionHelper.parseTime(nextDaily);
        text += "Reset in: " + time + "\n\n";

        message.channel.sendMessage(text);
    }
}