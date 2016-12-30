var CommonSkill = require('../CommonWeaponSkill');
var SkillPhase = require('../SkillPhase');
var SkillPhaseConst = require('../SkillPhaseConst');

var raging = new CommonSkill();

raging.name = "Raging";
raging.canAttack = true;
raging.canHeal = false;

raging.phases = [
    new SkillPhase(
        SkillPhaseConst.SKILL_PATTERN_SINGLE,
        SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
        1.7, 1,
        SkillPhaseConst.ELEMENT_NONE,
        SkillPhaseConst.TARGET_ANY,
        "attack01", 3
    )
];

module.exports = raging;