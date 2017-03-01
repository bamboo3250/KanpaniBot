module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~setbread") return;

        var userId = command.userId;
        bot.breadManager.initIngameBreadIfNeed(userId);

        var breadInfo = bot.breadManager.ingameBread[userId];
        if (!isNaN(command.args[0])) {
            breadInfo.currentBread = Math.max(0, parseInt(command.args[0]));
        }
        if (!isNaN(command.args[1])) {
            breadInfo.maxBread = Math.max(0, Math.min(9000, parseInt(command.args[1])));
        }
        if (!isNaN(command.args[2])) {
            breadInfo.regenRate = Math.max(15, parseInt(command.args[2]));
        }
        bot.breadManager.saveIngameBread();

        var text = 'In-game Bread: ' + breadInfo.currentBread + '/' + breadInfo.maxBread + ' (+' + breadInfo.regenRate + ')\n';

        var numTick = Math.ceil(Math.max(0, (breadInfo.maxBread - breadInfo.currentBread) / breadInfo.regenRate));
        if (numTick > 0) {
            var now = new Date();
            var nextTick = new Date();
            nextTick.setUTCSeconds(0, 0);
            while((nextTick.getUTCMinutes() % 3) != 0) nextTick.setTime(nextTick.getTime() + 60*1000);
            numTick--;
            nextTick.setTime(nextTick.getTime() + 3*60*1000 * numTick);
            var time = bot.functionHelper.parseTime(nextTick.valueOf() - now.valueOf());
            message.reply(text + 'Your bread will be full in **' + time + '**.');
        } else {
            message.reply(text + 'Your bread is full now.');
        }    
    }
}
