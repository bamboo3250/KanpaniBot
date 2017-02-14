module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~kettle") return;

        var text = "\nKettle Level: **" + bot.getKettleLevel() + "**\n";
        text += "Total Cacao: **" + bot.kettle.totalCacao + "** (To next Level: **" + bot.getCacaoRequiredUntilNextLevel() + "**)\n";
        text += "Production: **" + bot.getKettleProduction() + "**\n";

        var userId = message.author.id;
        var contributed = 0;
        if (typeof bot.kettle.contribution[userId] != "undefined") {
            contributed = bot.kettle.contribution[userId];
        }
        text += "\nYour Remaining Cacao: **" + contributed + "**\n"

        var chocolate = 0;
        if (typeof bot.kettle.chocolate[userId] != "undefined") {
            chocolate = bot.kettle.chocolate[userId];
        }
        text += "Your Chocolate: **" + chocolate + "**\n"

        message.reply(text);
    }
}