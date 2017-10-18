module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);

        if (bot.isHR(message) || bot.isAdmin(message)) {

            if (command.isCommand(["unsilence"])) {
                var userId = command.mentions.users.first().id;
                if (!userId) return;
                bot.userManager.removeRole(userId, "Reported");
                bot.silenced[userId] = false;
                bot.saveSilenced();
                return;
            }
            if (command.isCommand(["silence"])) {
                var userId = command.mentions.users.first().id;
                if (!userId) return;
                bot.userManager.addRole(userId, "Reported");
                bot.silenced[userId] = true;
                bot.saveSilenced();
                return;
            }
        }

        if (!bot.isAdmin(message)) return;
        
        if (command.isCommand(["totalbread"])) {
            message.reply("\nTotal bread received: " + bot.total_bread);
            return;
        }
        if (command.isCommand(["kill"])) {
            process.exit();
            return;
        }
        if (command.isCommand(["resettrainer"])) {
            if (!bot.battleController) return;
            if (bot.battleController.type != "training") return;
            bot.battleController.resetAllTrainers();
            return;
        }
        if (command.isCommand(["addexp"])) {
            var userId = command.args[0];
            var exp = parseInt(command.args[1]);
            
            bot.playerManager.addExp(userId, exp);
            bot.playerManager.refreshUnitForPlayerId(userId);
            bot.savePlayer();
        }
        if (command.isCommand(["restock"])) {
            for(key in bot.shop) {
                bot.shop[key].amount = bot.shop[key].maxAmount;
            }
            bot.saveShop();

            bot.sendMessageToMarketChannel("The Shop Items have been restocked.");
        }
    }
}