function Armor(armorInfo, plus = 0) {
    this._id        = armorInfo._id
    this.name       = armorInfo.name;
    this.classId    = armorInfo.classId;
    this.type       = armorInfo.type;
    this.element    = armorInfo.element;

    this.patk       = armorInfo.stats["+"+plus].patk;
    this.pdef       = armorInfo.stats["+"+plus].pdef;
    this.matk       = armorInfo.stats["+"+plus].matk;
    this.mdef       = armorInfo.stats["+"+plus].mdef;
    this.crit       = armorInfo.stats["+"+plus].crit;
    this.hit        = armorInfo.stats["+"+plus].hit;
    this.eva        = armorInfo.stats["+"+plus].eva;
}

module.exports = Armor;