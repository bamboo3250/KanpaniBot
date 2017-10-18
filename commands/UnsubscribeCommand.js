module.exports = {
    names: ['unsubscribe'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;
        
        var userId = message.author.id;
        bot.unsubscribe[userId] = true;
        bot.saveUnsubscribe();

        var text = "You have unsubscribed daily gift\n";
        text += "You won't receive any announcement about daily gift anymore but you still can receive it via command `~dailygift`.";
        message.author.send(text);
        bot.log(message.author.username + " unsubscribed.");
    }
}