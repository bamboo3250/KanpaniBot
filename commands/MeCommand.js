module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text != "~me") return;

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        var employee = bot.playerManager.getPlayerUnit(userId);
        if (!player || !employee) {
            message.reply("You haven't selected your character.");
            return;
        }
        
        if (message.channel.name === "battlefield") {
            const elementEmoji = (message.guild == null ? employee.element : message.guild.emojis.find('name', 'k' + employee.element));

            var text = "\n";
            var partner = null;
            if (player.partnerId != null) {
                partner = bot.userManager.getUser(player.partnerId);     
            }

            var elementText = (elementEmoji?elementEmoji+", ":"");
            var promotionText = (employee.promotion>1?"**Section Manager**, ":(employee.promotion>0?"**Chief**, ":""));
            var levelText = "Lv.**" + employee.levelCached  + "**";
            text += "Character: **" + employee.fullName + "** (" + elementText + promotionText + levelText  + ")\n";
            var now = new Date();
            text += "HP: **" + employee.getCurrentHP() + "/" + employee.getMaxHP() + "**" + (employee.respawnTime?" (Respawn in " + bot.functionHelper.parseTime(employee.respawnTime - now.valueOf()) + ")":"") + "\n";
            text += "Status: ";
            for(key in employee.status) {
                var statusName = key;
                if (employee.status[statusName]) text += "**" + employee.status[statusName] + "** ";    
            }
            text += "\n";
            text += "Position: **" + (player.position == "front"?"Frontline":"Backline") + "** " + (partner?"(Partner: **" + partner.username + "**)":"") + "\n";
            text += "Skill: **" + employee.getCurrentSkill() + "**";
            
            var isSkillReady = (employee.cooldownEndTime <= now.valueOf());
            var isClassTraitReady = (employee.classSkillCooldownEndTime <= now.valueOf());
            if (isSkillReady) {
                text += " **(Ready)**\n";
            } else {
                var time = bot.functionHelper.parseTime(employee.cooldownEndTime - now.valueOf());
                text += " **(" + time + ")**\n";
            }
            text += "Class Trait: ";
            if (employee.getClassId() === 5 || employee.getClassId() === 7 || employee.getClassId() === 8) {
                if (isClassTraitReady) {
                    text += " **Ready**\n";
                } else {
                    var time = bot.functionHelper.parseTime(employee.classSkillCooldownEndTime - now.valueOf());
                    text += " **" + time + "**\n";
                }
            } else {
                text += "**Not available**\n";
            }
            if (bot.battleController && bot.battleController.trainingSession.contribution) {
                if (typeof bot.battleController.trainingSession.contribution[userId] === "undefined") {
                    bot.battleController.trainingSession.contribution[userId] = 0;
                }
                text += "Actions: **" + bot.battleController.trainingSession.contribution[userId] + "**";
            }

            message.reply(text);
            return;
        }


        var goldToDeduct = employee.levelCached * 1000;
        if (message.channel.name === bot.dmmChannelName || message.channel.name === bot.nutakuChannelName) {
            goldToDeduct *= 2;
        }
        if (typeof bot.freeMe[userId] === "undefined") bot.freeMe[userId] = 2;
        if (bot.isPM(message) || bot.freeMe[userId] > 0) goldToDeduct = 0;

        if (player.gold < goldToDeduct) {
            message.reply("You need to pay **" + goldToDeduct + " Gold** to use this command.");
            return;
        }

        var enemySpriteUrl = bot.urlHelper.getSpriteImageURL(employee);
        var enemySpriteFileName = "images/enemy/" + bot.urlHelper.getSpriteImageName(employee);

        var queue = [
            { fileToDownload: enemySpriteUrl,   fileToSave: enemySpriteFileName}
        ];

        var partnerSpriteFileName = null
        var partner = bot.playerManager.getPlayer(player.partnerId);
        var partnerEmployee = bot.playerManager.getPlayerUnit(player.partnerId);
        if (player.partnerId) {
            
            var partnerSpriteUrl = bot.urlHelper.getSpriteImageURL(partnerEmployee);
            partnerSpriteFileName = "images/enemy/" + bot.urlHelper.getSpriteImageName(partnerEmployee);
            queue.push({
                fileToDownload: partnerSpriteUrl,   fileToSave: partnerSpriteFileName      
            })
        }
        
        var weaponFileName = null;
        if (player.equipedWeapon) {
            var weaponId = player.equipedWeapon._id;
            var plus = player.equipedWeapon.plus;
            var weapon = bot.weaponDatabase.getWeaponById(player.equipedWeapon._id);
            var weaponIconUrl = bot.urlHelper.getEquipmentIconUrl(weaponId, plus, weapon.type, "small");
            weaponFileName = "images/equipment/small/" + weaponId + "0" + plus + "_1.png";
            queue.push({
                fileToDownload: weaponIconUrl,   fileToSave: weaponFileName
            })
        }
        var armorFileName = null;
        if (player.equipedArmor) {
            var armorId = player.equipedArmor._id;
            var plus = player.equipedArmor.plus;
            var armor = bot.armorDatabase.getArmorById(player.equipedArmor._id);
            var armorIconUrl = bot.urlHelper.getEquipmentIconUrl(armorId, plus, armor.type, "small");
            armorFileName = "images/equipment/small/" + armorId + "0" + plus + "_1.png";
            queue.push({
                fileToDownload: armorIconUrl,   fileToSave: armorFileName
            })
        }
        var accessoryFileName = null;
        if (player.equipedAccessory) {
            var accId = player.equipedAccessory._id;
            var plus = player.equipedAccessory.plus;
            var accessory = bot.accessoryDatabase.getAccessoryById(player.equipedAccessory._id);
            var accessoryIconUrl = bot.urlHelper.getEquipmentIconUrl(accId, plus, accessory.type, "small");
            accessoryFileName = "images/equipment/small/" + accId + "0" + plus + "_1.png";
            queue.push({
                fileToDownload: accessoryIconUrl,   fileToSave: accessoryFileName
            })
        }   
        
        bot.imageHelper.download(queue, function(err) {
            if (err) {
                message.reply("Error happened. Try again.");
                bot.log(err);
                return;
            }

            var itemCellFileName = "images/misc/itemCell.png";
            var backgroundFileName = bot.functionHelper.randomObject(bot.backgroundManager.backgroundFileNames);
            // var backgroundFileName = "valentine_forest.jpg";
            backgroundFileName = "images/misc/background/" + backgroundFileName;
            var shadowFileName = "images/misc/shadow.png";

            var fileNameQueue = [
                enemySpriteFileName, 
                itemCellFileName, 
                backgroundFileName, 
                shadowFileName
            ];

            if (weaponFileName) fileNameQueue.push(weaponFileName);
            if (armorFileName) fileNameQueue.push(armorFileName);
            if (accessoryFileName) fileNameQueue.push(accessoryFileName);
            if (player.partnerId) fileNameQueue.push(partnerSpriteFileName);
            
            bot.imageHelper.read(fileNameQueue, function (err, imageList) {
                if (err) {
                    message.reply("Error happened. Try again.");
                    bot.log(err); 
                    return;
                }
                enemySpriteImage = imageList[enemySpriteFileName];
                itemCellImage = imageList[itemCellFileName];
                backgroundImage = imageList[backgroundFileName];
                shadowImage = imageList[shadowFileName];

                var weaponImage = imageList[weaponFileName];
                var armorImage = imageList[armorFileName];
                var accessoryImage = imageList[accessoryFileName];

                var partnerImage = imageList[partnerSpriteFileName];

                backgroundImage.crop(250, 100, 310, 270);
                enemySpriteImage.crop(20, 0, 310, 270);
                if (partnerImage) {
                    partnerImage.crop(20, 0, 310, 270);
                }
                shadowImage.scale(0.6);

                var glowingImage = enemySpriteImage.clone();
                if (employee.promotion > 0) {
                    glowingImage.scan(0, 0, glowingImage.bitmap.width, glowingImage.bitmap.height, function (x, y, idx) {
                        var red   = this.bitmap.data[ idx + 0 ];
                        var green = this.bitmap.data[ idx + 1 ];
                        var blue  = this.bitmap.data[ idx + 2 ];
                        var alpha = this.bitmap.data[ idx + 3 ];
                        if (alpha > 0) {
                            if (employee.promotion == 1) {
                                this.bitmap.data[ idx + 0 ] = 255;
                                this.bitmap.data[ idx + 1 ] = 0;
                                this.bitmap.data[ idx + 2 ] = 255;
                                this.bitmap.data[ idx + 3 ] = 200;
                            } else {
                                this.bitmap.data[ idx + 0 ] = 0;
                                this.bitmap.data[ idx + 1 ] = 0;
                                this.bitmap.data[ idx + 2 ] = 255;
                                this.bitmap.data[ idx + 3 ] = 200;
                            }
                        }
                    });
                    //glowingImage.gaussian(7);
                }

                var glowingPartnerImage = null;
                if (partnerEmployee && partnerImage) {
                    glowingPartnerImage = partnerImage.clone();
                    if (partnerEmployee.promotion > 0) {
                        glowingPartnerImage.scan(0, 0, glowingPartnerImage.bitmap.width, glowingPartnerImage.bitmap.height, function (x, y, idx) {
                            var red   = this.bitmap.data[ idx + 0 ];
                            var green = this.bitmap.data[ idx + 1 ];
                            var blue  = this.bitmap.data[ idx + 2 ];
                            var alpha = this.bitmap.data[ idx + 3 ];
                            if (alpha > 0) {
                                if (partnerEmployee.promotion == 1) {
                                    this.bitmap.data[ idx + 0 ] = 255;
                                    this.bitmap.data[ idx + 1 ] = 80;
                                    this.bitmap.data[ idx + 2 ] = 255;
                                    this.bitmap.data[ idx + 3 ] = 200;
                                } else {
                                    this.bitmap.data[ idx + 0 ] = 0;
                                    this.bitmap.data[ idx + 1 ] = 0;
                                    this.bitmap.data[ idx + 2 ] = 255;
                                    this.bitmap.data[ idx + 3 ] = 200;
                                }
                            }
                        });
                        //glowingPartnerImage.gaussian(7);
                    }
                }
                

                if (player.partnerId && player.position === "front") {
                    backgroundImage
                    .composite(shadowImage, 3-15, 100-5)
                    .composite(glowingPartnerImage, -102, -65)
                    .composite(partnerImage, -102, -65);
                }
                backgroundImage
                .composite(shadowImage, 105-15, 165-5)
                .composite(glowingImage, 0, 0)
                .composite(enemySpriteImage, 0, 0);
                if (player.partnerId && player.position === "back") {
                    backgroundImage
                    .composite(shadowImage, 207-15, 230-5)
                    .composite(glowingPartnerImage, 102, 65)
                    .composite(partnerImage, 102, 65);
                }
                backgroundImage
                .composite(itemCellImage, 10, 10)
                .composite(itemCellImage, 10, 60)
                .composite(itemCellImage, 10, 110);

                if (weaponImage) backgroundImage.composite(weaponImage, 10, 10);
                if (armorImage) backgroundImage.composite(armorImage, 10, 60);
                if (accessoryImage) backgroundImage.composite(accessoryImage, 10, 110);

                var imageName = "images/me/" + message.author.id + ".png";
                backgroundImage.write(imageName, function() {
                    var channel = message.channel;
                    if (channel.type === "text" || channel.type === "dm") {
                        
                        var emojiName = 'k' + employee.getClass().toLowerCase();
                        const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
                        const hpEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'khp'));
                        const atkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'katk'));
                        const defEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kdef'));
                        const matkEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmatk'));
                        const mdefEmoji = (message.guild == null ? null : message.guild.emojis.find('name', 'kmdef'));

                        const elementEmoji = (message.guild == null ? employee.element : message.guild.emojis.find('name', 'k' + employee.element));

                        if (player.gold < goldToDeduct) {
                            message.reply("You need to pay **" + goldToDeduct + " Gold** to use this command.");
                            return;
                        }
                        if (!bot.isPM(message) && bot.freeMe[userId] > 0) {
                            bot.freeMe[userId]--;
                        }
                        player.gold -= goldToDeduct;
                        bot.savePlayer();
                        
                        var text = "\n";
                        text += "Player: **" + message.author.username + "** (:moneybag:: **" + player.gold + "**)\n";
                        var partner = null;
                        if (player.partnerId != null) {
                            partner = bot.userManager.getUser(player.partnerId);     
                        }
                        text += "Position: **" + (player.position == "front"?"Frontline":"Backline") + "** " + (partner?"(Partner: **" + partner.username + "**)":"") + "\n";
                        var elementText = (elementEmoji?elementEmoji+", ":"");
                        var promotionText = (employee.promotion>1?"**Section Manager**, ":(employee.promotion>0?"**Chief**, ":""));
                        var levelText = "Lv.**" + employee.levelCached  + "**";
                        text += "Character: **" + employee.fullName + "** (" + elementText + promotionText + levelText  + ")\n";
                        text += "Rarity: ";
                        for(var i=0;i<employee.getBaseRarity();i++) text += ":star:";
                        text += "\n";

                        text += "Class: **" + employee.getClass() + "** " + (classEmoji != null? classEmoji : "")  + "\n";
                        text += "Exp: **" + employee.exp + "** (Remain: **" + employee.getExpToNextLevel() + "pts**)\n";
                        text += (hpEmoji != null? hpEmoji + " " : "") + "HP: **" + employee.getCurrentHP() + "/" + employee.getMaxHP() + "**\n";
                        text += (atkEmoji != null? atkEmoji + " " : "") + "Atk: **" + employee.getAtk() + "**\t";
                        text += (matkEmoji != null? matkEmoji + " " : "") + "M.Atk: **" + employee.getMAtk() + "**\n";
                        text += (defEmoji != null? defEmoji + " " : "") + "Def: **" + employee.getDef() + "**\t";
                        text += (mdefEmoji != null? mdefEmoji + " " : "") + "M.Def: **" + employee.getMDef() + "**\n";
                        text += "CRIT: **" + employee.getCrit() + "**\tHIT: **" + employee.getHit() + "**\tEVA: **" + employee.getEva() + "**\n";
                        text += "\n======SKILLS======\n";
                        text += (player.position=="front"?"**":"") + "Front Skill: " + employee.getFrontSkill() + (player.position=="front"?"**":"") + "\n";                    
                        text += (player.position=="back"?"**":"") + "Back Skill: " + employee.getBackSkill() + (player.position=="back"?"**":"") + "\n";

                        if (bot.isPM(message)) {
                            text += "\n====BASE STATS====\n";
                            text += "**STR: " + employee.getSTR() + "**\t\t";
                            text += "**INT: " + employee.getINT() + "**\n";
                            text += "**VIT: " + employee.getVIT() + "**\t\t";
                            text += "**PIE: " + employee.getPIE() + "**\n";
                            text += "**AGI: " + employee.getAGI() + "**\t\t";
                            text += "**LUK: " + employee.getLUK() + "**\n";
                            text += "**DEX: " + employee.getDEX() + "**\n";
                        }
                        channel.sendFile(imageName, "png", text);
                    }
                });
            });
        });
    }
}