var annalina = require('./EmployeeBot');
var config = require('./config');
var dialog = require('./Dialog');

var trainingController = require('./controllers/TrainingController');

var answerTexts = dialog.annalina.answers;
annalina.declineNotEnoughBread = annalina.declineNotEnoughBread.concat(dialog.annalina.decline);

function handleQuestion(message) {
    var authorId = message.author.id;
    var text = answerTexts[annalina.functionHelper.randomInt(answerTexts.length)];
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

var isLocal = true;
isLocal = false;

if (isLocal) {
    annalina.playerData = [
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
    annalina.playerData = [
        {
            _id: "272257876393721867",  // Fanaril Guest
            characterId: "10150003_e989854c",
            exp: 10707880,//5370000,
            gold: 0,
            equipedWeapon: {
                _id: "308121",
                plus: 3
            },
            equipedArmor: {
                _id: "3101071",
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
            position: "front",
            partnerId: null,
            isTrainer: true
        },{
            _id: "275533845984575488",  // Nona Guest
            characterId: "10650003_314afe6a",
            exp: 10707880,//5370000,
            gold: 0,
            equipedWeapon: {
                _id: "308621",
                plus: 3
            },
            equipedArmor: {
                _id: "3106071",
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
            position: "back",
            partnerId: null,
            isTrainer: true
        },{
            _id: "239141420194070530", 
            characterId: "10840001_1af29f14",   // Annalina
            exp: 10707880,//2646190,
            gold: 0,
            equipedWeapon: {
                _id: "308806",
                plus: 3
            },
            equipedArmor: {
                _id: "310809",
                plus: 3
            },
            equipedAccessory: {
                _id: "329997",
                plus: 4
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


annalina.bot.on("ready", function() {
    if (annalina.ready()) {
        for(var i=0;i<annalina.playerData.length;i++) {
            annalina.playerManager.createUnitForPlayer(annalina.playerData[i]);    
        }
        trainingController.bot = annalina;
        if (isLocal) {
            trainingController.trainerField = [
                [null, null, null],
                [null, "240097185436270593", null]
            ];
        } else {
            trainingController.trainerField = [
                [null, "272257876393721867", null],
                [null, "275533845984575488", "239141420194070530"]
            ];    
        }
        
        annalina.battleController = trainingController;
    }
});

annalina.token = config.annalina;
annalina.login();