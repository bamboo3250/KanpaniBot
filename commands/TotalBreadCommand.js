module.exports = {
    handle: function(message, bot) {
        if (!bot.isAdmin(message)) return;
        var text = message.content.trim().toLowerCase();
        if (text === "~totalbread") {
            message.reply("\nTotal bread received: " + bot.total_bread);
        }
    }
}