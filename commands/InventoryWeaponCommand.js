var Jimp = require("jimp");

module.exports = {
    handle: function(message, bot) {
        var command = message.content.trim().toLowerCase();
        if (command !== "~inventory weapon" && (!command.startsWith("~inventory weapon "))) return;
        if (!bot.isPM(message)) {
            message.reply("You can only check your Weapons in Private Message.");
            return;
        }

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (player == null) {
            message.reply("You haven't selected your character.");
            return;
        }

        var backupText = "";
        var weaponIdList = [];
        var queue = [];
        
        for(key in player.weaponList) {
            var weaponId = key;
            var weapon = bot.weaponDatabase.getWeaponById(weaponId);
            for(var i=0;i<5;i++) {
                if (player.weaponList[weaponId]["+" + i] > 0) {
                    weaponIdList.push({
                        _id: weaponId,
                        plus: i
                    });

                    backupText += weapon.weaponName + " +" + i + "(Amount: " + player.weaponList[weaponId]["+" + i] +")\n";    
                }
            }
        }

        weaponIdList.sort(function(a, b) {
            if (b.plus != a.plus) return b.plus - a.plus;
            if (a._id < b._id) return -1;
            if (a._id > b._id) return 1;
        })

        var weaponFileNameList = [];
        for(var i=0;i<weaponIdList.length;i++) {
            var weaponFileName = "images/equipment/small/" + weaponIdList[i]._id + "0" + weaponIdList[i].plus + "_1.png";
            var weaponUrl = bot.urlHelper.getEquipmentIconUrl(weaponIdList[i]._id, weaponIdList[i].plus, "small");
            queue.push({
                fileToDownload: weaponUrl, fileToSave: weaponFileName
            })
            weaponFileNameList.push(weaponFileName);
        }

        var NUM_WEAPONS_PER_PAGE = 10;
        var totalPage = Math.ceil(weaponIdList.length/NUM_WEAPONS_PER_PAGE);
        var pageNo = 1;
        if (command.startsWith("~inventory weapon ")) {
            var page = command.substring(18);
            if (!isNaN(page)) {
                page = parseInt(page);
                page = Math.max(page, 1);
                page = Math.min(page, totalPage);
            }
            pageNo = page;
        }

        var text = "Your Weapons: (**Page " + pageNo + "** out of " + totalPage + ")\n";

        bot.imageHelper.download(queue, function(err) {
            if (err) {
                message.author.sendMessage(text + backupText);
                return;
            }
            bot.imageHelper.read(weaponFileNameList, function (err, imageList) {
                if (err) {
                    message.author.sendMessage(text + backupText);
                    return;
                }

                const ITEM_CELL_WIDTH = 480;
                const ITEM_CELL_HEIGHT = 50;
                const NUM_COL = 1;

                var imageWidth = ITEM_CELL_WIDTH*NUM_COL;
                var imageHeight = NUM_WEAPONS_PER_PAGE * ITEM_CELL_HEIGHT;

                var image = new Jimp(imageWidth, imageHeight, 0xFFFFFFFF, function (err, image) {
                    if (err) {
                        message.author.sendMessage(text + backupText);
                        return;
                    }

                    Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function (font) {
                        image.opacity(0.4);
                        var startIndex = (pageNo-1)*NUM_WEAPONS_PER_PAGE;
                        for(var i=startIndex;i<Math.min(imageList.length, pageNo*NUM_WEAPONS_PER_PAGE);i++) {
                            var row = Math.floor((i-startIndex)/NUM_COL);
                            var col = (i-startIndex)%NUM_COL;
                            var weapon = bot.weaponDatabase.getWeaponById(weaponIdList[i]._id);
                            var codeName = bot.weaponDatabase.getCodeNameForWeapon(weaponIdList[i]._id);
                            if (!codeName) {
                                codeName = "";
                            } else {
                                codeName = "(" + codeName.toUpperCase() + ")";
                            }
                            image.composite(imageList[i], 7 + col*ITEM_CELL_WIDTH, 7 + row*ITEM_CELL_HEIGHT);
                            image.print(font, 55 + col*ITEM_CELL_WIDTH, 7 + row*ITEM_CELL_HEIGHT, weapon.weaponName + " +" + weaponIdList[i].plus + " " + codeName);
                            image.print(font, 55 + col*ITEM_CELL_WIDTH, 27 + row*ITEM_CELL_HEIGHT, "x" + player.weaponList[weapon._id]["+" + weaponIdList[i].plus]);
                            // var stats = weapon.stats["+" + weaponIdList[i].plus];
                            // var statsText = "P.ATK: " + stats["patk"];
                            // statsText += " P.DEF: " + stats["pdef"];
                            // statsText += " M.ATK: " + stats["matk"];
                            // statsText += " M.DEF: " + stats["mdef"];
                            // statsText += " CRIT: " + stats["crit"];
                            // statsText += " HIT: " + stats["hit"];
                            // statsText += " EVA: " + stats["eva"];

                            // image.print(font, 95 + col*ITEM_CELL_WIDTH, 27 + row*ITEM_CELL_HEIGHT, statsText);
                        }
                        var imageName = "images/myweapon/" + userId + ".png";
                        image.write(imageName, function() {
                            var channel = message.channel;
                            if (channel.type === "text" || channel.type === "dm") {
                                message.author.sendFile(imageName, "png", text);
                            }   
                        });
                    });
                });
            });
        });
    }
}