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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {
                        "Patk Down": 30
                    }, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {
                        "Stun": 30
                    }, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
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
                    {
                        "Stun": 30
                    }, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
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
                    {
                        "Stun": 20
                    }, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {
                        "Stun": 30
                    }, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {
                        "Charm": 15
                    }, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
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
                    {}, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
                    }
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
                    {
                        "Pdef Down": 20,
                        "Mdef Down": 20,
                    }, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
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
                    {
                        "Charm": 25,
                    }, {
                        state: "attack01", 
                        frame: 3,
                        approachType: SkillPhaseConst.APPROACH_FRONT
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
                    {
                        "Darkness": 10
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
                        attack: {
                            ally    : { x: -380, y: -300},
                            enemy   : { x: -380, y: -300},
                            opacity : 0.65
                        }
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 3,
                        attack: {
                            ally    : { x: -380, y: -870},
                            enemy   : { x: -380, y: -870},
                            opacity : 1.0
                        }
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
                    }
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
                    {
                        "Paralyze": 30,
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
                    }
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
                    {
                        "Paralyze": 30,
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
                    }
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
                    {
                        "Pdef Down": 20
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
                    }
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
                    {
                        "Paralyze": 30,
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
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
                    {
                        "Paralyze": 30,
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
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
                    {
                        "Paralyze": 30,
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
                    }
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
                    {
                        "Charm": 30
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
                    }
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
                    {
                        "Pdef Down": 20,
                        "Mdef Down": 20
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
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
                    {
                        "Charm": 15
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3,
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
                    {
                        "Curse": 60
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack06", 
                        frame: 3,
                        attack: {
                            ally    : { x: -880, y: -550},
                            enemy   : { x: -780, y: -650},
                            opacity : 1.0
                        }
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {
                        "Matk Down": 30
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {
                        "Charm": 15
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {
                        "Patk Down": 10
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
                    }
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
                    {
                        "Pdef Down": 20,
                        "Mdef Down": 20
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
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
                    {
                        "Charm": 20
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack08", 
                        frame: 9,
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
                    {
                        "Stun": 10
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack07", 
                        frame: 9,
                        attack: {
                            ally    : { x: -500, y: -170},
                            enemy   : { x: -200, y: -170},
                            opacity : 1.0
                        }
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack07", 
                        frame: 9,
                        attack: {
                            ally    : { x: -1450, y: -700},
                            enemy   : { x: -1450, y: -700},
                            opacity : 1.0
                        }
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {
                        "Charm": 15
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {
                        "Pdef Down": 20,
                        "Mdef Down": 20
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
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
                    {
                        "Mdef Down": 10
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 5,
                        attack: {
                            ally    : { x: -1380, y: -540},
                            enemy   : { x: -1730, y: -940},
                            opacity : 1.0
                        }
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {
                        "Paralyze": 30,
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {
                        "Charm": 20
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
                    }
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
                    {
                        "Pdef Down": 15,
                        "Mdef Down": 15
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
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
                    {
                        "Charm": 20
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 0
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3,
                        attack: {
                            ally    : { x: -0, y: -550},
                            enemy   : { x: -0, y: -550},
                            opacity : 0.9
                        }
                    }
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
                    {
                        "Stun": 10
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3,
                        attack: {
                            ally    : { x: -420, y: -50},
                            enemy   : { x: -120, y: -50},
                            opacity : 0.7
                        }
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 4
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack03", 
                        frame: 3
                    }
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
                    {
                        "Cleanse": 100
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
                    }
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
                    {
                        "Cleanse": 100
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
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
                    {
                        "Cleanse": 100
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
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
                    {
                        "Cleanse": 100
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
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
                    {
                        "Cleanse": 100
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
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
                    {
                        "Cleanse": 100
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
                    }
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
                    {
                        "Cleanse": 100
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
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
                    {
                        "Cleanse": 100
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
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
                    {
                        "Cleanse": 100
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
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
                    {
                        "Cleanse": 100
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6,
                        attack: {
                            ally    : { x: -950, y: -750},
                            enemy   : { x: -600, y: -700},
                            opacity : 1.0
                        }
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6,
                        attack: {
                            ally    : { x: -550, y: -100},
                            enemy   : { x: -250, y: -300},
                            opacity : 1.0
                        }
                    }
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
                    {
                        "Cleanse": 100,
                        "Resurrection": 100
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack02", 
                        frame: 6,
                        attack: {
                            ally    : { x: -680, y: -680},
                            enemy   : { x: -680, y: -680},
                            opacity : 1.0
                        }
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 3
                    }
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
                    {
                        "Poison": 50
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 3
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 3
                    }
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
                    {
                        "Pdef Down": 10
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
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
                    {
                        "Poison": 50
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
                    }
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
                    SkillPhaseConst.TYPE_SHORT_NORMAL_ATTACK,
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_WIND,
                    SkillPhaseConst.TARGET_ANY,
                    {
                        "Mdef Down": 30
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 3
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
                    {
                        "Pdef Down": 50,
                        "Patk Down": 50
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
                    }
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
                    {
                        "Poison": 15
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
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
                    {
                        "Poison": 15
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
                    }
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
                    {
                        "Charm": 15
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
                    }
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
                    {
                        "Pdef Down": 20,
                        "Mdef Down": 20
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
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
                    SkillPhaseConst.DAMAGE_PHYSICAL,
                    SkillPhaseConst.ELEMENT_NONE,
                    SkillPhaseConst.TARGET_ANY,
                    {
                        "Charm": 15,
                        "Darkness": 15
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack01", 
                        frame: 3
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
                    {
                        "Poison": 75,
                        "Paralyze": 20,
                    }, {
                        approachType: SkillPhaseConst.APPROACH_FRONT,
                        state: "attack05", 
                        frame: 10,
                        attack: {
                            ally    : { x: -360, y: -300},
                            enemy   : { x: -360, y: -300},
                            opacity : 1.0
                        }
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {
                        "Darkness": 10
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13,
                        attack: {
                            ally    : { x: -850, y: -370},
                            enemy   : { x: -500, y: -370},
                            opacity : 1.0
                        }
                    }
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
                    }
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
                    {
                        "Charm": 10
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
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
                    {
                        "Charm": 10
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13
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
                    {}, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13,
                        attack: {
                            ally    : { x: -330, y: -490},
                            enemy   : { x: -330, y: -490},
                            opacity : 1.0
                        }
                    }
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
                    {
                        "Charm": 10
                    }, {
                        approachType: SkillPhaseConst.APPROACH_STAY,
                        state: "attack01", 
                        frame: 13,
                        attack: {
                            ally    : { x: -680, y: -1240},
                            enemy   : { x: -680, y: -1240},
                            opacity : 1.0
                        }
                    }
                )
            ]
        }
    }
};