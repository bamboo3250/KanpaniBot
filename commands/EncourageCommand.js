module.exports = {
    names: ['encourage'],
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

        if (playerUnit.getClassId() != 5) {
            message.reply("This skill is only available for Warriors.");
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
        
        var text = name + " used Encourage.\n";
        for(var i=0;i<2;i++) {
            for(var j=0;j<3;j++) {
                var unit = bot.playerManager.getPlayerUnit(field[i][j]);
                if (unit && !unit.isFainted()) {
                    var user = bot.userManager.getUser(field[i][j]);
                    name = unit.shortName;
                    if (user) name += " (" + user.username + ")";
                    text += "\t" + name + " is under Encourage's effect.\n";

                    bot.playerManager.applyEncourage(userId, field[i][j]);
                }
            }
        }

        bot.battleChannel.send(text);
    }
}