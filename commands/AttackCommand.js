var Jimp = require("jimp");

module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~attack" && command.commandName != "~atk") return;
        
        if (message.channel.name != "battlefield") {
            message.reply("You can only use this command in Battlefield.");
            return;
        }

        var userId = message.author.id;
        var playerUnit = bot.playerManager.getPlayerUnit(userId);
        
        if (!playerUnit) {
            message.author.sendMessage("You need to select character first.");
            return;
        }

        if (playerUnit.currentHP === 0) {
            var text = "You have fainted.";
            if (playerUnit.respawnTime) {
                    var now = new Date();
                var remainingTime = playerUnit.respawnTime - now.valueOf();
                var time = bot.functionHelper.parseTime(remainingTime);
                text += " You can attack again after " + time + "."
            } else {
                text += " You cannot attack now."
            }
            message.author.sendMessage(text); 
            return;
        }

        var targetList = command.mentionIds;
        if (targetList.length === 0) {
            message.author.sendMessage("You need to specify your target.");
            return;
        }

        var targetUnitList = [];
        for (var i = 0; i < targetList.length; i++) {
            var targetUnit = bot.playerManager.getPlayerUnit(targetList[i]);
            if (!targetUnit) {
                message.author.sendMessage("One of your targets does not have character.");
                return;
            }
            if (targetUnit.getCurrentHP() === 0) {
                message.author.sendMessage("You cannot target a fainted unit.");
                return;
            }
            targetUnitList.push(targetUnit);
        };
        
        if (!bot.battleController) {
            message.author.sendMessage("You cannot do battle now.");
            return;
        }

        if (!bot.userManager.doesMemberHaveRole(userId, "Trainee")) {
            message.reply("You need to join Training first. Use `~jointraining`.");
            return;
        }

        bot.battleController.attack(playerUnit, targetUnitList, function(err, text, imageFileName, koList, shouldMention = false) {
            if (err) {
                bot.log("[attack] " + err);
                return;
            }
            if (koList) {
                for(var i=0;i<koList.length;i++) {
                    var koUserId = koList[i];
                    var koUnit = bot.playerManager.getPlayerUnit(koUserId);
                    var koUser = bot.userManager.getUser(koUserId);
                    bot.userManager.addRole(koUserId, "Fainted");
                    if (koUser) {
                        text += koUnit.shortName + " (" + koUser.username + ") is KO-ed!\n";
                    }
                }
            }
            if (imageFileName) {
                message.channel.sendFile(imageFileName, "png", text)
                .then(msg => {
                    bot.postKoImage(userId, koList);
                }).catch(err => bot.log(err));
            } else {
                if (shouldMention) {
                    message.author.sendMessage(text);
                } else {
                    message.channel.sendMessage(text);
                }
            }
        });
    }
}