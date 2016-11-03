var elsa = require('./EmployeeBot');
var config = require('./config');
var dialog = require('./Dialog');
var fs = require('fs');
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
        point: -15,
        text: "You are touching me too much! >\"<"
    },{
        point: -5,
        text: "Yaaa... I'm weak that place... Hey!"
    },{
        point: -3,
        text: "Hey, you are messing my hair >.<"
    },{
        point: 1,
        text: "You have nothing else to do, don't you?"
    },{
        point: 2,
        text: "I don't dislike you patting me tho"
    },{
        point: 3,
        text: "Is patting me that fun?"
    },{
        point: 5,
        text: "Does patting my head feel good to you?"
    },{
        point: 7,
        text: "You sure do love tails... Hmm.. What is so fun about it..?"
    },{
        point: 11,
        text: "Your touch is so warm and gentle, I like it :heart:"
    }
];

var status = [
    {
        start: -100,
        end: -100,
        text: "Elsa hates you now!!!"
    },{
        start: -99,
        end: -91,
        text: "Elsa thinks you are the worst."
    },{
        start: -90,
        end: -71,
        text: "Elsa feels scared when seeing you."
    },{
        start: -70,
        end: -21,
        text: "Elsa is trying to hide from you."
    },{
        start: -20,
        end: -11,
        text: "Elsa feels uncomfortable with you."
    },{
        start: -10,
        end: -1,
        text: "Elsa feels annoyed a bit."
    },{
        start: 0,
        end: 9,
        text: "Elsa only thinks of you as her boss."
    },{
        start: 10,
        end: 19,
        text: "Elsa is getting used to your touch."
    },{
        start: 20,
        end: 29,
        text: "Elsa feels comfortable with your hands."
    },{
        start: 30,
        end: 39,
        text: "Elsa enjoys working under you."
    },{
        start: 40,
        end: 49,
        text: "Elsa wants to play with you everyday."
    },{
        start: 50,
        end: 69,
        text: "Elsa wants you to pat her more."
    },{
        start: 70,
        end: 89,
        text: "Elsa feels happy when staying by your side."
    },{
        start: 90,
        end: 94,
        text: "Elsa feels anxious when you are not by her side."
    },{
        start: 95,
        end: 100,
        text: "Elsa now entrusts her life to you."
    }
];

var decline = dialog.elsa.decline;
var affectionFileName = "affection.json";

function saveAffection() {
    var textToWrite = JSON.stringify(affection, null, 4);
    fs.writeFile(affectionFileName, textToWrite, function(err) {
        if(err) return console.log(err);
        console.log("The file was saved!");
    }); 
}

function loadAffection() {
    fs.readFile(affectionFileName, 'utf8', function (err, data) {
        if (err) return;
        affection = JSON.parse(data);
        console.log(affection);
    });
}

function handlePatCommand(message) {
    var userId = message.author.id;
    if (typeof lastTimePat[userId] === "undefined") lastTimePat[userId] = 0;
    if (typeof affection[userId] === "undefined") affection[userId] = 0;
    
    if (elsa.remainingBread[userId] > 0) {
        var now = new Date();
        var index = 0;
        if (now.valueOf() - lastTimePat[userId] < 2*60*1000) {
            index = randomIntRange(0, 3);
        } else {
            index = randomIntRange(1, 8);
        }
        var point = affection[userId] + touches[index].point;
        affection[userId] = Math.max(Math.min(point, 100), -100);
        elsa.remainingBread[userId]--;
        elsa.total_bread++;
        
        var text = touches[index].text + "\n";
        text += "Affection: " + affection[userId] + "/100 (" + (touches[index].point>=0?"+":"") + touches[index].point + ")\n";
        text += elsa.createRemainingBreadLine(message);
        
        message.reply(text);
        lastTimePat[userId] = now.valueOf();
        saveAffection();
        
    } else {
        message.reply(decline[randomInt(decline.length)]);
    }
}

function handleStatusCommand(message) {
    var userId = message.author.id;
    if (typeof lastTimePat[userId] == "undefined") lastTimePat[userId] = 0;
    if (typeof affection[userId] == "undefined") affection[userId] = 0;

    for(var i=0;i<status.length;i++) {
        if (status[i].start <= affection[userId] && affection[userId] <= status[i].end) {
            var text = status[i].text + "\n";
            text += "Affection: " + affection[userId] + "/100";
            message.reply(text);
            return;
        }
    }
}

function handleRankingCommand(message) {
    if (elsa.preventPM(message)) return;
    var result = [];
    for (key in affection) {
        result.push({
            userId: key,
            point: affection[key]
        });
    }
    result.sort(function(a, b) {
        return b.point - a.point;
    })
    var count = 0;
    var text = "Top 10 players Elsa likes the most:\n";
    
    message.guild.fetchMembers().then(guild => {
        for(var i=0;i<Math.min(result.length, 10);i++) {
            if (i==0 || result[i-1].point != result[i].point) count = i;
            var member = guild.members.find('id', result[i].userId);
            if (member) {
                text += (count+1) + ". " + member.user.username + " (" + result[i].point + ")\n";
            }
        }
        message.channel.sendMessage(text);
    }).catch(err => {
        message.channel.sendMessage("Fetching member error!");
    });

    
}

function handleReduceCommand(message) {
    if (!elsa.isAdmin(message)) return;
    for(key in affection) {
        affection[key] = Math.floor(affection[key]/2);
    }
    saveAffection();
}

function handleResetCommand(message) {
    if (!elsa.isAdmin(message)) return;
    affection = {};
    saveAffection();
}

elsa.bot.on("message", function(message) {
    if (message.channel.type === "text" && message.channel.name === elsa.nutakuChannelName 
            && message.author.id != elsa.bot.user.id) {
        elsa.hasNewMessage = true;
    }
    elsa.initBreadIfNeed(message.author.id);

    var command = message.content.trim().toLowerCase();
    switch (command) {
    case "~pat":
        handlePatCommand(message);
        break;
    case "~status":
        handleStatusCommand(message);
        break;
    case "~rank":
        handleRankingCommand(message);
        break;
    case "~reduce":
        handleReduceCommand(message);
        break;
    case "~reset":
        handleResetCommand(message);
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
    loadAffection();
});
elsa.bot.login(config.elsa);

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});