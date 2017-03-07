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
            _id: "278911842859089920",  // Nhano Guest
            characterId: "10550002_5cc7900c",
            promotion: 1,
            exp: 150000,//10707880,
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
            _id: "270767219875643392",  // Siegrid Guest
            characterId: "10550001_27d912ef",
            promotion: 1,
            exp: 150000,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308510",
                plus: 3
            },
            equipedArmor: {
                _id: myBot.randomArmor(5),
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
            _id: "284990845315317760",  // Luciel
            characterId: "10850005_ad800ba1",
            promotion: 1,
            exp: 150000,//10707880,
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
        },{
            _id: "269733140635975680",  // Hinano Guest
            characterId: "10350003_fcc3ce23",
            promotion: 1,
            exp: 150000,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308320",
                plus: 3
            },
            equipedArmor: {
                _id: myBot.randomArmor(3),
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
            _id: "283224327279869962",  // Eva Slade Guest
            characterId: "10650002_ae907df4",
            promotion: 1,
            exp: 150000,//10707880,
            gold: 0,
            equipedWeapon: {
                _id: "308619",
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
                ["278911842859089920", null, "270767219875643392"],
                ["269733140635975680", "283224327279869962", "284990845315317760"]
            ];    
        }

        myBot.battleController = trainingController;
        trainingController.loadSession();
    }
});

myBot.token = config.ruka;
myBot.login();