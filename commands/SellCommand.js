module.exports = {
    handle: function(message, bot) {
        var command = message.content.trim().toLowerCase();
        if (!command.startsWith("~sell ")) return;

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (player === null) {
            message.reply("You haven't selected your character.");
            return;
        }

        command = bot.functionHelper.removeExtraSpace(command);
        args = command.split(" ");
        if (isNaN(args[1])) {
            message.reply("You must specify the quantity!");
            return;
        }
        var amount = Math.floor(parseInt(args[1]));
        if (amount <= 0) {
            message.reply("The quantity must be at least 1!");
            return;
        }
        var itemName = "";
        for(var i=2;i<args.length;i++) itemName += args[i] + " ";
        itemName = bot.functionHelper.removeExtraSpace(itemName);
        var materialInfo = bot.itemInfoDatabase.getItemInfoByName(itemName);
        
        if (materialInfo === null) {
            message.reply("No information.");
            return;
        }
        if (typeof player.materialList[materialInfo.itemName] === "undefined" || player.materialList[materialInfo.itemName] == 0) {
            message.reply("You don't have any " + materialInfo.itemName);
            return;
        }
        if (amount > player.materialList[materialInfo.itemName]) {
            message.reply("You can't sell more than **" + player.materialList[materialInfo.itemName] + " " + materialInfo.itemName + "**!");
            return;
        }
        var goldGained = materialInfo.price * amount;
        player.gold += goldGained;
        bot.playerManager.spendItem(userId, materialInfo.itemName, amount);
        bot.savePlayer();
        var text = "You have sold " + amount + " " + materialInfo.itemName + " for **" + goldGained + " Gold**.\n";
        text += "Your Gold: **" + player.gold + "**";
        message.reply(text);
    }
}