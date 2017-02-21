function AuctionManager() {
    this.TIME_BEFORE_CLOSED = 15 * 60 * 1000; // 15 minutes

    this.auctions = {};
}

AuctionManager.prototype.canSetAuction = function(userId) {
    var auction = this.auctions[userId];
    return (!auction || Object.keys(auction.bidders).length <= 0);
}

AuctionManager.prototype.setAuction = function(userId, timeInHour, startingPrice, amount, itemType, itemId, plus = 0) {
    var now = new Date();
    this.auctions[userId] = {
        _id: userId,
        startTime: now.valueOf(),
        endTime: now.valueOf() + timeInHour * 60 * 60 * 1000,
        startingPrice: startingPrice,
        highestPriceBeforeClosed: startingPrice,
        amount: amount,
        itemType: itemType,
        itemId: itemId,
        plus: plus,
        bidders: {},
        highestBidderBeforeClosed: null,
        timestamp: {}
    }
}

AuctionManager.prototype.removeAuction = function(userId) {
    this.auctions[userId] = null;
}

AuctionManager.prototype.getHighestBidder = function(userId) {
    var auction = this.auctions[userId];
    if (!auction) return null;
    var keyList = Object.keys(auction.bidders);
    if (keyList.length <= 0) return null;
    else {
        var result = keyList[0];
        for(var i=1;i<keyList.length;i++) {
            if (auction.bidders[result] < auction.bidders[keyList[i]]) {
                result = keyList[i];
            } else if (auction.bidders[result] === auction.bidders[keyList[i]]) {
                if (auction.timestamp[result] > auction.timestamp[keyList[i]]) {
                    result = keyList[i];
                }
            }
        }
        return result;
    }
}

AuctionManager.prototype.setBid = function(userId, targetUserId, price) {
    var auction = this.auctions[targetUserId];
    if (!auction) return;

    auction.bidders[userId] = Math.max(price, auction.bidders[userId]);
    var now = new Date();
    auction.timestamp[userId] = now.valueOf();
    
    if ((auction.highestPriceBeforeClosed < price || !auction.highestBidderBeforeClosed)
        && auction.endTime - now.valueOf() > this.TIME_BEFORE_CLOSED) {
        auction.highestPriceBeforeClosed = price;
        auction.highestBidderBeforeClosed = userId;
    }
}

module.exports = AuctionManager;