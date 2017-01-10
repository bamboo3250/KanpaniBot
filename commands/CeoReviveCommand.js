module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~ceorevive") return;

        if (!bot.consumeBread(message, 3)) return;
        var userId = message.author.id;
        var unit = bot.unitManager.getPlayerUnit(userId);
        if (unit) {
            unit.fullHeal();
            if (bot.userManager.doesMemberHaveRole(userId, "Fainted")) {
                bot.userManager.removeRole(userId, "Fainted")
            }
            message.reply("Your character has been healed completely.");
        } else {
            message.reply("You have to select character first.");
        }
    }
}
