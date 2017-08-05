var Employee = require('../classes/Employee');

module.exports = {
    handle: function(message, bot) {
        var command = message.content.trim().toLowerCase();
        command = bot.functionHelper.removeExtraSpace(command);
        if (!command.startsWith("~equip ")) return;

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (player === null) {
            message.author.send("You haven't selected your character.");
            return;
        }
        
        var ARGUMENT_NOT_CORRECT_ERROR = "Arguments are not correct.";
        var commandArgs = command.split(" ");
        if (commandArgs.length < 2) {
            message.author.send(ARGUMENT_NOT_CORRECT_ERROR);
            return;
        }
        var category = commandArgs[1];
        var equipmentCode = "";
        for(var i=2;i<commandArgs.length-1;i++) {
            equipmentCode += commandArgs[i] + " ";
        }
        equipmentCode = bot.functionHelper.removeExtraSpace(equipmentCode);

        var plus = 0;
        if (commandArgs.length > 2) {
            plus = commandArgs[commandArgs.length-1];
            if (!plus.startsWith("+")) {
                plus = 0;
            } else {
                plus = plus.substring(1);
                if (isNaN(plus)) {
                    plus = 0;
                } else {
                    plus = parseInt(plus);
                }
            }
        }

        if ((category != "ar") && (category != "wp") && (category != "cw") && (category != "acc")) {
            message.author.send("The equipment category is not correct. It should be `wp` for weapon, `cw` for character weapon, `ar` for armor or `acc` for accessory.")
            return;
        }

        var employee = bot.playerManager.getPlayerUnit(userId);
        var classId = employee.getClassId();

        var equipmentResult = null;
        if (category == "wp") {
            equipmentResult = bot.weaponDatabase.getWeaponByCodeName(equipmentCode, classId);
        } else if (category == "ar") {
            equipmentResult = bot.armorDatabase.getArmorByCodeName(equipmentCode, classId);
        } else if (category == "acc") {
            equipmentResult = bot.accessoryDatabase.getAccessoryByName(equipmentCode);
        } else if (category == "cw") {
            equipmentResult = bot.weaponDatabase.getWeaponByCodeName("cw", employee.characterId);
        }
        if (!equipmentResult) {
            message.author.send("No information.")
            return;
        }

        var equipmentName = equipmentResult.name;
        var equipmentList = {};
        if (category == "wp" || category == "cw") {
            equipmentList = player.weaponList;
        } else if (category == "ar") {
            equipmentList = player.armorList;
        } else if (category == "acc") {
            equipmentList = player.accessoryList;
        }

        if (typeof equipmentList[equipmentResult._id] === "undefined") {

            message.author.send("You don't have any **" + equipmentName + "**.");
            return;
        }
        if (typeof equipmentList[equipmentResult._id]["+" + plus] === "undefined" || equipmentList[equipmentResult._id]["+" + plus] <= 0) {
            message.author.send("You don't have any **" + equipmentName + " +" + plus + "**.");
            return;
        }
        if (category == "wp" || category == "cw") {
            bot.playerManager.equipWeapon(userId, equipmentResult._id, plus);
        } else if (category == "ar") {
            bot.playerManager.equipArmor(userId, equipmentResult._id, plus);
        } else if (category == "acc") {
            bot.playerManager.equipAccessory(userId, equipmentResult._id, plus);
        }
        bot.savePlayer();
        bot.playerManager.refreshUnitForPlayerId(userId);
        message.author.send("You have equipped **" + equipmentName + " +" + plus + "**");
    }
}