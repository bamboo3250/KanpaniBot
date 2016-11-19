var Employee = require('../classes/Employee');

module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text != "~mytop") return;
        if (bot.preventPM(message)) return;

        var result = [];
        for (key in bot.playerManager.playerDict) {
            var player = bot.playerManager.getPlayer(key);
            var employee = bot.createEmployeeFromPlayer(player);
            result.push({
                userId: key,
                employee: employee
            });
        }
        result.sort(function(a, b) {
            if (a.employee.levelCached != b.employee.levelCached) {
                return b.employee.levelCached - a.employee.levelCached;    
            } else {
                return b.employee.getBaseRarity() - a.employee.getBaseRarity();
            }
        })
        
        message.guild.fetchMembers().then(guild => {
            var count = 0;
            var text = "Your Ranking:\n";
            var userId = message.author.id;
            var userOrder = 0;
            for(;userOrder<result.length;userOrder++) {
                if (result[userOrder].userId === userId) break;
            }
            if (userOrder == result.length) {
                message.reply("You are not in the ranking.");
                return;
            } else {
                var count = 0;
                var text = "Your ranking:\n";
                var lower_bound = Math.min(userOrder + 4, result.length-1);
                var upper_bound = Math.max(lower_bound - 9, 0);
                lower_bound = Math.min(upper_bound + 9, result.length-1);
                for(var i=0;i<result.length;i++) {
                    if (i==0 || result[i-1].point != result[i].point) count = i;
                    var member = guild.members.find('id', result[i].userId);
                    var emojiName = 'k' + result[i].employee.getClass().toLowerCase();
                    const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
                    if (member && (upper_bound <= i) && (i<=lower_bound)) {
                        if (i === userOrder) {
                            text += "**" + (count+1) + ". " + member.user.username + "** (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", Lv.**" + result[i].employee.levelCached + "**)\n";
                        } else {
                            text += (count+1) + ". " + member.user.username + " (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", Lv.**" + result[i].employee.levelCached + "**)\n";
                        }
                    }
                }
                message.channel.sendMessage(text);
            }
        }).catch(err => {
            message.channel.sendMessage("Fetching member error! " + err);
        });
    }
}