module.exports = {
    names: ['shop'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        if (!bot.isPM(message)) {
            message.reply("You can use this command in Private Message only.");
            return;
        }

        var text = "";
        for(key in bot.shop) {
            var itemName = key;
            text += "Item: **" + itemName + "**\n";
            text += "Price: **" + bot.shop[itemName].price.amount + " " + bot.shop[itemName].price.unit + "**\n"
            text += "Stock: **" + bot.shop[itemName].amount + "**\n";
            text += "\n";
        }

        message.channel.send(text);
    }
}