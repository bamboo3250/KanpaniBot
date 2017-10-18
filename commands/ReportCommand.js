module.exports = {
    names: ['report', 'rp'],
    usage: '`~report @username`',
    description: 'report other members for misbehavior',
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        if (bot.isPM(message)) {
            message.reply("You cannot use this command in Private Message.");
            return;
        }
        var reportedUser = command.mentions.users.first();
        if (!reportedUser) return;

        if (reportedUser.id === message.author.id) {
            message.reply("You cannot report yourself.");
            return;
        }
        if (typeof bot.report[reportedUser.id] === "undefined") {
            bot.report[reportedUser.id] = {};
        }
        bot.report[reportedUser.id][message.author.id] = message.author.username;
        var text = reportedUser + " has been reported.\n";
        text += "Reporter: ";
        for(key in bot.report[reportedUser.id]) {
            var reporterId = key;
            var employee = bot.playerManager.getPlayerUnit(reporterId);
            if (employee && (employee.promotion > 0 || employee.levelCached >= 70)) {
                text += "**" + bot.report[reportedUser.id][reporterId] + "** ";
            } else {
                text += bot.report[reportedUser.id][reporterId] + " ";
            }
        }
        message.channel.send(text);

        if (Object.keys(bot.report[reportedUser.id]).length >= 5) {
            var count = 0;
            for(key in bot.report[reportedUser.id]) {
                var reporterId = key;
                var employee = bot.playerManager.getPlayerUnit(reporterId);
                if (employee && (employee.promotion > 0 || employee.levelCached >= 70)) count++;
            }
            if (count >= 2) {
                message.guild.fetchMember(reportedUser).then(guildMember => {
                    var reportedRole = message.guild.roles.find('name', 'Reported');
                    if (reportedRole) {
                        if (guildMember.roles.has(reportedRole.id)) return;

                        guildMember.addRole(reportedRole).then(output => {
                            bot.silenced[reportedUser.id] = true;
                            bot.saveSilenced();
                            message.channel.send(guildMember.user + " is now silenced.");
                        }).catch(err => {
                            bot.log("[Report]" + err);
                        });
                    }
                }).catch(err => {
                    bot.log("[Report]" + err);
                });
            }
        }
    }
}