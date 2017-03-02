module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName !== "~bread") return;
        var text = bot.createRemainingBreadLine(message) + '\n';
        message.reply(text);
    }
}
