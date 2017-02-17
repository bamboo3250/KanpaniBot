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

function isAromaOil(itemName) {
    var itemListList = [
        "Aroma Oil"
    ];
    return contains(itemListList, itemName);
}

function isCacao(itemName) {
    var itemListList = [
        "Magical Cacao"
    ];
    return contains(itemListList, itemName);
}

function isIceCream(itemName) {
    var itemListList = [
        "Chocolate Chip Ice"
    ];
    return contains(itemListList, itemName);
}

function isExpTicket(itemName) {
    var itemListList = [
        "EXP Palace Invitation"
    ];
    return contains(itemListList, itemName);
}

function isUsable(itemName) {
    return isMailbox(itemName) 
        || isHammer(itemName) 
        || isForge(itemName) 
        || isBread(itemName)
        || isIceCream(itemName)
        || isCacao(itemName)
        || isExpTicket(itemName);
        // || isEldLight(itemName) 
        // || isAromaOil(itemName);
}

var eldLightRewardList = [
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
        amount: 5
    },{
        itemName: "Unmelting Ice",
        amount: 5
    },{
        itemName: "Unmelting Ice",
        amount: 5
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

module.exports = {
    setAromaTimeout: function(bot) {
        if (bot.aromaTimeout) clearTimeout(bot.aromaTimeout);
        
        if (bot.aromaEffect) {
            var now = new Date();
            var duration = bot.aromaEffect.endTime - now.valueOf();
            var time = bot.functionHelper.parseTime(duration);
            bot.log("Set AromaTimeout: " + duration + " (" + time + ").");
            bot.aromaTimeout = setTimeout(function() {
                for(key in bot.aromaEffect.contributors) {
                    var contributorId = key;
                    var elapsedTime = now.valueOf() - bot.aromaEffect.contributors[contributorId].startTime;
                    var numItemsWillGet = Math.floor(elapsedTime/(60*1000));
                    numItemsWillGet = Math.min(numItemsWillGet, bot.aromaEffect.contributors[contributorId].amount * 20);
                    var contributorUser = bot.userManager.getUser(contributorId);

                    var numReceivedItem = 0;
                    var receivedItems = {};
                    while(numReceivedItem < numItemsWillGet) {
                        var itemNameWillGet = bot.functionHelper.randomObject(bot.aromaRewardList);
                        if (typeof receivedItems[itemNameWillGet] === "undefined") receivedItems[itemNameWillGet] = 0;
                        if (!bot.aromaLimitReward[itemNameWillGet] || receivedItems[itemNameWillGet] < bot.aromaLimitReward[itemNameWillGet]) {
                            receivedItems[itemNameWillGet]++;
                            numReceivedItem++;    
                        }
                    }
                    var text = "The effect of Aroma Oil has faded away. You received **" + numItemsWillGet + " item(s)**.\n";
                    for(itemKey in receivedItems) {
                        var itemName = itemKey;
                        text += itemName + " x" + receivedItems[itemName] + "\n";
                        bot.playerManager.addItem(contributorId, itemName, receivedItems[itemName]);
                    }
                    contributorUser.sendMessage(text);
                    var member = bot.userManager.getMember(contributorId);
                    var aromaRole = member.guild.roles.find('name', 'Aroma Dreamer');
                    member.removeRole(aromaRole).then(output => {
                        bot.log("Aroma Role is removed for " + output.user.username);
                    }).catch(err => {
                        bot.log("[removeAromaRole]" + err);
                    });
                }
                bot.aromaEffect = null;
                bot.savePlayer();
                bot.saveAroma();
            }, duration);
        }
    },

    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~use") return;

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (player === null) {
            message.reply("You haven't selected your character.");
            return;
        }

        var isUsingAll = (command.args[0] === "all");
        if (isUsingAll) {
            command.args.splice(0, 1);
        }

        var itemName = command.args.join(" ");
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
            if (isUsingAll) {
                message.reply("You can only use this item one by one.");
                return;
            }
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
            if (isUsingAll) {
                message.reply("You can only use this item one by one.");
                return;
            }

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
            if (isUsingAll) {
                message.reply("You can only use this item one by one.");
                return;
            }

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
            var extraBreadPerItem = 0;
            if (materialInfo.itemName === "Bread") {
                extraBreadPerItem = 1;
            } else if (materialInfo.itemName === "Food Pack") {
                extraBreadPerItem = 3;
            }
            
            var amount = (isUsingAll ? player.materialList[materialInfo.itemName] : 1);
            bot.remainingBread[userId] += amount * extraBreadPerItem;
            bot.playerManager.spendItem(userId, materialInfo.itemName, amount);
            bot.savePlayer();
            bot.saveBread();
            message.reply(bot.createRemainingBreadLine(message));
        } else if (isEldLight(itemName)) {
            if (!bot.isPM(message)) {
                message.reply("You can only use **Eld Light** in PM.");
                return;
            }

            if (isUsingAll) {
                var amount = player.materialList[materialInfo.itemName];
                var resultDict = {};
                var rewardTotal = 0;
                for(var i=0;i<amount;i++) {
                    var reward = bot.functionHelper.randomObject(eldLightRewardList);
                    if (typeof resultDict[reward.itemName] === "undefined") resultDict[reward.itemName] = 0;
                    resultDict[reward.itemName] += reward.amount;
                    rewardTotal += reward.amount;
                }

                bot.playerManager.spendItem(userId, materialInfo.itemName, amount);
                var text = "You used **" + amount + " " + materialInfo.itemName + "** to decorate the Sacred Tree.\n";
                text += "**" + rewardTotal + " item(s)** droped from the Tree:\n";
                for(key in resultDict) {
                    var itemName = key;
                    bot.playerManager.addItem(userId, itemName, resultDict[itemName]);
                    text += itemName + " x" + resultDict[itemName] + "\n";
                }
                message.reply(text);

                if (typeof bot.christmasTreeContribution[userId] === "undefined") {
                    bot.christmasTreeContribution[userId] = 0;
                }
                bot.christmasTreeContribution[userId] += amount;
                bot.saveChristmasTree();

                var total = 0;
                for(key in bot.christmasTreeContribution) {
                    total += bot.christmasTreeContribution[key];
                }

                if (typeof bot.christmasTreeMilestones["" + total] != "undefined") {
                    var rewardToGive = bot.christmasTreeMilestones["" + total];
                    for(key in bot.christmasTreeContribution) {
                        var contributorId = key;
                        bot.playerManager.addItem(contributorId, rewardToGive.itemName, rewardToGive.amount);
                        var user = bot.userManager.getUser(contributorId);
                        if (user) {
                            var text2 = "Congratulations! The Sacred Tree now has **" + total + " Eld Light**.\n";
                            text2 += "Every contributor will receive **" + rewardToGive.amount + " " + rewardToGive.itemName + "**.";
                            user.sendMessage(text2);
                        }
                    }
                }
                bot.savePlayer();
                return;
            }

            var reward = bot.functionHelper.randomObject(eldLightRewardList);
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

                text += "**" + reward.amount + " " + reward.itemName + "** droped from the Tree.";
                message.channel.sendFile(itemFileName, "png", text);

                if (typeof bot.christmasTreeMilestones["" + total] != "undefined") {
                    var rewardToGive = bot.christmasTreeMilestones["" + total];
                    for(key in bot.christmasTreeContribution) {
                        var contributorId = key;
                        bot.playerManager.addItem(contributorId, rewardToGive.itemName, rewardToGive.amount);
                        var user = bot.userManager.getUser(contributorId);
                        if (user) {
                            var text2 = "Congratulations! The Sacred Tree now has **" + total + " Eld Light**.\n";
                            text2 += "Every contributor will receive **" + rewardToGive.amount + " " + rewardToGive.itemName + "**.";
                            user.sendMessage(text2);
                        }
                    }
                }
                bot.savePlayer();
            });
        } else if (isAromaOil(itemName)) {
            if (!bot.isPM(message)) {
                message.reply("You can only use **Aroma Oil** in PM.");
                return;
            }

            var amount = (isUsingAll ? player.materialList[materialInfo.itemName] : 1);
            var now = new Date();

            bot.playerManager.spendItem(userId, materialInfo.itemName, amount);

            var text = "You have used **" + amount + " Aroma Oil**.";
            var extraTime = bot.functionHelper.parseTime(amount * 60 * 1000);

            if (!bot.aromaEffect) {
                bot.aromaEffect = {
                    startTime: now.valueOf(),
                    endTime: now.valueOf(),
                    totalAroma: 0,
                    contributors: {}
                }
                text += "The effect of Aroma Oil will end in **" + extraTime + "**.\n";
            } else {
                text += "The effect of Aroma Oil is prolonged by **" + extraTime + " **.\n";
            }

            if (typeof bot.aromaEffect.contributors[userId] === "undefined") {
                bot.aromaEffect.contributors[userId] = {
                    startTime: now.valueOf(),
                    amount: 0
                }
                var member = bot.userManager.getMember(userId);
                var aromaRole = member.guild.roles.find('name', 'Aroma Dreamer');
                member.addRole(aromaRole).then(output => {
                    bot.log("Aroma Role is added for " + output.user.username);
                }).catch(err => {
                    bot.log("[addAromaRole]" + err);
                });
            }
            bot.aromaEffect.contributors[userId].amount += amount;
            bot.aromaEffect.totalAroma += amount;
            
            bot.aromaEffect.endTime = bot.aromaEffect.startTime + bot.aromaEffect.totalAroma * 60 * 1000;
            if (bot.aromaTimeout) {
                clearTimeout(bot.aromaTimeout);
            }

            this.setAromaTimeout(bot);
            bot.savePlayer();
            bot.saveAroma();
            message.channel.sendFile("images/misc/aroma.png", "png", text);
            
        } else if (isIceCream(itemName)) {
            if (isUsingAll) {
                message.reply("You can only use this item one by one.");
                return;
            }

            if (typeof bot.grindEffect[userId] === "undefined") {
                bot.grindEffect[userId] = {
                    itemName: "",
                    endTime: 0
                }
            }
            var now = new Date();
            if (bot.grindEffect[userId].itemName != "") {
                var remainingTime = bot.grindEffect[userId].endTime - now.valueOf();
                var time = bot.functionHelper.parseTime(remainingTime);
                message.reply("You have already been under effect of another Ice Cream! It will end in **" + time + "**");
                return;
            }
            var effectDuration = 3*60*60*1000;    // 3 hours
            bot.grindEffect[userId].itemName = materialInfo.itemName;
            bot.grindEffect[userId].endTime = now.valueOf() + effectDuration;

            setTimeout(function() {
                bot.grindEffect[userId] = {
                    itemName: "",
                    endTime: 0
                }
                message.author.sendMessage("The effect of **" + materialInfo.itemName + "** has faded away.");
            }, effectDuration);

            bot.playerManager.spendItem(userId, materialInfo.itemName);
            bot.savePlayer();
            message.reply("You have used **" + materialInfo.itemName + "**. Its effect will last for 3 hours.");
        } else if (isCacao(itemName)) {
            var amount = 1;
            if (isUsingAll) {
                amount = player.materialList[materialInfo.itemName];
            }

            bot.kettle.totalCacao += amount;
            if (typeof bot.kettle.contribution[userId] === "undefined") {
                bot.kettle.contribution[userId] = 0;
            }
            bot.kettle.contribution[userId] += amount;

            bot.playerManager.spendItem(userId, materialInfo.itemName, amount);
            bot.savePlayer();
            bot.saveKettle();
            message.reply("You have contributed **" + amount + " " + materialInfo.itemName + "** to the Alchemy Kettle.");
        } else if (isExpTicket(itemName)) {
            if (isUsingAll) {
                message.reply("You can only use this item one by one.");
                return;
            }

            if (typeof bot.expTicketEffect[userId] === "undefined") {
                bot.expTicketEffect[userId] = {
                    itemName: "",
                    endTime: 0
                }
            }
            var now = new Date();
            if (bot.expTicketEffect[userId].itemName != "") {
                var remainingTime = bot.expTicketEffect[userId].endTime - now.valueOf();
                var time = bot.functionHelper.parseTime(remainingTime);
                message.reply("You have already been under the effect of another Invitation Ticket! It will end in **" + time + "**");
                return;
            }
            var effectDuration = 15*60*1000;    // 15 minutes
            bot.expTicketEffect[userId].itemName = materialInfo.itemName;
            bot.expTicketEffect[userId].endTime = now.valueOf() + effectDuration;

            setTimeout(function() {
                bot.expTicketEffect[userId] = {
                    itemName: "",
                    endTime: 0
                }
                message.author.sendMessage("The effect of **" + materialInfo.itemName + "** has faded away.");
            }, effectDuration);

            bot.playerManager.spendItem(userId, materialInfo.itemName);
            bot.savePlayer();
            message.reply("You have used **" + materialInfo.itemName + "**. You can access to **EXP Palace** now by using command `~grind exp-palace`.\nIts effect will last for 15 minutes.");
        }
    }
}