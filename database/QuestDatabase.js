var questList = require('./QuestList');

function QuestDatabase() {
    this.questList = questList;
}

QuestDatabase.prototype.getQuestByName = function(name) {
    var lowerCaseName = name.toLowerCase();
    for(var i=0;i<this.questList.length;i++) {
        for(var j=0;j<this.questList[i].commonNames.length;j++) {
            if (this.questList[i].commonNames[j].toLowerCase() === lowerCaseName) return this.questList[i];
        }
    }
    return null;
}

QuestDatabase.prototype.getQuestsForLevel = function(level) {
    var result = [];
    for(var i=0;i<this.questList.length;i++) {
        if (this.questList[i].levelRequired <= level) {
            result.push(this.questList[i]);
        }
    }
    return result;
}

function contains(array, item) {
    for(var i=0;i<array.length;i++) {
        if (array[i].toLowerCase() === item.toLowerCase()) return true;
    }
    return false;
}

QuestDatabase.prototype.getQuestsForItem = function(itemName) {
    var result = [];
    for(var i=0;i<this.questList.length;i++) {
        if (contains(this.questList[i].dropList, itemName)) {
            result.push(this.questList[i].commonNames[0]);
        }
    }
    return result;
}

module.exports = new QuestDatabase();