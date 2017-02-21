module.exports = {
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (command.commandName != "~bid") return;

        if (!bot.isPM(message) && message.channel.name != 'market') {
            message.reply('You can only bid either in PM or in Market channel.');
            return;
        }

        var userId = message.author.id;
        var player = bot.playerManager.getPlayer(userId);
        if (!player) {
            message.reply("You need to select your character first.");
            return;
        }
        var user = bot.userManager.getUser(userId);
        
        var bidId = command.args[0];
        var auction = bot.auctionManager.auctions[bidId];
        if (!auction) {
            message.reply("This auction does not exist.");
            return;
        };
        var priceInText = command.args[1];
        if (isNaN(priceInText)) {
            message.reply("You need to specify the price you want to bid (at least 1000 Gold greater than the previous bidder).");
            return;
        }
        var price = parseInt(priceInText);
        var now = new Date();
        var currentGold = player.gold;
        if (auction.highestBidderBeforeClosed) {
            if (price < auction.highestPriceBeforeClosed + 1000) {
                message.reply("The price must be at least 1000 Gold greater than the previous bidder.");
                return;   
            }
            if (currentGold + auction.bidders[userId] < price) {
                message.reply("You need at least **" + (price - currentGold - auction.bidders[userId]) + " Gold** more to place this bid.")
                return;
            }

            bot.playerManager.addGold(userId, auction.bidders[userId]);
            if (auction.bidders[userId]) {
                auction.bidders[userId] = Math.max(auction.bidders[userId], price);
            } else {
                auction.bidders[userId] = price;
            }
            bot.playerManager.spendGold(userId, auction.bidders[userId]);
        } else {
            if (price < auction.highestPriceBeforeClosed) {
                message.reply("The price must not be smaller than the starting price.");
                return;   
            }
            if (currentGold < price) {
                message.reply("You need at least **" + (price - currentGold) + " Gold** more to place this bid.")
                return;
            }

            auction.bidders[userId] = price;
            bot.playerManager.spendGold(userId, auction.bidders[userId]);
        }
        
        if (auction.endTime - now.valueOf() > 15*60*1000) {
            var previousHighestBidder = auction.highestBidderBeforeClosed;
            auction.highestBidderBeforeClosed = bot.auctionManager.getHighestBidder(bidId);
            if (auction.highestBidderBeforeClosed) {
                auction.highestPriceBeforeClosed = auction.bidders[auction.highestBidderBeforeClosed];
            }
            if (previousHighestBidder != auction.highestBidderBeforeClosed) {
                var previousHighestBidderUser = bot.userManager.getUser(previousHighestBidder);
                if (previousHighestBidderUser) {
                    previousHighestBidderUser.sendMessage("Someone placed higher bid than yours in Auction " + bidId + "!");
                }
            }
        }

        auction.timestamp[userId] = now.valueOf();
        if (user) {
            user.sendMessage("You have placed a bid successfully in Auction "+ bidId + ".");
        }
        bot.savePlayer();
        bot.saveAuction();
    }
}