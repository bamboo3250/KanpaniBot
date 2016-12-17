module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~weapon") return;

        var classId = bot.functionHelper.getClassId(command.args[0]);
        if (!classId) {
            message.reply("Class name is not correct.");
            return;
        }
        var weaponInfo = bot.weaponDatabase.getWeaponByCodeName(args[1], classId);
        if (!weaponInfo) {
            message.reply("No information.");
            return;
        }
        var equipmentUrl = bot.urlHelper.getEquipmentIconUrl(weaponInfo._id, plus, weaponInfo.type);
        var equipmentFileName = "images/equipment/large/" + weaponInfo._id + "0" + (plus+1) + "_1.png";

        var queue = [
            { fileToDownload: equipmentUrl,   fileToSave: equipmentFileName}
        ];
        bot.imageHelper.download(queue, function(err) {
            if (err) {
                message.reply("Error happened. Try again.");
                bot.log(err);
                return;
            }
            var text = "Weapon Name: **" + weaponInfo.weaponName + "**\n";
            var emojiName = 'k' + bot.functionHelper.getClassName(classId);
            const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
            text += "Class: **" + employee.getClass() + "** " +  (classEmoji != null? classEmoji : "") + "\n\n";
            text += "**Recipe**\n";
            for(var i=0;i<weaponInfo.recipe.length;i++) {
                text += weaponInfo.recipe[i].materialName + " x" + weaponInfo.recipe[i].amount + "\n";
            }

            const atkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'katk'));
            const defEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kdef'));
            const matkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmatk'));
            const mdefEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmdef'));


            text += "\n**Stats**\n";
            for(var i=0;i<=4;i++) {
                var stats = weaponInfo.stats["+"+i];
                if (stats) {
                    text += (atkEmoji != null? atkEmoji + " " : "") + "Atk: **" + stats.patk + "**\t";
                    text += (defEmoji != null? defEmoji + " " : "") + "Def: **" + stats.pdef + "**\t";
                    text += (matkEmoji != null? matkEmoji + " " : "") + "M.Atk: **" + stats.matk + "**\t";
                    text += (mdefEmoji != null? mdefEmoji + " " : "") + "M.Def: **" + stats.mdef + "**\t";
                    text += "CRIT: **" + stats.crit + "**\t";
                    text += "HIT: **" + stats.hit + "**\t";
                    text += "EVA: **" + stats.eva + "**\t";
                    text += "Front: **" + stat.frontSkill + "**\t";
                    text += "Back: **" + stat.backSkill + "**\n";
                }
            }
            message.channel.sendFile(equipmentFileName, "png", text);
        });
    }
}