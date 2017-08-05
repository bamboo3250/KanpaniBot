module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        cleanedText = bot.functionHelper.cleanText(text);
        
        if (cleanedText === "") return;
        var now = new Date();
        var userId = message.author.id;

        // if (cleanedText === "hi" || cleanedText === "hello" || cleanedText === "hai") {
        //     if (now.valueOf() - bot.lastTimeSayingHi < 60*1000) return;
        //     if (typeof bot.lastTimeSayingHiToPlayers[userId] == "undefined") {
        //         bot.lastTimeSayingHiToPlayers[userId] = 0;
        //     }
        //     if (now.valueOf() - bot.lastTimeSayingHiToPlayers[userId] < 60*60*1000) return;
        //     bot.lastTimeSayingHiToPlayers[userId] = now.valueOf();

        //     var reply = bot.getRandomMessages(bot.commonGreetings);
        //     message.channel.send(reply);
        //     bot.lastTimeSayingHi = now.valueOf();
        // } else if (cleanedText === "gm" || cleanedText === "good morning" || cleanedText === "morning") {
        //     if (now.valueOf() - bot.lastTimeGoodMorning < 60*1000) return;
        //     if (typeof bot.lastTimeGoodMorningToPlayers[userId] == "undefined") {
        //         bot.lastTimeGoodMorningToPlayers[userId] = 0;
        //     }
        //     if (now.valueOf() - bot.lastTimeGoodMorningToPlayers[userId] < 60*60*1000) return;
        //     bot.lastTimeGoodMorningToPlayers[userId] = now.valueOf();
            
        //     var reply = bot.getRandomMessages(bot.commonGoodMorning);
        //     message.channel.send(reply);
        //     bot.lastTimeGoodMorning = now.valueOf();
        // } else if (cleanedText === "gn" || cleanedText === "good night" || cleanedText === "nite" || cleanedText === "night") {
        //     if (now.valueOf() - bot.lastTimeGoodNight < 60*1000) return;
        //     if (typeof bot.lastTimeGoodNightToPlayers[userId] == "undefined") {
        //         bot.lastTimeGoodNightToPlayers[userId] = 0;
        //     }
        //     if (now.valueOf() - bot.lastTimeGoodNightToPlayers[userId] < 60*60*1000) return;
        //     bot.lastTimeGoodNightToPlayers[userId] = now.valueOf();
            
        //     var reply = bot.getRandomMessages(bot.commonGoodNight);
        //     message.channel.send(reply);
        //     bot.lastTimeGoodNight = now.valueOf();
        // } else 
        if (text === "~thank" || text === "~thanks" || text === "~tks" || text === "~ty") {
            if (now.valueOf() - bot.lastTimeThanks < 60*1000) return;
            var reply = bot.getRandomMessages(bot.commonThanks);
            message.channel.send(reply);
            bot.lastTimeThanks = now.valueOf();
        } 
        // else if (cleanedText === "happy halloween") {
        //     var reply = bot.getRandomMessages(bot.halloween);
        //     message.channel.send(reply);
        // } else if (cleanedText === "trick or treat" || cleanedText === "treat or trick") {
        //     if (typeof bot.lastTimeGiveCandyToPlayers[userId] == "undefined") {
        //         bot.lastTimeGiveCandyToPlayers[userId] = 0;
        //     }
        //     if (now.valueOf() - bot.lastTimeGiveCandyToPlayers[userId] < 60*1000) return;

        //     var reply = bot.getRandomMessages(bot.trickortreat);
        //     if (reply === "") {
        //         bot.remainingBread[userId]++;
        //         reply = "*gives* :bread:"
        //     }
        //     message.reply(reply);
        //     bot.lastTimeGiveCandyToPlayers[userId] = now.valueOf();
        // }
    }
}