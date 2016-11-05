var Employee = function(employeeInfo) {
    this.DOMAIN = "http://img4.kanpani.jp";

    this._no = employeeInfo._no;
    this._id = employeeInfo._id;
    this.fullName = employeeInfo.fullName;
    this.shortName = employeeInfo.commonNames[0];
    this.japaneseName = employeeInfo.japaneseName;
    this.baseStats = employeeInfo.baseStats;
    this.maxStats = employeeInfo.maxStats;
    this.cwId = employeeInfo.cwId;
}

Employee.prototype.getClass = function() {
    var classValue = parseInt(this._id.substring(2,3));
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
    return parseInt(this._id.substring(3,4));
}

Employee.prototype.getFullBodyImageURL = function() {
    return this.DOMAIN + "/img/character/" + this._id + "/illust/full.png";
}

Employee.prototype.getPhotoImageURL = function() {
    return this.DOMAIN + "/img/character/" + this._id + "/illust/photo.png";
}

Employee.prototype.getSpriteImageURL = function(star = 6, isCW = false, weaponId = 11) {
    if (isCW) {
        weaponId = this.cwId;
    }
    if (parseInt(weaponId) < 10) weaponId = "0" + weaponId;
    weaponId = this._id.substring(2,3) + weaponId;
    if (isCW) {
        weaponId = "8" + weaponId;
    } else {
        weaponId = "0" + weaponId;
    }
    weaponId = "30" + weaponId;
    return this.DOMAIN + "/img/character/" + this._id + "/enemy/" + star + "_" + weaponId + "_idle.png";
}


module.exports = Employee;