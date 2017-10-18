var Employee = require('../classes/Employee');

module.exports = {
    names: ['take'],
    usage: '~take',
    description: 'take the character after rolling',
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

        if (player.characterId) {
            var curEmployee = new Employee(bot.employeeDatabase.getEmployeeById(player.characterId));
            var takingEmployee = new Employee(bot.employeeDatabase.getEmployeeById(bot.rollResult[userId]));

            if (player.promotion > 0 && curEmployee.getBaseRarity() != takingEmployee.getBaseRarity()) {
                message.reply("You cannot take this character.");
                return;
            }    
        }
        

        player.characterId = bot.rollResult[userId];
        var expToPay = Math.ceil(player.exp*0.1);
        player.exp -= expToPay;
        
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
        var employee = bot.playerManager.createUnitForPlayer(player);
        message.reply("Congratulations! You have selected **" + employee.fullName + "** as your character.");
        bot.rollResult[userId] = null;
    }
}