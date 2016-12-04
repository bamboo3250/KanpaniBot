module.exports = {
    giftList: [
        {
            itemName: "Gold Mailbox",
            quantity: 1
        },{
            itemName: "Silver Mailbox",
            quantity: 1
        }
    ],
    handle: function(message, bot) {
        if (!bot.isAdmin(message)) return;

        var command = message.content.trim().toLowerCase();
        command = bot.functionHelper.removeExtraSpace(command);
        if (!command.startsWith("~setdailygift ")) return;

        var itemText = command.substring(14).trim();
        var item = null;
        if (itemText === "random") {
            item = bot.functionHelper.randomObject(this.giftList);
        } else {
            var args = itemText.split(" ");
            var amount = 1;
            var itemName = itemText;
            if (!isNaN(args[0])) {
                amount = Math.max(1, parseInt(args[0]));
                itemName = "";
                for(var i=1;i<args.length;i++) itemName += args[i] + " ";
                itemName = itemName.trim();
            }
            item = {
                itemName: itemName,
                quantity: amount
            }
        }
        var itemResult = bot.itemInfoDatabase.getItemInfoByName(item.itemName);
        if (!itemResult) {
            message.reply("No information.");
            return;
        }

        bot.dailyGift.item = itemResult.itemName;
        bot.dailyGift.quantity = item.quantity;
        bot.dailyGift.playerReceived = {};
        bot.saveDailyGift();

        bot.sendMessageToMainChannel("The Daily Gift has been sent. You can receive it in Private Message by command `~dailygift`.");
    }
}