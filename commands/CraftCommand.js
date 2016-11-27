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
        var weaponCode = "";
        for(var i=2;i<commandArgs.length;i++) {
            weaponCode += commandArgs[i] + " ";
        }
        weaponCode = bot.functionHelper.removeExtraSpace(weaponCode);

        if ((category != "weapon")) {
            message.reply("The weapon category is not correct.")
            return;
        }

        var employee = bot.createEmployeeFromPlayer(player);
        var classId = employee.getClassId();

        var weapon = null;
        var weaponResult = bot.weaponDatabase.getWeaponByCodeName(weaponCode, classId);
        // if (!weaponResult) {
        //     weaponResult = bot.weaponDatabase.getWeaponByName(weaponCode);
        // }
        if (!weaponResult) {
            message.reply("No information.")
            return;
        }

        if (employee.levelCached < weaponResult.levelRequired) {
            message.reply("Your level (**Lv." + employee.levelCached + "**) is too low for this recipe. The minimum is **Lv." + weaponResult.levelRequired + "**.");
            return;
        }

        if (player.gold < weaponResult.devCost) {
            message.reply("You need **" + weaponResult.devCost + " Gold** to craft this equipment!");
            return;
        }

        if (!hasEnoughMaterial(player, weaponResult.recipe)) {
            var text = "You don't have enough material! The recipe requires:\n";
            for(var i=0;i<weaponResult.recipe.length;i++) {
                var materialName = weaponResult.recipe[i].materialName;
                text += weaponResult.recipe[i].amount + " " + materialName;
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
        //var distribution = [50, 39, 10, 1];
        var plus = bot.functionHelper.randomDist(distribution);

        var weaponUrl = bot.urlHelper.getEquipmentIconUrl(weaponResult._id, plus);
        var weaponFileName = "images/equipment/large/" + weaponResult._id + "0" + (plus+1) + "_1.png";

        var queue = [
            { fileToDownload: weaponUrl,   fileToSave: weaponFileName}
        ];
        bot.imageHelper.download(queue, function(err) {
            if (err) {
                message.reply("Error happened. Try again.");
                bot.log(err);
                return;
            }

            bot.imageHelper.read([weaponFileName], function (err, imageList) {
                if (err) {
                    message.reply("Error happened. Try again.");
                    bot.log(err);
                    return;
                }
                var text = "You have used ";
                for(var i=0;i<weaponResult.recipe.length;i++) {
                    var materialName = weaponResult.recipe[i].materialName;
                    var amount = weaponResult.recipe[i].amount;
                    text += "**" + amount + " " + materialName + "**";
                    if (i < weaponResult.recipe.length-1) text += ", "
                }
                if (weaponResult.recipe.length > 0) text += " and ";
                text += "**" + weaponResult.devCost + " Gold**.\n";
                text += "Crafting **" + weaponResult.weaponName + "**...";
                message.channel.sendMessage(text);
                setTimeout(function() {
                    message.channel.sendMessage("Kan...");
                    setTimeout(function() {
                        message.channel.sendMessage("Kan...");
                        setTimeout(function() {
                            message.channel.sendMessage("Kan...");
                            setTimeout(function() {
                                for(var i=0;i<weaponResult.recipe.length;i++) {
                                    var materialName = weaponResult.recipe[i].materialName;
                                    var amount = weaponResult.recipe[i].amount;
                                    bot.playerManager.spendItem(userId, materialName, amount);
                                }
                                bot.playerManager.spendGold(userId, weaponResult.devCost);
                                bot.playerManager.addWeapon(userId, weaponResult._id, plus);
                                bot.savePlayer();
                                message.channel.sendFile(weaponFileName, "png", "");
                            }, 500);
                        }, 1000);   
                    }, 1000);        
                }, 1000);
            });
        });
    }
}