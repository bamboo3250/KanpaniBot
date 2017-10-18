module.exports = {
    names: ['igbread', 'igb'],
    usage: '`~igbread` or `~igb`',
    description: 'check in-game bread configured by ~setbread command', 
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var userId = command.userId;
        bot.breadManager.syncBread(userId);

        var breadInfo = bot.breadManager.ingameBread[userId];
        var text = '\nIn-game Bread: ' + breadInfo.currentBread + '/' + breadInfo.maxBread + ' (+' + breadInfo.regenRate + ')\n';

        var numTick = Math.ceil(Math.max(0, (breadInfo.maxBread - breadInfo.currentBread) / breadInfo.regenRate));
        if (numTick > 0) {
            var now = new Date();
            var nextTick = new Date();
            nextTick.setUTCSeconds(0, 0);
            while((nextTick.getUTCMinutes() % 3) != 0) nextTick.setTime(nextTick.getTime() +60* 1000);
            numTick--;
            nextTick.setTime(nextTick.getTime() + 3*60*1000 * numTick);
            var time = bot.functionHelper.parseTime(nextTick.valueOf() - now.valueOf());
            message.reply(text + 'Your bread will be full in **' + time + '**.');
        } else {
            message.reply(text + 'Your bread is full now.');
        }
    }
}
