var Employee = require('../classes/Employee');

module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text != "~top") return;
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
                return b.employee.levelCached - b.employee.levelCached;    
            } else {
                return b.employee.getBaseRarity() - a.employee.getBaseRarity();
            }
        })
        var count = 0;
        var text = "Top 10 players:\n";
        
        message.guild.fetchMembers().then(guild => {
            for(var i=0;i<Math.min(result.length, 10);i++) {
                if (i==0 || result[i-1].employee.levelCached != result[i].employee.levelCached) count = i;
                var member = guild.members.find('id', result[i].userId);
                var emojiName = 'k' + result[i].employee.getClass().toLowerCase();
                const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
                if (member) {
                    text += (count+1) + ". " + member.user.username + " (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", Lv.**" + result[i].employee.levelCached + "**)\n";
                }
            }
            message.channel.sendMessage(text);
        }).catch(err => {
            message.channel.sendMessage("Fetching member error! " + err);
        });
    }
}