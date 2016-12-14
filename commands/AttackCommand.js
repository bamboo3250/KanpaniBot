module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~attack") return;
        var target = command.mentions.first();
        if (!target) {
            message.reply("You need to specify your target.");
            return;
        }
        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        var employee = bot.createEmployeeFromPlayer(player);
        var skillName = employee.getCurrentSkill();
        if (!skillName) {
            message.reply("You need to equip weapon first.");
            return;
        }
        var skill = bot.skillDatabase.getSkill(skillName);
        
    }
}