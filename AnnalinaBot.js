var myBot = require('./EmployeeBot');
var config = require('./config');
var dialog = require('./Dialog');

myBot.name = "Annalina Rehn";

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

// var isLocal = true;
// isLocal = false;

// if (isLocal) {
//     myBot.playerData = [
//         {
//             _id: "240097185436270593",  // test-bot
//             characterId: "10750001_32935980",
//             exp: 551340,//2646190,
//             gold: 0,
//             equipedWeapon: {
//                 _id: "308706",
//                 plus: 3
//             },
//             equipedArmor: {
//                 _id: "3107071",
//                 plus: 3
//             },
//             equipedAccessory: {
//                 _id: "330107",
//                 plus: 3
//             },
//             materialList: {},
//             weaponList: {},
//             armorList: {},
//             accessoryList: {},
//             position: "front",
//             partnerId: null,
//             isTrainer: true
//         }
//     ];
// } else {
//     myBot.playerData = [
//         {
//             _id: "241511566036434945",  // Elsa Guest
//             characterId: "10150002_765306d2",
//             promotion: 1,
//             exp: 290000,//150000,
//             gold: 0,
//             equipedWeapon: {
//                 _id: "308119",
//                 plus: 3
//             },
//             equipedArmor: {
//                 _id: myBot.randomArmor(1),
//                 plus: 0
//             },
//             equipedAccessory: {
//                 _id: "330006",
//                 plus: 3
//             },
//             materialList: {},
//             weaponList: {},
//             armorList: {},
//             accessoryList: {},
//             position: "front",
//             partnerId: null,
//             isTrainer: true
//         },{
//             _id: "269733140635975680",  // Hinano Guest
//             characterId: "10350003_fcc3ce23",
//             promotion: 1,
//             exp: 290000,//150000,
//             gold: 0,
//             equipedWeapon: {
//                 _id: "308320",
//                 plus: 3
//             },
//             equipedArmor: {
//                 _id: myBot.randomArmor(3),
//                 plus: 3
//             },
//             equipedAccessory: {
//                 _id: "330006",
//                 plus: 3
//             },
//             materialList: {},
//             weaponList: {},
//             armorList: {},
//             accessoryList: {},
//             position: "back",
//             partnerId: null,
//             isTrainer: true
//         },{
//             _id: "239141420194070530", 
//             characterId: "10840001_1af29f14",   // Annalina
//             promotion: 1,
//             exp: 290000,//10707880,
//             gold: 0,
//             equipedWeapon: {
//                 _id: "308806",
//                 plus: 3
//             },
//             equipedArmor: {
//                 _id: myBot.randomArmor(8),
//                 plus: 3
//             },
//             equipedAccessory: {
//                 _id: "330006",
//                 plus: 3
//             },
//             materialList: {},
//             weaponList: {},
//             armorList: {},
//             accessoryList: {},
//             position: "back",
//             partnerId: null,
//             isTrainer: true
//         }
//     ];
// }

myBot.bot.on("message", function(message) {
    if (message.channel.type === "text" && message.channel.name === myBot.mainChannelName 
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
        // for(var i=0;i<myBot.playerData.length;i++) {
        //     myBot.playerManager.createUnitForPlayer(myBot.playerData[i]);    
        // }
        // trainingController.bot = myBot;
        
        
        // if (isLocal) {
        //     trainingController.trainerField = [
        //         [null, null, null],
        //         [null, "240097185436270593", null]
        //     ];
        // } else {
        //     trainingController.trainerField = [
        //         [null, "241511566036434945", null],
        //         ["269733140635975680", null, "239141420194070530"]
        //     ];    
        // }
        
        // myBot.battleController = trainingController;
        // trainingController.loadSession();
    }
});

var token = (config.isTest ? config.test : config.annalina);
myBot.token = token;
myBot.login();