function Accessory(accessoryInfo, plus = 0) {
    this._id        = accessoryInfo._id
    this.name       = accessoryInfo.name;
    this.classId    = accessoryInfo.classId;
    this.type       = accessoryInfo.type;

    this.patk       = accessoryInfo.stats["+"+plus].patk;
    this.pdef       = accessoryInfo.stats["+"+plus].pdef;
    this.matk       = accessoryInfo.stats["+"+plus].matk;
    this.mdef       = accessoryInfo.stats["+"+plus].mdef;
    this.crit       = accessoryInfo.stats["+"+plus].crit;
    this.hit        = accessoryInfo.stats["+"+plus].hit;
    this.eva        = accessoryInfo.stats["+"+plus].eva;

    this.effect     = accessoryInfo.effect;
}

module.exports = Accessory;