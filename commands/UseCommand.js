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
        "1st Anni. Acc. Hammer",
        "Weapon Hammer",
        "Armor Hammer",
        "Accessory Hammer"
    ];
    return contains(itemListList, itemName);
}

function isForge(itemName) {
    var itemListList = [
        "Forge"
    ];
    return contains(itemListList, itemName);
}

function isBread(itemName) {
    var itemListList = [
        "Bread",
        "Food Pack"
    ];
    return contains(itemListList, itemName);   
}

function isEldLight(itemName) {
    var itemListList = [
        "Eld Light"
    ];
    return contains(itemListList, itemName);
}

function isUsable(itemName) {
    return isMailbox(itemName) || isHammer(itemName) || isForge(itemName) || isBread(itemName) || isEldLight(itemName);
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
                    remaining: 0,
                    endTime: 0,
                    effectTimeout: null
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
            bot.hammerEffect[userId].remaining = 15;
            bot.hammerEffect[userId].effectTimeout = setTimeout(function() {
                bot.hammerEffect[userId] = {
                    itemName: "",
                    remaining: 0,
                    endTime: 0,
                    effectTimeout: null
                }
                message.author.sendMessage("The effect of **" + materialInfo.itemName + "** has faded away.");
            }, effectDuration);

            bot.playerManager.spendItem(userId, materialInfo.itemName);
            bot.savePlayer();
            message.reply("You have used **" + materialInfo.itemName + "**. The quality of your first 15 crafts will be improved and this effect will last for 15 minutes.");
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
        } else if (isBread(itemName)) {
            if (materialInfo.itemName === "Bread") {
                bot.remainingBread[userId] += 1;
            } else if (materialInfo.itemName === "Food Pack") {
                bot.remainingBread[userId] += 3;
            }
            bot.playerManager.spendItem(userId, materialInfo.itemName);
            bot.savePlayer();
            message.reply(bot.createRemainingBreadLine(message));
        } else if (isEldLight(itemName)) {
            var rewardList = [
                {
                    itemName: "Gold Ore",
                    amount: 10
                },{
                    itemName: "Ominous Cloth",
                    amount: 10
                },{
                    itemName: "Chimera Horn",
                    amount: 10
                },{
                    itemName: "Luxurious Leather",
                    amount: 10
                },{
                    itemName: "Full Moon Fragment",
                    amount: 10
                },{
                    itemName: "Magical Water",
                    amount: 10
                },{
                    itemName: "Ebony Branch",
                    amount: 10
                },{
                    itemName: "Gold Ore",
                    amount: 10
                },{
                    itemName: "Ominous Cloth",
                    amount: 10
                },{
                    itemName: "Chimera Horn",
                    amount: 10
                },{
                    itemName: "Luxurious Leather",
                    amount: 10
                },{
                    itemName: "Full Moon Fragment",
                    amount: 10
                },{
                    itemName: "Magical Water",
                    amount: 10
                },{
                    itemName: "Ebony Branch",
                    amount: 10
                },{
                    itemName: "Accessory Hammer",
                    amount: 1
                },{
                    itemName: "Weapon Hammer",
                    amount: 1
                },{
                    itemName: "Armor Hammer",
                    amount: 1
                },{
                    itemName: "Unmelting Ice",
                    amount: 10
                },{
                    itemName: "Unmelting Ice",
                    amount: 10
                },{
                    itemName: "Unmelting Ice",
                    amount: 10
                },{
                    itemName: "Unmelting Ice",
                    amount: 10
                },{
                    itemName: "Unmelting Ice",
                    amount: 10
                },{
                    itemName: "Unmelting Ice",
                    amount: 20
                },{
                    itemName: "Unmelting Ice",
                    amount: 20
                },{
                    itemName: "Unmelting Ice",
                    amount: 50
                },{
                    itemName: "Gold Mailbox",
                    amount: 1
                },{
                    itemName: "Silver Mailbox",
                    amount: 1
                },{
                    itemName: "Eld Light",
                    amount: 2
                }
            ];

            var milestones = {
                "10": {
                    itemName: "Black Pearl",
                    amount: 10
                },
                "50": {
                    itemName: "Unmelting Ice",
                    amount: 20
                },
                "100": {
                    itemName: "Gold Mailbox",
                    amount: 1
                },
                "500": {
                    itemName: "Weapon Hammer",
                    amount: 5
                },
                "1000": {
                    itemName: "Forge",
                    amount: 1
                },
                "5000": {
                    itemName: "Forge",
                    amount: 3
                }
            }

            var reward = bot.functionHelper.randomObject(rewardList);
            var rewardItem = bot.itemInfoDatabase.getItemInfoByName(reward.itemName);
                
            var itemtUrl = bot.urlHelper.getItemIconUrl(rewardItem._id);
            var itemFileName = "images/item/large/" + rewardItem._id + ".png";

            var queue = [
                { fileToDownload: itemtUrl,   fileToSave: itemFileName}
            ];
            bot.imageHelper.download(queue, function(err) {
                if (err) {
                    message.reply("Error happened. Try again.");
                    bot.log(err);
                    return;
                }

                bot.imageHelper.read([itemFileName], function (err, imageList) {
                    if (err) {
                        message.reply("Error happened. Try again.");
                        bot.log(err);
                        return;
                    }
                }

                if (typeof bot.christmasTreeContribution[userId] === "undefined") {
                    bot.christmasTreeContribution[userId] = 0;
                }
                bot.christmasTreeContribution[userId]++;
                bot.saveChristmasTree();

                var total = 0;
                for(key in bot.christmasTreeContribution) {
                    total += bot.christmasTreeContribution[key];
                }

                bot.playerManager.spendItem(userId, materialInfo.itemName);
                var text = "You used **1 " + materialInfo.itemName + "** to decorate the Sacred Tree.\n";
                bot.playerManager.addItem(userId, reward.itemName, reward.amount);

                text += "**" + reward.amount + " " + reward.itemName + " droped from the Tree.";
                message.channel.sendFile(itemFileName, "png", text);

                if (typeof milestones["" + total] != "undefined") {
                    var rewardToGive = milestones["" + total];
                    for(key in bot.christmasTreeContribution) {
                        var contributorId = key;
                        bot.playerManager.addItem(contributorId, rewardToGive.itemName, rewardToGive.amount);
                    }
                    setTimeout(function() {
                        var text2 = "Congratulations! The Sacred Tree now has **" + total + " Eld Light**.\n";
                        text2 += "Every contributor will receive **" + rewardToGive.amount + " " + rewardToGive.itemName + "**.";
                        message.channel.sendMessage(text2);
                    }, 5000);
                }
                bot.savePlayer();
            }
        }
    }
}