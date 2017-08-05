function checkCanManageSoul(message) {
    if (message.author.id != "146556639342755840") {
        message.guild.fetchMember("146556639342755840").then(member => {
            message.reply("You are not qualified for this. Only " + member + " is allowed to manage your souls.");
        }).catch(err => {
            console.log("Error in fetching member. " + err)
        });
        return false;
    }
    return true;
}

module.exports = {
    handle: function(message, bot) {
        if (message.author.id === "147305572012654592") {   // uzies special case
            var text = message.content.trim().toLowerCase();
            if (text === ":p" || text === ";p") {
                message.channel.send(text);
            }
            return;
        }

        var text = message.content.trim().toLowerCase();
        if (text.startsWith("-eatsoul ")) {
            if (bot.preventPM(message)) return;
            if (!checkCanManageSoul(message)) return;

            const breadEmoji = message.guild.emojis.find('name', 'kbread');
            const lolEmoji = message.guild.emojis.find('name', 'klol');

            var content = text.substring(9);
            var targetId = bot.functionHelper.getIdFromMention(content);
            if (targetId === "") return;
            if (targetId === message.author.id) {
                message.channel.send("Ewww " + message.author + ", that's disgusting... Are you sure you want to do that?");
                return;
            }

            if (typeof bot.hasSoul[targetId] === "undefined") bot.hasSoul[targetId] = true;
            if (bot.hasSoul[targetId]) {
                bot.hasSoul[targetId] = false;
                bot.saveSoul();

                message.guild.fetchMember(targetId).then(targetMember => {
                    message.channel.send(targetMember + " is now haunted. " + message.author + " devoured your Soul :ghost: and rendered the " + breadEmoji + " useless! " + lolEmoji);
                }).catch(err => {
                    bot.log("Error in fetching member. " + err)
                });
            } else {
                message.channel.send(message.author + ", I understand that your hunger is insatiable, but only one Soul :ghost: for each person. Relax a bit!")
            }
            
        } else if (text.startsWith("-givesoul ")) {
            if (bot.preventPM(message)) return;
            if (!checkCanManageSoul(message)) return;

            const breadEmoji = message.guild.emojis.find('name', 'kbread');

            var content = text.substring(10);
            var targetId = bot.functionHelper.getIdFromMention(content);
            if (targetId === "") return;
            if (targetId === message.author.id) {
                message.channel.send("Whose soul should I get for you, master " + message.author + "?");
                return;
            }

            if (typeof bot.hasSoul[targetId] === "undefined") bot.hasSoul[targetId] = true;
            if (!bot.hasSoul[targetId]) {
                bot.hasSoul[targetId] = true;
                bot.saveSoul();

                message.guild.fetchMember(targetId).then(targetMember => {
                    message.channel.send(message.author + " decided to return the Soul :ghost: back to " + targetMember + ". Use it wisely. The same with the " + breadEmoji + "!");
                }).catch(err => {
                    bot.log("Error in fetching member.")
                });
            } else {
                message.guild.fetchMember(targetId).then(targetMember => {
                    message.channel.send(targetMember + " already has a Soul :ghost: . There's only so many that can fit in a single body.")    
                }).catch(err => {
                    bot.log("Error in fetching member.")
                });
            }
        }
    }
}