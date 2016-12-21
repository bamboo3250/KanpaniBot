var itemList = require('./ItemInfoList');

function ItemDatabase() {
    this.itemList = itemList;
}

ItemDatabase.prototype.getItemInfoByName = function(name) {
    var lowerCaseName = name.toLowerCase();
    for(var i=0;i<this.itemList.length;i++) {
        if (this.itemList[i].itemName.toLowerCase() === lowerCaseName) return this.itemList[i];
    }
    return null;
}

ItemDatabase.prototype.getItemInfoById = function(itemId) {
    for(var i=0;i<this.itemList.length;i++) {
        if (this.itemList[i]._id === itemId) return this.itemList[i];
    }
    return null;
}

ItemDatabase.prototype.getItemInfosByNames = function(nameList) {
    var result = [];
    for(var i=0;i<nameList.length;i++) {
        var item = this.getItemInfoByName(nameList[i]);
        if (item) {
            result.push(item);
        }
    }
    return result;
}

module.exports = new ItemDatabase();