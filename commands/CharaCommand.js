var Employee = require('../classes/Employee');
var Jimp = require("jimp");

module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (!text.startsWith("~chara ")) return;
        
        var name = bot.functionHelper.removeExtraSpace(text.substring(6));
        if (name === "") return;
        if (name.length > 100) {
            message.reply("The name is too long!");
            return;
        }

        var employee = bot.employeeDatabase.getEmployeeByCommonName(name);
        if (employee == null) {
            var classId = -1;
            if (name == "fighter") classId = 1;
            if (name == "ronin") classId = 2;
            if (name == "archer") classId = 3;
            if (name == "soldier") classId = 4;
            if (name == "warrior") classId = 5;
            if (name == "cleric" || name == "healer") classId = 6;
            if (name == "rogue" || name == "assassin") classId = 7;
            if (name == "magician" || name == "mage") classId = 8;

            var suggestions = [];
            if (classId > 0) {
                suggestions = bot.employeeDatabase.getSuggestionsByClass(classId);
            } else {
                suggestions = bot.employeeDatabase.getSuggestionsByName(name);
            }
            text = "Do you mean: ";
            for(var i=0;i<suggestions.length;i++) {
                text += "**" + suggestions[i] + "**" + (i<suggestions.length-1 ? (i<suggestions.length-2?", ":" or ") : "?");
            }
            message.reply(text);

        } else {
            if (!bot.isPM(message) && !bot.consumeBread(message, 1)) return;

            employee = new Employee(employee);

            var bustupUrl = employee.getIllustURL("bustup");
            var star = 6;
            if (employee.getBaseRarity() === 5) star++;
            var enemySpriteUrl = employee.getSpriteImageURL(star, true, true);
            var allySpriteUrl = employee.getSpriteImageURL(star, false, true);

            var bustupFileName = "images/bustup/" + employee._id + ".png";
            var enemySpriteFileName = "images/enemy/" + employee.getSpriteImageName(star, true);
            var allySpriteFileName = "images/ally/" + employee.getSpriteImageName(star, true);

            var queue = [
                { fileToDownload: enemySpriteUrl,   fileToSave: enemySpriteFileName},
                { fileToDownload: allySpriteUrl,    fileToSave: allySpriteFileName},
                { fileToDownload: bustupUrl,        fileToSave: bustupFileName}
            ];
            bot.imageHelper.download(queue, function(err) {
                if (err) {
                    message.reply("Error happened. Try again.");
                    bot.log(err);
                    return;
                }

                bot.imageHelper.read([enemySpriteFileName, allySpriteFileName, bustupFileName], function (err, imageList) {
                    if (err) {
                        message.reply("Error happened. Try again.");
                        bot.log(err);
                        return;
                    }
                    enemySpriteImage = imageList[0];
                    allySpriteImage = imageList[1];
                    bustupImage = imageList[2];

                    allySpriteImage.crop(0, 0, 360, 270);
                    enemySpriteImage.crop(0, 0, 360, 270);
                    bustupImage.resize(Jimp.AUTO, 600).opacity(0.3);

                    var imageName = "images/chara/" + employee._id + ".png";
                    var image = new Jimp(480, 290, function (err, image) {

                        image.composite(bustupImage, 
                            -Math.floor((bustupImage.bitmap.width - image.bitmap.width)/2), 
                            -Math.floor((bustupImage.bitmap.height - image.bitmap.height)/2) - 20
                        )
                        .composite(enemySpriteImage, 160, 0)
                        .composite(allySpriteImage, -60, 40)
                        .crop(1, 0, 478, 290)
                        .write(imageName, function() {
                            var channel = message.channel;
                            if (channel.type === "text" || channel.type === "dm") {
                                var emojiName = 'k' + employee.getClass().toLowerCase();
                                const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
                                
                                var text = "\n";
                                text += "Employee **No." + (employee.isEx()?"EX":"") + (employee._no == 0? "???":employee._no)  + "**\n";
                                text += "Name: **" + employee.fullName + " (" + employee.japaneseName + ")**\n";
                                text += "Class: **" + employee.getClass() + "** " +  (classEmoji != null? classEmoji : "") + "\n";
                                text += "Rarity: ";
                                for(var i=0;i<employee.getBaseRarity();i++) text += ":star:";
                                text += "\n";
                                channel.sendFile(imageName, "png", text);
                            }    
                        });
                    });
                });
            });
        }        
    }
}