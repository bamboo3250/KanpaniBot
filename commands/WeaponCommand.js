var SkillPhaseConst = require('../classes/skills/weapon_skills/SkillPhaseConst');

function getElementName(elementId) {
    if (elementId === SkillPhaseConst.ELEMENT_FIRE) {
        return "fire";
    } else if (elementId === SkillPhaseConst.ELEMENT_ICE) {
        return "ice";
    } else if (elementId === SkillPhaseConst.ELEMENT_WIND) {
        return "wind";
    } else if (elementId === SkillPhaseConst.ELEMENT_EARTH) {
        return "earth";
    } else if (elementId === SkillPhaseConst.ELEMENT_LIGHT) {
        return "light";
    } else if (elementId === SkillPhaseConst.ELEMENT_DARK) {
        return "dark";
    } else {
        return null;
    }
}

module.exports = {
    names: ['weapon'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;
        
        if (command.args.length < 2) {
            message.reply("The arguments are not correct.");
            return;
        }        

        var weaponInfo = null;
        var className = command.args[0];
        var classId = null;
        if (className != "cw") {
            classId = bot.functionHelper.getClassId(className);
            if (!classId) {
                message.reply("Class name is not correct.");
                return;
            }
            var codeName = command.args[1];
            if (!codeName) {
                message.reply("You need to specify weapon code name.");
                return;
            }
            weaponInfo = bot.weaponDatabase.getWeaponByCodeName(codeName, classId);    
        } else {
            var characterName = "";
            for(var i=1;i<command.args.length;i++) {
                characterName += command.args[i] + " ";
            }
            characterName = characterName.trim();
            var characterInfo = bot.employeeDatabase.getEmployeeByCommonName(characterName);
            if (!characterInfo) {
                message.reply("This character doesn't exist.");
                return;
            }
            weaponInfo = bot.weaponDatabase.getWeaponByCodeName("cw", characterInfo._id);
            classId = parseInt(characterInfo._id.substring(2,3));
        }
        
        if (!weaponInfo) {
            message.reply("No information.");
            return;
        }
        var plus = 0;
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
            var text = "Weapon Name: **" + weaponInfo.name + "**\n";
            var className = bot.functionHelper.getClassName(classId);
            var emojiName = 'k' + className.toLowerCase();
            const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
            text += "Class: **" + className + "** " +  (classEmoji != null? classEmoji : "") + "\n\n";

            text += "**Recipe**\n";
            for(var i=0;i<weaponInfo.recipe.length;i++) {
                text += weaponInfo.recipe[i].materialName + " x" + weaponInfo.recipe[i].amount + "\n";
            }
            if (weaponInfo.recipe.length === 0) text += "None\n";

            const atkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'katk'));
            const defEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kdef'));
            const matkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmatk'));
            const mdefEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmdef'));


            text += "\n**Stats**\n";
            for(var i=0;i<=4;i++) {
                var stats = weaponInfo.stats["+"+i];
                if (stats) {
                    text += "+" + i + ": ";
                    text += (atkEmoji != null? atkEmoji + " " : "Atk: ") + "**" + stats.patk + "**\t";
                    text += (defEmoji != null? defEmoji + " " : "Def: ") + "**" + stats.pdef + "**\t";
                    text += (matkEmoji != null? matkEmoji + " " : "M.Atk: ") + "**" + stats.matk + "**\t";
                    text += (mdefEmoji != null? mdefEmoji + " " : "M.Def: ") + "**" + stats.mdef + "**\t";
                    text += "CRIT: **" + stats.crit + "**\t";
                    text += "HIT: **" + stats.hit + "**\t";
                    text += "EVA: **" + stats.eva + "**\t";

                    var frontSkill = bot.skillDatabase.getSkill(classId, stats.frontSkill);
                    var frontSkillELementText = "";
                    for(var j=0;frontSkill && j<frontSkill.phases.length;j++) {
                        var phase = frontSkill.phases[j];
                        var elementName = getElementName(phase.element);
                        if (elementName) {
                            var emojiName = "k" + elementName;
                            const elementEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
                            if (elementEmoji) {
                                frontSkillELementText += elementEmoji;
                            } else {
                                frontSkillELementText += "**[" + elementName + "]**";
                            }
                        }
                    }
                    
                    var backSkill = bot.skillDatabase.getSkill(classId, stats.backSkill);
                    var backSkillELementText = "";
                    for(var j=0;backSkill && j<backSkill.phases.length;j++) {
                        var phase = backSkill.phases[j];
                        var elementName = getElementName(phase.element);
                        if (elementName) {
                            var emojiName = "k" + elementName;
                            const elementEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
                            if (elementEmoji) {
                                backSkillELementText += elementEmoji;
                            } else {
                                backSkillELementText += "**[" + elementName + "]**";
                            }
                        }
                    }

                    text += "\nFront: " + frontSkillELementText + " **" + stats.frontSkill + "**\t";
                    text += "Back: " + backSkillELementText + " **" + stats.backSkill + "**\n";
                }
            }

            text += "\n**Note**\n";
            text += weaponInfo.note;

            message.channel.send(text, {'files':[equipmentFileName]});
        });
    }
}