var SkillPhaseConst = require('./SkillPhaseConst');

function SkillPhase(pattern, skillType, modifier, attackTimes, element, targetType) {
    this.pattern = pattern;
    this.skillType = skillType;
    this.modifier = modifier;
    this.attackTimes = attackTimes;
    this.element = element;
    this.targetType = targetType;
}

const SKILL_PATTERN_MASKS = [
    [
        [[true, false, false],[false, false, false]],   // SINGLE
        [[false, true, false],[false, false, false]],
        [[false, false, true],[false, false, false]],
        [[false, false, false],[true, false, false]],
        [[false, false, false],[false, true, false]],
        [[false, false, false],[false, false, true]]
    ],[
        [[true, true, true],[false, false, false]], // ROW
        [[false, false, false],[true, true, true]]
    ],[
        [[true, false, false],[true, false, false]],    // COLUMN
        [[false, true, false],[false, true, false]],
        [[false, false, true],[false, false, true]]
    ],[
        [[true, true, false],[true, true, false]], // SQUARED
        [[false, true, true],[false, true, true]]
    ],[
        [[true, true, true],[true, true, true]] // ALL
    ],[
        [[true, false, true],[false, true, false]], // V-SHARP
        [[false, true, false],[true, false, true]]
    ]
];

SkillPhase.prototype.canAttack = function() {
    return this.skillType === SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK
        || this.skillType === SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK
        || this.skillType === SkillPhaseConst.TYPE_MAGICAL_ATTACK;
}

SkillPhase.prototype.canHeal = function() {
    return this.skillType === SkillPhaseConst.TYPE_HEALING;
}

SkillPhase.prototype.isShortAttack = function() {
    return this.skillType === SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK;
}

SkillPhase.prototype.isSpellAttack = function() {
    return this.skillType === SkillPhaseConst.TYPE_MAGICAL_ATTACK;
}

SkillPhase.prototype.getPatternMask = function() {
    return SKILL_PATTERN_MASKS[this.pattern];
}

SkillPhase.prototype.isSelfTarget = function() {
    return this.targetType === SkillPhaseConst.TARGET_SELF;
}

module.exports = SkillPhase;