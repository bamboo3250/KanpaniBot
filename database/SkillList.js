var SkillPhase = require('../classes/skills/weapon_skills/SkillPhase');
var SkillPhaseConst = require('../classes/skills/weapon_skills/SkillPhaseConst');

module.exports = {
    "1": {
        "Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "V Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Cross Edge": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Power Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Double Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Power Cross": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.85
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.85
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Raging": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Patk Down": 30
                    }
                )
            ]
        },
        "Flame Edge": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Frost Edge": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Flame V Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Dragon Fang": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Sacred Caliber": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Stun": 30
                    }
                )
            ]
        },
        "Sacred Caliber (Monique Style)": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Stun": 30
                    }
                )
            ]
        },
        "Seraph Caliber": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 3.25
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Stun": 20
                    }
                )
            ]
        },
        "Holy Scourge": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Calamity Edge": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Stun": 30
                    }
                )
            ]
        },
        "White Cross": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Heart Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Charm": 15
                    }
                )
            ]
        },
        "Slicer": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.75
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Fluffy Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Pdef Down": 20,
                        "Mdef Down": 20,
                    }
                )
            ]
        },
        "Nappe Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Charm": 25,
                    }
                )
            ]
        },
        "Einzelkampf": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 1.68
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 1.68
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Darkness": 10
                    },
                    true,
                    -200, -310,
                    -380, -300,
                    0.65
                )
            ]
        },
        "Novalis": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 4.63
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    false,
                    {},
                    true,
                    -380, -870,
                    -380, -870,
                    1.0
                )
            ]
        }
    },

    "2": {
        "Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Cleave": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Heavenly Sword": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.3
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Helmet Splitter": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.5
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Paralyze": 30,
                    }
                )
            ]
        },
        "Iaido Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.6
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "100 Demon Slayer": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Paralyze": 30,
                    }
                )
            ]
        },
        "Slash II": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Secret Blade Camellia": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.5
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.5
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Pdef Down": 20
                    }
                )
            ]
        },
        "Secret Blade Maiyasha": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Unsheathing Technique Destroyer": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 2.0
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Paralyze": 30,
                    }
                )
            ]
        },
        "Flame Slash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Paralyze": 30,
                    }
                )
            ]
        },
        "Ice Dancing Blade": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Paralyze": 30,
                    }
                )
            ]
        },
        "Soul Slicer": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 3.6
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Snowflake Duet": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.2
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.2
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Illicit Love": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.5
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Charm": 30
                    }
                )
            ]
        },
        "First Stance": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Tri-Beast Attack": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Pdef Down": 20,
                        "Mdef Down": 20
                    }
                )
            ]
        },
        "Thousand-Night Powder Sword": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.75
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.75
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.75
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Charm": 15
                    }
                )
            ]
        },
        "Soul Eater": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 3.15
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack06", 3,
                    true, {
                        "Curse": 20
                    },
                    true,
                    -600, -610,
                    -780, -650,
                    1.0
                )
            ]
        }
    },

    "3": {
        "Single Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Twin Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Triple Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Chain Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.5
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false, {
                        "Matk Down": 30
                    }
                )
            ]
        },
        "Spread Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Charge Arrow": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.7
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Vermilion Cannon": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.7
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Delta Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.55
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Purge Impact": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.6
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.6
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Ice Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.5
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Flame Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.95
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Cupid's Arrow": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false, {
                        "Charm": 15
                    }
                )
            ]
        },
        "Spinning Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.8
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Heavy Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Minstrel's Song": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false, {
                        "Patk Down": 10
                    }
                )
            ]
        },
        "Spirit Rain": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Destiny": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 2.16
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Holy Shoot": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.75
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Squall Arrow": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false,
                    {}
                )
            ]
        },
        "Feather Shot": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false, {
                        "Pdef Down": 20,
                        "Mdef Down": 20
                    }
                )
            ]
        },
        "Gift Snipe": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.77
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.77
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack08", 9,
                    false, {
                        "Charm": 20
                    }
                )
            ]
        },
        "Nasu-style Secret Move - Hinano": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 1.77
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack07", 9,
                    false, {
                        "Stun": 10
                    },
                    true,
                    -200, -170,
                    -200, -170
                )
            ]
        },
        "Elf's Squall": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.37
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.37
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.37
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.37
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack07", 9,
                    false, {},
                    true,
                    -1450, -700,
                    -1450, -700
                )
            ]
        }
    },

    "4": {
        "Spear Jab": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Double Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Full-On Collision": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Double Dragon Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.85
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Cyclone": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Guren Spear": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Pale Moonlight": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Revised Double Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.85
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.85
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Raging Dominion Spear": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Flame Piercing Collision": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.95
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Ice Collision": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.95
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Holy Style Spear": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Lovely Spear": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.65
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.65
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true, {
                        "Charm": 15
                    }
                )
            ]
        },
        "Penetrate": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.6
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.6
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Beast Sweeper": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true, {
                        "Pdef Down": 20,
                        "Mdef Down": 20
                    }
                )
            ]
        },
        "Fimbulvetr": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 1.87
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 5,
                    true, {
                        "Mdef Down": 10
                    },
                    true,
                    -1080, -540,
                    -1730, -940
                )
            ]
        }
    },

    "5": {
        "Crash": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Swing": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Hammerfall": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Force Impact": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.6
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "War Rage": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Fury's Toll": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Power Swing": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.95
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.95
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Grand Down": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Dimension": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true, {
                        "Paralyze": 30,
                    }
                )
            ]
        },
        "Flamefall": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.6
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true, {}
                )
            ]
        },
        "Ice Age": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true, {}
                )
            ]
        },
        "Dark Inferno": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.0
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Vanishing Dyne": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.09
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.09
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.09
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Earth Impact": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Snowman": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.65
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.65
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Love Impact": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.5
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true, {
                        "Charm": 20
                    }
                )
            ]
        },
        "Charge Stomp": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true,
                    {}
                )
            ]
        },
        "Pad Stamp": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true, {
                        "Pdef Down": 15,
                        "Mdef Down": 15
                    }
                )
            ]
        },
        "Fouet Impact": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 0,
                    true, {
                        "Charm": 20
                    }
                )
            ]
        },
        "Aos Wolf": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 5.2
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {},
                    true,
                    0, -550,
                    0, -550,
                    0.9
                )
            ]
        },
        "Gorgeous Pound": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 1.83
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true, {
                        "Stun": 10
                    },
                    true,
                    -120, -50,
                    -120, -50,
                    0.7
                )
            ]
        }
    },

    "6": {
        "Knock": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.3
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 4,
                    true,
                    {}
                )
            ]
        },
        "Wraith of Gaia": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 2.0
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack03", 3,
                    true,
                    {}
                )
            ]
        },
        "Prayer": {
            canAttack: false,
            canHeal: true,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.5
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {
                        "Cleanse": 100
                    }
                )
            ]
        },
        "Deep Fold": {
            canAttack: false,
            canHeal: true,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.8
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false,
                    {}
                )
            ]
        },
        "Healing Light": {
            canAttack: false,
            canHeal: true,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.4
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {
                        "Cleanse": 100
                    }
                )
            ]
        },
        "Heavenly Breath": {
            canAttack: false,
            canHeal: true,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.35
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {
                        "Cleanse": 100
                    }
                )
            ]
        },
        "Fairy Mist": {
            canAttack: false,
            canHeal: true,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.93
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {
                        "Cleanse": 100
                    }
                )
            ]
        },
        "Noah": {
            canAttack: false,
            canHeal: true,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.5
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {
                        "Cleanse": 100
                    }
                )
            ]
        },
        "Current Heal": {
            canAttack: false,
            canHeal: true,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 2.0
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {
                        "Cleanse": 100
                    }
                )
            ]
        },
        "A Good Child's Reward": {
            canAttack: false,
            canHeal: true,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.65
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false,
                    {}
                )
            ]
        },
        "Refreshing Love": {
            canAttack: false,
            canHeal: true,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.35
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {
                        "Cleanse": 100
                    }
                )
            ]
        },
        "Fairy Tale": {
            canAttack: false,
            canHeal: true,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.4
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {
                        "Cleanse": 100
                    }
                )
            ]
        },
        "Refreshing Moment": {
            canAttack: false,
            canHeal: true,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.5
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {
                        "Cleanse": 100
                    }
                )
            ]
        },
        "Cake de Heal": {
            canAttack: false,
            canHeal: true,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.5
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {
                        "Cleanse": 100
                    }
                )
            ]
        },
        "Holy Poetry": {
            canAttack: true,
            canHeal: true,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 1.4
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {},
                    true,
                    -600, -700,
                    -600, -700
                ),
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.68
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {},
                    true,
                    -250, -100,
                    -250, -300
                ), 
            ]
        },
        "Heavenly Technique - Srishti": {
            canAttack: false,
            canHeal: true,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 2.4
                        }
                    ],
                    SkillPhaseConst.TYPE_HEALING,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack02", 6,
                    false, {
                        "Cleanse": 100,
                        "Resurrection": 100
                    },
                    true,
                    -680, -680,
                    -680, -680
                )
            ]
        }
    },

    "7": {
        "Throwing Knife": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.5
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.5
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.5
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    false,
                    {}
                )
            ]
        },
        "Shadow Snake Punch": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.1
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    false, {
                        "Poison": 50
                    }
                )
            ]
        },
        "Twin Attack": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Dance Formation": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Shadow Run": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.5
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    false,
                    {}
                )
            ]
        },
        "Crouching Tiger Formation": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.5
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.5
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.5
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.5
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.5
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.5
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Pdef Down": 10
                    }
                )
            ]
        },
        "Dark Assault": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Poison": 50
                    }
                )
            ]
        },
        "Hardened Twin Attack": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.1
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.1
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Hayate": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.6
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    false, {
                        "Mdef Down": 30
                    }
                )
            ]
        },
        "Divine Punishment": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Pdef Down": 50,
                        "Patk Down": 50
                    }
                )
            ]
        },
        "Killer Fang": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.9
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Flame Dance Formation": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.63
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.63
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.63
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.63
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Icy Wind": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.63
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.63
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.63
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.63
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Arcade": {
            canAttack: true,
            canHeal: false,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Poison": 15
                    }
                )
            ]
        },
        "Nightmare": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.6
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Poison": 15
                    }
                )
            ]
        },
        "Desperado": {
            canAttack: true,
            canHeal: false,
            cooldown: 8,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 1.14
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Snowy Flash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.6
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Triple Sugar": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.67
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Charm": 15
                    }
                )
            ]
        },
        "Lightning": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.8
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true,
                    {}
                )
            ]
        },
        "Beast Flash": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Pdef Down": 20,
                        "Mdef Down": 20
                    }
                )
            ]
        },
        "Sprinkle Sugar": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.7
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    0.7, 2,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 3,
                    true, {
                        "Charm": 15,
                        "Darkness": 15
                    }
                )
            ]
        },
        "Aion's Single Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 3.12
                        }
                    ],
                    SkillPhaseConst.TYPE_LONG_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack05", 10,
                    true, {
                        "Poison": 75,
                        "Paralyze": 20,
                    },
                    true,
                    -360, -300,
                    -360, -300,
                    1.0
                )
            ]
        }
    },

    "8": {
        "Fire Ball": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.1
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Cold Lance": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_COLUMN,
                            modifier: 0.9
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Stone Claw": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.1
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Thunder Arrow": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.1
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Voltic Arrow": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 1.2
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Flame Field": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Ice Strike": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Crystal Grave": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Sonic Wind": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Holy Cross": {
            canAttack: true,
            canHeal: false,
            cooldown: 3,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Flare Storm": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Blizzard": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Cracked Earth": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_EARTH,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Tornado": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Seraph Ray": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Dark Catastrophe": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Flare Ball": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_FIRE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Frostbite": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ROW,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_ICE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Darkness Blade": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.8
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Eternal Light": {
            canAttack: true,
            canHeal: false,
            cooldown: 10,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 1.6
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false, {
                        "Darkness": 10
                    },
                    true,
                    -498, -370,
                    -498, -370
                )
            ]
        },
        "Twinkling Star": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.65
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_LIGHT,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false,
                    {}
                )
            ]
        },
        "Honey Trap": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.7
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false, {
                        "Charm": 10
                    }
                )
            ]
        },
        "Theobroma": {
            canAttack: true,
            canHeal: false,
            cooldown: 5,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.55
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.55
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_SQUARE,
                            modifier: 0.55
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false, {
                        "Charm": 10
                    }
                )
            ]
        },
        "Anima": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 4.98
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_DARK,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false, {},
                    true,
                    -330, -490,
                    -330, -490
                )
            ],
            effect: {
                "Pre-emption": true
            }
        },
        "Doom": {
            canAttack: true,
            canHeal: false,
            cooldown: 12,
            phases: [
                new SkillPhase(
                    [
                        {
                            pattern: SkillPhaseConst.SKILL_PATTERN_SINGLE,
                            modifier: 4.78
                        },{
                            pattern: SkillPhaseConst.SKILL_PATTERN_ALL,
                            modifier: 0.73
                        }
                    ],
                    SkillPhaseConst.TYPE_SPELL_ATTACK,
                    SkillPhaseConst.DAMAGE_MAGICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    "attack01", 13,
                    false, {
                        "Charm": 10
                    },
                    true,
                    -680, -1240,
                    -680, -1240
                )
            ]
        }
    }
};