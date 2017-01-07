module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~quittraining") return;
        var userId = message.author.id;
        
        if (!bot.userManager.doesMemberHaveRole(userId, "Trainee")) {
            message.reply("You haven't joined the Training yet.");
            return;
        }

        var unit = bot.unitManager.getPlayerUnit(userId);
        if (!unit) {
            message.reply("You have to select character first.");
            return;
        }

        unit.didQuit = true;

        bot.userManager.removeRole(userId, "Trainee");
        var player = bot.playerManager.getPlayer(userId);
        if (player.partnerId) {
            bot.userManager.removeRole(player.partnerId, "Trainee");
            message.reply("Now you and your partner are not in the Training anymore.");
        } else {
            message.reply("Now you are not in the Training anymore.");
        }
    }
}