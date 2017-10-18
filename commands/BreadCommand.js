module.exports = {
    names: ['bread'],
    usage: '`~bread',
    description: 'show your bread in bot system', 
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var text = bot.createRemainingBreadLine(message) + '\n';
        message.reply(text);
    }
}
