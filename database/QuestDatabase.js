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

module.exports = new QuestDatabase();