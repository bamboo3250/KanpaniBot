module.exports = {
    names: ['focus'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        if (message.channel.name != "battlefield") {
            message.reply("You can only use this command in Battlefield.");
            return;
        }

        var userId = message.author.id;
        var playerUnit = bot.playerManager.getPlayerUnit(userId);
        var playerUser = bot.userManager.getUser(userId);

        if (!playerUnit) {
            message.reply("You need to select character first.");
            return;
        }

        if (!bot.userManager.doesMemberHaveRole(userId, "Trainee")) {
            message.reply("You need to join Training first. Use `~jointraining`.");
            return;
        }
        
        if (playerUnit.getClassId() != 8) {
            message.reply("This skill is only available for Magicians.");
            return;
        }

        if (!bot.battleController) {
            message.reply("There is no battle at the moment.");
            return;
        }

        var now = new Date();
        if (playerUnit.currentHP === 0) {
            var text = "You have fainted.";
            if (playerUnit.respawnTime) {
                var remainingTime = playerUnit.respawnTime - now.valueOf();
                var time = bot.functionHelper.parseTime(remainingTime);
                text += " You will respawn after " + time + "."
            }
            message.reply(text); 
            return;
        }

        if (now.valueOf() < playerUnit.cooldownEndTime) {
            var time = bot.functionHelper.parseTime(playerUnit.cooldownEndTime - now.valueOf());
            var text = "Your skill is still in cooldown.";
            message.reply(text);
            return;
        }

        if (now.valueOf() < playerUnit.classSkillCooldownEndTime) {
            var remainingTime = playerUnit.classSkillCooldownEndTime - now.valueOf();
            var time = bot.functionHelper.parseTime(remainingTime);
            var text = "Your class trait will be ready in " + time + ".";
            message.reply(text);
            return;
        }

        var COOLDOWN = 30*60*1000;
        playerUnit.classSkillCooldownEndTime = now.valueOf() + COOLDOWN;

        var field = bot.battleController.randomField(userId);
        var name = playerUnit.shortName;
        if (playerUser) name += " (" + playerUser.username + ")";
        
        var text = name + " used Focus.\n";
        bot.playerManager.applyFocus(userId, userId);
        
        bot.battleChannel.send(text);
    }
}