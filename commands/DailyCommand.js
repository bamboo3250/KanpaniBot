module.exports = {
    names: ['daily'],
    usage: '`~daily',
    description: 'display remaining time until daily draw reset', 
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var text = "```Markdown\n";

        text += "<" + bot.daily.name + ">\n";
        nextDaily = bot.functionHelper.getTimeUntilDaily(bot.daily.time);
        var time = bot.functionHelper.parseTime(nextDaily);
        text += "[Resets in][" + time + "]\n\n";

        text += "```";
        message.channel.send(text);
    }
}