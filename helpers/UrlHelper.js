function UrlHelper() {
    this.DOMAIN = "http://img4.kanpani.jp";
}

UrlHelper.prototype.getEquipmentIconUrl = function(weaponId, plus, type = "story", imgSize = "large") {
    var isCW = weaponId.startsWith("308");
    return this.DOMAIN + "/img/icon/equipment/" + imgSize + "/" + weaponId + (isCW?"0":"") + (plus+1) + "_1.png";
}

UrlHelper.prototype.getItemIconUrl = function(itemId, imgSize = "large") {
    return this.DOMAIN + "/img/icon/item/" + imgSize + "/" + itemId + ".png";
}


UrlHelper.prototype.getIllustURL = function(employee, category) {
    return this.DOMAIN + "/img/character/" + employee._id + "/illust/" + category + ".png";
}

UrlHelper.prototype.getCharaSpriteImageURL = function(employeeInfo) {
    var baseRarity = parseInt(employeeInfo._id.substring(3, 4));
    var star = (baseRarity === 5? 7: 6);
    var isEx = (this._id.substring(4, 5) === "9");
    var hasCW = (employeeInfo.cwId != 0);
    var weaponId = (hasCW? employeeInfo.cwId: 11);
    var classIdText = employeeInfo._id.substring(2,3);

    if (parseInt(weaponId) < 10) weaponId = "0" + parseInt(weaponId);
    weaponId = "3" + (isEx? "9" : "0") + (hasCW? "8" : "0") + classIdText + weaponId;
    return this.DOMAIN + "/img/character/" + employeeInfo._id + "/enemy/" + star + "_" + weaponId + "_idle.png";
}

UrlHelper.prototype.getCharaSpriteImageName = function(employeeInfo) {
    var baseRarity = parseInt(employeeInfo._id.substring(3, 4));
    var star = (baseRarity === 5? 7: 6);
    var isEx = (this._id.substring(4, 5) === "9");
    var hasCW = (employeeInfo.cwId != 0);
    var weaponId = (hasCW? employeeInfo.cwId: 11);
    var classIdText = employeeInfo._id.substring(2,3);

    if (parseInt(weaponId) < 10) weaponId = "0" + parseInt(weaponId);
    weaponId = "3" + (isEx? "9" : "0") + (hasCW? "8" : "0") + classIdText + weaponId;
    return this._id + "_" + star + "_" + weaponId + "_idle.png";
}


UrlHelper.prototype.getSpriteImageURL = function(employee, isEnemy = true, action = "idle") {
    var star = employee.getRarity();
    var weaponId = "02";
    var classCode = employee.characterId.substring(2,3);
    var isCW = false;
    var isEvent = false;

    if (employee.weapon) {
        weaponId = employee.weapon.modelId;
        isCW = (employee.weapon.type === "character");
        isEvent = (employee.weapon.type === "event");
    }

    var exCode = (employee.isEx() && isCW != 0 ? "9" : "0");
    var cwCode = (isCW != 0 ? "8" : "0");
    weaponId = "3" + exCode + cwCode + classCode + weaponId;
    return this.DOMAIN + "/img/character/" + employee.characterId + "/" + (isEnemy? "enemy" : "ally") + "/" + (isEvent?"":star + "_") + weaponId + "_" + action + ".png";
}

UrlHelper.prototype.getSpriteImageName = function(employee, action = "idle") {
    var star = employee.getRarity();
    var weaponId = "02";
    var classCode = employee.characterId.substring(2,3);
    var isCW = false;
    var isEvent = false;

    if (employee.weapon) {
        weaponId = employee.weapon.modelId;
        isCW = (employee.weapon.type === "character");
        isEvent = (employee.weapon.type === "event");
    }

    var exCode = (employee.isEx() && isCW != 0 ? "9" : "0");
    var cwCode = (isCW != 0 ? "8" : "0");
    weaponId = "3" + exCode + cwCode + classCode + weaponId;
    return this.characterId + "_" + (isEvent? "": star + "_") + weaponId + "_" + action + ".png";
}

module.exports = new UrlHelper();