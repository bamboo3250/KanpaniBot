var Employee = require('../classes/Employee');

function sendTop(message, bot, result) {
    var count = 0;
    var text = "Top 10 players:\n";
        
    for(var i=0;i<Math.min(result.length, 10);i++) {
        if (i==0 || result[i-1].employee.levelCached != result[i].employee.levelCached) count = i;
        var memberName = bot.memberNameDict[result[i].userId];
        var emojiName = 'k' + result[i].employee.getClass().toLowerCase();
        const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
        if (memberName) {
            text += (count+1) + ". " + memberName + " (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", Lv.**" + result[i].employee.levelCached + "**)\n";
        }
    }
    message.channel.sendMessage(text);
}

module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text != "~top") return;
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
            sendTop(message, bot, result);
        }).catch(err => {
            sendTop(message, bot, result);
            bot.log("[Top] Fetching member error!\n" + err);
        });
    }
}