module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~attack") return;
        
        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        var employee = bot.createEmployeeFromPlayer(player);
        if (!employee) {
            message.reply("You need to select character first.");
            return;
        }

        var target = command.mentions.first();
        if (!target) {
            message.reply("You need to specify your target.");
            return;
        }
        var enemyPlayer = bot.playerManager.getPlayer(target.id);
        var enemyEmployee = bot.createEmployeeFromPlayer(enemyPlayer);
        if (!enemyEmployee) {
            message.reply("Your target does not have character.");
            return;
        }

        if (!bot.battleController) {
            message.reply("You cannot do battle now.");
            return;
        }

        bot.battleController.attack(skill, employee, enemyEmployee, function(err, text, imageFileName) {
            if (err) {
                bot.log("[attack] " + err);
                return;
            }
            if (imageFileName) {
                message.channel.sendFile(imageFileName, "png", text);
            } else {
                message.channel.sendMessage(text);
            }
        });
    }
}