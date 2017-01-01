var SkillPhase = require('../classes/skills/weapon_skills/SkillPhase');
var SkillPhaseConst = require('../classes/skills/weapon_skills/SkillPhaseConst');

module.exports = {
    "1": {
        "Slash": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "V Slash": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Cross Edge": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Power Slash": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Double Slash": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Power Cross": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.85, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Raging": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Flame Edge": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Dragon Fang": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Sacred Caliber": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Sacred Caliber (Monique Style)": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Seraph Caliber": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Holy Scourge": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Calamity Edge": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "White Cross": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Heart Slash": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Slicer": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.75, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Fluffy Slash": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        }
    },

    "2": {
        "Slash": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Cleave": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Heavenly Sword": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.3, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Helmet Splitter": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Iaido Slash": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.6, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "100 Demon Slayer": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Slash ll": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Secret Blade Camellia": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.5, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Secret Blade Maiyasha": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Unsheathing Technique Destroyer": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    2.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Soul Slicer": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    3.6, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Snowflake Duet": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.2, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Illicit Love": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "First Stance": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.6, 4,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Tri-Beast Attack": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        }
    },

    "3": {
        "Single Shot": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Twin Shot": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Triple Shot": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.8, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Chain Shot": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Spread Shot": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Charge Arrow": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Vermilion Cannon": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Delta Shot": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.55, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Purge Impact": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.6, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Cupid's Arrow": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Spinning Strike": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Heavy Shot": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Minstrel's Song": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Spirit Rain": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Destiny": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Holy Shoot": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.75, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Squall Arrow": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Feather Shot": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
    },

    "4": {
        "Spear Jab": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Double Strike": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Full-On Collision": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Double Dragon Strike": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.85, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Cyclone": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Guren Spear": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Pale Moonlight": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Revised Double Strike": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.85, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Raging Dominion Spear": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Holy Style Spear": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Lovely Spear": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.65, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Penetrate": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.6, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Beast Sweeper": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        }
    },

    "5": {
        "Crash": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Swing": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Hammerfall": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Force Impact": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.6, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "War Rage": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Fury's Toll": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Power Swing": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.95, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Grand Down": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Dimension": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Dark Inferno": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Vanishing Dyne": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.09, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Earth Impact": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Snowman": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.65, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Love Impact": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Charge Stomp": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Pad Stamp": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        }
    },

    "6": {
        "Knock": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.3, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Wraith of Gaia": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    2.0, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Prayer": {
            canAttack: false,
            canHeal: true,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_HEALING,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Deep Fold": {
            canAttack: false,
            canHeal: true,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_HEALING,
                    1.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Healing Light": {
            canAttack: false,
            canHeal: true,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_HEALING,
                    0.4, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Heavenly Breath": {
            canAttack: false,
            canHeal: true,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_HEALING,
                    0.35, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Fairy Mist": {
            canAttack: false,
            canHeal: true,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_HEALING,
                    0.93, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Noah": {
            canAttack: false,
            canHeal: true,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_HEALING,
                    0.5, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Current Heal": {
            canAttack: false,
            canHeal: true,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_HEALING,
                    2.0, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "A Good Child's Reward": {
            canAttack: false,
            canHeal: true,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_HEALING,
                    0.65, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Refreshing Love": {
            canAttack: false,
            canHeal: true,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_HEALING,
                    0.35, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Fairy Tale": {
            canAttack: false,
            canHeal: true,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_HEALING,
                    1.4, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Refreshing Moment": {
            canAttack: false,
            canHeal: true,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_HEALING,
                    0.5, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        }
    },

    "7": {
        "Throwing Knife": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.5, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Shadow Snake Punch": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.1, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Twin Attack": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Dance Formation": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.6, 4,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Shadow Run": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Crouching Tiger Formation": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.5, 6,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Dark Assault": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Hardened Twin Attack": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.5, 1.1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Hayate": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.6, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Divine Punishment": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Killer Fang": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Arcade": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Nightmare": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.6, 4,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Desperado": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.14, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Snowy Flash": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.6, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Triple Sugar": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.67, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Lightning": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Beast Flash": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        }
    },

    "8": {
        "Fire Ball": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    1.1, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Cold Lance": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Stone Claw": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    1.1, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Thunder Arrow": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    1.1, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Voltic Arrow": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    1.2, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Flame Field": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Ice Strike": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Crystal Grave": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Sonic Wind": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Holy Cross": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Flare Storm": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Blizzard": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Cracked Earth": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Tornado": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Seraph Ray": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Dark Catastrophe": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Darkness Blade": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Eternal Light": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.75, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
        "Twinkling Star": {
            canAttack: true,
            canHeal: false,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.65, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3
                )
            ]
        },
    }
};