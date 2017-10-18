module.exports = {
    names: ['promote'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        var employee = bot.playerManager.getPlayerUnit(userId);
        if (!player || !employee) {
            message.reply("You haven't selected your character.");
            return;
        }

        if (employee.levelCached < employee.getMaxLevel()) {
            message.reply("Your level is not enough to be promoted.");
            return;
        }

        if (bot.playerManager.getItemAmount(userId, "Promotion Badge") < 1) {
            message.reply("You need **Promotion Badge** to be promoted.");
            return;
        }

        if (player.promotion == 0 && player.gold < 20000000) {
            message.reply("You need **20,000,000 Gold** to be promoted.");
            return;
        } else if (player.promotion == 1 && player.gold < 50000000) {
            message.reply("You need **50,000,000 Gold** to be promoted.");
            return;
        }

        if (player.promotion > 0) {
            message.reply("The next promotion is not available yet.");
            return;
        }

        if (player.promotion == 0) {
            bot.playerManager.spendGold(userId, 20000000);
        } else if (player.promotion == 1) {
            bot.playerManager.spendGold(userId, 50000000);
        }
        bot.playerManager.spendItem(userId, "Promotion Badge");

        player.promotion++;
        player.exp = 0;

        bot.playerManager.refreshUnitForPlayer(player);
        bot.savePlayer();
        employee = bot.playerManager.getPlayerUnit(userId);
        employee.fullHeal();

        if (player.promotion == 1) {
            message.reply("Congratulations! You have been promoted to **Chief**.");
            bot.userManager.addRole(userId, "Chief");
        } else if (player.promotion == 2) {
            message.reply("Congratulations! You have been promoted to **Section Manager**.");
            bot.userManager.addRole(userId, "Section Manager", function() {
                bot.userManager.removeRole(userId, "Chief");    
            });
        }
    }
}