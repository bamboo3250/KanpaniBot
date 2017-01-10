var SkillPhaseConst = require('./SkillPhaseConst');

function SkillPhase(pattern, skillType, modifier, attackTimes, damageType, element, targetType, state = "attack01", frame = 0, doesApproach = false, hasAnimation = false, allyOffsetX = 0, allyOffsetY = 0, enemyOffsetX = 0, enemyOffsetY = 0, opacity = 1.0) {
    this.pattern = pattern;
    this.skillType = skillType;
    this.modifier = modifier;
    this.attackTimes = attackTimes;
    this.damageType = damageType;
    this.element = element;
    this.targetType = targetType;
    this.state = state;
    this.frame = frame;
    this.doesApproach = doesApproach;
    this.hasAnimation = hasAnimation;
    this.allyOffsetX = allyOffsetX;
    this.allyOffsetY = allyOffsetY;
    this.enemyOffsetX = enemyOffsetX;
    this.enemyOffsetY = enemyOffsetY;
    this.opacity = opacity;
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
        || this.skillType === SkillPhaseConst.TYPE_SPELL_ATTACK;
}

SkillPhase.prototype.canHeal = function() {
    return this.skillType === SkillPhaseConst.TYPE_HEALING;
}

SkillPhase.prototype.isShortAttack = function() {
    return this.skillType === SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK;
}

SkillPhase.prototype.isSpellAttack = function() {
    return this.skillType === SkillPhaseConst.TYPE_SPELL_ATTACK;
}

SkillPhase.prototype.usePhysicalDamage = function() {
    return this.damageType === SkillPhaseConst.DAMAGE_PHYSICAL;
}

SkillPhase.prototype.useMagicalDamage = function() {
    return this.damageType === SkillPhaseConst.DAMAGE_MAGICAL;
}

SkillPhase.prototype.getPatternMask = function() {
    return SKILL_PATTERN_MASKS[this.pattern];
}

SkillPhase.prototype.isSelfTarget = function() {
    return this.targetType === SkillPhaseConst.TARGET_SELF;
}

SkillPhase.prototype.getElementFactor = function(targetElement) {
    if (this.element === SkillPhaseConst.ELEMENT_FIRE) {
        if (targetElement === "fire") return 0.5;
        if (targetElement === "ice") return 2.0;
        return 1.0;
    }
    if (this.element === SkillPhaseConst.ELEMENT_ICE) {
        if (targetElement === "fire") return 2.0;
        if (targetElement === "ice") return 0.5;
        return 1.0;
    }
    if (this.element === SkillPhaseConst.ELEMENT_EARTH) {
        if (targetElement === "earth") return 0.5;
        if (targetElement === "wind") return 2.0;
        return 1.0;
    }
    if (this.element === SkillPhaseConst.ELEMENT_WIND) {
        if (targetElement === "earth") return 0.5;
        if (targetElement === "wind") return 2.0;
        return 1.0;
    }
    return 1.0;
}

module.exports = SkillPhase;