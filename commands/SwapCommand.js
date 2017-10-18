module.exports = {
    names: ['swap'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        var unit = bot.playerManager.getPlayerUnit(userId);
        
        if (!player) {
            message.author.send("You have to select character first.");
            return;
        }

        if (!player.partnerId) {
            message.author.send("You don't have any partner to swap with.");
            return;
        }        

        var partner = bot.playerManager.getPlayer(player.partnerId);

        var tmp = partner.position;
        partner.position = player.position;
        player.position = tmp;
        bot.savePlayer();

        bot.playerManager.refreshUnitForPlayerId(userId);
        bot.playerManager.refreshUnitForPlayerId(player.partnerId);
        var text = "Now you are in " + player.position + "line and your partner is in " + partner.position + "line.";
        message.author.send(text);
    }
}
