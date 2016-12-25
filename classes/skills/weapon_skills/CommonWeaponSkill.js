function SkillPhase(pattern, skillType, modifier, attackTimes, element, targetType) {
    this.pattern = pattern;
    this.skillType = skillType;
    this.modifier = modifier;
    this.attackTimes = attackTimes;
    this.element = element;
    this.targetType = targetType;
}

SkillPhase.prototype.SKILL_PATTERN_SINGLE = 0;
SkillPhase.prototype.SKILL_PATTERN_ROW = 1;
SkillPhase.prototype.SKILL_PATTERN_COLUMN = 2;
SkillPhase.prototype.SKILL_PATTERN_SQUARE = 3;
SkillPhase.prototype.SKILL_PATTERN_ALL = 4;
SkillPhase.prototype.SKILL_PATTERN_V_SHARP = 5;

SkillPhase.prototype.SKILL_PATTERN_MASKS = [
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

SkillPhase.prototype.TYPE_SHORT_NORMAL_ATTACK = 0;
SkillPhase.prototype.TYPE_LONG_NORMAL_ATTACK = 1;
SkillPhase.prototype.TYPE_MAGICAL_ATTACK = 2;
SkillPhase.prototype.TYPE_HEALING = 3;

SkillPhase.prototype.ELEMENT_NONE = 0;
SkillPhase.prototype.ELEMENT_FIRE = 1;
SkillPhase.prototype.ELEMENT_ICE = 2;
SkillPhase.prototype.ELEMENT_WIND = 3;
SkillPhase.prototype.ELEMENT_EARTH = 4;
SkillPhase.prototype.ELEMENT_LIGHT = 5;
SkillPhase.prototype.ELEMENT_DARK = 6;

SkillPhase.prototype.TARGET_ANY = 0;
SkillPhase.prototype.TARGET_SELF = 1;

SkillPhase.prototype.canAttack = function() {
    return this.skillType === SkillPhase.TYPE_SHORT_NORMAL_ATTACK
        || this.skillType === SkillPhase.TYPE_LONG_NORMAL_ATTACK
        || this.skillType === SkillPhase.TYPE_MAGICAL_ATTACK;
}

SkillPhase.prototype.canHeal = function() {
    return this.skillType === SkillPhase.TYPE_HEALING;
}

SkillPhase.prototype.isShortAttack = function() {
    return this.skillType === SkillPhase.TYPE_SHORT_NORMAL_ATTACK;
}

SkillPhase.prototype.isSpellAttack = function() {
    return this.skillType === SkillPhase.TYPE_MAGICAL_ATTACK;
}

SkillPhase.prototype.getPatternMask = function() {
    return SkillPhase.SKILL_PATTERN_MASKS[this.skillType];
}

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

module.exports = new CommonWeaponSkill();