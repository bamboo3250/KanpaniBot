module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~attack") return;
        
        var userId = message.author.id;
        var playerUnit = bot.unitManager.getPlayerUnit(userId);
        
        if (!playerUnit) {
            message.reply("You need to select character first.");
            return;
        }

        var target = command.mentions.first();
        if (!target) {
            message.reply("You need to specify your target.");
            return;
        }
        var targetUnit = bot.unitManager.getPlayerUnit(target.id);
        if (!targetUnit) {
            message.reply("Your target does not have character.");
            return;
        }

        if (!bot.battleController) {
            message.reply("You cannot do battle now.");
            return;
        }

        bot.battleController.attack(playerUnit, targetUnit, function(err, text, imageFileName, shouldMention = false) {
            if (err) {
                bot.log("[attack] " + err);
                return;
            }
            if (imageFileName) {
                message.channel.sendFile(imageFileName, "png", text);
            } else {
                if (shouldMention) {
                    message.reply(text);
                } else {
                    message.channel.sendMessage(text);
                }
            }
        });
    }
}