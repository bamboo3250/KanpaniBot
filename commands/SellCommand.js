function parseCommand(args) {
    var itemName = "";
    var itemPlus = 0;

    itemName = "";
    for(var i=2;i<args.length + (args[args.length-1].startsWith("+")?-1:0);i++) itemName += args[i] + " ";
    itemName = itemName.trim();
        
    if (args.length > 3) {
        itemPlus = args[args.length-1];
        if (!itemPlus.startsWith("+")) {
            itemPlus = 0;
        } else {
            itemPlus = itemPlus.substring(1);
            if (isNaN(itemPlus)) {
                itemPlus = 0;
            } else {
                itemPlus = parseInt(itemPlus);
            }
        }
    }
    return {
        itemName: itemName,
        itemPlus: itemPlus
    }
}

module.exports = {
    handle: function(message, bot) {
        var command = message.content.trim().toLowerCase();
        if (!command.startsWith("~sell ")) return;
        if (!bot.isPM(message)) {
            message.reply("You can only sell items in Private Message.");
            return;
        }

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
        var parsedItem = parseCommand(args);
        var itemName = "";
        var itemInfo = bot.itemInfoDatabase.getItemInfoByName(parsedItem.itemName);

        var itemType = "";
        if (itemInfo != null) {
            itemType = "material";
            itemName = itemInfo.itemName;
        }
        if (itemInfo === null) {
            itemInfo = bot.weaponDatabase.getWeaponByName(parsedItem.itemName);    
            if (itemInfo != null) {
                itemType = "weapon";
                itemName = itemInfo.name;
            }
        }
        if (itemInfo === null) {
            itemInfo = bot.armorDatabase.getArmorByName(parsedItem.itemName);    
            if (itemInfo != null) {
                itemType = "armor";
                itemName = itemInfo.name;
            }
        }
        if (itemInfo === null) {
            itemInfo = bot.accessoryDatabase.getAccessoryByName(parsedItem.itemName);    
            if (itemInfo != null) {
                itemType = "accessory";
                itemName = itemInfo.name;
            }
        }
        if (itemInfo === null) {
            message.reply("No information.");
            return;
        }        

        var itemPrice = 0;
        if (itemType === "material") {
            if (typeof player.materialList[itemInfo.itemName] === "undefined" || player.materialList[itemInfo.itemName] == 0) {
                message.reply("You don't have any " + itemInfo.itemName);
                return;
            }
            if (amount > player.materialList[itemInfo.itemName]) {
                message.reply("You can't sell more than **" + player.materialList[itemInfo.itemName] + " " + itemInfo.itemName + "**!");
                return;
            }
            itemPrice = itemInfo.price;
        } else if (itemType === "weapon") {
            var amountPlayerHas = (typeof player.weaponList[itemInfo._id] === "undefined"?0:player.weaponList[itemInfo._id]["+"+parsedItem.itemPlus]);
            if (amountPlayerHas == 0) {
                message.reply("You don't have any " + itemName + " +" + parsedItem.itemPlus);
                return;
            }
            if (amount > amountPlayerHas) {
                message.reply("You can't sell more than **" + amountPlayerHas + " " + itemName + " +" + parsedItem.itemPlus + "**!");
                return;
            }
            itemPrice = itemInfo.stats["+"+parsedItem.itemPlus].price;
        } else if (itemType === "armor") {
            var amountPlayerHas = (typeof player.armorList[itemInfo._id] === "undefined"?0:player.armorList[itemInfo._id]["+"+parsedItem.itemPlus]);
            if (amountPlayerHas == 0) {
                message.reply("You don't have any " + itemName + " +" + parsedItem.itemPlus);
                return;
            }
            if (amount > amountPlayerHas) {
                message.reply("You can't sell more than **" + amountPlayerHas + " " + itemName + " +" + parsedItem.itemPlus + "**!");
                return;
            }
            itemPrice = itemInfo.stats["+"+parsedItem.itemPlus].price;
        } else if (itemType === "accessory") {
            var amountPlayerHas = (typeof player.accessoryList[itemInfo._id] === "undefined"?0:player.accessoryList[itemInfo._id]["+"+parsedItem.itemPlus]);
            if (amountPlayerHas == 0) {
                message.reply("You don't have any " + itemName + " +" + parsedItem.itemPlus);
                return;
            }
            if (amount > amountPlayerHas) {
                message.reply("You can't sell more than **" + amountPlayerHas + " " + itemName + " +" + parsedItem.itemPlus + "**!");
                return;
            }
            itemPrice = itemInfo.stats["+"+parsedItem.itemPlus].price;
        }
        
        var goldGained = itemPrice * amount;
        bot.playerManager.addGold(userId, goldGained);
        
        if (itemType === "material") {
            bot.playerManager.spendItem(userId, itemName, amount);
        } else if (itemType === "weapon") {
            bot.playerManager.removeWeapon(userId, itemInfo._id, parsedItem.itemPlus, amount);
        } else if (itemType === "armor") {
            bot.playerManager.removeArmor(userId, itemInfo._id, parsedItem.itemPlus, amount);
        } else if (itemType === "accessory") {
            bot.playerManager.removeAccessory(userId, itemInfo._id, parsedItem.itemPlus, amount);
        }
        bot.savePlayer();
        var text = "You have sold " + amount + " " + itemName + " for **" + goldGained + " Gold**.\n";
        text += "Your Gold: **" + player.gold + "**";
        message.reply(text);
    }
}