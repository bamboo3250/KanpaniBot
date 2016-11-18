var ruka = require('./EmployeeBot');
var config = require('./config');
var dialog = require('./Dialog');

ruka.declineNotEnoughBread = ruka.declineNotEnoughBread.concat(dialog.ruka.decline);

ruka.canUseBreadToRoll = true;

ruka.bot.on("message", function(message) {
    ruka.initBreadIfNeed(message.author.id);
    ruka.handleCommonCommand(message);
});

ruka.greetings = dialog.ruka.greetings;
ruka.idleTalks = dialog.ruka.idleTalks;
ruka.commonGoodMorning = ruka.commonGoodMorning.concat(dialog.ruka.commonGoodMorning);
ruka.commonGoodNight = ruka.commonGoodNight.concat(dialog.ruka.commonGoodNight);
ruka.commonThanks = ruka.commonThanks.concat(dialog.ruka.commonThanks);

ruka.replenishTime = 60*60*1000;

ruka.bot.on("ready", function() {
    ruka.ready();
});
ruka.bot.login(config.ruka);

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});