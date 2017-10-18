module.exports = {
    names: ['retreat'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var userId = message.author.id;
        if (!bot.grindId[userId]) {
            message.reply("There is no running quest.");
            return;
        }

        clearTimeout(bot.grindId[userId]);
        message.reply("Your quest has been cancelled.");
        bot.runQuestStatus[userId] = {
            quest: "", endTime: -1, bread: 0
        };
        bot.saveRunQuestStatus();
        bot.grindId[userId] = null;
    }
}