var Jimp = require("jimp");

module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.removeExtraSpace(message.content.trim().toLowerCase());
        if (command !== "~inventory ar" && (!command.startsWith("~inventory ar "))
            && command !== "~inventory wp" && (!command.startsWith("~inventory wp "))
            && command !== "~inventory acc" && (!command.startsWith("~inventory acc "))) return;
        if (!bot.isPM(message)) {
            message.reply("You can only check your equipment in Private Message.");
            return;
        }
        var category = command.substring(11, 13 + (command.startsWith("~inventory acc")?1:0));

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (player == null) {
            message.reply("You haven't selected your character.");
            return;
        }

        var backupText = "";
        var equipmentIdList = [];
        var queue = [];
        
        var equipmentList = {};
        if (category == "wp") {
            equipmentList = player.weaponList;
        } else if (category == "ar") {
            equipmentList = player.armorList;
        } else if (category == "acc") {
            equipmentList = player.accessoryList;
        }

        for(key in equipmentList) {
            var equipmentId = key;
            var equipment = null;
            if (category == "wp") {
                equipment = bot.weaponDatabase.getWeaponById(equipmentId);    
            } else if (category == "ar") {
                equipment = bot.armorDatabase.getArmorById(equipmentId);    
            } else if (category == "acc") {
                equipment = bot.accessoryDatabase.getAccessoryById(equipmentId);    
            }
            
            if (!equipment) {
                bot.log("Cannot find equipment with ID: " + equipmentId);
                continue;
            }
            for(var i=0;i<5;i++) {
                if (equipmentList[equipmentId]["+" + i] > 0) {
                    equipmentIdList.push({
                        _id: equipmentId,
                        type: equipment.type,
                        plus: i
                    });
                    if (category == "wp") {
                        backupText += equipment.name + " +" + i + "(Amount: " + player.weaponList[equipmentId]["+" + i] +")\n";        
                    } else if (category == "ar") {
                        backupText += equipment.name + " +" + i + "(Amount: " + player.armorList[equipmentId]["+" + i] +")\n";    
                    } else if (category == "acc") {
                        backupText += equipment.name + " +" + i + "(Amount: " + player.accessoryList[equipmentId]["+" + i] +")\n";    
                    }
                    
                }
            }
        }

        equipmentIdList.sort(function(a, b) {
            if (b.plus != a.plus) return b.plus - a.plus;
            if (a._id < b._id) return 1;
            if (a._id > b._id) return -1;
        })

        var equipmentFileNameList = [];
        for(var i=0;i<equipmentIdList.length;i++) {
            var equipmentFileName = "images/equipment/small/" + equipmentIdList[i]._id + "0" + equipmentIdList[i].plus + "_1.png";
            var equipmentUrl = bot.urlHelper.getEquipmentIconUrl(equipmentIdList[i]._id, equipmentIdList[i].plus, equipmentIdList[i].type, "small");
            queue.push({
                fileToDownload: equipmentUrl, fileToSave: equipmentFileName
            })
            equipmentFileNameList.push(equipmentFileName);
        }

        var NUM_EQUIPMENT_PER_PAGE = 10;
        var totalPage = Math.max(1, Math.ceil(equipmentIdList.length/NUM_EQUIPMENT_PER_PAGE));
        var pageNo = command.substring(14);

        if (pageNo.length > 0) {
            if (!isNaN(pageNo)) {
                pageNo = parseInt(pageNo);
                pageNo = Math.max(pageNo, 1);
                pageNo = Math.min(pageNo, totalPage);
            } else {
                pageNo = 1;
            }    
        } else {
            pageNo = 1;
        }
        

        var text = "Your Equipment: (**Page " + pageNo + "** out of " + totalPage + ")\n";

        bot.imageHelper.download(queue, function(err) {
            if (err) {
                message.author.send(text + backupText);
                return;
            }
            bot.imageHelper.read(equipmentFileNameList, function (err, imageDict) {
                if (err) {
                    message.author.send(text + backupText);
                    return;
                }

                const ITEM_CELL_WIDTH = 480;
                const ITEM_CELL_HEIGHT = 50;
                const NUM_COL = 1;

                var imageList = [];
                for(key in imageDict) imageList.push(imageDict[key]);

                var imageWidth = ITEM_CELL_WIDTH*NUM_COL;
                var imageHeight = NUM_EQUIPMENT_PER_PAGE * ITEM_CELL_HEIGHT;

                var image = new Jimp(imageWidth, imageHeight, 0xFFFFFFFF, function (err, image) {
                    if (err) {
                        message.author.send(text + backupText);
                        return;
                    }

                    Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function (font) {
                        image.opacity(0.4);
                        var startIndex = (pageNo-1)*NUM_EQUIPMENT_PER_PAGE;
                        for(var i=startIndex;i<Math.min(imageList.length, pageNo*NUM_EQUIPMENT_PER_PAGE);i++) {
                            var row = Math.floor((i-startIndex)/NUM_COL);
                            var col = (i-startIndex)%NUM_COL;
                            var equipment = null;
                            if (category == "wp") {
                                equipment = bot.weaponDatabase.getWeaponById(equipmentIdList[i]._id);    
                            } else if (category == "ar") {
                                equipment = bot.armorDatabase.getArmorById(equipmentIdList[i]._id);    
                            } else if (category == "acc") {
                                equipment = bot.accessoryDatabase.getAccessoryById(equipmentIdList[i]._id);    
                            }
                            
                            var codeName = null;
                            if (category == "wp") {
                                codeName = bot.weaponDatabase.getCodeNameForWeapon(equipmentIdList[i]._id);
                            } else if (category == "ar") {
                                codeName = bot.armorDatabase.getCodeNameForArmor(equipmentIdList[i]._id);
                            } else if (category == "acc") {
                                codeName = bot.accessoryDatabase.getCodeNameForAccessory(equipmentIdList[i]._id);
                            }
                            
                            if (!codeName) {
                                codeName = "";
                            } else {
                                codeName = "(" + codeName.toUpperCase() + ")";
                            }
                            image.composite(imageList[i], 7 + col*ITEM_CELL_WIDTH, 7 + row*ITEM_CELL_HEIGHT);
                            var equipmentName = equipment.name;
                            
                            image.print(font, 55 + col*ITEM_CELL_WIDTH, 7 + row*ITEM_CELL_HEIGHT, equipmentName + " +" + equipmentIdList[i].plus + " " + codeName);
                            image.print(font, 55 + col*ITEM_CELL_WIDTH, 27 + row*ITEM_CELL_HEIGHT, "x" + equipmentList[equipment._id]["+" + equipmentIdList[i].plus]);
                            var stats = equipment.stats["+" + equipmentIdList[i].plus];
                            // var statsText = "P.ATK: " + stats["patk"];
                            // statsText += " P.DEF: " + stats["pdef"];
                            // statsText += " M.ATK: " + stats["matk"];
                            // statsText += " M.DEF: " + stats["mdef"];
                            // statsText += " CRIT: " + stats["crit"];
                            // statsText += " HIT: " + stats["hit"];
                            // statsText += " EVA: " + stats["eva"];

                            image.print(font, 125 + col*ITEM_CELL_WIDTH, 27 + row*ITEM_CELL_HEIGHT, "Price: " + stats.price);
                        }
                        var imageName = "images/myweapon/" + userId + ".png";
                        image.write(imageName, function() {
                            var channel = message.channel;
                            if (channel.type === "text" || channel.type === "dm") {
                                message.author.send(text, {'files':[imageName]});
                            }   
                        });
                    });
                });
            });
        });
    }
}