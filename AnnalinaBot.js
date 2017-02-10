var myBot = require('./EmployeeBot');
var config = require('./config');
var dialog = require('./Dialog');

var trainingController = require('./controllers/TrainingController');

var answerTexts = dialog.annalina.answers;
myBot.declineNotEnoughBread = myBot.declineNotEnoughBread.concat(dialog.annalina.decline);

function handleQuestion(message) {
    var authorId = message.author.id;
    var text = answerTexts[myBot.functionHelper.randomInt(answerTexts.length)];
    message.reply(text);
}

function getCommand(message) {
    var text = message.content.trim().toLowerCase();
    if (text == "") return text;
    return text.split(" ")[0];
}

myBot.greetings = dialog.annalina.greetings;
myBot.idleTalks = dialog.annalina.idleTalks;
myBot.commonGoodMorning = myBot.commonGoodMorning.concat(dialog.annalina.commonGoodMorning);
myBot.commonGoodNight = myBot.commonGoodNight.concat(dialog.annalina.commonGoodNight);
myBot.commonThanks = myBot.commonThanks.concat(dialog.annalina.commonThanks);

var isLocal = true;
isLocal = false;

if (isLocal) {
    myBot.playerData = [
        {
            _id: "240097185436270593",  // test-bot
            characterId: "10750001_32935980",
            exp: 551340,//2646190,
            gold: 0,
            equipedWeapon: {
                _id: "308706",
                plus: 3
            },
            equipedArmor: {
                _id: "3107071",
                plus: 3
            },
            equipedAccessory: {
                _id: "330107",
                plus: 3
            },
            materialList: {},
            weaponList: {},
            armorList: {},
            accessoryList: {},
            position: "front",
            partnerId: null,
            isTrainer: true
        }
    ];
} else {
    myBot.playerData = [
        {
            _id: "272257876393721867",  // Fanaril Guest
            characterId: "10150003_e989854c",
            exp: 5370000,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308121",
                plus: 3
            },
            equipedArmor: {
                _id: myBot.randomArmor(1),
                plus: 0
            },
            equipedAccessory: {
                _id: "330207",
                plus: 3
            },
            materialList: {},
            weaponList: {},
            armorList: {},
            accessoryList: {},
            position: "front",
            partnerId: null,
            isTrainer: true
        },{
            _id: "278911842859089920",  // Nhano Guest
            characterId: "10550002_5cc7900c",
            exp: 5370000,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308524",
                plus: 3
            },
            equipedArmor: {
                _id: myBot.randomArmor(5),
                plus: 3
            },
            equipedAccessory: {
                _id: "330207",
                plus: 3
            },
            materialList: {},
            weaponList: {},
            armorList: {},
            accessoryList: {},
            position: "front",
            partnerId: null,
            isTrainer: true
        },{
            _id: "272259125256388610",  // Sytry Guest
            characterId: "10850002_c4678df9",
            exp: 5370000,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308819",
                plus: 3
            },
            equipedArmor: {
                _id: myBot.randomArmor(8),
                plus: 0
            },
            equipedAccessory: {
                _id: "330107",
                plus: 3
            },
            materialList: {},
            weaponList: {},
            armorList: {},
            accessoryList: {},
            position: "back",
            partnerId: null,
            isTrainer: true
        }
    ];
}

myBot.bot.on("message", function(message) {
    if (message.channel.type === "text" && message.channel.name === myBot.nutakuChannelName 
            && message.author.id != myBot.bot.user.id) {
        myBot.hasNewMessage = true;
    }
    myBot.initBreadIfNeed(message.author.id);

    var command = getCommand(message);
    switch (command) {
    case "~question":
        handleQuestion(message);
        break;
    default:
        myBot.handleCommonCommand(message);
        break;
    }
});

myBot.bot.on("ready", function() {
    if (myBot.ready()) {
        for(var i=0;i<myBot.playerData.length;i++) {
            myBot.playerManager.createUnitForPlayer(myBot.playerData[i]);    
        }
        trainingController.bot = myBot;
        
        
        if (isLocal) {
            trainingController.trainerField = [
                [null, null, null],
                [null, "240097185436270593", null]
            ];
        } else {
            trainingController.trainerField = [
                ["272257876393721867", null, "278911842859089920"],
                [null, "272259125256388610", null]
            ];    
        }
        
        myBot.battleController = trainingController;
        trainingController.loadSession();
    }
});

myBot.token = config.annalina;
myBot.login();