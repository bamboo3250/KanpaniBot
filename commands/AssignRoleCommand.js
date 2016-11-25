module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        var member = message.member;
        if (member == null) return;

        switch(text) {
        case '~setnutaku':
            if (bot.preventPM(message)) return;

            var nutakuRole = message.guild.roles.find('name', 'Nutaku');
            member.addRole(nutakuRole).then(output => {
                message.reply("Nutaku Role added.");
            }).catch(err => {
                message.reply("Sorry, I don't have permission to add this Role.");
            });
            break;
        case '~removenutaku':
            if (bot.preventPM(message)) return;

            var nutakuRole = message.guild.roles.find('name', 'Nutaku');
            member.removeRole(nutakuRole).then(output => {
                message.reply("Nutaku Role removed.");
            }).catch(err => {
                message.reply("Sorry, I don't have permission to remove this Role.");
            });
            break;
        case '~setdmm':
            if (bot.preventPM(message)) return;

            var dmmRole = message.guild.roles.find('name', 'DMM');
            member.addRole(dmmRole).then(output => {
                message.reply("DMM Role added.");
            }).catch(err => {
                message.reply("Sorry, I don't have permission to add this Role.");
            });
            break;
        case '~removedmm':
            if (bot.preventPM(message)) return;

            var dmmRole = message.guild.roles.find('name', 'DMM');
            member.removeRole(dmmRole).then(output => {
                message.reply("DMM Role removed.");
            }).catch(err => {
                message.reply("Sorry, I don't have permission to remove this Role.");
            });
            break;
        }
    }
}