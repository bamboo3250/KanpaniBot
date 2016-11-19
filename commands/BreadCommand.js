module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text !== "~bread") return;
        message.reply(bot.createRemainingBreadLine(message));
    }
}