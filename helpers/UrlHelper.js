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
    return this.DOMAIN + "/img/character/" + employee.characterId + "/illust/" + category + ".png";
}

UrlHelper.prototype.getCharaSpriteImageURL = function(employeeInfo, isEnemy = true, eventCostume = -1) {
    var baseRarity = parseInt(employeeInfo.characterId.substring(3, 4));
    var star = (baseRarity === 5? 7: 6);
    var isEx = (employeeInfo.characterId.substring(4, 5) === "9");
    var hasCW = (employeeInfo.cwId != 0);
    var weaponId = (hasCW? employeeInfo.cwId: 11);
    var classIdText = employeeInfo.characterId.substring(2,3);

    if (parseInt(weaponId) < 10) weaponId = "0" + parseInt(weaponId);
    
    if (eventCostume == -1) {
        weaponId = "3" + (isEx? "9" : "0") + (hasCW? "8" : "0") + classIdText + weaponId;
        return this.DOMAIN + "/img/character/" + employeeInfo.characterId + "/" + (isEnemy?"enemy":"ally") + "/" + star + "_" + weaponId + "_idle.png";    
    } else {
        weaponId = "300" + classIdText + eventCostume;
        return this.DOMAIN + "/img/character/" + employeeInfo.characterId + "/" + (isEnemy?"enemy":"ally") + "/" + weaponId + "_idle.png";
    }
}

UrlHelper.prototype.getCharaSpriteImageName = function(employeeInfo, eventCostume = -1) {
    var baseRarity = parseInt(employeeInfo.characterId.substring(3, 4));
    var star = (baseRarity === 5? 7: 6);
    var isEx = (employeeInfo.characterId.substring(4, 5) === "9");
    var hasCW = (employeeInfo.cwId != 0);
    var weaponId = (hasCW? employeeInfo.cwId: 11);
    var classIdText = employeeInfo.characterId.substring(2,3);

    if (parseInt(weaponId) < 10) weaponId = "0" + parseInt(weaponId);
    

    if (eventCostume == -1) {
        weaponId = "3" + (isEx? "9" : "0") + (hasCW? "8" : "0") + classIdText + weaponId;
        return employeeInfo.characterId + "_" + star + "_" + weaponId + "_idle.png";
    } else {
        weaponId = "300" + classIdText + eventCostume;
        return employeeInfo.characterId + "_" + weaponId + "_idle.png";
    }
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
    return employee.characterId + "_" + (isEvent? "": star + "_") + weaponId + "_" + action + ".png";
}

module.exports = new UrlHelper();