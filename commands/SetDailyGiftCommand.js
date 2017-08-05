module.exports = {
    giftList: [
        {
            itemName: "Gold Mailbox",
            quantity: 1
        },{
            itemName: "Silver Mailbox",
            quantity: 1
        },{
            itemName: "Weapon Hammer",
            quantity: 1
        },{
            itemName: "Armor Hammer",
            quantity: 1
        },{
            itemName: "Accessory Hammer",
            quantity: 1
        },{
            itemName: "Forge",
            quantity: 1
        },{
            itemName: "Bread",
            quantity: 1
        },{
            itemName: "Food Pack",
            quantity: 1
        },{
            itemName: "Rose Quartz",
            quantity: 10
        },{
            itemName: "EXP Palace Invitation",
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
            while(true) {
                item = bot.functionHelper.randomObject(this.giftList);
                if (bot.dailyGift && item.itemName != bot.dailyGift.item) break;    
            }
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

        for(key in bot.playerManager.playerDict) {
            var userId = key;
            var user = bot.userManager.getUser(userId);
            var isUnsubscribe = (typeof bot.unsubscribe[userId] !== "undefined" && bot.unsubscribe[userId]);
            if (user && !isUnsubscribe) {
                var text = "The Daily Gift has been sent. You can receive it by using command `~dailygift`.\n";
                text += "To unsubscribe this message, you can use `~unsubscribe`.";
                user.send(text);
            }
        }
    }
}