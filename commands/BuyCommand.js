module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~buy") return;

        if (!bot.isPM(message)) {
            message.reply("You can use this command in Private Message only.");
            return;
        }
        
        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (player === null) {
            message.reply("You haven't selected your character.");
            return;
        }

        var itemName = command.args.join(" ");
        var materialInfo = bot.itemInfoDatabase.getItemInfoByName(itemName);

        if (materialInfo === null) {
            message.reply("No information.");
            return;
        }

        if (typeof bot.shop[materialInfo.itemName] == "undefined") {
            message.reply("This item is not available in Shop.");
            return;
        }

        if (bot.shop[materialInfo.itemName].amount <= 0) {
            message.reply("This item currently is out of stock.");
            return;
        }

        if (bot.shop[materialInfo.itemName].price.unit == "Chocolate") {
            var userChocolate = 0;
            if (bot.kettle.chocolate[userId]) {
                userChocolate = bot.kettle.chocolate[userId];
            }
            if (userChocolate < bot.shop[materialInfo.itemName].price.amount) {
                message.reply("You don't have enough Chocolate to purchase this item.");
                return;
            }

            bot.shop[materialInfo.itemName].amount--;
            bot.kettle.chocolate[userId] -= bot.shop[materialInfo.itemName].price.amount;
            bot.playerManager.addItem(userId, materialInfo.itemName);
            bot.savePlayer();
            bot.saveShop();
            bot.saveKettle();
            message.reply("You have bought **1 " + materialInfo.itemName + "**.");

        } else if (bot.shop[materialInfo.itemName].price.unit == "Gold") {
            if (player.gold < bot.shop[materialInfo.itemName].price.amount) {
                message.reply("You don't have enough Gold to purchase this item.");
                return;
            }

            bot.shop[materialInfo.itemName].amount--;
            bot.playerManager.spendGold(userId, bot.shop[materialInfo.itemName].price.amount);
            bot.playerManager.addItem(userId, materialInfo.itemName);
            bot.savePlayer();
            bot.saveShop();
            message.reply("You have bought **1 " + materialInfo.itemName + "**.");
        }
    }
}