var Employee = function(employeeInfo, playerId = null) {
    this.DOMAIN = "http://img4.kanpani.jp";

    this.playerId = playerId;
    this._no = employeeInfo._no;
    this.characterId = employeeInfo._id;
    this.fullName = employeeInfo.fullName;
    this.shortName = employeeInfo.commonNames[0];
    this.japaneseName = employeeInfo.japaneseName;
    this.cwId = employeeInfo.cwId;
    this.baseStats = employeeInfo.baseStats;
    this.maxStats0 = employeeInfo.maxStats0;
    this.maxStats1 = employeeInfo.maxStats1;
    this.maxStats2 = employeeInfo.maxStats2;

    this.promotion = 0;
    this.exp = 0;
    this.levelCached = 1
    this.weapon = null;
    this.armor = null;
    this.accessory = null;
    this.element = "";
    this.position = "front";

    this.currentHP = 0;
    this.respawnTime = null;
    this.cooldownEndTime = 0;
    this.classSkillCooldownEndTime = 0;
    this.didQuit = false;

    this.isTrainer = false;
    this.status = {
        "Stun": null,
        "Paralyze": null,
        "Poison": null,
        "Curse": null,
        "Encourage": null,
        "Focus": null,
        "Sneak": null,
        "Resurrected": null,
        "Darkness": null,
        "Patk Down": null,
        "Pdef Down": null,
        "Matk Down": null,
        "Mdef Down": null,
        "Charm": null,
    //     "patkup": null,
    //     "matkup": null,
    //     "pdefup": null,
    //     "mdefup": null,
    //     "frozen": null,
    };
}

Employee.prototype.getClassId = function() {
    return parseInt(this.characterId.substring(2,3));
}

Employee.prototype.getClass = function() {
    var classValue = this.getClassId();
    if (classValue === 1) return "Fighter";
    if (classValue === 2) return "Ronin";
    if (classValue === 3) return "Archer";
    if (classValue === 4) return "Soldier";
    if (classValue === 5) return "Warrior";
    if (classValue === 6) return "Cleric";
    if (classValue === 7) return "Rogue";
    return "Magician";
}

Employee.prototype.getBaseRarity = function() {
    return parseInt(this.characterId.substring(3,4));
}

Employee.prototype.getRarity = function() {
    var rarity = 1;

    if (this.promotion == 0) {
        if (this.levelCached < 10) {
            rarity = 1;
        } else if (this.levelCached < 20) {
            rarity = 2;
        } else if (this.levelCached < 30) {
            rarity = 3;
        } else if (this.levelCached < 50) {
            rarity = 4;
        } else if (this.levelCached < 70) {
            rarity = 5;
        } else if (this.levelCached < 90) {
            rarity = 6;
        } else {
            if (this.getBaseRarity() == 5) {
                rarity = 7;
            } else {
                rarity = 6;
            }
        }    
    } else {
        if (this.getBaseRarity() == 5) {
            rarity = 7;
        } else {
            rarity = 6;
        }
    }
    
    return Math.max(this.getBaseRarity(), rarity);
}

Employee.prototype.isEx = function() {
    return parseInt(this.characterId.substring(4,5)) == 9;
}

var expForLevel = [
    0, 40, 100, 170, 250, 370, 530, 740, 1030, 1390, 
    1810, 2300, 2830, 3420, 4090, 4830, 5660, 6570, 7580, 8760, 
    10360, 12250, 14320, 16780, 19730, 23290, 27640, 32360, 37470, 43000, 
    49800, 58200, 67400, 81800, 97600, 115000, 133800, 154300, 176000, 199400, 
    224500, 251200, 280000, 312000, 344800, 381000, 420000, 460000, 504200, 551340, 
    602100, 656900, 715000, 777000, 845300, 915500, 992000, 1074000, 1162800, 1256200, 
    1356700, 1464600, 1580600, 1703181, 1835100, 1979400, 2127000, 2289000, 2461300, 2646190, 
    2840000, 3050000, 3280000, 3520000, 3780000, 4050000, 4380000, 4700000, 5010000, 5370000, 
    5760000, 6200000, 6620000, 7090000, 7600000, 8140000, 8720000, 9340000, 10000000, 10707880, 
    11460000, 12270000, 13140000, 14060000, 15050000, 16110000, 17240000, 18450000, 19739650
];
var expForLevel1 = [
    0, 260, 920, 2600, 4900, 11000, 23400, 55400, 100000, 150000,
    210000, 290000, 410000, 580000, 810000, 1140000, 1590000, 2220000, 3110000, 4340000, 
    4680000, 5390000, 6090000, 6790000, 7790000, 8790000, 9790000, 10790000, 11790000, 14787420
];
var expForLevel2 = [
    0, 500, 2000, 7500, 18000, 37000, 71000, 120000, 210000, 330000,
    470000, 680000, 960000, 1320000, 1760000, 2300000, 2980000, 3780000, 4760000, 5900000, 
    7250000, 8820000, 10600000, 12720000, 15110000, 17830000, 20910000, 24360000, 28250000, 32585968
];

Employee.prototype.getMaxLevel = function() {
    if (this.promotion == 0) {
        return (this.getBaseRarity() < 5? 90 : 99);
    } else if (this.promotion == 1) {
        return expForLevel1.length;
    } else if (this.promotion == 2) {
        return expForLevel2.length;
    }
    return 0;
}

Employee.prototype.getMaxExp = function() {
    if (this.promotion == 0) {
        return expForLevel[this.getMaxLevel()-1];
    } else if (this.promotion == 1) {
        return expForLevel1[this.getMaxLevel()-1];
    } else if (this.promotion == 2) {
        return expForLevel2[this.getMaxLevel()-1];
    }
    return 999999999
}

Employee.prototype.setExp = function(expToSet) {
    var maxLevel = this.getMaxLevel();
    var maxExp = this.getMaxExp();

    this.exp = Math.min(expToSet, maxExp);
    this.levelCached = maxLevel;
    for(var i=0;i<maxLevel;i++) {
        if (this.promotion == 0) {
            if (this.exp < expForLevel[i]) {
                this.levelCached = i;
                break;
            }    
        } else if (this.promotion == 1) {
            if (this.exp < expForLevel1[i]) {
                this.levelCached = i;
                break;
            }    
        } else if (this.promotion == 2) {
            if (this.exp < expForLevel2[i]) {
                this.levelCached = i;
                break;
            }    
        }
    }
}

Employee.prototype.addExp = function(expToAdd) {
    this.setExp(this.exp + expToAdd);
}

Employee.prototype.getExpToNextLevel = function() {
    var maxLevel = this.getMaxLevel();
    for(var i=0;i<maxLevel;i++) {
        if (this.promotion == 0) {
            if (this.exp < expForLevel[i]) return expForLevel[i] - this.exp;
        } else if (this.promotion == 1) {
            if (this.exp < expForLevel1[i]) return expForLevel1[i] - this.exp;
        } else if (this.promotion == 2) {
            if (this.exp < expForLevel1[i]) return expForLevel2[i] - this.exp;
        }
    }
    return 0;
}

Employee.prototype.getVIT = function() {
    var maxLevel = this.getMaxLevel();
    var baseStats = 0, maxStats = 0;
    if (this.promotion == 0) {
        baseStats = this.baseStats._vit;
        maxStats = this.maxStats0._vit;
    } else if (this.promotion == 1) {
        baseStats = Math.ceil(this.maxStats0._vit / 2);
        maxStats = this.maxStats1._vit;
    } else if (this.promotion == 2) {
        baseStats = Math.ceil(this.maxStats1._vit / 2);
        maxStats = this.maxStats2._vit;
    }
    var slope = (maxStats - baseStats) / (maxLevel - 1);
    return Math.ceil(baseStats + (this.levelCached - 1)*slope);
}

Employee.prototype.getSTR = function() {
    var maxLevel = this.getMaxLevel();
    var baseStats = 0, maxStats = 0;
    if (this.promotion == 0) {
        baseStats = this.baseStats._str;
        maxStats = this.maxStats0._str;
    } else if (this.promotion == 1) {
        baseStats = Math.ceil(this.maxStats0._str / 2);
        maxStats = this.maxStats1._str;
    } else if (this.promotion == 2) {
        baseStats = Math.ceil(this.maxStats1._str / 2);
        maxStats = this.maxStats2._str;
    }
    var slope = (maxStats - baseStats) / (maxLevel - 1);
    return Math.ceil(baseStats + (this.levelCached - 1)*slope);
}

Employee.prototype.getINT = function() {
    var maxLevel = this.getMaxLevel();
    var baseStats = 0, maxStats = 0;
    if (this.promotion == 0) {
        baseStats = this.baseStats._int;
        maxStats = this.maxStats0._int;
    } else if (this.promotion == 1) {
        baseStats = Math.ceil(this.maxStats0._int / 2);
        maxStats = this.maxStats1._int;
    } else if (this.promotion == 2) {
        baseStats = Math.ceil(this.maxStats1._int / 2);
        maxStats = this.maxStats2._int;
    }
    var slope = (maxStats - baseStats) / (maxLevel - 1);
    return Math.ceil(baseStats + (this.levelCached - 1)*slope);
}

Employee.prototype.getPIE = function() {
    var maxLevel = this.getMaxLevel();
    var baseStats = 0, maxStats = 0;
    if (this.promotion == 0) {
        baseStats = this.baseStats._pie;
        maxStats = this.maxStats0._pie;
    } else if (this.promotion == 1) {
        baseStats = Math.ceil(this.maxStats0._pie / 2);
        maxStats = this.maxStats1._pie;
    } else if (this.promotion == 2) {
        baseStats = Math.ceil(this.maxStats1._pie / 2);
        maxStats = this.maxStats2._pie;
    }
    var slope = (maxStats - baseStats) / (maxLevel - 1);
    return Math.ceil(baseStats + (this.levelCached - 1)*slope);
}

Employee.prototype.getDEX = function() {
    var maxLevel = this.getMaxLevel();
    var baseStats = 0, maxStats = 0;
    if (this.promotion == 0) {
        baseStats = this.baseStats._dex;
        maxStats = this.maxStats0._dex;
    } else if (this.promotion == 1) {
        baseStats = Math.ceil(this.maxStats0._dex / 2);
        maxStats = this.maxStats1._dex;
    } else if (this.promotion == 2) {
        baseStats = Math.ceil(this.maxStats1._dex / 2);
        maxStats = this.maxStats2._dex;
    }
    var slope = (maxStats - baseStats) / (maxLevel - 1);
    return Math.ceil(baseStats + (this.levelCached - 1)*slope);
}

Employee.prototype.getAGI = function() {
    var maxLevel = this.getMaxLevel();
    var baseStats = 0, maxStats = 0;
    if (this.promotion == 0) {
        baseStats = this.baseStats._agi;
        maxStats = this.maxStats0._agi;
    } else if (this.promotion == 1) {
        baseStats = Math.ceil(this.maxStats0._agi / 2);
        maxStats = this.maxStats1._agi;
    } else if (this.promotion == 2) {
        baseStats = Math.ceil(this.maxStats1._agi / 2);
        maxStats = this.maxStats2._agi;
    }
    var slope = (maxStats - baseStats) / (maxLevel - 1);
    return Math.ceil(baseStats + (this.levelCached - 1)*slope);
}

Employee.prototype.getLUK = function() {
    var maxLevel = this.getMaxLevel();
    var baseStats = 0, maxStats = 0;
    if (this.promotion == 0) {
        baseStats = this.baseStats._luk;
        maxStats = this.maxStats0._luk;
    } else if (this.promotion == 1) {
        baseStats = Math.ceil(this.maxStats0._luk / 2);
        maxStats = this.maxStats1._luk;
    } else if (this.promotion == 2) {
        baseStats = Math.ceil(this.maxStats1._luk / 2);
        maxStats = this.maxStats2._luk;
    }
    var slope = (maxStats - baseStats) / (maxLevel - 1);
    return Math.ceil(baseStats + (this.levelCached - 1)*slope);
}

Employee.prototype.getCurrentHP = function() {
    return this.currentHP;
}

Employee.prototype.getMaxHP = function() {
    if (this.isTrainer) return 25000;
    
    var classId = this.getClassId();
    var bonusHp = (this.getBaseRarity() == 5?1:0);
    if (classId === 1) return this.getVIT() * (4 + bonusHp);
    if (classId === 2) return this.getVIT() * (4 + bonusHp);
    if (classId === 3) return this.getVIT() * (5 + bonusHp);
    if (classId === 4) return this.getVIT() * (4 + bonusHp);
    if (classId === 5) return this.getVIT() * (6 + bonusHp);
    if (classId === 6) return this.getVIT() * (4 + bonusHp);
    if (classId === 7) return this.getVIT() * (5 + bonusHp);
    if (classId === 8) return this.getVIT() * (4 + bonusHp);
    return 9999;
}

Employee.prototype.getAtk = function() {
    var classId = this.getClassId();
    var weaponStats = (this.weapon ? this.weapon.patk : 0);
    var armorStats = (this.armor ? this.armor.patk : 0);
    var accessoryStats = (this.accessory ? this.accessory.patk : 0);

    if (classId === 1) return this.getSTR() + weaponStats + armorStats + accessoryStats + 6;
    if (classId === 2) return this.getSTR() + weaponStats + armorStats + accessoryStats + 20;
    if (classId === 3) return this.getDEX() + weaponStats + armorStats + accessoryStats + 10;
    if (classId === 4) return this.getSTR() + weaponStats + armorStats + accessoryStats + 3;
    if (classId === 5) return this.getSTR() + weaponStats + armorStats + accessoryStats + 16;
    if (classId === 6) return this.getDEX() + weaponStats + armorStats + accessoryStats;
    if (classId === 7) return this.getSTR() + weaponStats + armorStats + accessoryStats + 6;
    if (classId === 8) return this.getSTR() + weaponStats + armorStats + accessoryStats;
    return 9999;
}

Employee.prototype.getDef = function() {
    var classId = this.getClassId();
    var weaponStats = (this.weapon ? this.weapon.pdef : 0);
    var armorStats = (this.armor ? this.armor.pdef : 0);
    var accessoryStats = (this.accessory ? this.accessory.pdef : 0);

    if (classId === 1) return this.getVIT() + weaponStats + armorStats + accessoryStats + 6;
    if (classId === 2) return this.getVIT() + weaponStats + armorStats + accessoryStats;
    if (classId === 3) return this.getVIT() + weaponStats + armorStats + accessoryStats;
    if (classId === 4) return this.getVIT() + weaponStats + armorStats + accessoryStats + 4;
    if (classId === 5) return this.getVIT() + weaponStats + armorStats + accessoryStats;
    if (classId === 6) return this.getVIT() + weaponStats + armorStats + accessoryStats + 3;
    if (classId === 7) return this.getVIT() + weaponStats + armorStats + accessoryStats;
    if (classId === 8) return this.getVIT() + weaponStats + armorStats + accessoryStats;
    return 9999;
}

Employee.prototype.getMAtk = function() {
    var classId = this.getClassId();
    var weaponStats = (this.weapon ? this.weapon.matk : 0);
    var armorStats = (this.armor ? this.armor.matk : 0);
    var accessoryStats = (this.accessory ? this.accessory.matk : 0);

    if (classId === 1) return this.getINT() + weaponStats + armorStats + accessoryStats;
    if (classId === 2) return this.getINT() + weaponStats + armorStats + accessoryStats;
    if (classId === 3) return this.getINT() + weaponStats + armorStats + accessoryStats;
    if (classId === 4) return this.getINT() + weaponStats + armorStats + accessoryStats;
    if (classId === 5) return this.getINT() + weaponStats + armorStats + accessoryStats;
    if (classId === 6) return this.getPIE() + weaponStats + armorStats + accessoryStats + 8;
    if (classId === 7) return this.getINT() + weaponStats + armorStats + accessoryStats;
    if (classId === 8) return this.getINT() + weaponStats + armorStats + accessoryStats + 9;
    return 9999;
}

Employee.prototype.getMDef = function() {
    var classId = this.getClassId();
    var weaponStats = (this.weapon ? this.weapon.mdef : 0);
    var armorStats = (this.armor ? this.armor.mdef : 0);
    var accessoryStats = (this.accessory ? this.accessory. mdef : 0);

    if (classId === 1) return Math.max(this.getINT(), this.getPIE()) + weaponStats + armorStats + accessoryStats + 7;
    if (classId === 2) return Math.max(this.getINT(), this.getPIE()) + weaponStats + armorStats + accessoryStats;
    if (classId === 3) return Math.max(this.getINT(), this.getPIE()) + weaponStats + armorStats + accessoryStats;
    if (classId === 4) return Math.max(this.getINT(), this.getPIE()) + weaponStats + armorStats + accessoryStats;
    if (classId === 5) return Math.max(this.getINT(), this.getPIE()) + weaponStats + armorStats + accessoryStats;
    if (classId === 6) return Math.max(this.getINT(), this.getPIE()) + weaponStats + armorStats + accessoryStats + 3;
    if (classId === 7) return Math.max(this.getINT(), this.getPIE()) + weaponStats + armorStats + accessoryStats;
    if (classId === 8) return Math.max(this.getINT(), this.getPIE()) + weaponStats + armorStats + accessoryStats;
    return 9999;
}

Employee.prototype.getCrit = function() {
    var weaponStats = (this.weapon ? this.weapon.crit : 0);
    var armorStats = (this.armor ? this.armor.crit : 0);
    var accessoryStats = (this.accessory ? this.accessory.crit : 0);

    return weaponStats + armorStats + accessoryStats;
}

Employee.prototype.getHit = function() {
    var weaponStats = (this.weapon ? this.weapon.hit : 0);
    var armorStats = (this.armor ? this.armor.hit : 0);
    var accessoryStats = (this.accessory ? this.accessory.hit : 0);

    return weaponStats + armorStats + accessoryStats;
}

Employee.prototype.getEva = function() {
    var weaponStats = (this.weapon ? this.weapon.eva : 0);
    var armorStats = (this.armor ? this.armor.eva : 0);
    var accessoryStats = (this.accessory ? this.accessory.eva : 0);

    return weaponStats + armorStats + accessoryStats;
}

Employee.prototype.getFrontSkill = function() {
    return (this.weapon ? this.weapon.frontSkill : "None");
}

Employee.prototype.getBackSkill = function() {
    return (this.weapon ? this.weapon.backSkill : "None");
}

Employee.prototype.getCurrentSkill = function() {
    if (!this.weapon) return null;
    if (this.position === "front") {
        return this.weapon.frontSkill;
    } else {
        return this.weapon.backSkill;
    }
}

Employee.prototype.isFainted = function() {
    return this.currentHP <= 0;
}

Employee.prototype.fullHeal = function() {
    this.currentHP = this.getMaxHP();
    this.fullCleanse();
}

Employee.prototype.fullCleanse = function() {
    for(key in this.status) {
        var statusName = key;
        var status = this.status[statusName];
        if (status) {
            status.destroy();
        }
    }
}

Employee.prototype.cleanse = function() {
    for(key in this.status) {
        var statusName = key;
        var status = this.status[statusName];
        if (status && status.canBeCleansed) {
            status.destroy();
        }
    }
}

Employee.prototype.isStunned = function() {
    return (this.status["Stun"] !== null);
}

Employee.prototype.isParalyzed = function() {
    return (this.status["Paralyze"] !== null);
}

Employee.prototype.isCharmed = function() {
    return (this.status["Charm"] !== null);
}

module.exports = Employee;