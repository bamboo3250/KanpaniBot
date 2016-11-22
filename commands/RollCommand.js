var Employee = require('../classes/Employee');
var Jimp = require("jimp");

module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text != "~roll") return;
        if (message.channel.name === bot.dmmChannelName || message.channel.name === bot.nutakuChannelName) {
            return;
        }
        var userId = message.author.id;
        if (typeof bot.freeRoll[userId] === "undefined") bot.freeRoll[userId] = 4;

        if (bot.freeRoll[userId] <= 0 && !bot.canUseBreadToRoll) {
            message.reply("You have used all free draws today!");
            return;
        }
        
        var rarity = bot.functionHelper.randomDist([17, 17, 10, 5, 1]) + 1;
        var employeeList = bot.employeeDatabase.getEmployeesByRarirty(rarity);
        var rolledEmployee = new Employee(employeeList[bot.functionHelper.randomInt(employeeList.length)]);

        var photoUrl = rolledEmployee.getIllustURL('photo');
        var photoFileName = "images/photo/" + rolledEmployee._id + ".png";

        var spriteUrl = rolledEmployee.getSpriteImageURL(rolledEmployee.getBaseRarity(), true, false, 2);
        var spriteFileName = "images/enemy/" + rolledEmployee.getSpriteImageName(rolledEmployee.getBaseRarity(), false, 2);

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

                    resume.print(font, 285, 185, "" + rolledEmployee.getHP());
                    resume.print(font, 285, 208, "" + rolledEmployee.getAtk());
                    resume.print(font, 285, 231, "" + rolledEmployee.getMAtk());

                    resume.print(font, 415, 208, "" + rolledEmployee.getDef());
                    resume.print(font, 415, 231, "" + rolledEmployee.getMDef());

                    resume.print(font, 20, 273, "Use \"~take\" to select this employee.");

                    resume.write(resumeFileName, function() {
                        var channel = message.channel;
                        if (channel.type === "text" || channel.type === "dm") {
                            if (message.author.id != "146556639342755840") {
                                if (bot.freeRoll[userId] > 0) {
                                    bot.freeRoll[userId]--;
                                } else {
                                    if (!bot.consumeBread(message)) return;
                                }    
                            }
                            bot.rollResult[userId] = rolledEmployee._id;
                            channel.sendFile(resumeFileName, "png", "The resume is in! " + message.author);    
                        }    
                    });
                });
            });
        });
    }
}