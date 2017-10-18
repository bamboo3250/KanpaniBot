module.exports = {
    names: ['auction'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        if (!bot.isPM(message)) {
            message.reply("You can only use this command in PM.");
            return;
        }

        var page = 0;
        if (command.args.length > 0) {
            if (!isNaN(command.args[0])) {
                page = parseInt(command.args[0] - 1);
            }
        }
        if (page < 0) {
            message.reply("Page number must be at least 1.");
            return;
        }

        var auctionList = [];
        for(key in bot.auctionManager.auctions) {
            var userId = key;
            var auction = bot.auctionManager.auctions[userId];
            if (auction) auctionList.push(auction);
        }
        var now = new Date();
        auctionList.sort(function(a, b) {
            var remainingTimeA = a.endTime - now.valueOf();
            var remainingTimeB = b.endTime - now.valueOf();
            return remainingTimeA - remainingTimeB;
        });

        var totalPages = Math.max(1, Math.ceil(auctionList.length / 10));
        page = Math.min(page, totalPages-1);

        var text = "Auction List (**Page " + (page+1) + " out of " + totalPages + "**):\n";
        var AUCTION_PER_PAGE = 10;
        var userId = message.author.id;
        for(var i = page*AUCTION_PER_PAGE; i<Math.min((page+1)*AUCTION_PER_PAGE, auctionList.length); i++) {
            var auction = auctionList[i];
            var sellerUser = bot.userManager.getUser(auction.highestBidderBeforeClosed);
            var sellerUsername = "[" + auction._id + "]";
            var sellerUser = bot.userManager.getUser(auction._id);
            if (sellerUser) {
                sellerUsername = sellerUser.username;
            }

            text += "\nID: **" + auction._id + "** (User: " + sellerUsername + ")\n";
            text += "Item: **" + bot.getItemNameFromAuction(auction) + "** (" + auction.itemType + ")\n";
            text += "Amount: " + auction.amount + "\n";
            var bidderUsername = "[" + auction.highestBidderBeforeClosed + "]";
            if (!auction.highestBidderBeforeClosed) {
                bidderUsername = "No bidder";
            }
            text += "No. of Bidders: " + Object.keys(auction.bidders).length + "\n";
            var bidderUser = bot.userManager.getUser(auction.highestBidderBeforeClosed);
            if (bidderUser) {
                bidderUsername = bidderUser.username;
            }
            text += "Highest Bid: " + auction.highestPriceBeforeClosed + " (" + bidderUsername + ")\n";
            var remainingTime = auction.endTime - now.valueOf();
            var time = bot.functionHelper.parseTime(remainingTime);
            text += "Remaining Time: " + time + "\n";
            text += "Status: **" + (remainingTime < 15*60*1000?"Closed":"Open") + "**\n";
        }
        message.reply(text);
    }
}