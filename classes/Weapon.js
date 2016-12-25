function Weapon(weaponInfo, plus = 0) {
    this._id        = weaponInfo._id
    this.modelId    = weaponInfo.modelId;
    this.name       = weaponInfo.name;
    this.classId    = weaponInfo.classId;
    this.type       = weaponInfo.type;

    this.patk       = weaponInfo.stats["+"+plus].patk;
    this.pdef       = weaponInfo.stats["+"+plus].pdef;
    this.matk       = weaponInfo.stats["+"+plus].matk;
    this.mdef       = weaponInfo.stats["+"+plus].mdef;
    this.crit       = weaponInfo.stats["+"+plus].crit;
    this.hit        = weaponInfo.stats["+"+plus].hit;
    this.eva        = weaponInfo.stats["+"+plus].eva;
    this.frontSkill = weaponInfo.stats["+"+plus].frontSkill;
    this.backSkill  = weaponInfo.stats["+"+plus].backSkill;
}

module.exports = Weapon;