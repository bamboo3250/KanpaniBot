var SkillPhase = require('./SkillPhase');

function CommonWeaponSkill() {
    this.canAttack = true;
    this.canHeal = false;

    this.phases = [
        new SkillPhase(
            SkillPhase.SKILL_PATTERN_SINGLE,
            SkillPhase.TYPE_SHORT_NORMAL_ATTACK,
            1.0,
            1,
            SkillPhase.ELEMENT_NONE,
            SkillPhase.TARGET_ANY
        )
    ];
}

CommonWeaponSkill.prototype.getChristmasBackgrounds = function() {
    
}

module.exports = CommonWeaponSkill;