var Jimp = require("jimp");

module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~attack" && command.commandName != "~atk") return;
        
        if (message.channel.name != "battlefield") {
            message.reply("You can only use this command in Battlefield.");
            return;
        }

        var userId = message.author.id;
        var playerUnit = bot.unitManager.getPlayerUnit(userId);
        
        if (!playerUnit) {
            message.reply("You need to select character first.");
            return;
        }

        if (playerUnit.currentHP === 0) {
            var text = "You have fainted.";
            if (playerUnit.respawnTime) {
                    var now = new Date();
                var remainingTime = playerUnit.respawnTime - now.valueOf();
                var time = bot.functionHelper.parseTime(remainingTime);
                text += " You can attack again after " + time + "."
            } else {
                text += " You cannot attack now."
            }
            message.reply(text); 
            return;
        }

        var targetList = command.mentionIds;
        if (targetList.length === 0) {
            message.reply("You need to specify your target.");
            return;
        }

        var targetUnitList = [];
        for (var i = 0; i < targetList.length; i++) {
            var targetUnit = bot.unitManager.getPlayerUnit(targetList[i]);
            if (!targetUnit) {
                message.reply("One of your targets does not have character.");
                return;
            }
            if (targetUnit.getCurrentHP() === 0) {
                message.reply("You cannot target a fainted unit.");
                return;
            }
            targetUnitList.push(targetUnit);
        };
        
        if (!bot.battleController) {
            message.reply("You cannot do battle now.");
            return;
        }

        if (!bot.userManager.doesMemberHaveRole(userId, "Trainee")) {
            message.reply("You need to join Training first. Use `~jointraining`.");
            return;
        }

        bot.battleController.attack(playerUnit, targetUnitList, function(err, text, imageFileName, koList, shouldMention = false) {
            if (err) {
                bot.log("[attack] " + err);
                return;
            }
            if (koList) {
                for(var i=0;i<koList.length;i++) {
                    var koUserId = koList[i];
                    var koUnit = bot.unitManager.getPlayerUnit(koUserId);
                    var koUser = bot.userManager.getUser(koUserId);
                    bot.userManager.addRole(koUserId, "Fainted");
                    if (koUser) {
                        text += koUnit.shortName + " (" + koUser.username + ") is KO-ed!\n";
                    }
                }
            }
            if (imageFileName) {
                message.channel.sendFile(imageFileName, "png", text)
                .then(msg => {
                    if (koList) {

                        var queue = [];
                        var queueToRead = [];
                        for(var i=0;i<koList.length;i++) {
                            var koUserId = koList[i];
                            var koUnit = bot.unitManager.getPlayerUnit(koUserId);
                            var imgUrl = bot.urlHelper.getIllustURL(koUnit, "chara_ko");
                            var fileName = "images/chara_ko/" + koUnit.characterId + ".png";
                            queue.push({ fileToDownload: imgUrl,   fileToSave: fileName});
                            queueToRead.push(fileName);
                        }

                        bot.imageHelper.download(queue, function(err) {
                            if (err) {
                                message.reply("Error happened. Try again.");
                                bot.log(err);
                                return;
                            }

                            bot.imageHelper.read(queueToRead, function (err, imageList) {
                                if (err) {
                                    message.reply("Error happened. Try again.");
                                    bot.log(err);
                                    return;
                                }
                                image = new Jimp(1001 * koList.length, 1162, 0xFFFFFF00, function (err, image) {
                                    for(var i=0;i<koList.length;i++) {
                                        var koUserId = koList[i];
                                        var koUnit = bot.unitManager.getPlayerUnit(koUserId);
                                        var fileName = "images/chara_ko/" + koUnit.characterId + ".png";
                                        image.composite(imageList[fileName], 1001 * i, 0);
                                    }
                                    var imageName = "images/battle_ko/" + userId + ".png";
                                    image.write(imageName, function() {
                                        message.channel.sendFile(imageName, "png", "");
                                    });
                                });
                            });
                        });
                    }
                }).catch(err => bot.log(err));
            } else {
                if (shouldMention) {
                    message.reply(text);
                } else {
                    message.channel.sendMessage(text);
                }
            }
        });
    }
}