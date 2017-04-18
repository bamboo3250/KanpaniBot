module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text !== "~quest") return;
        if (message.channel.name === bot.dmmChannelName || message.channel.name === bot.mainChannelName) return;
        
        var userId = message.author.id;
        var employee = bot.playerManager.getPlayerUnit(userId);
        if (employee === null) {
            message.reply("You haven't selected your character.");
            return;
        }

        var questList = bot.questDatabase.questList;
        var result = [];
        for(var i=0;i<questList.length;i++) {
            if (questList[i].name != "" && (employee.promotion > 0 || questList[i].levelRequired <= employee.levelCached)) {
                result.push(questList[i].commonNames[0]);
            }
        }
        var text = "Available quest(s) for your level: upto **" + result[result.length-1] + "**";
        message.reply(text);
    }
}