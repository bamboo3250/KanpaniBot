module.exports = {
    names: ['xmastree'],
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;
        
        var total = 0;
        for(key in bot.christmasTreeContribution) {
            total += bot.christmasTreeContribution[key];
        }

        var text = "Number of **Eld Light**: " + total + "\n";
        var minMilestone = 9999;
        for(key in bot.christmasTreeMilestones) {
            var milestone = parseInt(key);
            if (milestone > total && milestone < minMilestone) {
                minMilestone = milestone;
            }
        }
        text += "Next Milestone: ";
        var xmasTreeImageFileName = "images/misc/christmas_tree_off.png";
        if (minMilestone === 9999) {
            text += "None\n";
            xmasTreeImageFileName = "images/misc/christmas_tree_on.png";
        } else {
            text += minMilestone + " (" + bot.christmasTreeMilestones[minMilestone].itemName + " x" + bot.christmasTreeMilestones[minMilestone].amount + ")\n";
        }
        text += "Contributors:\n";
        var result = [];
        for(key in bot.christmasTreeContribution) {
            var userId = key;
            var user = bot.userManager.getUser(userId);
            if (user) {
                result.push({
                    username: user.username,
                    contribution: bot.christmasTreeContribution[userId]
                });    
            } else {
                result.push({
                    username: "["+userId+"]",
                    contribution: bot.christmasTreeContribution[userId]
                });
            }    
        }
        result.sort(function(a, b) {
            return b.contribution - a.contribution;
        });
        for(var i=0;i<result.length;i++) {
            text += (i+1) + ". " + result[i].username + " (" + result[i].contribution + ")\n";
        }

        message.channel.send(text,{'files':[xmasTreeImageFileName]});
    }
}