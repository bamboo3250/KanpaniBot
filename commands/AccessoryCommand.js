module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~acc" && command.commandName != "~accessory") return;

        if (command.args.length < 2) {
            message.reply("The arguments are not correct.");
            return;
        }        

        var accessoryInfo = null;
        var accessoryName = "";
        for(var i=0;i<command.args.length;i++) {
            accessoryName += command.args[i] + " ";
        }
        accessoryName = bot.functionHelper.removeExtraSpace(accessoryName);
        accessoryInfo = bot.accessoryDatabase.getAccessoryByName(accessoryName);
        
        if (!accessoryInfo) {
            message.reply("No information.");
            return;
        }
        var plus = 0;
        var equipmentUrl = bot.urlHelper.getEquipmentIconUrl(accessoryInfo._id, plus, accessoryInfo.type);
        var equipmentFileName = "images/equipment/large/" + accessoryInfo._id + "0" + (plus+1) + "_1.png";

        var queue = [
            { fileToDownload: equipmentUrl,   fileToSave: equipmentFileName}
        ];
        bot.imageHelper.download(queue, function(err) {
            if (err) {
                message.reply("Error happened. Try again.");
                bot.log(err);
                return;
            }
            var text = "Accessory Name: **" + accessoryInfo.name + "**\n\n";
            
            text += "**Recipe**\n";
            for(var i=0;i<accessoryInfo.recipe.length;i++) {
                text += accessoryInfo.recipe[i].materialName + " x" + accessoryInfo.recipe[i].amount + "\n";
            }
            if (accessoryInfo.recipe.length === 0) text += "None\n";

            const atkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'katk'));
            const defEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kdef'));
            const matkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmatk'));
            const mdefEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmdef'));


            text += "\n**Stats**\n";
            for(var i=0;i<=4;i++) {
                var stats = accessoryInfo.stats["+"+i];
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