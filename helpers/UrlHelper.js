function UrlHelper() {
    this.DOMAIN = "http://img4.kanpani.jp";
}

UrlHelper.prototype.getEquipmentIconUrl = function(weaponId, plus, imgSize = "large") {
    var isCW = weaponId.startsWith("308");
    return this.DOMAIN + "/img/icon/equipment/" + imgSize + "/" + weaponId + (isCW?"0":"") + (plus+1) + "_1.png";
}

module.exports = new UrlHelper();