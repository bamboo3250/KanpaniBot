var ruka = require('./EmployeeBot');
var config = require('./config');
var dialog = require('./Dialog');
var fs = require('fs');
var helper = require('./FunctionHelper');
var employeeDatabase = require('./database/EmployeeDatabase');
var Employee = require('./classes/Employee');
var imageHelper = require('./ImageHelper');
var Jimp = require("jimp");

ruka.declineNotEnoughBread = ruka.declineNotEnoughBread.concat(dialog.ruka.decline);
var playerFileName = "player.json";
var player = {};

function savePlayer() {
    var textToWrite = JSON.stringify(player, null, 4);
    fs.writeFile(playerFileName, textToWrite, function(err) {
        if(err) return console.log(err);
        console.log("The file was saved!");
    }); 
}

function loadPlayer() {
    fs.readFile(playerFileName, 'utf8', function (err, data) {
        if (err) return;
        player = JSON.parse(data);
        console.log(player);
    });
}

function handleRollCommand(message) {
    var text = message.content.trim().toLowerCase();
    if (text != "~roll") return;

    var rarity = helper.randomDist([17, 17, 10, 5, 1]) + 1;
    var employeeList = employeeDatabase.getEmployeesByRarirty(rarity);
    var rolledEmployee = new Employee(employeeList[helper.randomInt(employeeList.length)]);
    rolledEmployee.setExp(100000000)

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
    imageHelper.download(queue, function() {
        imageHelper.read([photoFileName, spriteFileName, classFileName, normalStarFileName, highlightStarFileName, resumeFileName], function (err, imageList) {
            if (err) { console.log(err); return }
            var photoImage = imageList[0];
            var spriteImage = imageList[1];
            var classImage = imageList[2];
            var normalStarImage = imageList[3];
            var highlightStarImage = imageList[4];
            var resume = imageList[5]

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
                        // var emojiName = 'k' + employee.getClass().toLowerCase();
                        // const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
                        
                        // var text = "\n";
                        // text += "Employee **No." + (employee.isEx()?"EX":"") + (employee._no == 0? "???":employee._no)  + "**\n";
                        // text += "Name: **" + employee.fullName + " (" + employee.japaneseName + ")**\n";
                        // text += "Class: **" + employee.getClass() + "** " +  (classEmoji != null? classEmoji : "") + "\n";
                        // text += "Rarity: ";
                        // for(var i=0;i<employee.getBaseRarity();i++) text += ":star:";
                        // text += "\n";
                        channel.sendFile(resumeFileName, "png", "");
                    }    
                });
            });
        });
    });
}

ruka.bot.on("message", function(message) {
    ruka.initBreadIfNeed(message.author.id);

    handleRollCommand(message);
    ruka.handleCommonCommand(message);
});

ruka.greetings = dialog.ruka.greetings;
ruka.idleTalks = dialog.ruka.idleTalks;
ruka.commonGoodMorning = ruka.commonGoodMorning.concat(dialog.ruka.commonGoodMorning);
ruka.commonGoodNight = ruka.commonGoodNight.concat(dialog.ruka.commonGoodNight);
ruka.commonThanks = ruka.commonThanks.concat(dialog.ruka.commonThanks);

ruka.bot.on("ready", function() {
    ruka.ready();
    loadPlayer();
});
ruka.bot.login(config.ruka);

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});