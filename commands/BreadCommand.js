module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName !== "~bread") return;

        var text = bot.createRemainingBreadLine(message) + '\n';

        var userId = command.userId;
        bot.breadManager.initIngameBreadIfNeed(userId);

        var breadInfo = bot.breadManager.ingameBread[userId];
        var numTick = Math.ceil(Math.max(0, (breadInfo.maxBread - breadInfo.currentBread) / breadInfo.regenRate));
        if (numTick > 0) {
            var now = new Date();
            var nextTick = new Date();
            nextTick.setUTCSeconds(0, 0);
            while((nextTick.getUTCMinutes() % 3) != 0) nextTick.setTime(nextTick.getTime() + 1000);
            numTick--;
            nextTick.setTime(nextTick.getTime() + 3000 * numTick);
            var time = bot.functionHelper.parseTime(nextTick.valueOf() - now.valueOf());
            message.reply(text + 'Your bread will be full in **${time}**.');
        } else {
            message.reply(text + 'Your bread is full now.');
        }

        
    }
}