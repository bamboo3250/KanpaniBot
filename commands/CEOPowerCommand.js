module.exports = {
    names: ['ceopower'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (!player) {
             message.reply("You haven't selected your character.");
            return;
        }

        if (player.ceoPower) {
            message.reply("You have been using CEO Power.");
            return;
        }

        if (player.gold < 1000000) {
            message.reply("You only have **" + player.gold + " Gold**. You need 1,000,000 Gold to use CEO Power.");
            return;
        }

        player.ceoPower = true;
        bot.playerManager.spendGold(userId, 1000000);
        bot.savePlayer();
        message.reply("You have spent 1,000,000 Gold to use CEO Power. Your quest now is guaranteed to be success.");
    }
}