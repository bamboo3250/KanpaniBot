module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~jointraining") return;
        var userId = message.author.id;
        
        if (bot.userManager.doesMemberHaveRole(userId, "Trainee")) {
            message.reply("You have already joined the Training.");
            return;
        }

        var unit = bot.unitManager.getPlayerUnit(userId);
        if (!unit) {
            message.reply("You have to select character first.");
            return;
        }
        if (unit.didQuit) {
            message.reply("You cannot rejoin the Training today.");
            return;   
        }

        bot.userManager.addRole(userId, "Trainee");
        var player = bot.playerManager.getPlayer(userId);
        if (player.partnerId) {
            bot.userManager.addRole(player.partnerId, "Trainee");
            message.reply("Now you and your partner can participate in the Training.");
        } else {
            message.reply("Now you can participate in the Training.");
        }
    }
}