module.exports = {
    names: ['heal'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        if (message.channel.name != "battlefield") {
            message.reply("You can only use this command in Battlefield.");
            return;
        }

        var userId = message.author.id;
        var playerUnit = bot.playerManager.getPlayerUnit(userId);
        
        if (!playerUnit) {
            message.author.send("You need to select character first.");
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
            message.author.send(text); 
            return;
        }

        var targetList = command.mentionIds;
        if (targetList.length === 0) {
            message.author.send("You need to specify your target.");
            return;
        }

        var targetUnitList = [];
        for (var i = 0; i < targetList.length; i++) {
            var targetUnit = bot.playerManager.getPlayerUnit(targetList[i]);
            if (!targetUnit) {
                message.author.send("One of your targets does not have character.");
                return;
            }
            if (targetUnit && targetUnit.isTrainer) {
                message.author.send("You cannot heal a trainer.");
                return;
            }
            targetUnitList.push(targetUnit);
        };

        if (!bot.battleController) {
            message.author.send("You cannot do battle now.");
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
                    message.author.send(text);
                } else {
                    message.channel.send(text);
                }
            }
        });
    }
}