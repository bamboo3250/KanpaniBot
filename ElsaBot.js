var elsa = require('./EmployeeBot');
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

var lastTimePat = {};
var affection = {};
var touches = [
    {
        point: -30,
        text: ""
    },{
        point: -20,
        text: ""
    },{
        point: -10,
        text: ""
    },{
        point: 0,
        text: ""
    },{
        point: 3,
        text: ""
    },{
        point: 5,
        text: ""
    },{
        point: 13,
        text: ""
    },{
        point: 17,
        text: ""
    },{
        point: 19,
        text: ""
    },{
        point: 21,
        text: "You sure do love tails... Hmm.. What is so fun about it..?"
    },{
        point: 29,
        text: ""
    },{
        point: 33,
        text: ""
    },{
        point: 0,
        text: ""
    }
];

function handlePatCommand(message) {
    var userId = message.author.id;
    if (typeof lastTimePat[userId] == "undefined") {
        lastTimePat[userId] = 0;
        affection[userId] = 0;
    }
    if (elsa.preventPM(message)) return;

    var now = new Date();
    if (now.valueOf() - lastTimePat[userId] < 2*60*1000) {

    } else {

    }
    lastTimePat[userId] = now.valueOf();
}

elsa.bot.on("message", function(message) {
    if (message.channel.type === "text" && message.channel.name === elsa.nutakuChannelName 
            && message.author.id != elsa.bot.user.id) {
        elsa.hasNewMessage = true;
    }
    var command = getCommand(message);
    switch (command) {
    case "~pat":
        handlePatCommand(message);
        break;
    case "~status":
        break;
    case "~ranking":
        break;
    default:
        elsa.handleCommonCommand(message);
        break;
    }
});

elsa.greetings = dialog.elsa.greetings;
elsa.idleTalks = dialog.elsa.idleTalks;
elsa.commonGoodMorning = elsa.commonGoodMorning.concat(dialog.elsa.commonGoodMorning);
elsa.commonGoodNight = elsa.commonGoodNight.concat(dialog.elsa.commonGoodNight);
elsa.commonThanks = elsa.commonThanks.concat(dialog.elsa.commonThanks);

elsa.bot.on("ready", function() {
    elsa.ready();
});
elsa.bot.login(config.elsa);

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});