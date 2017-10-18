module.exports = {
    names: ['aroma'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        if (!bot.aromaEffect) {
            message.channel.send("No one has used Aroma Oil.");
            return;
        }

        var userId = message.author.id;
        var now = new Date();
        var elapsedTime = 0;
        var contributedAmount = 0;

        if (bot.aromaEffect.contributors[userId]) {
            elapsedTime = now.valueOf() - bot.aromaEffect.contributors[userId].startTime;
            contributedAmount = bot.aromaEffect.contributors[userId].amount;
        }
        
        var numItemsWillGet = Math.min(Math.floor(elapsedTime/(60*1000)), contributedAmount * 20);
        
        elapsedTime = bot.functionHelper.parseTime(elapsedTime);
        var text = "Your Dreaming Time: " + elapsedTime + "\n";
        text += "Your Aroma Oil: " + contributedAmount + "\n";
        text += "Your Reward: " + numItemsWillGet + "\n\n";

        text += "**Aroma Dream**\n";
        text += "Total Aroma Oil: " + bot.aromaEffect.totalAroma + "\n";
        text += "Elapsed Time: " + bot.functionHelper.parseTime(now.valueOf() - bot.aromaEffect.startTime) + "\n";
        text += "Remaining Time: " + bot.functionHelper.parseTime(bot.aromaEffect.endTime - now.valueOf()) + "\n";
        message.channel.send(text);
    }
}