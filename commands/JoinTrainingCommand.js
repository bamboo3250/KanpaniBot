module.exports = {
    names: ['jointraining'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var userId = message.author.id;
        
        if (bot.userManager.doesMemberHaveRole(userId, "Trainee")) {
            message.reply("You have already joined the Training.");
            return;
        }

        var unit = bot.playerManager.getPlayerUnit(userId);
        if (!unit) {
            message.reply("You have to select character first.");
            return;
        }
        if (unit.didQuit) {
            message.reply("You cannot rejoin the Training today.");
            return;   
        }

        bot.userManager.addRole(userId, "Trainee");
        message.reply("Now you can participate in the Training.");
    }
}