module.exports = {
    names: ['itemdrop'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var itemName = command.args.join(" ");
        var item = bot.itemInfoDatabase.getItemInfoByName(itemName);
        var questList = bot.questDatabase.getQuestsForItem(itemName);
        if (!item || questList.length <= 0) {
            message.reply("No information.");
            return;
        }
        var text = "You can find **" + item.itemName + "** in: ";
        for(var i=0;i<questList.length;i++) {
            if (i<questList.length-2) {
                text += questList[i] + ", ";
            } else if (i<questList.length-1) {
                text += questList[i] + " and ";
            } else {
                text += questList[i] + ".";
            }
        }
        message.channel.send(text);
    }
}