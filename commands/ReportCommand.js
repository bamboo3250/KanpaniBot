module.exports = {
    handle: function(message, bot) {
        var command = message.content.trim().toLowerCase();
        if (!command.startsWith("~report ")) return;
        if (bot.isPM(message)) {
            message.reply("You cannot use this command in Private Message.");
            return;
        }
        var reportedUser = message.mentions.users.first();
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
            if (employee && employee.levelCached >= 50) {
                text += "**" + bot.report[reportedUser.id][reporterId] + "** ";
            } else {
                text += bot.report[reportedUser.id][reporterId] + " ";
            }
        }
        message.channel.sendMessage(text);

        if (Object.keys(bot.report[reportedUser.id]).length >= 5) {
            var count = 0;
            for(key in bot.report[reportedUser.id]) {
                var reporterId = key;
                var employee = bot.playerManager.getPlayerUnit(reporterId);
                if (employee && employee.levelCached >= 50) count++;
            }
            if (count >= 2) {
                message.guild.fetchMember(reportedUser).then(guildMember => {
                    var reportedRole = message.guild.roles.find('name', 'Reported');
                    if (reportedRole) {
                        if (guildMember.roles.has(reportedRole.id)) return;

                        guildMember.addRole(reportedRole).then(output => {
                            bot.silenced[reportedUser.id] = true;
                            bot.saveSilenced();
                            message.channel.sendMessage(guildMember.user + " is now silenced.");
                        }).catch(err => {
                            bot.log("[Report] Adding Reported role failed.");
                        });
                    }
                }).catch(err => {
                    bot.log("[Report] Fetching member failed.\n" + err);
                });
            }
        }
    }
}