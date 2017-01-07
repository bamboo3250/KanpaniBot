var SkillPhase = require('../SkillPhase');
var SkillPhaseConst = require('../SkillPhaseConst');

module.exports = {
    name: "Raging",
    canAttack: true,
    canHeal: false,
    phases: [
        new SkillPhase(
            SkillPhaseConst.SKILL_PATTERN_SINGLE,
            SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
            1.7, 1,
            SkillPhaseConst.ELEMENT_NONE,
            SkillPhaseConst.TARGET_ANY,
            "attack01", 3
        )
    ]
};