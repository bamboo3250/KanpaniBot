var skillList = require('./SkillList');

function SkillDatabase() {
    this.skillDict = skillList;
    for(classKey in this.skillDict) {
        for(key in this.skillDict[classKey]) {
            this.skillDict[classKey][key].name = key;    
        }
    }
}

SkillDatabase.prototype.getSkill = function(classId, skillName) {
    return this.skillDict["" + classId][skillName];
};

module.exports = new SkillDatabase();