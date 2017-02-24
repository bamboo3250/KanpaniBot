var Employee = require('../classes/Employee');

function hasEnoughMaterial(player, recipe, hasForgeEffect) {
    var hasEnough = true;
    for(var i=0;i<recipe.length;i++) {
        var materialAmount = player.materialList[recipe[i].materialName];
        if (typeof materialAmount === "undefined") return false;
        var amountNeed = Math.ceil(recipe[i].amount * (hasForgeEffect?0.5:1));
        if (materialAmount < amountNeed) return false;        
    }
    return true;
}

function contains(list, itemName) {
    for(var i=0;i<list.length;i++) {
        if (itemName.toLowerCase() === list[i].toLowerCase()) return true;
    }
    return false;
}

function isEventEquipment(codeName) {
    var itemListList = [
        "xmas1",
        "xmas2-white",
        "xmas2-red",
        "xmas3-white",
        "xmas3-black",
        "valentine1",
        "valentine2-black",
        "valentine2-white"
    ];
    return contains(itemListList, codeName);
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
        if (commandArgs.length < 2) {
            message.reply("Arguments are not correct.")
            return;
        }
        var category = commandArgs[1].toLowerCase().trim();
        var equipmentCode = "";
        for(var i=2;i<commandArgs.length;i++) {
            equipmentCode += commandArgs[i] + " ";
        }
        equipmentCode = bot.functionHelper.removeExtraSpace(equipmentCode);

        if ((category != "wp") && (category != "cw") && (category != "ar") && (category != "acc")) {
            message.reply("The equipment category is not correct.")
            return;
        }

        var employee = bot.playerManager.getPlayerUnit(userId);
        var classId = employee.getClassId();
        if (isEventEquipment(equipmentCode)) {
            classId = bot.functionHelper.randomIntRange(1, 8);
        }

        var equipmentResult = null;
        if (category === "wp") {
            equipmentResult = bot.weaponDatabase.getWeaponByCodeName(equipmentCode, classId);    
        } else if (category === "ar") {
            equipmentResult = bot.armorDatabase.getArmorByCodeName(equipmentCode, classId);    
        } else if (category === "acc") {
            equipmentResult = bot.accessoryDatabase.getAccessoryByName(equipmentCode);
        } else if (category === "cw") {
            equipmentResult = bot.weaponDatabase.getWeaponByCodeName("cw", employee.characterId);
        }
        
        if (!equipmentResult) {
            message.reply("No information.")
            return;
        }

        if (!equipmentResult.isActive) {
            message.reply("This recipe is not available at the moment.")
            return;
        }

        if (employee.promotion == 0 && employee.levelCached < equipmentResult.levelRequired) {
            message.reply("Your level (**Lv." + employee.levelCached + "**) is too low for this recipe. The minimum is **Lv." + equipmentResult.levelRequired + "**.");
            return;
        }

        var hasForgeEffect = (typeof bot.forgeEffect[userId] !== "undefined" && bot.forgeEffect[userId].itemName !== "");
        var modifier = (hasForgeEffect?0.5:1);
        var goldNeeded = Math.ceil(equipmentResult.devCost * (hasForgeEffect?0.5:1));

        if (player.gold < goldNeeded) {
            message.reply("You need **" + goldNeeded + " Gold** to craft this equipment!");
            return;
        }

        if (!hasEnoughMaterial(player, equipmentResult.recipe, hasForgeEffect)) {
            var text = "You don't have enough material! The recipe requires:\n";
            for(var i=0;i<equipmentResult.recipe.length;i++) {
                var materialName = equipmentResult.recipe[i].materialName;
                var amountNeed = Math.ceil(equipmentResult.recipe[i].amount * modifier);
                text += amountNeed + " " + materialName;
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
            distribution = [100, 60, 39, 1];
        } else if (equipmentResult.tier == 4) { // event weapon
            distribution = [40, 27, 15, 7, 1];
        } else if (equipmentResult.tier == 5) { // event accessory
            distribution = [50, 30, 20, 10, 1];
        } 

        // Hammer effect
        if (typeof bot.hammerEffect[userId] !== "undefined" && bot.hammerEffect[userId].itemName !== "") {
            var hammerName = bot.hammerEffect[userId].itemName;
            if (((category === "wp" || category === "cw") && (hammerName === "1st Anni. W. Hammer" || hammerName === "Weapon Hammer"))
                    || (category === "ar" && (hammerName === "Armor Hammer"))
                    || (category === "acc" && (hammerName === "1st Anni. Acc. Hammer" || hammerName === "Accessory Hammer"))) {
                
                if (bot.hammerEffect[userId].remaining > 0) {
                    distribution[0] = 0;
                    bot.hammerEffect[userId].remaining--;
                }
                if (bot.hammerEffect[userId].remaining == 0) {
                    clearTimeout(bot.hammerEffect[userId].effectTimeout);
                    bot.hammerEffect[userId] = {
                        itemName: "",
                        remaining: 0,
                        endTime: 0,
                        effectTimeout: null
                    }
                    message.reply("Your hammer is at its limit! This is the last craft with hammer effect.");
                }
            }
        }

        var plus = bot.functionHelper.randomDist(distribution);

        var equipmentUrl = bot.urlHelper.getEquipmentIconUrl(equipmentResult._id, plus, equipmentResult.type);
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

            var text = "You have used ";
            for(var i=0;i<equipmentResult.recipe.length;i++) {
                var materialName = equipmentResult.recipe[i].materialName;
                var amountNeed = Math.ceil(equipmentResult.recipe[i].amount * modifier);
                text += "**" + amountNeed + " " + materialName + "**";
                if (i < equipmentResult.recipe.length-1) text += ", "
            }
            if (equipmentResult.recipe.length > 0) text += " and ";
            text += "**" + goldNeeded + " Gold**.\n";
            var equipmentName = "";
            equipmentName = equipmentResult.name;
            text += "Crafting **" + equipmentName + "**...";
            message.channel.sendMessage(text);
            setTimeout(function() {
                message.channel.sendMessage("Kan...");
                setTimeout(function() {
                    message.channel.sendMessage("Kan...");
                    setTimeout(function() {
                        message.channel.sendMessage("Kan...");
                        setTimeout(function() {
                            if (hasEnoughMaterial(player, equipmentResult.recipe, hasForgeEffect)) {
                                for(var i=0;i<equipmentResult.recipe.length;i++) {
                                    var materialName = equipmentResult.recipe[i].materialName;
                                    var amountNeed = Math.ceil(equipmentResult.recipe[i].amount * modifier);
                                    bot.playerManager.spendItem(userId, materialName, amountNeed);
                                }
                                bot.playerManager.spendGold(userId, goldNeeded);
                                if (category === "wp" || category === "cw") {
                                    bot.playerManager.addWeapon(userId, equipmentResult._id, plus);    
                                } else if (category === "ar") {
                                    bot.playerManager.addArmor(userId, equipmentResult._id, plus);    
                                } else if (category === "acc") {
                                    bot.playerManager.addAccessory(userId, equipmentResult._id, plus);    
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
    }
}