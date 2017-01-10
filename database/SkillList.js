var SkillPhase = require('../classes/skills/weapon_skills/SkillPhase');
var SkillPhaseConst = require('../classes/skills/weapon_skills/SkillPhaseConst');

module.exports = {
    "1": {
        "Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "V Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Cross Edge": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Power Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Double Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Power Cross": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.85, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Raging": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Flame Edge": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Dragon Fang": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Sacred Caliber": {
            canAttack: true,
            canHeal: false,
            cooldown: 15,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Sacred Caliber (Monique Style)": {
            canAttack: true,
            canHeal: false,
            cooldown: 15,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Seraph Caliber": {
            canAttack: true,
            canHeal: false,
            cooldown: 30,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    3.25, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Holy Scourge": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Calamity Edge": {
            canAttack: true,
            canHeal: false,
            cooldown: 15,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "White Cross": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Heart Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Slicer": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.75, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Fluffy Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Einzelkampf": {
            canAttack: true,
            canHeal: false,
            cooldown: 30,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.68, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    true,
                    -200, -310,
                    -380, -300,
                    0.65
                )
            ]
        }
    },

    "2": {
        "Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Cleave": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Heavenly Sword": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.3, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Helmet Splitter": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Iaido Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.6, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "100 Demon Slayer": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Slash II": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Secret Blade Camellia": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.5, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Secret Blade Maiyasha": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Unsheathing Technique Destroyer": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    2.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Soul Slicer": {
            canAttack: true,
            canHeal: false,
            cooldown: 20,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    3.6, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Snowflake Duet": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.2, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Illicit Love": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "First Stance": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.6, 4,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Tri-Beast Attack": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        }
    },

    "3": {
        "Single Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Twin Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Triple Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.8, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Chain Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Spread Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Charge Arrow": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Vermilion Cannon": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Delta Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.55, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Purge Impact": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.6, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Cupid's Arrow": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Spinning Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 15,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Heavy Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Minstrel's Song": {
            canAttack: true,
            canHeal: false,
            cooldown: 20,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Spirit Rain": {
            canAttack: true,
            canHeal: false,
            cooldown: 15,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Destiny": {
            canAttack: true,
            canHeal: false,
            cooldown: 30,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    2.16, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Holy Shoot": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.75, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Squall Arrow": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
        "Feather Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9
                )
            ]
        },
    },

    "4": {
        "Spear Jab": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Double Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Full-On Collision": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Double Dragon Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.85, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Cyclone": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Guren Spear": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Pale Moonlight": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Revised Double Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.85, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Raging Dominion Spear": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Holy Style Spear": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Lovely Spear": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.65, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Penetrate": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.6, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Beast Sweeper": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        }
    },

    "5": {
        "Crash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Swing": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Hammerfall": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Force Impact": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.6, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "War Rage": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Fury's Toll": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Power Swing": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.95, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Grand Down": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Dimension": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Dark Inferno": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.0, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Vanishing Dyne": {
            canAttack: true,
            canHeal: false,
            cooldown: 15,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.09, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Earth Impact": {
            canAttack: true,
            canHeal: false,
            cooldown: 15,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Snowman": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.65, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Love Impact": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Charge Stomp": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        },
        "Pad Stamp": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true
                )
            ]
        }
    },

    "6": {
        "Knock": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.3, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 4,
                    true
                )
            ]
        },
        "Wraith of Gaia": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    2.0, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true
                )
            ]
        },
        "Prayer": {
            canAttack: false,
            canHeal: true,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_HEALING,
                    1.5, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6
                )
            ]
        },
        "Deep Fold": {
            canAttack: false,
            canHeal: true,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_HEALING,
                    1.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6
                )
            ]
        },
        "Healing Light": {
            canAttack: false,
            canHeal: true,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_HEALING,
                    0.4, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6
                )
            ]
        },
        "Heavenly Breath": {
            canAttack: false,
            canHeal: true,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_HEALING,
                    0.35, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6
                )
            ]
        },
        "Fairy Mist": {
            canAttack: false,
            canHeal: true,
            cooldown: 15,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_HEALING,
                    0.93, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6
                )
            ]
        },
        "Noah": {
            canAttack: false,
            canHeal: true,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_HEALING,
                    0.5, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6
                )
            ]
        },
        "Current Heal": {
            canAttack: false,
            canHeal: true,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_HEALING,
                    2.0, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6
                )
            ]
        },
        "A Good Child's Reward": {
            canAttack: false,
            canHeal: true,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_HEALING,
                    0.65, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6
                )
            ]
        },
        "Refreshing Love": {
            canAttack: false,
            canHeal: true,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_HEALING,
                    0.35, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6
                )
            ]
        },
        "Fairy Tale": {
            canAttack: false,
            canHeal: true,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_HEALING,
                    1.4, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6
                )
            ]
        },
        "Refreshing Moment": {
            canAttack: false,
            canHeal: true,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_HEALING,
                    0.5, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6
                )
            ]
        }
    },

    "7": {
        "Throwing Knife": {
            canAttack: true,
            canHeal: false,
            cooldown: 2.5,
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
            cooldown: 2.5,
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
            cooldown: 2.5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Dance Formation": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.6, 4,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Shadow Run": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
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
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.5, 6,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Dark Assault": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Hardened Twin Attack": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.5, 1.1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Hayate": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
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
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.7, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Killer Fang": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.9, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Arcade": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Nightmare": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.6, 4,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Desperado": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.14, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Snowy Flash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    1.6, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Triple Sugar": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.67, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Lightning": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.8, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Beast Flash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 3,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true
                )
            ]
        },
        "Aion's Single Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 15,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    3.12, 1,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 10,
                    true,
                    true,
                    -200, -310,
                    -380, -300,
                    1.0
                )
            ]
        }
    },

    "8": {
        "Fire Ball": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    1.1, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                )
            ]
        },
        "Cold Lance": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_COLUMN,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.9, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Stone Claw": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    1.1, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Thunder Arrow": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    1.1, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Voltic Arrow": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SINGLE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    1.2, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Flame Field": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Ice Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Crystal Grave": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Sonic Wind": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ROW,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Holy Cross": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Flare Storm": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Blizzard": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Cracked Earth": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Tornado": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Seraph Ray": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Dark Catastrophe": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.7, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Darkness Blade": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.8, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
        "Eternal Light": {
            canAttack: true,
            canHeal: false,
            cooldown: 20,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_ALL,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    1.6, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    true,
                    -498, -370,
                    -498, -370
                )
            ]
        },
        "Twinkling Star": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    SkillPhaseConst.SKILL_PATTERN_SQUARE,
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    0.65, 1,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13
                )
            ]
        },
    }
};