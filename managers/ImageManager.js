function ImageManager(bot) {
    this.bot = bot;
    this.imageDict = {};
}

ImageManager.prototype.init = function(callback) {
    var miscFileList = [
        "images/misc/fighter.png",
        "images/misc/ronin.png",
        "images/misc/archer.png",
        "images/misc/soldier.png",
        "images/misc/warrior.png",
        "images/misc/cleric.png",
        "images/misc/rogue.png",
        "images/misc/magician.png",

        "images/misc/resumeForm.png",
        "images/misc/highlightStar.png",
        "images/misc/normalStar.png",
        
        "images/misc/itemCell.png",
        "images/misc/shadow.png",
        
        "images/misc/damage/crit0.png",
        "images/misc/damage/crit1.png",
        "images/misc/damage/crit2.png",
        "images/misc/damage/crit3.png",
        "images/misc/damage/crit4.png",
        "images/misc/damage/crit5.png",
        "images/misc/damage/crit6.png",
        "images/misc/damage/crit7.png",
        "images/misc/damage/crit8.png",
        "images/misc/damage/crit9.png",
        
        "images/misc/damage/heal0.png",
        "images/misc/damage/heal1.png",
        "images/misc/damage/heal2.png",
        "images/misc/damage/heal3.png",
        "images/misc/damage/heal4.png",
        "images/misc/damage/heal5.png",
        "images/misc/damage/heal6.png",
        "images/misc/damage/heal7.png",
        "images/misc/damage/heal8.png",
        "images/misc/damage/heal9.png",
        
        "images/misc/damage/normal0.png",
        "images/misc/damage/normal1.png",
        "images/misc/damage/normal2.png",
        "images/misc/damage/normal3.png",
        "images/misc/damage/normal4.png",
        "images/misc/damage/normal5.png",
        "images/misc/damage/normal6.png",
        "images/misc/damage/normal7.png",
        "images/misc/damage/normal8.png",
        "images/misc/damage/normal9.png",
        
        "images/misc/damage/miss.png"
    ];
    var that = this;
    that.bot.imageHelper.read(miscFileList, function (err, imageList) {
        if (err) {
            message.reply("Error happened. Try again.");
            that.bot.log(err); 
            return;
        }

        for(key in imageList) {
            that.imageDict[key] = imageList[key];
        }
        that.getShadow().scale(0.6);
        if (typeof callback !== "undefined") callback();
    });
};

ImageManager.prototype.getShadow = function() {
    return this.imageDict["images/misc/shadow.png"];
}

ImageManager.prototype.getDamage = function(type, digit) {
    if (type === "miss") return this.imageDict["images/misc/damage/miss.png"];
    return this.imageDict["images/misc/damage/"+type+""+digit+".png"];
};

module.exports = ImageManager;