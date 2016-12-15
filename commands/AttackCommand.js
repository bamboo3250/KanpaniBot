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

        var skillName = employee.getCurrentSkill();
        if (!skillName) {
            message.reply("You need to equip weapon first.");
            return;
        }
        var skill = bot.skillDatabase.getSkill(skillName);  // TODO
        if (!skill.canAttack) {
            message.reply("You cannot use **" + skillName + "** to attack.");
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

        bot.battleController.attack(skill, employee, enemyEmployee, function(err, textImageList) {
            for(var i=0;i<textImageList.length;i++) {
                var text = textImageList[i].text;
                var imageFileName = textImageList[i].imageFileName;
                setTimeout(function() {
                    if (imageFileName) {
                        message.channel.sendFile(imageFileName, "png", text);
                    } else {
                        message.channel.sendMessage(text);
                    }
                }, i*2000);
            }
        });
    }
}