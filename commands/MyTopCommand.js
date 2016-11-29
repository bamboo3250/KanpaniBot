var Employee = require('../classes/Employee');

function sendMyTop(message, bot, result) {
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
        var lower_bound = Math.min(userOrder + 4, result.length-1);
        var upper_bound = Math.max(lower_bound - 9, 0);
        lower_bound = Math.min(upper_bound + 9, result.length-1);
        for(var i=0;i<result.length;i++) {
            if (i==0 || result[i-1].employee.levelCached != result[i].employee.levelCached) count = i;
            var memberName = bot.memberNameDict[message.author.id];
            var emojiName = 'k' + result[i].employee.getClass().toLowerCase();
            const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
            if (memberName && (upper_bound <= i) && (i<=lower_bound)) {
                if (i === userOrder) {
                    text += "**" + (count+1) + ". " + memberName + "** (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", Lv.**" + result[i].employee.levelCached + "**)\n";
                } else {
                    text += (count+1) + ". " + memberName + " (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", Lv.**" + result[i].employee.levelCached + "**)\n";
                }
            }
        }
        message.channel.sendMessage(text);
    }
}

module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text != "~mytop") return;
        if (bot.preventPM(message)) return;

        var result = [];
        for (key in bot.playerManager.playerDict) {
            var userId = key;
            var player = bot.playerManager.getPlayer(userId);
            var employee = bot.createEmployeeFromPlayer(player);
            result.push({
                userId: userId,
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
            bot.updateMemberNameDict(guild.members);
            sendMyTop(message, bot, result);
        }).catch(err => {
            sendMyTop(message, bot, result);
            bot.log("[MyTop] Fetching member error!\n" + err)
        });
    }
}