module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~armor") return;

        if (command.args.length < 2) {
            message.reply("The arguments are not correct.");
            return;
        }        

        var armorInfo = null;
        var className = command.args[0];
        var classId = null;
        if (className != "ca") {
            classId = bot.functionHelper.getClassId(className);
            if (!classId) {
                message.reply("Class name is not correct.");
                return;
            }
            var codeName = command.args[1];
            if (!codeName) {
                message.reply("You need to specify armor code name.");
                return;
            }
            armorInfo = bot.armorDatabase.getArmorByCodeName(codeName, classId);    
        } else {
            var characterName = command.args[1];
            var characterInfo = bot.employeeDatabase.getEmployeeByCommonName(characterName);
            if (!characterInfo) {
                message.reply("This character doesn't exist.");
                return;
            }
            armorInfo = bot.armorDatabase.getArmorByCodeName("ca", characterInfo._id);
            classId = parseInt(characterInfo._id.substring(2,3));
        }
        
        if (!armorInfo) {
            message.reply("No information.");
            return;
        }
        var plus = 0;
        var equipmentUrl = bot.urlHelper.getEquipmentIconUrl(armorInfo._id, plus, armorInfo.type);
        var equipmentFileName = "images/equipment/large/" + armorInfo._id + "0" + (plus+1) + "_1.png";

        var queue = [
            { fileToDownload: equipmentUrl,   fileToSave: equipmentFileName}
        ];
        bot.imageHelper.download(queue, function(err) {
            if (err) {
                message.reply("Error happened. Try again.");
                bot.log(err);
                return;
            }
            var text = "Armor Name: **" + armorInfo.name + "**\n";
            
            var className = bot.functionHelper.getClassName(classId);
            var emojiName = 'k' + className.toLowerCase();
            const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
            text += "Class: **" + className + "** " +  (classEmoji != null? classEmoji : "") + "\n";

            var elementName = armorInfo.element;
            var emojiName = 'k' + elementName.toLowerCase();
            const elementEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
            text += "Element: " +  (elementEmoji != null? elementEmoji : "**" + (armorInfo.element == ""?"None":armorInfo.element) + "**") + "\n\n";
            

            text += "**Recipe**\n";
            for(var i=0;i<armorInfo.recipe.length;i++) {
                text += armorInfo.recipe[i].materialName + " x" + armorInfo.recipe[i].amount + "\n";
            }
            if (armorInfo.recipe.length === 0) text += "None\n";

            const atkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'katk'));
            const defEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kdef'));
            const matkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmatk'));
            const mdefEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmdef'));


            text += "\n**Stats**\n";
            for(var i=0;i<=4;i++) {
                var stats = armorInfo.stats["+"+i];
                if (stats) {
                    text += "+" + i + ": ";
                    text += (atkEmoji != null? atkEmoji + " " : "Atk: ") + "**" + stats.patk + "**\t";
                    text += (defEmoji != null? defEmoji + " " : "Def: ") + "**" + stats.pdef + "**\t";
                    text += (matkEmoji != null? matkEmoji + " " : "M.Atk: ") + "**" + stats.matk + "**\t";
                    text += (mdefEmoji != null? mdefEmoji + " " : "M.Def: ") + "**" + stats.mdef + "**\t";
                    text += "CRIT: **" + stats.crit + "**\t";
                    text += "HIT: **" + stats.hit + "**\t";
                    text += "EVA: **" + stats.eva + "**\n";
                }
            }

            message.channel.sendFile(equipmentFileName, "png", text);
        });
    }
}