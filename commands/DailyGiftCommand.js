module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text !== "~dailygift") return;
        if (!bot.isPM(message)) {
            message.reply("You can only receive daily gift in Private Message.");
            return;
        }

        var itemResult = bot.itemInfoDatabase.getItemInfoByName(bot.dailyGift.item);
        if (!itemResult) {
            message.reply("There is no daily gift at the moment.");
            return;
        }

        var userId = message.author.id;
        if (typeof bot.dailyGift.playerReceived[userId] === "undefined") {
            bot.dailyGift.playerReceived[userId] = true;
            bot.saveDailyGift();

            var amount = bot.dailyGift.quantity;
            bot.playerManager.addItem(userId, itemResult.itemName, amount);
            message.reply("You have received **" + amount + " " + itemResult.itemName + "**. Please check your items via `~inventory`.");
            bot.savePlayer();
        } else {
            message.reply("There is no more daily gift for today.");
        }
    }
}