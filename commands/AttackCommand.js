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

        var targetList = command.mentionIds;
        if (targetList.length === 0) {
            message.reply("You need to specify your target.");
            return;
        }

        var targetUnitList = [];
        for (var i = 0; i < targetList.length; i++) {
            var targetUnit = bot.unitManager.getPlayerUnit(targetList[i]);
            if (!targetUnit) {
                message.reply("One of your targets does not have character.");
                return;
            }
            targetUnitList.push(targetUnit);
        };
        

        if (!bot.battleController) {
            message.reply("You cannot do battle now.");
            return;
        }

        bot.battleController.attack(playerUnit, targetUnitList, function(err, text, imageFileName, shouldMention = false) {
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