function SkillPhaseConst() {
    this.SKILL_PATTERN_SINGLE = 0;
    this.SKILL_PATTERN_ROW = 1;
    this.SKILL_PATTERN_COLUMN = 2;
    this.SKILL_PATTERN_SQUARE = 3;
    this.SKILL_PATTERN_ALL = 4;
    this.SKILL_PATTERN_V_SHARP = 5;

    this.TYPE_SHORT_NORMAL_ATTACK = 0;
    this.TYPE_LONG_NORMAL_ATTACK = 1;
    this.TYPE_SPELL_ATTACK = 2;
    this.TYPE_HEALING = 3;

    this.DAMAGE_PHYSICAL = 0;
    this.DAMAGE_MAGICAL = 1;

    this.ELEMENT_NONE = 0;
    this.ELEMENT_FIRE = 1;
    this.ELEMENT_ICE = 2;
    this.ELEMENT_WIND = 3;
    this.ELEMENT_EARTH = 4;
    this.ELEMENT_LIGHT = 5;
    this.ELEMENT_DARK = 6;

    this.TARGET_ANY = 0;
    this.TARGET_SELF = 1;

    this.APPROACH_STAY = 0;
    this.APPROACH_FRONT = 1;
    this.APPROACH_CENTER = 2;
}

module.exports = new SkillPhaseConst();