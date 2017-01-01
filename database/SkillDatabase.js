var skillList = require('./SkillList');

function SkillDatabase() {
    this.skillDict = skillList;
}

SkillDatabase.prototype.getSkill = function(classId, skillName) {
    return this.skillDict["" + classId][skillName];
};

module.exports = new SkillDatabase();