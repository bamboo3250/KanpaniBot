function SkillDatabase() {
    this.skillDict = {
        "1": {},
        "2": {},
        "3": {},
        "4": {},
        "5": {},
        "6": {},
        "7": {},
        "8": {},
    };
}

var skillDatabase = new SkillDatabase();
skillDatabase.skillDict["1"]["Raging"] = require('../classes/skills/weapon_skills/Fighter/RagingSkill');

SkillDatabase.prototype.getSkill = function(classId, skillName) {
    return this.skillDict["" + classId][skillName];
};


module.exports = skillDatabase;