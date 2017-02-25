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
            promotion: 0,
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
            characterId: "10850005_ad800ba1",
            promotion: 0,
            exp: 5707880,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308821",
                plus: 3
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
} else {
    myBot.playerData = [
        {
            _id: "268576286060838914",  // Saimi Guest
            characterId: "10750001_32935980",
            promotion: 0,
            exp: 10707880,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308706",
                plus: 3
            },
            equipedArmor: {
                _id: myBot.randomArmor(7),
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
        },{
            _id: "272258315441143810",  // Elmina Guest
            characterId: "10450002_bbda369b",
            promotion: 0,
            exp: 10707880,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308419",
                plus: 3
            },
            equipedArmor: {
                _id: myBot.randomArmor(4),
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
        },{
            _id: "275533845984575488",  // Nona Guest
            characterId: "10650003_314afe6a",
            promotion: 0,
            exp: 10707880,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308621",
                plus: 3
            },
            equipedArmor: {
                _id: myBot.randomArmor(6),
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
            _id: "276547911381417985",  // Elie Guest
            characterId: "10350002_63194dbd",
            promotion: 0,
            exp: 10707880,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308319",
                plus: 3
            },
            equipedArmor: {
                _id: myBot.randomArmor(3),
                plus: 3
            },
            equipedAccessory: {
                _id: "330206",
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
            _id: "284990845315317760",  // Luciel
            characterId: "10850005_ad800ba1",
            promotion: 0,
            exp: 10707880,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308821",
                plus: 3
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
                ["268576286060838914", null, "272258315441143810"],
                ["276547911381417985", "275533845984575488", "284990845315317760"]
            ];    
        }

        myBot.battleController = trainingController;
        trainingController.loadSession();
    }
});

myBot.token = config.ruka;
myBot.login();