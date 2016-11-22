var Employee = require('../classes/Employee');

module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text != "~take") return;
        var userId = message.author.id;

        if (typeof bot.rollResult[userId] === "undefined" || bot.rollResult[userId] === null) {
            message.reply("You have to roll first.");
            bot.rollResult[userId] = null;
            return;
        }

        var player = bot.playerManager.getPlayer(userId);
        if (player === null) {
            player = bot.playerManager.createNewPlayer(userId);
        }

        if (typeof bot.runQuestStatus[userId] === "undefined") {
            bot.runQuestStatus[userId] = {
                quest: "", endTime: -1
            };
        }

        if (bot.runQuestStatus[userId].quest != "") {
            message.reply("You cannot change your character while doing quest.");
            return;
        }

        player.characterId = bot.rollResult[userId];
        player.exp = Math.floor(player.exp/2);
        if (player.equipedWeapon) {
            player.weaponList.push(player.equipedWeapon);
            player.equipedWeapon = null;
        }
        if (player.equipedArmor) {
            player.armorList.push(player.equipedArmor);
            player.equipedArmor = null;
        }
        bot.savePlayer();
        var employee = new Employee(bot.employeeDatabase.getEmployeeById(bot.rollResult[userId]));
        message.reply("Congratulations! You have selected **" + employee.fullName + "** as your character.");
        bot.rollResult[userId] = null;
    }
}