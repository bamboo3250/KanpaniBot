var Employee = require('../classes/Employee');

function sendMyTop(message, bot, result) {
    var count = 0;
    var rank = 0;
    var previousEmployee = null;
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
            var promotionText = (result[i].employee.promotion>1?"**Section Manager**, ":(result[i].employee.promotion>0?"**Chief**, ":""));
            var levelText = "Lv.**" + result[i].employee.levelCached  + "**";
            if (memberName && (upper_bound <= i) && (i<=lower_bound)) {
                if (i === userOrder) {
                    text += "**" + (rank+1) + ". " + memberName + "** (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", " + promotionText + levelText + (partnerName!=""?", Partner: **" + partnerName +"**":"") + ")\n";
                } else {
                    text += (rank+1) + ". " + memberName + " (**" + result[i].employee.shortName + "** " + (classEmoji == null?"":classEmoji) +", " + promotionText + levelText + (partnerName!=""?", Partner: **" + partnerName +"**":"") + ")\n";
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
        // if (bot.preventPM(message)) return;

        var result = [];
        for (key in bot.playerManager.playerDict) {
            var userId = key;
            var employee = bot.playerManager.getPlayerUnit(userId);
            if (employee) {
                result.push({
                    userId: userId,
                    employee: employee
                });    
            }
        }
        result.sort(function(a, b) {
            if (a.employee.promotion != b.employee.promotion) {
                return b.employee.promotion - a.employee.promotion;
            }
            if (a.employee.levelCached != b.employee.levelCached) {
                return b.employee.levelCached - a.employee.levelCached;
            }
            return b.employee.getBaseRarity() - a.employee.getBaseRarity();
        });
        
        if (bot.isPM(message)) {
            sendMyTop(message, bot, result);
        } else {
            bot.userManager.fetchAllMembers(function() {
                sendMyTop(message, bot, result);
            });  
        }
    }
}