var ruka = require('./EmployeeBot');
var config = require('./config');
var dialog = require('./Dialog');
var fs = require('fs');
var helper = require('./FunctionHelper');
var Employee = require('./classes/Employee');
var Jimp = require("jimp");

ruka.declineNotEnoughBread = ruka.declineNotEnoughBread.concat(dialog.ruka.decline);

var rollResult = {};

function handleRollCommand(message) {
    var text = message.content.trim().toLowerCase();
    if (text != "~roll") return;
    if (message.channel.name === ruka.dmmChannelName || message.channel.name === ruka.nutakuChannelName) {
        return;
    }
    
    var rarity = helper.randomDist([17, 17, 10, 5, 1]) + 1;
    var employeeList = ruka.employeeDatabase.getEmployeesByRarirty(rarity);
    var rolledEmployee = new Employee(employeeList[helper.randomInt(employeeList.length)]);

    var photoUrl = rolledEmployee.getIllustURL('photo');
    var photoFileName = "images/photo/" + rolledEmployee._id + ".png";

    var spriteUrl = rolledEmployee.getSpriteImageURL(rolledEmployee.getBaseRarity(), true, false, 2);
    var spriteFileName = "images/enemy/" + rolledEmployee.getSpriteImageName(rolledEmployee.getBaseRarity(), false, 2);

    var that = this;
    var queue = [
        { fileToDownload: photoUrl,     fileToSave: photoFileName},
        { fileToDownload: spriteUrl,    fileToSave: spriteFileName}
    ];

    var classFileName = "images/misc/" + rolledEmployee.getClass().toLowerCase() + ".png";
    var normalStarFileName = "images/misc/normalStar.png";
    var highlightStarFileName = "images/misc/highlightStar.png";
    var resumeFileName = "images/misc/resumeForm.png";
    ruka.imageHelper.download(queue, function(err) {
        if (err) {
            message.reply("Envelope got lost. Try again.");
            return;
        }

        ruka.imageHelper.read([photoFileName, spriteFileName, classFileName, normalStarFileName, highlightStarFileName, resumeFileName], function (err, imageList) {
            if (err) { console.log(err); return }
            var photoImage = imageList[0];
            var spriteImage = imageList[1];
            var classImage = imageList[2];
            var normalStarImage = imageList[3];
            var highlightStarImage = imageList[4];
            var resume = imageList[5];

            var resumeFileName = "images/resume/" + rolledEmployee._id + ".png";

            spriteImage.crop(0, 0, 360, 270);

            Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function (font) {
                resume.print(font, 240, 102, rolledEmployee.fullName);

                resume.composite(photoImage, 18, 90)
                .composite(spriteImage, -20, 50)
                .composite(classImage, 232, 140);

                for(var i=0;i<(rolledEmployee.getBaseRarity() === 5?7:6);i++) {
                    if (i < rolledEmployee.getBaseRarity()) {
                        resume.composite(highlightStarImage, 270+ i*13, 160);
                    } else {
                        resume.composite(normalStarImage, 270 + i*13, 160);
                    }
                }

                resume.print(font, 272, 140, rolledEmployee.getClass());

                resume.print(font, 285, 185, "" + rolledEmployee.getHP());
                resume.print(font, 285, 208, "" + rolledEmployee.getAtk());
                resume.print(font, 285, 231, "" + rolledEmployee.getMAtk());

                resume.print(font, 415, 208, "" + rolledEmployee.getDef());
                resume.print(font, 415, 231, "" + rolledEmployee.getMDef());

                resume.print(font, 20, 273, "Use \"~take\" to select this employee.");

                resume.write(resumeFileName, function() {
                    var channel = message.channel;
                    if (channel.type === "text" || channel.type === "dm") {
                        if (!ruka.consumeBread(message)) return;
                        rollResult[message.author.id] = rolledEmployee._id;
                    
                        channel.sendFile(resumeFileName, "png", "The resume is in! " + message.author);
                    }    
                });
            });
        });
    });
}

function handleTakeCommand(message) {
    var text = message.content.trim().toLowerCase();
    if (text != "~take") return;
    var userId = message.author.id;

    if (typeof rollResult[userId] === "undefined" || rollResult[userId] === null) {
        message.reply("You have to roll first.");
        rollResult[userId] = null;
        return;
    }

    if (typeof ruka.player[userId] === "undefined") {
        ruka.player[userId] = {
            characterId: "",
            exp: 0,
            equipedWeapon: null,
            equipedArmor: null,
            equipedAccessory: null,
            materialList: [],
            weaponList: [],
            armorList: [],
            accessoryList: []
        };
    }
    ruka.player[userId].characterId = rollResult[userId];
    ruka.player[userId].exp = Math.floor(ruka.player[userId].exp/2);
    if (ruka.player[userId].equipedWeapon) {
        ruka.player[userId].weaponList.push(ruka.player[userId].equipedWeapon);
        ruka.player[userId].equipedWeapon = null;
    }
    if (ruka.player[userId].equipedArmor) {
        ruka.player[userId].armorList.push(ruka.player[userId].equipedArmor);
        ruka.player[userId].equipedArmor = null;
    }
    ruka.savePlayer();
    var employee = new Employee(ruka.employeeDatabase.getEmployeeById(rollResult[userId]));
    message.reply("Congratulation! You have selected **" + employee.fullName + "** as your character.");
    rollResult[userId] = null;
}

ruka.bot.on("message", function(message) {
    ruka.initBreadIfNeed(message.author.id);

    handleRollCommand(message);
    handleTakeCommand(message);
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