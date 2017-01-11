module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~heal") return;
        
        if (message.channel.name != "battlefield") {
            message.reply("You can only use this command in Battlefield.");
            return;
        }

        var userId = message.author.id;
        var playerUnit = bot.unitManager.getPlayerUnit(userId);
        
        if (!playerUnit) {
            message.reply("You need to select character first.");
            return;
        }

        if (playerUnit.currentHP === 0) {
            var text = "You have fainted.";
            if (playerUnit.respawnTime) {
                    var now = new Date();
                var remainingTime = playerUnit.respawnTime - now.valueOf();
                var time = bot.functionHelper.parseTime(remainingTime);
                text += " You can heal again after " + time + "."
            } else {
                text += " You cannot heal now."
            }
            message.reply(text); 
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
            if (targetUnit.getCurrentHP() === 0) {
                message.reply("You cannot target a fainted player.");
                return;
            }
            targetUnitList.push(targetUnit);
        };

        if (!bot.battleController) {
            message.reply("You cannot do battle now.");
            return;
        }

        if (!bot.userManager.doesMemberHaveRole(userId, "Trainee")) {
            message.reply("You need to join Training first. Use `~jointraining`.");
            return;
        }

        bot.battleController.heal(playerUnit, targetUnitList, function(err, text, imageFileName, koList, shouldMention = false) {
            if (err) {
                bot.log("[heal] " + err);
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