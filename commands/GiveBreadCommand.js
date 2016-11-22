module.exports = {
    handle: function(message, bot) {
        var text = bot.functionHelper.removeExtraSpace(message.content.trim().toLowerCase());
        var args = text.split(" ");
        if (args[0] !== "~givebread") return;
        if (args.length < 2 || args.length > 3) return;
        var giverId = message.author.id;

        var receiverId = "";
        var amount = 1;

        if (args.length === 2) {
            receiverId = bot.functionHelper.getIdFromMention(args[1]);
            if (receiverId === "") return;
        } else if (args.length === 3) {
            if (!isNaN(args[1]) && bot.functionHelper.isMention(args[2])) {
                amount = Math.floor(parseInt(args[1]));
                receiverId = bot.functionHelper.getIdFromMention(args[2]);
            } else if (!isNaN(args[2]) && bot.functionHelper.isMention(args[1])) {
                amount = Math.floor(parseInt(args[2]));
                receiverId = bot.functionHelper.getIdFromMention(args[1]);
            } else {
                return;
            }
        }
        
        if (typeof bot.breadReceived[receiverId] === "undefined") {
            bot.breadReceived[receiverId] = 0;
        }

        if (amount < 1) {
            message.reply("The amount of bread should be at least 1.");
            return;
        } else if (amount > bot.remainingBread[giverId]) {
            var text = "The amount of bread should not be more than what you have.";
            if (bot.remainingBread[giverId] <= 0) {
                message.reply("You have **no Bread**. " + text);
            } else {
                message.reply("You only have **" + bot.remainingBread[giverId] + " Bread**. " + text);
            }
            return;
        }

        if (bot.breadReceived[receiverId] + amount > 5) {
            if (bot.breadReceived[receiverId] >= 5) {
                message.reply("The receiver can't receive any bread more today.");
            } else {
                message.reply("The receiver can only receive " + (5 - bot.breadReceived[receiverId]) + " bread more today.");
            }
            return;
        }

        if (bot.consumeBread(message, amount)) {
            bot.initBreadIfNeed(receiverId);
            bot.remainingBread[receiverId] += amount;
            bot.breadReceived[receiverId] += amount;
            message.reply(amount + " Bread has been transfered.");
        }
    }
}