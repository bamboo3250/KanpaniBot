var Employee = require('../classes/Employee');
var Jimp = require("jimp");

module.exports = {
    names: ['roll', 'pull', 'draw'],
    usage: '`~roll`, `~pull` or `~draw`',
    description: 'draw a random character',
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        if (!bot.isPM(message)) {
            message.reply("You can roll in Private Message only.");
            return;
        }

        var userId = message.author.id;
        if (typeof bot.freeRoll[userId] === "undefined") bot.freeRoll[userId] = 4;

        if (bot.freeRoll[userId] <= 0 && !bot.canUseBreadToRoll) {
            message.reply("You have used all free draws today!");
            return;
        }
        
        var distribution = [17, 17, 10, 5, 1];

        if (typeof bot.mailboxEffect[userId] === "undefined") {
            bot.mailboxEffect[userId] = {
                itemName: "",
                endTime: 0
            }
        }

        if (bot.mailboxEffect[userId].itemName === "Gold Mailbox") {
            distribution = [0, 10, 20, 13, 7];
        } else if (bot.mailboxEffect[userId].itemName === "Silver Mailbox") {
            distribution = [9, 11, 16, 10, 4];
        }

        var rarity = bot.functionHelper.randomDist(distribution) + 1;
        var employeeList = bot.employeeDatabase.getEmployeesByRarirty(rarity);
        var rolledEmployee = new Employee(employeeList[bot.functionHelper.randomInt(employeeList.length)]);

        var photoUrl = bot.urlHelper.getIllustURL(rolledEmployee, 'photo');
        var photoFileName = "images/photo/" + rolledEmployee.characterId + ".png";

        var spriteUrl = bot.urlHelper.getSpriteImageURL(rolledEmployee, true);
        var spriteFileName = "images/enemy/" + bot.urlHelper.getSpriteImageName(rolledEmployee);

        var queue = [
            { fileToDownload: photoUrl,     fileToSave: photoFileName},
            { fileToDownload: spriteUrl,    fileToSave: spriteFileName}
        ];

        var classFileName = "images/misc/" + rolledEmployee.getClass().toLowerCase() + ".png";
        var normalStarFileName = "images/misc/normalStar.png";
        var highlightStarFileName = "images/misc/highlightStar.png";
        var resumeFileName = "images/misc/resumeForm.png";
        
        bot.imageHelper.download(queue, function(err) {
            if (err) {
                message.reply("Envelope got lost. Try again.");
                bot.log(err); 
                return;
            }
            var imageFileNameQueue = [
                photoFileName, 
                spriteFileName, 
                classFileName, 
                normalStarFileName, 
                highlightStarFileName, 
                resumeFileName
            ];
            
            bot.imageHelper.read(imageFileNameQueue, function (err, imageList) {
                if (err) { 
                    message.reply("Envelope got lost. Try again.");
                    bot.log(err); 
                    return 
                }
                var photoImage = imageList[photoFileName];
                var spriteImage = imageList[spriteFileName];
                var classImage = imageList[classFileName];
                var normalStarImage = imageList[normalStarFileName];
                var highlightStarImage = imageList[highlightStarFileName];
                var resume = imageList[resumeFileName];

                var resultResumeFileName = "images/resume/" + rolledEmployee.characterId + ".png";
                spriteImage.crop(0, 0, 360, 270);

                Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function (font) {
                    resume.print(font, 240, 102, rolledEmployee.fullName);

                    resume.composite(classImage, 232, 140)
                        .composite(spriteImage, -20, 50)
                        .composite(photoImage, 18, 90);
                    
                    for(var i=0;i<(rolledEmployee.getBaseRarity() === 5?7:6);i++) {
                        if (i < rolledEmployee.getBaseRarity()) {
                            resume.composite(highlightStarImage, 270+ i*13, 160);
                        } else {
                            resume.composite(normalStarImage, 270 + i*13, 160);
                        }
                    }

                    resume.print(font, 272, 140, rolledEmployee.getClass());

                    resume.print(font, 285, 185, "" + rolledEmployee.getMaxHP());
                    resume.print(font, 285, 208, "" + rolledEmployee.getAtk());
                    resume.print(font, 285, 231, "" + rolledEmployee.getMAtk());

                    resume.print(font, 415, 208, "" + rolledEmployee.getDef());
                    resume.print(font, 415, 231, "" + rolledEmployee.getMDef());

                    resume.print(font, 20, 273, "Use \"~take\" to select this employee.");

                    resume.write(resultResumeFileName, function() {
                        var channel = message.channel;
                        if (channel.type === "text" || channel.type === "dm") {
                            if (message.author.id != "146556639342755840") {
                                if (bot.freeRoll[userId] > 0) {
                                    bot.freeRoll[userId]--;
                                } else {
                                    if (!bot.consumeBread(message)) return;
                                }    
                            }
                            bot.rollResult[userId] = rolledEmployee.characterId;
                            channel.send("The resume is in! " + message.author, {'files':[resultResumeFileName]});
                        }    
                    });
                });
            });
        });
    }
}