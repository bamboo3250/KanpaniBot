var EmployeeInfo = function(employeeInfo) {
    this.DOMAIN = "http://img4.kanpani.jp";

    this._no = employeeInfo._no;
    this._id = employeeInfo._id;
    this.fullName = employeeInfo.fullName;
    this.shortName = employeeInfo.commonNames[0];
    this.japaneseName = employeeInfo.japaneseName;
    this.baseStats = employeeInfo.baseStats;
    this.maxStats = employeeInfo.maxStats;
    this.cwId = employeeInfo.cwId;
    this.baseStats = employeeInfo.baseStats;
    this.maxStats = employeeInfo.maxStats;

    this.exp = 0;
    this.levelCached = 1
    this.weapon = null;
    this.armor = null;
    this.accessory = null;
}

EmployeeInfo.prototype.getClassId = function() {
    return parseInt(this._id.substring(2,3));
}

EmployeeInfo.prototype.getClass = function() {
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

EmployeeInfo.prototype.getBaseRarity = function() {
    return parseInt(this._id.substring(3,4));
}

EmployeeInfo.prototype.getRarity = function() {
    var rarity = 1;
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
    return Math.max(this.getBaseRarity(), rarity);
}

EmployeeInfo.prototype.isEx = function() {
    return parseInt(this._id.substring(4,5)) == 9;
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
    11460000, 12270000, 13140000, 14060000, 15050000, 16110000, 17240000, 18450000, 19739650];

EmployeeInfo.prototype.setExp = function(expToSet) {
    var maxLevel = (this.getBaseRarity() < 5? 90 : 99);
    this.exp = Math.min(expToSet, expForLevel[maxLevel-1]);
    this.levelCached = maxLevel;
    for(var i=0;i<expForLevel.length;i++) {
        if (this.exp <expForLevel[i]) {
            this.levelCached = i;
            break;
        }
    }
}

EmployeeInfo.prototype.addExp = function(expToAdd) {
    this.setExp(this.exp + expToAdd);
}

EmployeeInfo.prototype.getVIT = function() {
    var maxLevel = (this.getBaseRarity() < 5? 90 : 99);
    var slope = (this.maxStats._vit - this.baseStats._vit) / (maxLevel - 1);
    return Math.floor(this.baseStats._vit + (this.levelCached - 1)*slope + 0.5);
}

EmployeeInfo.prototype.getSTR = function() {
    var maxLevel = (this.getBaseRarity() < 5? 90 : 99);
    var slope = (this.maxStats._str - this.baseStats._str) / (maxLevel - 1);
    return Math.floor(this.baseStats._str + (this.levelCached - 1)*slope + 0.5);
}

EmployeeInfo.prototype.getINT = function() {
    var maxLevel = (this.getBaseRarity() < 5? 90 : 99);
    var slope = (this.maxStats._int - this.baseStats._int) / (maxLevel - 1);
    return Math.floor(this.baseStats._int + (this.levelCached - 1)*slope + 0.5);
}

EmployeeInfo.prototype.getPIE = function() {
    var maxLevel = (this.getBaseRarity() < 5? 90 : 99);
    var slope = (this.maxStats._pie - this.baseStats._pie) / (maxLevel - 1);
    return Math.floor(this.baseStats._pie + (this.levelCached - 1)*slope + 0.5);
}

EmployeeInfo.prototype.getDEX = function() {
    var maxLevel = (this.getBaseRarity() < 5? 90 : 99);
    var slope = (this.maxStats._dex - this.baseStats._dex) / (maxLevel - 1);
    return Math.floor(this.baseStats._dex + (this.levelCached - 1)*slope + 0.5);
}

EmployeeInfo.prototype.getAGI = function() {
    var maxLevel = (this.getBaseRarity() < 5? 90 : 99);
    var slope = (this.maxStats._agi - this.baseStats._agi) / (maxLevel - 1);
    return Math.floor(this.baseStats._agi + (this.levelCached - 1)*slope + 0.5);
}

EmployeeInfo.prototype.getLUK = function() {
    var maxLevel = (this.getBaseRarity() < 5? 90 : 99);
    var slope = (this.maxStats._luk - this.baseStats._luk) / (maxLevel - 1);
    return Math.floor(this.baseStats._luk + (this.levelCached - 1)*slope + 0.5);
}

EmployeeInfo.prototype.getHP = function() {
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

EmployeeInfo.prototype.getAtk = function() {
    var classId = this.getClassId();
    if (classId === 1) return this.getSTR() + 6;
    if (classId === 2) return this.getSTR() + 20;
    if (classId === 3) return this.getDEX() + 10;
    if (classId === 4) return this.getSTR() + 3;
    if (classId === 5) return this.getSTR() + 16;
    if (classId === 6) return this.getDEX();
    if (classId === 7) return this.getSTR() +6;
    if (classId === 8) return this.getSTR();
    return 9999;
}

EmployeeInfo.prototype.getDef = function() {
    var classId = this.getClassId();
    if (classId === 1) return this.getVIT() + 6;
    if (classId === 2) return this.getVIT();
    if (classId === 3) return this.getVIT();
    if (classId === 4) return this.getVIT() + 4;
    if (classId === 5) return this.getVIT();
    if (classId === 6) return this.getVIT() + 3;
    if (classId === 7) return this.getVIT();
    if (classId === 8) return this.getVIT();
    return 9999;
}

EmployeeInfo.prototype.getMAtk = function() {
    var classId = this.getClassId();
    if (classId === 1) return this.getINT();
    if (classId === 2) return this.getINT();
    if (classId === 3) return this.getINT();
    if (classId === 4) return this.getINT();
    if (classId === 5) return this.getINT();
    if (classId === 6) return this.getPIE() + 8;
    if (classId === 7) return this.getINT();
    if (classId === 8) return this.getINT() + 9;
    return 9999;
}

EmployeeInfo.prototype.getMDef = function() {
    var classId = this.getClassId();
    if (classId === 1) return Math.max(this.getINT(), this.getPIE()) + 7;
    if (classId === 2) return Math.max(this.getINT(), this.getPIE());
    if (classId === 3) return Math.max(this.getINT(), this.getPIE());
    if (classId === 4) return Math.max(this.getINT(), this.getPIE());
    if (classId === 5) return Math.max(this.getINT(), this.getPIE());
    if (classId === 6) return Math.max(this.getINT(), this.getPIE()) + 3;
    if (classId === 7) return Math.max(this.getINT(), this.getPIE());
    if (classId === 8) return Math.max(this.getINT(), this.getPIE());
    return 9999;
}


EmployeeInfo.prototype.getIllustURL = function(category) {
    return this.DOMAIN + "/img/character/" + this._id + "/illust/" + category + ".png";
}

EmployeeInfo.prototype.getSpriteImageURL = function(star = 6, isEnemy = true, isCW = false, weaponId = 11) {
    if (isCW && this.cwId != 0) {
        weaponId = this.cwId;
    }
    if (parseInt(weaponId) < 10) weaponId = "0" + weaponId;
    weaponId = this._id.substring(2,3) + weaponId;
    weaponId = (isCW && this.cwId != 0 ? "8" : "0") + weaponId;
    weaponId = (this.isEx() && isCW && this.cwId != 0 ? "9" : "0") + weaponId;
    weaponId = "3" + weaponId;
    return this.DOMAIN + "/img/character/" + this._id + "/" + (isEnemy? "enemy" : "ally") + "/" + star + "_" + weaponId + "_idle.png";
}

EmployeeInfo.prototype.getSpriteImageName = function(star = 6, isCW = false, weaponId = 11) {
    if (isCW && this.cwId != 0) {
        weaponId = this.cwId;
    }
    if (parseInt(weaponId) < 10) weaponId = "0" + weaponId;
    weaponId = this._id.substring(2,3) + weaponId;
    weaponId = (isCW && this.cwId != 0 ? "8" : "0") + weaponId;
    weaponId = (this.isEx() && isCW && this.cwId != 0 ? "9" : "0") + weaponId;
    weaponId = "3" + weaponId;
    return this._id + "_" + star + "_" + weaponId + "_idle.png";
}


module.exports = EmployeeInfo;