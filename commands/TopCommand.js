var Employee = require('../classes/Employee');

function sendTop(message, bot, result) {
    var count = 0;
    var rank = 0;
    var previousEmployee = null;
    var text = "Top 10 players:\n";
    for(var i=0;i<Math.min(result.length, 10);i++) {
        var user = bot.userManager.getUser(result[i].userId);
        if (!user) continue;

        if (!previousEmployee || previousEmployee.levelCached != result[i].employee.levelCached) rank = count;
        count++;
        previousEmployee = result[i].employee;

        var memberName = user.username;
        var player = bot.playerManager.getPlayer(result[i].userId);
        var partnerName = "";
        if (player.partnerId) {
            var partner = bot.userManager.getUser(player.partnerId);
            if (partner) partnerName = partner.username;    
        }
        
        var emojiName = 'k' + result[i].employee.getClass().toLowerCase();
        const classEmoji = (message.guild == null ? null : message.guild.emojis.find('name', emojiName));
        text += (rank+1) + ". " + memberName + " (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", Lv.**" + result[i].employee.levelCached + "**" + (partnerName!=""?", Partner: **" + partnerName +"**":"") + ")\n";
    }
    message.channel.sendMessage(text);
}

module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        if (text != "~top") return;
        // if (bot.preventPM(message)) return;

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
        });
        
        if (bot.isPM(message)) {
            sendTop(message, bot, result);
        } else {
            bot.userManager.fetchAllMembers(bot, function() {
                sendTop(message, bot, result);
            });
        }
    }
}