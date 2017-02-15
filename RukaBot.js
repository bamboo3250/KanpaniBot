var myBot = require('./EmployeeBot');
var config = require('./config');
var dialog = require('./Dialog');

var trainingController = require('./controllers/TrainingController');

myBot.declineNotEnoughBread = myBot.declineNotEnoughBread.concat(dialog.ruka.decline);

myBot.canUseBreadToRoll = true;

myBot.bot.on("message", function(message) {
    myBot.initBreadIfNeed(message.author.id);
    myBot.handleCommonCommand(message);
});

myBot.greetings = dialog.ruka.greetings;
myBot.idleTalks = dialog.ruka.idleTalks;
myBot.commonGoodMorning = myBot.commonGoodMorning.concat(dialog.ruka.commonGoodMorning);
myBot.commonGoodNight = myBot.commonGoodNight.concat(dialog.ruka.commonGoodNight);
myBot.commonThanks = myBot.commonThanks.concat(dialog.ruka.commonThanks);

var isLocal = true;
isLocal = false;

if (isLocal) {
    myBot.playerData = [
        {
            _id: "240097185436270593",  // test-bot
            characterId: "10150002_765306d2",
            exp: 551340,//2646190,
            gold: 0,
            equipedWeapon: {
                _id: "308119",
                plus: 3
            },
            equipedArmor: {
                _id: "3101140",
                plus: 1
            },
            equipedAccessory: {
                _id: "330206",
                plus: 1
            },
            materialList: {},
            weaponList: {},
            armorList: {},
            accessoryList: {},
            position: "front",
            partnerId: null,
            isTrainer: true
        },{
            _id: "265889287281573918",  // test-bot2
            characterId: "10840001_1af29f14",
            exp: 551340,//2646190,
            gold: 0,
            equipedWeapon: {
                _id: "308806",
                plus: 3
            },
            equipedArmor: {
                _id: "3108071",
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
                _id: "3001861",
                plus: 4
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
            _id: "270767219875643392",  // Siegrid Guest
            characterId: "10550001_27d912ef",
            exp: 5370000,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "3005861",
                plus: 4
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
            _id: "268576286060838914",  // Saimi Guest
            characterId: "10750001_32935980",
            exp: 5370000,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "3007861",
                plus: 4
            },
            equipedArmor: {
                _id: myBot.randomArmor(7),
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
            _id: "269733140635975680",  // Hinano Guest
            characterId: "10350003_fcc3ce23",
            exp: 5370000,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "3003861",
                plus: 4
            },
            equipedArmor: {
                _id: myBot.randomArmor(3),
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
            position: "back",
            partnerId: null,
            isTrainer: true
        },{
            _id: "239141420194070530", 
            characterId: "10840001_1af29f14",   // Annalina
            exp: 5370000,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "3008861",
                plus: 4
            },
            equipedArmor: {
                _id: myBot.randomArmor(8),
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
        }
    ];
}

myBot.bot.on("ready", function() {
    if (myBot.ready()) {
        for(var i=0;i<myBot.playerData.length;i++) {
            myBot.playerManager.createUnitForPlayer(myBot.playerData[i]);    
        }
        trainingController.bot = myBot;
        
        if (isLocal) {
            trainingController.trainerField = [
                ["240097185436270593", null, null],
                [null, null, "265889287281573918"]
            ];
        } else {
            trainingController.trainerField = [
                ["270767219875643392", "272257876393721867", "268576286060838914"],
                ["269733140635975680", null, "239141420194070530"]
            ];    
        }

        myBot.battleController = trainingController;
        trainingController.loadSession();
    }
});

myBot.token = config.ruka;
myBot.login();