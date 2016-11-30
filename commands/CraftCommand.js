var Employee = require('../classes/Employee');

function hasEnoughMaterial(player, recipe) {
    var hasEnough = true;
    for(var i=0;i<recipe.length;i++) {
        var materialAmount = player.materialList[recipe[i].materialName];
        if (typeof materialAmount === "undefined") return false;
        if (materialAmount < recipe[i].amount) return false;        
    }
    return true;
}

module.exports = {
    handle: function(message, bot) {
        var command = message.content.trim().toLowerCase();
        command = bot.functionHelper.removeExtraSpace(command);
        if (!command.startsWith("~craft ")) return;
        if (!bot.isPM(message)) {
            message.reply("You can only craft in PM!");
            return;
        }

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (player === null) {
            message.reply("You haven't selected your character.");
            return;
        }
        
        var commandArgs = command.split(" ");
        if (commandArgs.length < 3) {
            message.reply("Arguments are not correct.")
            return;
        }
        var category = commandArgs[1].toLowerCase().trim();
        var equipmentCode = "";
        for(var i=2;i<commandArgs.length;i++) {
            equipmentCode += commandArgs[i] + " ";
        }
        equipmentCode = bot.functionHelper.removeExtraSpace(equipmentCode);

        if ((category != "wp") && (category != "ar")) {
            message.reply("The equipment category is not correct.")
            return;
        }

        var employee = bot.createEmployeeFromPlayer(player);
        var classId = employee.getClassId();

        var equipmentResult = null;
        if (category === "wp") {
            equipmentResult = bot.weaponDatabase.getWeaponByCodeName(equipmentCode, classId);    
        } else if (category === "ar") {
            equipmentResult = bot.armorDatabase.getArmorByCodeName(equipmentCode, classId);    
        }
        
        // if (!equipmentResult) {
        //     equipmentResult = bot.weaponDatabase.getWeaponByName(equipmentCode);
        // }
        if (!equipmentResult) {
            message.reply("No information.")
            return;
        }

        if (employee.levelCached < equipmentResult.levelRequired) {
            message.reply("Your level (**Lv." + employee.levelCached + "**) is too low for this recipe. The minimum is **Lv." + equipmentResult.levelRequired + "**.");
            return;
        }

        if (player.gold < equipmentResult.devCost) {
            message.reply("You need **" + equipmentResult.devCost + " Gold** to craft this equipment!");
            return;
        }

        if (!hasEnoughMaterial(player, equipmentResult.recipe)) {
            var text = "You don't have enough material! The recipe requires:\n";
            for(var i=0;i<equipmentResult.recipe.length;i++) {
                var materialName = equipmentResult.recipe[i].materialName;
                text += equipmentResult.recipe[i].amount + " " + materialName;
                var playerMaterialAmount = 0;
                if (typeof player.materialList[materialName] != "undefined") {
                    playerMaterialAmount = player.materialList[materialName];
                }
                text += " (You have **" +  playerMaterialAmount + "**).\n";
            }
            message.reply(text);
            return;
        }

        var distribution = [20, 35, 35, 10];    // tier 1
        if (equipmentResult.tier == 2) {
            distribution = [55, 35, 9, 1];
        } else if (equipmentResult.tier == 3) {
            distribution = [220, 170, 9, 1];
        } 
        var plus = bot.functionHelper.randomDist(distribution);

        var equipmentUrl = bot.urlHelper.getEquipmentIconUrl(equipmentResult._id, plus);
        var equipmentFileName = "images/equipment/large/" + equipmentResult._id + "0" + (plus+1) + "_1.png";

        var queue = [
            { fileToDownload: equipmentUrl,   fileToSave: equipmentFileName}
        ];
        bot.imageHelper.download(queue, function(err) {
            if (err) {
                message.reply("Error happened. Try again.");
                bot.log(err);
                return;
            }

            bot.imageHelper.read([equipmentFileName], function (err, imageList) {
                if (err) {
                    message.reply("Error happened. Try again.");
                    bot.log(err);
                    return;
                }
                var text = "You have used ";
                for(var i=0;i<equipmentResult.recipe.length;i++) {
                    var materialName = equipmentResult.recipe[i].materialName;
                    var amount = equipmentResult.recipe[i].amount;
                    text += "**" + amount + " " + materialName + "**";
                    if (i < equipmentResult.recipe.length-1) text += ", "
                }
                if (equipmentResult.recipe.length > 0) text += " and ";
                text += "**" + equipmentResult.devCost + " Gold**.\n";
                var equipmentName = "";
                if (category == "wp") {
                    equipmentName = equipmentResult.weaponName;
                } else if (category == "ar") {
                    equipmentName = equipmentResult.armorName;
                }
                text += "Crafting **" + equipmentName + "**...";
                message.channel.sendMessage(text);
                setTimeout(function() {
                    message.channel.sendMessage("Kan...");
                    setTimeout(function() {
                        message.channel.sendMessage("Kan...");
                        setTimeout(function() {
                            message.channel.sendMessage("Kan...");
                            setTimeout(function() {
                                if (hasEnoughMaterial(player, equipmentResult.recipe)) {
                                    for(var i=0;i<equipmentResult.recipe.length;i++) {
                                        var materialName = equipmentResult.recipe[i].materialName;
                                        var amount = equipmentResult.recipe[i].amount;
                                        bot.playerManager.spendItem(userId, materialName, amount);
                                    }
                                    bot.playerManager.spendGold(userId, equipmentResult.devCost);
                                    if (category === "wp") {
                                        bot.playerManager.addWeapon(userId, equipmentResult._id, plus);    
                                    } else if (category === "ar") {
                                        bot.playerManager.addArmor(userId, equipmentResult._id, plus);    
                                    }
                                    
                                    bot.savePlayer();
                                    message.channel.sendFile(equipmentFileName, "png", "");
                                } else {
                                    message.reply("You don't have enough material!");
                                }
                            }, 500);
                        }, 1000);   
                    }, 1000);        
                }, 1000);
            });
        });
    }
}