function contains(list, itemName) {
    for(var i=0;i<list.length;i++) {
        if (itemName.toLowerCase() === list[i].toLowerCase()) return true;
    }
    return false;
}

function isMailbox(itemName) {
    var itemListList = [
        "Gold Mailbox",
        "Silver Mailbox"
    ];
    return contains(itemListList, itemName);
}

function isHammer(itemName) {
    var itemListList = [
        "1st Anni. W. Hammer",
        "1st Anni. Acc. Hammer"
    ];
    return contains(itemListList, itemName);
}

function isForge(itemName) {
    var itemListList = [
        "Forge"
    ];
    return contains(itemListList, itemName);
}

function isUsable(itemName) {
    return isMailbox(itemName) || isHammer(itemName) || isForge(itemName);
}

module.exports = {
    handle: function(message, bot) {
        var command = message.content.trim().toLowerCase();
        if (!command.startsWith("~use ")) return;

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (player === null) {
            message.reply("You haven't selected your character.");
            return;
        }

        var itemName = bot.functionHelper.removeExtraSpace(command.substring(5));
        var materialInfo = bot.itemInfoDatabase.getItemInfoByName(itemName);

        if (materialInfo === null) {
            message.reply("No information.");
            return;
        }

        if (!isUsable(itemName)) {
            message.reply("You can't use this item!");
            return;
        }

        if (typeof player.materialList[materialInfo.itemName] === "undefined" || player.materialList[materialInfo.itemName] <= 0) {
            message.reply("You don't have any " + materialInfo.itemName);
            return;
        }

        if (isMailbox(itemName)) {
            if (typeof bot.mailboxEffect[userId] === "undefined") {
                bot.mailboxEffect[userId] = {
                    itemName: "",
                    endTime: 0
                }
            }
            var now = new Date();
            if (bot.mailboxEffect[userId].itemName != "") {
                var remainingTime = bot.mailboxEffect[userId].endTime - now.valueOf();
                var time = bot.functionHelper.parseTime(remainingTime);
                message.reply("You have already been under effect of another mailbox! It will end in **" + time + "**");
                return;
            }
            var effectDuration = 15*60*1000;    // 15 mins
            bot.mailboxEffect[userId].itemName = materialInfo.itemName;
            bot.mailboxEffect[userId].endTime = now.valueOf() + effectDuration;

            setTimeout(function() {
                bot.mailboxEffect[userId] = {
                    itemName: "",
                    endTime: 0
                }
                message.author.sendMessage("The effect of **" + materialInfo.itemName + "** has faded away.");
            }, effectDuration);

            bot.playerManager.spendItem(userId, materialInfo.itemName);
            bot.savePlayer();
            message.reply("You have used **" + materialInfo.itemName + "**. Its effect will last for 15 minutes.");
        } else if (isHammer(itemName)) {
            if (typeof bot.hammerEffect[userId] === "undefined") {
                bot.hammerEffect[userId] = {
                    itemName: "",
                    endTime: 0
                }
            }
            var now = new Date();
            if (bot.hammerEffect[userId].itemName != "") {
                var remainingTime = bot.hammerEffect[userId].endTime - now.valueOf();
                var time = bot.functionHelper.parseTime(remainingTime);
                message.reply("You have already been under effect of another hammer! It will end in **" + time + "**");
                return;
            }
            var effectDuration = 15*60*1000;    // 15 mins
            bot.hammerEffect[userId].itemName = materialInfo.itemName;
            bot.hammerEffect[userId].endTime = now.valueOf() + effectDuration;

            setTimeout(function() {
                bot.hammerEffect[userId] = {
                    itemName: "",
                    endTime: 0
                }
                message.author.sendMessage("The effect of **" + materialInfo.itemName + "** has faded away.");
            }, effectDuration);

            bot.playerManager.spendItem(userId, materialInfo.itemName);
            bot.savePlayer();
            message.reply("You have used **" + materialInfo.itemName + "**. Its effect will last for 15 minutes.");
        } else if (isForge(itemName)) {
            if (typeof bot.forgeEffect[userId] === "undefined") {
                bot.forgeEffect[userId] = {
                    itemName: "",
                    endTime: 0
                }
            }
            var now = new Date();
            if (bot.forgeEffect[userId].itemName != "") {
                var remainingTime = bot.forgeEffect[userId].endTime - now.valueOf();
                var time = bot.functionHelper.parseTime(remainingTime);
                message.reply("You have already been under effect of another forge! It will end in **" + time + "**");
                return;
            }
            var effectDuration = 15*60*1000;    // 15 mins
            bot.forgeEffect[userId].itemName = materialInfo.itemName;
            bot.forgeEffect[userId].endTime = now.valueOf() + effectDuration;

            setTimeout(function() {
                bot.forgeEffect[userId] = {
                    itemName: "",
                    endTime: 0
                }
                message.author.sendMessage("The effect of **" + materialInfo.itemName + "** has faded away.");
            }, effectDuration);

            bot.playerManager.spendItem(userId, materialInfo.itemName);
            bot.savePlayer();
            message.reply("You have used **" + materialInfo.itemName + "**. Its effect will last for 15 minutes.");
        }
    }
}