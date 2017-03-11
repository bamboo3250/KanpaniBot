var SkillPhaseConst = require('./SkillPhaseConst');

function SkillPhase(attackInstances, skillType, damageType, element, targetType, status, animation) {
    this.attackInstances = attackInstances;
    this.skillType = skillType;
    this.damageType = damageType;
    this.element = element;
    this.targetType = targetType;
    // this.state = state;
    // this.frame = frame;
    // this.doesApproach = doesApproach;
    this.status = status;
    this.animation = animation;
    // this.hasAnimation = hasAnimation;
    // this.allyOffsetX = allyOffsetX;
    // this.allyOffsetY = allyOffsetY;
    // this.enemyOffsetX = enemyOffsetX;
    // this.enemyOffsetY = enemyOffsetY;
    // this.opacity = opacity;

    // state = "attack01", frame = 0, doesApproach = false,
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

SkillPhase.prototype.getPatternMask = function(idx) {
    return SKILL_PATTERN_MASKS[this.attackInstances[idx].pattern];
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
        if (targetElement === "earth") return 2.0;
        if (targetElement === "wind") return 0.5;
        return 1.0;
    }
    if (this.element === SkillPhaseConst.ELEMENT_DARK) {
        if (targetElement === "dark") return 0.5;
        if (targetElement === "light") return 2.0;
        return 1.0;
    }
    if (this.element === SkillPhaseConst.ELEMENT_LIGHT) {
        if (targetElement === "dark") return 2.0;
        if (targetElement === "light") return 0.5;
        return 1.0;
    }
    return 1.0;
}

module.exports = SkillPhase;