module.exports = {
    handle: function(message, bot) {
        var command = message.content.trim().toLowerCase();
        if (!command.startsWith("~tofront")) return;
        if (bot.isPM(message)) {
            message.reply("You cannot use this command in Private Message.");
            return;
        }
        
        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (!player) {
            message.reply("You haven't selected character.");
            return;
        }

        var targetUser = message.mentions.users.first();
        if (!targetUser) {
            if (player.position === "front") {
                message.reply("You have already been in frontline.");
                return;
            }
            bot.playerManager.unsetPartner(userId);
            player.position = "front";
            bot.savePlayer();
            bot.playerManager.refreshUnitForPlayerId(userId);
            message.reply("You now are in frontline");
            return;
        };
        
        if (targetUser.id === userId) {
            message.reply("You cannot move to the front of yourself.");
            return;
        }

        bot.pendingPartnerRequest[userId] = {
            position: "front",
            targetId: targetUser.id
        };

        var text = "You have sent Partner Request to **" + targetUser.username + "**\n";

        if (bot.pendingPartnerRequest[targetUser.id]) {
            if (bot.pendingPartnerRequest[targetUser.id].position === "back" && bot.pendingPartnerRequest[targetUser.id].targetId === userId) {
                bot.pendingPartnerRequest[targetUser.id] = null;
                bot.pendingPartnerRequest[userId] = null;
                bot.playerManager.setPartner(userId, targetUser.id);
                text += "Congratulations! Now you are partner of **" + targetUser.username + "**";
                text += " (front: " + message.author.username + ", back: " + targetUser.username + ").";
                bot.savePlayer();
                bot.playerManager.refreshUnitForPlayerId(userId);
                bot.playerManager.refreshUnitForPlayerId(targetUser.id);
            }
        }
        message.reply(text);
    }
}