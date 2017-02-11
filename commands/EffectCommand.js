module.exports = {
    handle: function(message, bot) {
        var command = message.content.trim().toLowerCase();
        if (command !== "~effect") return;

        var userId = message.author.id;
        var text = "";

        if (typeof bot.mailboxEffect[userId] !== "undefined" && bot.mailboxEffect[userId].itemName !== "") {
            var now = new Date();
            var remainingTime = bot.mailboxEffect[userId].endTime - now.valueOf();
            var time = bot.functionHelper.parseTime(remainingTime);
            text += "**" + bot.mailboxEffect[userId].itemName + "**: " + time + "\n";
        }
        if (typeof bot.hammerEffect[userId] !== "undefined" && bot.hammerEffect[userId].itemName !== "") {
            var now = new Date();
            var remainingTime = bot.hammerEffect[userId].endTime - now.valueOf();
            var time = bot.functionHelper.parseTime(remainingTime);
            text += "**" + bot.hammerEffect[userId].itemName + "**: " + bot.hammerEffect[userId].remaining + " time(s) (" + time + ")\n";
        }
        if (typeof bot.forgeEffect[userId] !== "undefined" && bot.forgeEffect[userId].itemName !== "") {
            var now = new Date();
            var remainingTime = bot.forgeEffect[userId].endTime - now.valueOf();
            var time = bot.functionHelper.parseTime(remainingTime);
            text += "**" + bot.forgeEffect[userId].itemName + "**: " + time + "\n";
        }
        if (typeof bot.grindEffect[userId] !== "undefined" && bot.grindEffect[userId].itemName !== "") {
            var now = new Date();
            var remainingTime = bot.grindEffect[userId].endTime - now.valueOf();
            var time = bot.functionHelper.parseTime(remainingTime);
            text += "**" + bot.grindEffect[userId].itemName + "**: " + time + "\n";
        }
        if (text === "") {
            text = "No item is activated.";
        }
        message.reply(text);
    }
}