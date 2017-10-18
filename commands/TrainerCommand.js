module.exports = {
    names: ['trainer'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

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
                var trainerUnit = bot.playerManager.getPlayerUnit(trainerId);
                var trainerUser = bot.userManager.getUser(trainerId);

                if (trainerId && trainerUnit && trainerUser) {
                    //const elementEmoji = (message.guild == null ? trainerUnit.element : message.guild.emojis.find('name', 'k' + trainerUnit.element));
                    const classEmoji = (message.guild == null ? trainerUnit.getClass() : message.guild.emojis.find('name', 'k' + trainerUnit.getClass().toLowerCase()));
                    text += "User: **" + trainerUser.username + "**\n";
                    
                    var promotionText = (trainerUnit.promotion>1?"**Section Manager**, ":(trainerUnit.promotion>0?"**Chief**, ":""));
                    var levelText = "Lv.**" + trainerUnit.levelCached  + "**";
                    text += "Character: **" + trainerUnit.fullName + "** (" + (classEmoji?classEmoji+", ":"")  + promotionText + levelText + ")\n";
                    var now = new Date();
                    var percentHP = Math.floor(trainerUnit.getCurrentHP()/trainerUnit.getMaxHP()*100);
                    text += "HP: **" + trainerUnit.getCurrentHP() + "/" + trainerUnit.getMaxHP() + " (" + percentHP +"%)**" + (trainerUnit.respawnTime?" (Respawn in " + bot.functionHelper.parseTime(trainerUnit.respawnTime - now.valueOf()) + ")":"") + "\n";
                    text += "Status: ";
                    for(key in trainerUnit.status) {
                        var statusName = key;
                        if (trainerUnit.status[statusName]) text += "**" + trainerUnit.status[statusName] + "** ";    
                    }
                    text += "\n";
                    
                    text += "Position: **" + (i == 0?"Frontline":"Backline") + "** " + "\n";
                    text += "Skill: **" + trainerUnit.getCurrentSkill() + "**\n";
                    text += "\n";   
                }
            }
        }
        var now = new Date();
        if (bot.battleController.trainingSession.endTime) {
            var remainTime = bot.battleController.trainingSession.endTime - now.valueOf();
            var time = bot.functionHelper.parseTime(remainTime);
            text += "Remaining Time: **" + time + "**\n";
        }
        if (bot.battleController.trainingSession.respawnTime) {
            var remainTime = bot.battleController.trainingSession.respawnTime - now.valueOf();
            var time = bot.functionHelper.parseTime(remainTime);
            text += "Respawn Time: **" + time + "**";    
        }
        
        if (text.length > 0) {
            message.channel.send(text);    
        } else {
            message.channel.send("There is no trainer at the moment.");
        }
    }
};