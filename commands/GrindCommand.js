var Employee = require('../classes/Employee');
var Jimp = require("jimp");

var factor = 1;

module.exports = {
    runQuest: function(bot, questName, bread, user, message, timeInMillis) {
        var quest = bot.questDatabase.getQuestByName(questName);
        var userId = user.id;
        var player = bot.playerManager.getPlayer(userId);
        var employee = bot.playerManager.getPlayerUnit(userId);
        if (!player || !employee) {
            bot.log("Null player or employee");
            return;
        }            

        var partnerId = player.partnerId;
        
        if (quest == null) {
            bot.log("No quest named " + questName);
            return;
        }

        timeInMillis = Math.max(0, timeInMillis);
        var modifier = 1;
        if (bread < 0) bread = quest.breadCost;
        if (quest.breadCost != 0) modifier = bread / quest.breadCost;

        var chanceToSuccess = 70;
        for(var i=0;i<quest.advantage.length;i++) {
            if (quest.advantage[i] == employee.getClassId()) chanceToSuccess = 85;
        }
        var level = (employee.promotion == 0 ? employee.levelCached : 99);
        var bonusFromLevel = level - quest.levelRequired;
        var bonusFromWeapon = 0;
        if (player.equipedWeapon) {
            var weapon = bot.weaponDatabase.getWeaponById(player.equipedWeapon._id);
            var weaponStats = weapon.stats["+" + player.equipedWeapon.plus];
            var sumStat = weaponStats.patk + weaponStats.pdef + weaponStats.matk + weaponStats.mdef;
            sumStat += weaponStats.crit + weaponStats.hit + weaponStats.eva;
            bonusFromWeapon = Math.floor(sumStat * 6 / (quest.timeCost*10));
        }
        var bonusFromArmor = 0;
        if (player.equipedArmor) {
            var armor = bot.armorDatabase.getArmorById(player.equipedArmor._id);
            var armorStats = armor.stats["+" + player.equipedArmor.plus];
            var sumStat = armorStats.patk + armorStats.pdef + armorStats.matk + armorStats.mdef;
            sumStat += armorStats.crit + armorStats.hit + armorStats.eva;
            bonusFromArmor = Math.floor(sumStat * 6 / (quest.timeCost*10));
        }
        var bonusFromAccessory = 0;
        if (player.equipedAccessory) {
            var accessory = bot.accessoryDatabase.getAccessoryById(player.equipedAccessory._id);
            var accessoryStats = accessory.stats["+" + player.equipedAccessory.plus];
            var sumStat = accessoryStats.patk + accessoryStats.pdef + accessoryStats.matk + accessoryStats.mdef;
            sumStat += accessoryStats.crit + accessoryStats.hit + accessoryStats.eva;
            bonusFromAccessory = Math.floor(sumStat * 6 / (quest.timeCost*10));
        }

        var bonusFromPartner = 0;
        if (partnerId) bonusFromPartner = 3;
        chanceToSuccess = Math.min(100, chanceToSuccess + bonusFromLevel + bonusFromWeapon + bonusFromArmor + bonusFromAccessory + bonusFromPartner);
        if (player.ceoPower) {
            chanceToSuccess = 100;
        }

        if (message) {
            var time = bot.functionHelper.parseTime(timeInMillis);
            var text = "The quest " + quest.commonNames[0] + " has started. It will end in **" + time + "**.\n";
            text += "Chance of Success: **" + chanceToSuccess + "%**";
            message.reply(text);
        }

        bot.grindId[userId] = setTimeout(function() {
            var expMultiplier = (bot.runQuestStatus[userId].expMultiplier ? bot.runQuestStatus[userId].expMultiplier : 1);
            var goldMultiplier = (bot.runQuestStatus[userId].goldMultiplier ? bot.runQuestStatus[userId].goldMultiplier : 1);

            bot.runQuestStatus[userId] = {
                quest: "", endTime: -1, bread: 0,
                expMultiplier: 1,
                goldMultiplier: 1
            };
            bot.saveRunQuestStatus();
            bot.grindId[userId] = null;

            var text = "The quest has finished!\n\n";
            text += "=================MISSION REPORT=================\n\n";
            text += "Mission: **" + quest.name + "** (**" + quest.commonNames[0] + "**)\n";

            var player = bot.playerManager.getPlayer(userId);
            if (player.ceoPower) {
                chanceToSuccess = 100;
            }
            var isSuccess = bot.functionHelper.randomInt(100) < chanceToSuccess;
            text += "Status: **" + (isSuccess?"SUCCESS :white_check_mark: ":"FAIL :x:") + "**\n";
            text += "Modifier: **x" + modifier + "**\n";
            text += "CEO Power: **" + (player.ceoPower?"ON":"OFF") + "**\n";
            player.ceoPower = false;

            // var blessing = {
            //     "10": 1.1,
            //     "50": 1.2,
            //     "100": 1.3,
            //     "500": 1.4,
            //     "1000": 1.5,
            //     "3000": 2.0,
            // }
            // var total = 0;
            // for(key in bot.christmasTreeContribution) {
            //     total += bot.christmasTreeContribution[key];
            // }
            // var bonusFromChristmas = 1.0;
            // if (quest.name.startsWith("Christmas Dungeon")) {
            //     if (total >= 2500) bonusFromChristmas = 2.0;
            //     else if (total >= 1000) bonusFromChristmas = 1.5;
            //     else if (total >= 500) bonusFromChristmas = 1.4;
            //     else if (total >= 100) bonusFromChristmas = 1.3;
            //     else if (total >= 50) bonusFromChristmas = 1.2;
            //     else if (total >= 10) bonusFromChristmas = 1.1;
            // }
            // text += "Sacred Tree's Blessing: **x" + bonusFromChristmas + "**\n";

            var extraExp = Math.floor(quest.exp*0.1);
            // var randomExp = bot.functionHelper.randomInt(extraExp + 1);
            var expGained = Math.floor((isSuccess ? quest.exp : 0) * modifier * expMultiplier) * factor;
            var goldGained = Math.floor((isSuccess ? quest.goldReward : 0) * modifier * goldMultiplier);
            var breadGained = (isSuccess ? quest.breadReward : 0);
            var bonusExp = Math.floor(expGained * 0.3);
            text += "EXP gained: **" + expGained + "**" + (partnerId?" (+" + bonusExp + ")":"") + "\n";
            text += "Gold: **" + goldGained + "**   Bread: **" + breadGained + "**\n";
            text += "Item Drop:\n";

            var backupItemDropText = "";

            var drop = {};
            if (isSuccess) {
                var numDrop = Math.floor(quest.numItemDrop * modifier) * factor;
                for(var i=0;i<numDrop;i++) {
                    var itemName = bot.functionHelper.randomObject(quest.dropList);
                    if (typeof drop[itemName] === "undefined") drop[itemName] = 0;
                    drop[itemName]++;
                }    
            }
            
            var player = bot.playerManager.getPlayer(userId);
            var employee = bot.playerManager.getPlayerUnit(userId);
            var preLevel = employee.levelCached;
            player.exp += expGained;
            employee.addExp(expGained);
    
            var partner = bot.playerManager.getPlayer(partnerId);
            var partnerEmployee = bot.playerManager.getPlayerUnit(partnerId);

            if (partnerId) {
                var partnerPreLevel = partnerEmployee.levelCached;
                
                partner.exp += bonusExp;
                partnerEmployee.addExp(bonusExp);
                
                var partnerIsLevelUp = (partnerPreLevel < partnerEmployee.levelCached)
                var partnerLevelUpText = "Congratulations! Your level has increased to **" + partnerEmployee.levelCached + "**";
                
                var partnerUser = bot.userManager.getUser(partnerId);
                if (partnerUser) {
                    var partnerText = "You have received **" + bonusExp + " Exp** for being partner with **" + user.username + "** in " + questName + ".\n";
                    if (partnerIsLevelUp) {
                        setTimeout(function() {
                            bot.userManager.announceLevel(partnerId, partnerEmployee.levelCached);
                        }, 5000);
                    }
                    partnerUser.sendMessage(partnerText);
                }
            }

            var isLevelUp = (preLevel < employee.levelCached)
            
            player.gold += goldGained;
            bot.initBreadIfNeed(userId);

            if (bot.remainingBread[userId] < bot.cappedBread) {
                bot.remainingBread[userId] = Math.min(bot.remainingBread[userId] + breadGained, bot.cappedBread);    
                bot.saveBread();
            }
            

            var itemNameList = [];
            for(key in drop) {
                var itemName = key;
                itemNameList.push(itemName);
                backupItemDropText += itemName + " x" + drop[itemName] + "\n";
                bot.playerManager.addItem(userId, itemName, drop[itemName]);
            }
            bot.savePlayer();

            var itemInfoList = bot.itemInfoDatabase.getItemInfosByNames(itemNameList);
            
            var queue = [];
            var itemFileNameList = [];
            for(var i=0;i<itemInfoList.length;i++) {
                var itemFileName = "images/item/medium/" + itemInfoList[i]._id + ".png";
                var itemUrl = "http://img4.kanpani.jp/img/icon/item/medium/" + itemInfoList[i]._id + ".png";
                queue.push({
                    fileToDownload: itemUrl, fileToSave: itemFileName
                })
                itemFileNameList.push(itemFileName);
            }

            bot.imageHelper.download(queue, function(err) {
                if (err) {
                    user.sendMessage(text + backupItemDropText);
                    if (isLevelUp) {
                        setTimeout(function() {
                            user.sendMessage(levelUpText);
                        }, 5*1000);
                    }
                    return;
                }
                bot.imageHelper.read(itemFileNameList, function (err, imageDict) {
                    var imageList = [];
                    for(key in imageDict) imageList.push(imageDict[key]);

                    if (err || imageList.length == 0) {
                        user.sendMessage(text + backupItemDropText);
                        if (isLevelUp) {
                            setTimeout(function() {
                                user.sendMessage(levelUpText);
                            }, 5*1000);
                        }
                        return;
                    }

                    const ITEM_CELL_WIDTH = 100;
                    const ITEM_CELL_HEIGHT = 60;
                    const NUM_COL = 4;

                    var imageWidth = ITEM_CELL_WIDTH*NUM_COL;
                    var imageHeight = Math.ceil(imageList.length/NUM_COL) * ITEM_CELL_HEIGHT;

                    var image = new Jimp(imageWidth, imageHeight, function (err, image) {
                        Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function (font) {
                            
                            for(var i=0;i<imageList.length;i++) {
                                var row = Math.floor(i/NUM_COL);
                                var col = i%NUM_COL;
                                image.composite(imageList[i], 10 + col*ITEM_CELL_WIDTH, 10 + row*ITEM_CELL_HEIGHT);
                                image.print(font, 65 + col*ITEM_CELL_WIDTH, 40 + row*60, "x" + drop[itemInfoList[i].itemName]);
                            }
                            var imageName = "images/inventory/" + userId + ".png";
                            image.write(imageName, function() {
                                user.sendFile(imageName, "png", text);
                                if (isLevelUp) {
                                    setTimeout(function() {
                                        bot.userManager.announceLevel(userId, employee.levelCached);
                                    }, 5*1000);
                                }   
                            });
                        });
                    });
                });
            });
            // if (userId && quest) {
            //     var thisUser = bot.userManager.getUser(userId);
            //     if (thisUser) {
            //         bot.log(thisUser.username + " " + quest.commonNames[0] + " finished " + (new Date()));        
            //     } else {
            //         bot.log("User of " + userId + " is null.");   
            //     }
                
            // }
            
        }, timeInMillis);

    },

    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (!text.startsWith("~grind ") && !text.startsWith("~fullgrind ")) return;
        if (message.channel.name === bot.dmmChannelName || message.channel.name === bot.nutakuChannelName) return;

        var userId = message.author.id;
        var isFullGrind = text.startsWith("~fullgrind ");
        var questName = text.substring(7 + (isFullGrind?4:0)).trim().toLowerCase();
        var quest = bot.questDatabase.getQuestByName(questName);
        if (quest == null) {
            message.reply("No information.");
            return;
        }
        if (!quest.isActive) {
            message.reply("This quest has been closed.");
            return;
        }

        if (quest.itemRequired) {
            if (!bot.expTicketEffect[userId] || bot.expTicketEffect[userId].itemName != quest.itemRequired) {
                message.reply("You need to use **" + quest.itemRequired + "** to grind this quest.");
                return;
            }
        }        

        if (isFullGrind && (quest.name === "Phantom Labyrinth" || quest.name === "EXP Palace")) {
            message.reply("You cannot use Full Grind for " + quest.name + ".");
            return;
        }

        var player = bot.playerManager.getPlayer(userId);
        if (player == null) {
            message.reply("You haven't selected your character.");
            return;
        }
        var employee = bot.playerManager.getPlayerUnit(userId);
        if (employee.promotion == 0 && employee.levelCached < quest.levelRequired) {
            message.reply("Your level (**Lv." + employee.levelCached + "**) is too low for this quest. The minimum is **Lv." + quest.levelRequired + "**.");
            return;
        }

        if (typeof bot.runQuestStatus[userId] === "undefined") {
            bot.runQuestStatus[userId] = {
                quest: "", endTime: -1, bread: 0,
                goldMultiplier: 1,
                expMultiplier: 1
            };
        }

        var now = new Date();

        if (bot.runQuestStatus[userId].quest != "") {
            var remainingTime = bot.runQuestStatus[userId].endTime - now.valueOf();
            var time = bot.functionHelper.parseTime(remainingTime);
            message.reply("You are running quest " + bot.runQuestStatus[userId].quest + ". It will end in **" + time + "**");
            return;
        }

        if (bot.remainingBread[userId] < quest.breadCost) {
            message.reply("You don't have enough bread to run this quest.");
            return;
        }

        var modifier = 1;
        if (isFullGrind && quest.breadCost != 0) {
            modifier = bot.remainingBread[userId] / quest.breadCost;
        }

        var goldNeeded = Math.floor(quest.goldCost * modifier);
        var breadNeeded = Math.floor(quest.breadCost * modifier);
        var timeCost = Math.floor(quest.timeCost * 60 * modifier);

        if (player.gold < goldNeeded) {
            message.reply("You don't have enough Gold.");
            return;
        }

        if (!bot.consumeBread(message, breadNeeded)) return;
        player.gold -= goldNeeded;
        bot.savePlayer();

        bot.runQuestStatus[userId].quest = quest.commonNames[0];
        bot.runQuestStatus[userId].endTime = now.valueOf() + timeCost * 1000;
        bot.runQuestStatus[userId].bread = breadNeeded;

        if (bot.grindEffect[userId] && bot.grindEffect[userId].itemName != "") {
            if (bot.grindEffect[userId].itemName == "Chocolate Chip Ice" 
                && quest.name.startsWith("Valentine's Day Limited Quest")) {

                bot.runQuestStatus[userId].expMultiplier = 2;
            }
        }

        bot.saveRunQuestStatus();
        // bot.log(message.author.username + " " + text + " " + (new Date()));

        this.runQuest(bot, questName, breadNeeded, message.author, message, timeCost * 1000);
    }
}