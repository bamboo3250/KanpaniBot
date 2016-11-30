var Employee = require('../classes/Employee');

module.exports = {
    handle: function(message, bot) {
        var command = message.content.trim().toLowerCase();
        command = bot.functionHelper.removeExtraSpace(command);
        if (!command.startsWith("~equip ")) return;

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (player === null) {
            message.reply("You haven't selected your character.");
            return;
        }
        
        var ARGUMENT_NOT_CORRECT_ERROR = "Arguments are not correct.";
        var commandArgs = command.split(" ");
        if (commandArgs.length < 3) {
            message.reply(ARGUMENT_NOT_CORRECT_ERROR);
            return;
        }
        var category = commandArgs[1];
        var equipmentCode = commandArgs[2];
        var plus = 0;
        if (commandArgs.length > 3) {
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

        if ((category != "ar") && (category != "wp")) {
            message.reply("The equipment category is not correct. It should be `wp` for weapon or `ar` for armor.")
            return;
        }

        var employee = bot.createEmployeeFromPlayer(player);
        var classId = employee.getClassId();

        var equipmentResult = null;
        if (category == "wp") {
            equipmentResult = bot.weaponDatabase.getWeaponByCodeName(equipmentCode, classId);
        } else if (category == "ar") {
            equipmentResult = bot.armorDatabase.getArmorByCodeName(equipmentCode, classId);
        }
        if (!equipmentResult) {
            message.reply("No information.")
            return;
        }

        var equipmentName = "";
        var equipmentList = {};
        if (category == "wp") {
            equipmentName = equipmentResult.weaponName;
            equipmentList = player.weaponList;
        } else if (category == "ar") {
            equipmentName = equipmentResult.armorName;
            equipmentList = player.armorList;
        }

        if (typeof equipmentList[equipmentResult._id] === "undefined") {

            message.reply("You don't have any **" + equipmentName + "**.");
            return;
        }
        if (typeof equipmentList[equipmentResult._id]["+" + plus] === "undefined" || equipmentList[equipmentResult._id]["+" + plus] <= 0) {
            message.reply("You don't have any **" + equipmentName + " +" + plus + "**.");
            return;
        }
        if (category == "wp") {
            bot.playerManager.equipWeapon(userId, equipmentResult._id, plus);
        } else if (category == "ar") {
            bot.playerManager.equipArmor(userId, equipmentResult._id, plus);
        }
        bot.savePlayer();
        message.reply("You have equipped **" + equipmentName + " +" + plus + "**");
    }
}