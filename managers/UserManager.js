function UserManager(bot) {
    this.bot = bot;
    this.members = {};
    this.guilds = null;
}

UserManager.prototype.fetchAllMembersInGuildRecursively = function(callback, iter) {
    if (!this.guilds) {
        this.bot.log("[fetchAllMembersInGuildRecursively] Error: guilds is null.")
        return;
    }
    if (iter == this.guilds.length) {
        if (callback) callback();
        return;
    }

    var guild = this.guilds[iter];
    var that = this;

    //this.bot.log("Fetching members in " + guild.name);
    guild.fetchMembers().then(guild => {
        //that.bot.log("Finished Fetching members in " + guild.name);
        var memberList = guild.members.array();
        for(var i=0;i<memberList.length;i++) {
            that.members[memberList[i].id] = memberList[i];
            if (that.doesMemberHaveRole(memberList[i].id, "Reported")) {
                that.bot.silenced[memberList[i].id] = true;
            }
            if (that.bot.silenced[memberList[i].id] && !that.doesMemberHaveRole(memberList[i].id, "Reported")) {
                that.addRole(memberList[i].id, "Reported");
                that.bot.log("Silenced " + memberList[i].user.username);
            }
        }
        that.fetchAllMembersInGuildRecursively(callback, iter+1);
    }).catch(err => {
        that.bot.log("Fetching member error in " + guild.name + "!\n" + err);
        that.fetchAllMembersInGuildRecursively(callback, iter+1);
    });
}

UserManager.prototype.fetchAllMembers = function(callback) {
    this.guilds = this.bot.bot.guilds.array();
    this.fetchAllMembersInGuildRecursively(callback, 0);
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

UserManager.prototype.doesMemberHaveRole = function(id, roleName) {
    var member = this.getMember(id);
    if (!member) return false;
    return member.roles.exists("name", roleName);
}

UserManager.prototype.addRole = function(id, roleName, callback) {
    var member = this.getMember(id);
    if (!member) return;
    if (this.doesMemberHaveRole(id, roleName)) return;

    var role = member.guild.roles.find('name', roleName);
    if (!role) return;
    var that = this;
    member.addRole(role).then(outputMember => {
        that.members[id] = outputMember;
        that.bot.log(roleName + " Role added for " + outputMember.user.username + ".");
        if (typeof callback === "function") callback();
    }).catch(err => {
        that.bot.log("[addRole] " + err);
    });
}

UserManager.prototype.removeRole = function(id, roleName, callback) {
    var member = this.getMember(id);
    if (!member) return;
    if (!this.doesMemberHaveRole(id, roleName)) return;

    var role = member.guild.roles.find('name', roleName);
    if (!role) return;
    var that = this;
    member.removeRole(role).then(outputMember => {
        that.members[id] = outputMember;
        that.bot.log(role.name + " Role removed for " + outputMember.user.username + ".");
        if (typeof callback === "function") callback();
    }).catch(err => {
        that.bot.log("[removeRole] " + err);
    });
}

UserManager.prototype.announceLevel = function(id, newLevel) {
    var user = this.getUser(id);
    if (user) {
        user.send("Congratulations! Your level has increased to **" + newLevel + "**");
    }
}

module.exports = UserManager;