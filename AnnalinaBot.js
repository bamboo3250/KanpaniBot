var annalina = require('./EmployeeBot');
var config = require('./config');
var dialog = require('./Dialog');
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function randomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function randomIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

var answerTexts = dialog.annalina.answers;
var decline = dialog.annalina.decline;

function handleQuestion(message) {
    var authorId = message.author.id;
    if (typeof annalina.remainingBread[authorId] === "undefined") {
        annalina.remainingBread[authorId] = annalina.maxBread;
    }
    if (annalina.preventPM(message)) return;

    if (annalina.remainingBread[authorId] > 0) {
        annalina.remainingBread[authorId]--;
        annalina.total_bread++;
        var text = answerTexts[randomInt(answerTexts.length)] + "\n\n";
        const breadEmoji = message.guild.emojis.find('name', 'kbread');
        text += "Remaining Bread: " + breadEmoji + " x" + annalina.remainingBread[authorId];
        message.reply(text);
    } else {
        message.reply(decline[randomInt(decline.length)]);
    }
}

function getCommand(message) {
    var text = message.content.trim().toLowerCase();
    if (text == "") return text;
    return text.split(" ")[0];
}

annalina.bot.on("message", function(message) {
    if (message.channel.type === "text" && message.channel.name === annalina.nutakuChannelName 
            && message.author.id != annalina.bot.user.id) {
        annalina.hasNewMessage = true;
    }
    var command = getCommand(message);
    switch (command) {
    case "~question":
        handleQuestion(message);
        break;
    // case "~test":
    //     var channel = message.channel;
    //     if (channel.type === "text") {
    //         channel.sendFile("./Ran_damaged.png", "png", "test content");
    //     }
    default:
        annalina.handleCommonCommand(message);
        break;
    }
});

annalina.greetings = dialog.annalina.greetings;
annalina.idleTalks = dialog.annalina.idleTalks;
annalina.commonGoodMorning = annalina.commonGoodMorning.concat(dialog.annalina.commonGoodMorning);
annalina.commonGoodNight = annalina.commonGoodNight.concat(dialog.annalina.commonGoodNight);
annalina.commonThanks = annalina.commonThanks.concat(dialog.annalina.commonThanks);

annalina.bot.on("ready", function() {
    annalina.ready();
});
annalina.bot.login(config.annalina);

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});