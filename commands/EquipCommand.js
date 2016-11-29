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
        var weaponCode = commandArgs[2];
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

        if ((category != "weapon") && (category != "wp")) {
            message.reply("The weapon category is not correct.")
            return;
        }

        var employee = bot.createEmployeeFromPlayer(player);
        var classId = employee.getClassId();

        var weapon = null;
        var weaponResult = bot.weaponDatabase.getWeaponByCodeName(weaponCode, classId);
        if (!weaponResult) {
            message.reply("No information.")
            return;
        }

        if (typeof player.weaponList[weaponResult._id] === "undefined") {
            message.reply("You don't have any **" + weaponResult.weaponName + "**.");
            return;
        }
        if (typeof player.weaponList[weaponResult._id]["+" + plus] === "undefined" || player.weaponList[weaponResult._id]["+" + plus] <= 0) {
            message.reply("You don't have any **" + weaponResult.weaponName + " +" + plus + "**.");
            return;
        }
        bot.playerManager.equipWeapon(userId, weaponResult._id, plus);
        bot.savePlayer();
        message.reply("You have equipped **" + weaponResult.weaponName + " +" + plus + "**");
    }
}