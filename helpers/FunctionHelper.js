function FunctionHelper() {
}

FunctionHelper.prototype.isMention = function(text) {
    if (text.length < 4) return false;
    return (text.startsWith("<@") && text.endsWith(">"));
};

FunctionHelper.prototype.getIdFromMention = function(text) {
    if (!this.isMention(text)) return "";
    return text.substring(2, text.length - 1);
}

FunctionHelper.prototype.removeExtraSpace = function(text) {
    return text.trim().replace(/\s+/g,' ');
}

FunctionHelper.prototype.cleanText = function(text) {
    return this.removeExtraSpace(text.replace(/[^A-Za-z]+/g,' '));
}

FunctionHelper.prototype.getTimeUntilDaily = function(timeInString) {
    var startTime = new Date(timeInString);
    var now = new Date();
    var timeUntil = Math.floor((now.valueOf() - startTime.valueOf())/(24*60*60*1000)) + 1;
    timeUntil = startTime.valueOf() + timeUntil*(24*60*60*1000) - now.valueOf();
    return timeUntil;
}

function KGTime(timeInMillis = 0) {
    timeInMillis = Math.max(timeInMillis, 0);
    this.day = Math.floor(timeInMillis/(24*60*60*1000));
    this.hour = Math.floor((timeInMillis%(24*60*60*1000))/(60*60*1000));
    this.min = Math.floor((timeInMillis%(60*60*1000))/(60*1000));
    this.sec = Math.floor((timeInMillis%(60*1000))/(1000));
}

KGTime.prototype.toString = function() {
    var day = (this.day>0? this.day + " day(s) ":"");
    var hour = (this.hour>0? this.hour + " hour(s) ":"");
    var min = (this.min>0? this.min + " min(s) ":"");
    var sec = (this.sec>0? this.sec + " sec(s) ":"");
    if (day == "" && hour == "" && min == "") {
        sec = this.sec + " sec(s) "
    }
    return day + hour + min + sec;
}


FunctionHelper.prototype.parseTime = function(millisec) {
    return new KGTime(millisec);
}

FunctionHelper.prototype.parseCommand = function(message) {
    var commandText = this.removeExtraSpace(message.content.toLowerCase());
    var args = commandText.split(" ");
    var result = {
        commandName: args[0],
        args: [],
        mentions: message.mentions
    };
    for(var i=1;i<args.length;i++) result.args.push(args[i]);
    return result;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
FunctionHelper.prototype.randomArbitrary = function(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
FunctionHelper.prototype.randomIntRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

FunctionHelper.prototype.randomInt = function(max) {
    return Math.floor(Math.random() * max);
}

FunctionHelper.prototype.randomObject = function(list) {
    if (list.length <= 0) return null;
    return list[this.randomInt(list.length)];
}

FunctionHelper.prototype.randomDist = function(distribution) {
    var total = 0;
    for(var i=0;i<distribution.length;i++) total += distribution[i];
    var randomNum = this.randomInt(total);
    for(var i=0;i<distribution.length;i++) {
        if (randomNum < distribution[i]) return i;
        randomNum -= distribution[i];
    }
    return distribution.length - 1;
}

module.exports = new FunctionHelper();