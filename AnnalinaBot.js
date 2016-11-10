var annalina = require('./EmployeeBot');
var config = require('./config');
var dialog = require('./Dialog');
var helper = require('./FunctionHelper');

var answerTexts = dialog.annalina.answers;
annalina.declineNotEnoughBread = annalina.declineNotEnoughBread.concat(dialog.annalina.decline);

function handleQuestion(message) {
    var authorId = message.author.id;
    if (!annalina.consumeBread(message)) return;
    
    annalina.total_bread++;
    var text = answerTexts[helper.randomInt(answerTexts.length)] + "\n\n";
    text += annalina.createRemainingBreadLine(message);
    message.reply(text);
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
    annalina.initBreadIfNeed(message.author.id);

    var command = getCommand(message);
    switch (command) {
    case "~question":
        handleQuestion(message);
        break;
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