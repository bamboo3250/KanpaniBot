var ruka = require('./EmployeeBot');
var config = require('./config');
var dialog = require('./Dialog');

var trainingController = require('./controllers/TrainingController');

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


var isLocal = true;
isLocal = false;

if (isLocal) {
    ruka.playerData = [
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
    ruka.playerData = [
        {
            _id: "241511566036434945",  // Elsa Guest
            characterId: "10150002_765306d2",
            exp: 10707880,//2646190,
            gold: 0,
            equipedWeapon: {
                _id: "308119",
                plus: 3
            },
            equipedArmor: {
                _id: "310108",
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
            _id: "273395939199156225",  // Sion Guest
            characterId: "10250001_ff1a69c9",
            exp: 10707880,//5370000,
            gold: 0,
            equipedWeapon: {
                _id: "308214",
                plus: 3
            },
            equipedArmor: {
                _id: "310208",
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
            _id: "239141420194070530", 
            characterId: "10840001_1af29f14",   // Annalina
            exp: 10707880,//2646190,
            gold: 0,
            equipedWeapon: {
                _id: "308806",
                plus: 3
            },
            equipedArmor: {
                _id: "310808",
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
                _id: "310608",
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
            exp: 10707880,//2646190,
            gold: 0,
            equipedWeapon: {
                _id: "308320",
                plus: 3
            },
            equipedArmor: {
                _id: "310708",
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


ruka.bot.on("ready", function() {
    if (ruka.ready()) {
        for(var i=0;i<ruka.playerData.length;i++) {
            ruka.playerManager.createUnitForPlayer(ruka.playerData[i]);    
        }
        trainingController.bot = ruka;
        if (isLocal) {
            trainingController.trainerField = [
                ["240097185436270593", null, null],
                [null, null, "265889287281573918"]
            ];
        } else {
            trainingController.trainerField = [
                ["241511566036434945", null, "273395939199156225"],
                ["269733140635975680", "275533845984575488", "239141420194070530"]
            ];    
        }
        
        ruka.battleController = trainingController;
    }
});

ruka.token = config.ruka;
ruka.login();