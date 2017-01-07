module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~trainer") return;

        if (!bot.battleController.trainerField) {
            message.reply("Trainer is not available at the moment.");
            return;
        }

        if (message.channel.name != "battlefield") {
            message.reply("You cannot use this command outside of Battlefield.");
            return;
        }

        var text = "";
        for(var i=0;i<2;i++) {
            for(var j=0;j<3;j++) {
                var trainerId = bot.battleController.trainerField[i][j];
                var trainerUnit = bot.unitManager.getPlayerUnit(trainerId);
                var trainerUser = bot.userManager.getUser(trainerId);

                if (trainerId && trainerUnit && trainerUser) {
                    const elementEmoji = (message.guild == null ? trainerUnit.element : message.guild.emojis.find('name', 'k' + trainerUnit.element));

                    text += "User: **" + trainerUser.username + "**\n";
                    text += "Character: **" + trainerUnit.fullName + "** (" + (elementEmoji?elementEmoji+", ":"") + "Lv.**" + trainerUnit.levelCached  + "**)\n";
                    var now = new Date();
                    var percentHP = Math.floor(trainerUnit.getCurrentHP()/trainerUnit.getMaxHP()*100);
                    text += "HP: **" + trainerUnit.getCurrentHP() + "/" + trainerUnit.getMaxHP() + " (" + percentHP +"%)**" + (trainerUnit.respawnTime?" (Respawn in " + bot.functionHelper.parseTime(trainerUnit.respawnTime - now.valueOf()) + ")":"") + "\n";
                    text += "Position: **" + (i == 0?"Frontline":"Backline") + "** " + "\n";
                    text += "Skill: **" + trainerUnit.getCurrentSkill() + "**\n";
                    text += "\n";    
                }
            }
        }
        message.channel.sendMessage(text);
    }
};