module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text !== "~quest") return;

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (player === null) {
            message.reply("You haven't selected your character.");
            return;
        }
        var employee = bot.createEmployeeFromPlayer(player);

        var questList = bot.questDatabase.questList;
        var result = [];
        for(var i=0;i<questList.length;i++) {
            if (questList[i].name != "" && questList[i].levelRequired <= employee.levelCached) {
                result.push(questList[i].commonNames[0]);
            }
        }
        var text = "Available quest(s) for your level: upto **" + result[result.length-1] + "**";
        message.reply(text);
    }
}