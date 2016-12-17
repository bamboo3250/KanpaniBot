function AuctionManager() {
    this.TIME_BEFORE_CLOSED = 15 * 60 * 1000; // 15 minutes

    this.auctions = {};
}

AuctionManager.prototype.canSetAuction = function(userId) {
    var auction = this.auctions[userId];
    return (!auction || auction.highestBidder === null);
}

AuctionManager.prototype.setAuction = function(userId, timeInHour, startingPrice, amount, itemType, itemId, plus = 0) {
    var now = new Date();
    this.auctions[userId] = {
        startTime: now.valueOf(),
        endTime: now.valueOf() + timeInHour * 60 * 60 * 1000,
        highestPrice: startingPrice,
        highestPriceBeforeClosed: startingPrice,
        amount: amount,
        itemType: itemType,
        itemId: itemId,
        plus: plus,
        highestBidder: null,
        highestBidderBeforeClosed: null
    }
}

AuctionManager.prototype.removeAuction = function(userId) {
    this.auctions[userId] = null;
}

AuctionManager.prototype.setBid = function(userId, targetUserId, price) {
    var auction = this.auctions[targetUserId];
    if (!auction) return;
    if (auction.highestPrice < price) {
        auction.highestPrice = price;
        auction.highestBidder = userId;

        var now = new Date();
        if (auction.endTime - now.valueOf() > this.TIME_BEFORE_CLOSED) {
            auction.highestPriceBeforeClosed = price;
            auction.highestBidderBeforeClosed = userId;
        }
    }

module.exports = new AuctionManager();