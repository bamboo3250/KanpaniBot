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
            bot.playerManager.addWeapon(userId, player.equipedWeapon._id, player.equipedWeapon.plus);
            player.equipedWeapon = null;
        }
        if (player.equipedArmor) {
            bot.playerManager.addArmor(userId, player.equipedArmor._id, player.equipedArmor.plus);
            player.equipedArmor = null;
        }
        if (player.equipedAccessory) {
            bot.playerManager.addAccessory(userId, player.equipedAccessory._id, player.equipedAccessory.plus);
            player.equipedAccessory = null;
        }
        bot.savePlayer();
        player = bot.playerManager.getPlayer(userId);
        var employee = bot.unitManager.createUnitForPlayer(player);
        message.reply("Congratulations! You have selected **" + employee.fullName + "** as your character.");
        bot.rollResult[userId] = null;
    }
}