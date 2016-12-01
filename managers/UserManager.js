function UserManager() {
    this.members = {};
    this.guilds = null;
}

UserManager.prototype.fetchAllMembersInGuildRecursively = function(bot, callback, iter) {
    if (!this.guilds) {
        bot.log("[fetchAllMembersInGuildRecursively] Error: guilds is null.")
        return;
    }
    if (iter == this.guilds.length) {
        callback();
        return;
    }

    var guild = this.guilds[iter];
    var that = this;

    bot.log("[ready] Fetching members in " + guild.name);
    guild.fetchMembers().then(guild => {
        bot.log("[ready] Finished Fetching members in " + guild.name);
        var memberList = guild.members.array();
        for(var i=0;i<memberList.length;i++) {
            that.members[memberList[i].id] = memberList[i];
        }
        that.fetchAllMembersInGuildRecursively(bot, callback, iter+1);
    }).catch(err => {
        bot.log("[ready] Fetching member error in " + guild.name + "!\n" + err);
        that.fetchAllMembersInGuildRecursively(bot, callback, iter+1);
    });
}

UserManager.prototype.fetchAllMembers = function(bot, callback) {
    this.guilds = bot.bot.guilds.array();
    this.fetchAllMembersInGuildRecursively(bot, callback, 0);
}

UserManager.prototype.getMember = function(id) {
    var member = this.members[id];
    if (typeof member === "undefined") return null;
    return member;
}

UserManager.prototype.getUser = function(id) {
    var member = this.getMember(id);
    if (!member) return null;
    return member.user;
}

module.exports = new UserManager();