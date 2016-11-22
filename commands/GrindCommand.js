var Employee = require('../classes/Employee');
var Jimp = require("jimp");

module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (!text.startsWith("~grind ")) return;
        if (message.channel.name === bot.dmmChannelName || message.channel.name === bot.nutakuChannelName) return;

        var questName = text.substring(7).trim().toLowerCase();
        var quest = bot.questDatabase.getQuestByName(questName);
        if (quest == null) {
            message.reply("No information.");
            return;
        }
        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (player == null) {
            message.reply("You haven't selected your character.");
            return;
        }
        var employee = bot.createEmployeeFromPlayer(player);
        if (employee.levelCached < quest.levelRequired) {
            message.reply("Your level (**Lv." + employee.levelCached + "**) is too low for this quest. The minimum is **Lv." + quest.levelRequired + "**.");
            return;
        }

        if (typeof bot.runQuestStatus[userId] === "undefined") {
            bot.runQuestStatus[userId] = {
                quest: "", endTime: -1
            };
        }

        var now = new Date();

        if (bot.runQuestStatus[userId].quest != "") {
            var remainingTime = bot.runQuestStatus[userId].endTime - now.valueOf();
            var time = bot.functionHelper.parseTime(remainingTime);
            message.reply("You are running quest " + bot.runQuestStatus[userId].quest + ". It will end in **" + (time.min>0? time.min + " min(s) ":"") + (time.sec + " sec(s)") + "**");
            return;
        }

        if (player.gold < quest.goldCost) {
            message.reply("You don't have enough Gold.");
            return;
        }
        if (!bot.consumeBread(message, quest.breadCost)) return;
        player.gold -= quest.goldCost;
        bot.savePlayer();

        bot.runQuestStatus[userId].quest = quest.commonNames[0];
        bot.runQuestStatus[userId].endTime = now.valueOf() + quest.timeCost*60*1000;
        bot.saveRunQuestStatus();

        var chanceToSuccess = 70;
        for(var i=0;i<quest.advantage.length;i++) {
            if (quest.advantage[i] == employee.getClassId()) chanceToSuccess = 90;
        }
        chanceToSuccess = Math.min(100, chanceToSuccess + (employee.levelCached - quest.levelRequired));

        var text = "The quest " + quest.commonNames[0] + " has started. It will end in **" + quest.timeCost + " minutes**.\n";
        text += "Chance of Success: **" + chanceToSuccess + "%**";
        message.reply(text);

        setTimeout(function() {
            bot.runQuestStatus[userId] = {
                quest: "", endTime: -1
            };
            bot.saveRunQuestStatus();

            var text = "The quest has finished!\n\n";
            text += "=================MISSION REPORT=================\n\n";
            text += "Mission: **" + quest1.name + "** (**" + quest.commonNames[0] + "**)\n";

            
            var isSuccess = bot.functionHelper.randomInt(100) < chanceToSuccess;
            text += "Status: **" + (isSuccess?"SUCCESS :white_check_mark: ":"FAIL :x:") + "**\n";

            var extraExp = Math.floor(quest.exp*0.1);
            var expGained = (isSuccess ? quest.exp + bot.functionHelper.randomInt(extraExp + 1) : 0);
            var goldGained = (isSuccess ? quest.goldReward : 0);
            var breadGained = (isSuccess ? quest.breadReward : 0);
            text += "EXP gained: **" + expGained + "**\n";
            text += "Gold: **" + goldGained + "**   Bread: **" + breadGained + "**\n";
            text += "Item Drop:\n";

            var backupItemDropText = "";

            var drop = {};
            if (isSuccess) {
                for(var i=0;i<quest.numItemDrop;i++) {
                    var itemName = bot.functionHelper.randomObject(quest.dropList);
                    if (typeof drop[itemName] === "undefined") drop[itemName] = 0;
                    drop[itemName]++;
                }    
            }
            

            var preLevel = employee.levelCached;
            player.exp += expGained;
            employee.addExp(expGained);
            var isLevelUp = (preLevel < employee.levelCached)
            var levelUpText = "Congratulations! Your level has increased to **" + employee.levelCached + "**";
            
            player.gold += goldGained;
            bot.remainingBread[userId] = Math.min(bot.remainingBread[userId] + breadGained, bot.cappedBread);

            var itemNameList = [];
            for(key in drop) {
                itemNameList.push(key);
                backupItemDropText += key + " x" + drop[key] + "\n";
                if (typeof player.materialList[key] === "undefined") {
                    player.materialList[key] = 0;
                }
                player.materialList[key] += drop[key];
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
                    message.author.sendMessage(text + backupItemDropText);
                    if (isLevelUp) {
                        setTimeout(function() {
                            message.author.sendMessage(levelUpText);
                        }, 5*1000);
                    }
                    return;
                }
                bot.imageHelper.read(itemFileNameList, function (err, imageList) {
                    if (err || imageList.length == 0) {
                        message.author.sendMessage(text + backupItemDropText);
                        if (isLevelUp) {
                            setTimeout(function() {
                                message.author.sendMessage(levelUpText);
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
                                var channel = message.channel;
                                if (channel.type === "text" || channel.type === "dm") {
                                    message.author.sendFile(imageName, "png", text);
                                    if (isLevelUp) {
                                        setTimeout(function() {
                                            message.author.sendMessage(levelUpText);
                                        }, 5*1000);
                                    }
                                }   
                            });
                        });
                    });
                });
            });
        }, quest.timeCost*60*1000);
    }
}