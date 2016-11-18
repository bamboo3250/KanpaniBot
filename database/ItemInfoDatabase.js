var itemList = require('./ItemInfoList');

function ItemDatabase() {
    this.itemList = itemList;
}

ItemDatabase.prototype.getItemInfoByName = function(name) {
    for(var i=0;i<this.itemList.length;i++) {
        if (this.itemList[i].itemName === name)) return this.itemList[i];
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