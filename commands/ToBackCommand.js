module.exports = {
    handle: function(message, bot) {
        var command = message.content.trim().toLowerCase();
        if (!command.startsWith("~toback ")) return;
        if (bot.isPM(message)) {
            message.reply("You cannot use this command in Private Message.");
            return;
        }
        var targetUser = message.mentions.users.first();
        if (!targetUser) return;

        var userId = message.author.id;
        if (targetUser.id === userId) {
            message.reply("You cannot move to the back of yourself.");
            return;
        }

        bot.pendingPartnerRequest[userId] = {
            position: "back",
            targetId: targetUser.id
        };

        var text = "You have sent Partner Request to **" + targetUser.username + "**\n";

        if (bot.pendingPartnerRequest[targetUser.id]) {
            if (bot.pendingPartnerRequest[targetUser.id].position === "front" && bot.pendingPartnerRequest[targetUser.id].targetId === userId) {
                bot.pendingPartnerRequest[targetUser.id] = null;
                bot.pendingPartnerRequest[userId] = null;
                bot.playerManager.setPartner(targetUser.id, userId);
                text += "Congratulations! Now you are partner of **" + targetUser.username + "**";
                text += " (front: " + targetUser.username + ", back: " + message.author.username + ").";
            }
        }
    }
}