module.exports = {
    moveItem: function(bot, sellerId, buyerId) {
        auction = bot.auctionManager.auctions[sellerId];
        if (!auction) return;

        // move item.
        if (auction.itemType === "material") {
            var currentItemInfo = bot.itemInfoDatabase.getItemInfoById(auction.itemId);
            if (currentItemInfo) {
                bot.playerManager.addItem(buyerId, currentItemInfo.itemName, auction.amount);
            } else {
                bot.log("[SetAuction] Cannot find item with ID: " + auction.itemId);
            }
        } else if (auction.itemType === "weapon") {
            var currentItemInfo = bot.weaponDatabase.getWeaponById(auction.itemId);
            if (currentItemInfo) {
                bot.playerManager.addWeapon(buyerId, auction.itemId, auction.plus, auction.amount);
            } else {
                bot.log("[SetAuction] Cannot find weapon with ID: " + auction.itemId);
            }
        } else if (auction.itemType === "armor") {
            var currentItemInfo = bot.armorDatabase.getArmorById(auction.itemId);
            if (currentItemInfo) {
                bot.playerManager.addArmor(buyerId, auction.itemId, auction.plus, auction.amount);
            } else {
                bot.log("[SetAuction] Cannot find armor with ID: " + auction.itemId);
            }
        } else if (auction.itemType === "accessory") {
            var currentItemInfo = bot.accessoryDatabase.getAccessoryById(auction.itemId);
            if (currentItemInfo) {
                bot.playerManager.addAccessory(buyerId, auction.itemId, auction.plus, auction.amount);
            } else {
                bot.log("[SetAuction] Cannot find accessory with ID: " + auction.itemId);
            }
        } else {
            bot.log("[SetAuction] Wrong Item Type: " + auction.itemType);
            return;
        }
        bot.auctionManager.removeAuction(sellerId);
    },
    setNotice: function(bot, userId) {
        var auction = bot.auctionManager.auctions[userId];
        if (!auction) return;
        var now = new Date();
        var remainingTime = auction.endTime - now.valueOf();
        
        var sellerUser = bot.userManager.getUser(userId);
        var time = bot.functionHelper.parseTime(remainingTime);
        // bot.log(sellerUser.username + " set auction for " + auction.itemType + " " + auction.itemId + " +" + auction.plus + ". Remaining Time: " + time);

        var that = this;
        bot.auctionId[userId] = setTimeout(function() {
            auction = bot.auctionManager.auctions[userId];
            if (!auction) return;

            var itemName = bot.getItemNameFromAuction(auction);
            itemName = auction.amount + " " + itemName;
            
            var highestBidder = bot.auctionManager.getHighestBidder(userId);
            if (!highestBidder) {
                sellerUser.send("Nobody bidded for your **" + itemName + "**. The item will be returned to your Inventory.");
                that.moveItem(bot, userId, userId);
                bot.savePlayer();
                bot.saveAuction();
                return;
            }

            var winnerUser = bot.userManager.getUser(highestBidder);
            if (!sellerUser || !winnerUser) return;

            var gainGold = Math.floor(auction.bidders[highestBidder] * 0.95);
            bot.playerManager.addGold(userId, gainGold);

            auction.bidders[highestBidder] = 0;
            for(key in auction.bidders) {
                var bidderId = key;
                if (auction.bidders[bidderId] > 0) {
                    bot.playerManager.addGold(bidderId, auction.bidders[bidderId]);
                    var bidderUser = bot.userManager.getUser(bidderId);
                    if (bidderUser) {
                        bidderUser.send("**" + auction.bidders[bidderId] + " Gold** has been returned to your account from Auction " + userId + ".");
                    }
                }
            }

            that.moveItem(bot, userId, highestBidder);
            
            winnerUser.send("Congratulations! You have won **" + itemName + "** from " + sellerUser.username);
            sellerUser.send("Your item **" + itemName + "** has been sold to **" + winnerUser.username + "** for " + gainGold + " Gold (5% deducted).");

            bot.savePlayer();
            bot.saveAuction();

        }, remainingTime);
    },

    names: ['setauction'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        if (!bot.isPM(message) && message.channel.name != 'market') {
            message.reply('You can only set a new auction either in PM or in Market channel.');
            return;
        }

        var userId = message.author.id;
        if (!bot.auctionManager.canSetAuction(userId)) {
            message.reply("You cannot set a new auction now.");
            return;
        }

        var timeInText = command.args[0];
        if (isNaN(timeInText)) {
            message.reply("You need to specify the duration (At least 1 hour and at most 24 hours).");
            return;
        }
        var timeInHour = parseInt(timeInText);
        if (timeInHour < 1) {
            message.reply("The duration must be at least 1 hour.");
            return;   
        }
        if (timeInHour > 24) {
            message.reply("The duration must be at most 24 hours.");
            return;   
        }

        var priceInText = command.args[1];
        if (isNaN(priceInText)) {
            message.reply("You need to specify the starting price (At least 1 Gold and at most 10,000,000 Gold).");
            return;
        }
        var startingPrice = parseInt(priceInText);
        if (startingPrice < 1) {
            message.reply("The starting price must be at least 1 Gold.");
            return;   
        }
        if (startingPrice > 100000000) {
            message.reply("The starting price must be at most 100,000,000 Gold.");
            return;   
        }

        var amountInText = command.args[2];
        if (isNaN(amountInText)) {
            message.reply("You need to specify the quantity of the item.");
            return;
        }
        var amount = parseInt(amountInText);
        if (amount < 1) {
            message.reply("The quantity must be at least 1.");
            return;   
        }

        var itemName = "";
        var itemPlus = 0;

        itemName = "";
        for(var i=3;i<command.args.length + (command.args[command.args.length-1].startsWith("+")?-1:0);i++) itemName += command.args[i] + " ";
        itemName = itemName.trim();
            
        if (command.args.length > 4) {
            itemPlus = command.args[command.args.length-1];
            if (!itemPlus.startsWith("+")) {
                itemPlus = 0;
            } else {
                itemPlus = itemPlus.substring(1);
                if (isNaN(itemPlus)) {
                    itemPlus = 0;
                } else {
                    itemPlus = parseInt(itemPlus);
                }
            }
        }

        var itemType = "material";
        var itemInfo = bot.itemInfoDatabase.getItemInfoByName(itemName);
        if (itemInfo != null) {
            itemName = itemInfo.itemName;
        }

        if (itemInfo === null) {
            itemInfo = bot.weaponDatabase.getWeaponByName(itemName);    
            if (itemInfo != null) {
                itemType = "weapon";
                itemName = itemInfo.name;
            }
        }
        if (itemInfo === null) {
            itemInfo = bot.armorDatabase.getArmorByName(itemName);    
            if (itemInfo != null) {
                itemType = "armor";
                itemName = itemInfo.name;
            }
        }
        if (itemInfo === null) {
            itemInfo = bot.accessoryDatabase.getAccessoryByName(itemName);    
            if (itemInfo != null) {
                itemType = "accessory";
                itemName = itemInfo.name;
            }
        }
        if (itemInfo === null) {
            message.reply("No information.");
            return;
        }

        if (bot.auctionId[userId]) {
            // Remove Item before setting a new auction.
            this.moveItem(bot, userId, userId);
            clearTimeout(bot.auctionId[userId]);
            bot.auctionId[userId] = null;
        }
        

        if (itemType === "material") {
            var playerAmount = bot.playerManager.getItemAmount(userId, itemName);
            if (playerAmount < amount) {
                message.reply("You only have **" + playerAmount + " " + itemName + "**.");
                return;
            }
            bot.playerManager.spendItem(userId, itemName, amount);
            itemName = amount + " " + itemName;

        } else if (itemType === "weapon") {
            var playerAmount = bot.playerManager.getWeaponAmount(userId, itemInfo._id, itemPlus);
            if (playerAmount < amount) {
                message.reply("You only have **" + playerAmount + " " + itemName + " +" + itemPlus + "**.");
                return;
            }
            bot.playerManager.removeWeapon(userId, itemInfo._id, itemPlus, amount);
            itemName = amount + " " + itemName + " +" + itemPlus;

        } else if (itemType === "armor") {
            var playerAmount = bot.playerManager.getArmorAmount(userId, itemInfo._id, itemPlus);
            if (playerAmount < amount) {
                message.reply("You only have **" + playerAmount + " " + itemName + " +" + itemPlus + "**.");
                return;
            }
            bot.playerManager.removeArmor(userId, itemInfo._id, itemPlus, amount);
            itemName = amount + " " + itemName + " +" + itemPlus;

        } else if (itemType === "accessory") {
            var playerAmount = bot.playerManager.getAccessoryAmount(userId, itemInfo._id, itemPlus);
            if (playerAmount < amount) {
                message.reply("You only have **" + playerAmount + " " + itemName + " +" + itemPlus + "**.");
                return;
            }
            bot.playerManager.removeAccessory(userId, itemInfo._id, itemPlus, amount);
            itemName = amount + " " + itemName + " +" + itemPlus;
        }
        bot.auctionManager.setAuction(userId, timeInHour, startingPrice, amount, itemType, itemInfo._id, itemPlus);

        if (!bot.auctionId[userId]) {
            this.setNotice(bot, userId);
        }

        bot.savePlayer();
        bot.saveAuction();

        message.reply("You have set **" + itemName + "** for auction.");
    }
}