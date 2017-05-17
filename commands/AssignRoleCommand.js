module.exports = {
    handle: function(message, bot) {
        var text = message.content.trim().toLowerCase();
        var member = message.member;
        if (member == null) return;

        switch(text) {
        case '~setceo':
            if (bot.preventPM(message)) return;

            var dmmRole = message.guild.roles.find('name', 'CEO');
            member.addRole(dmmRole).then(output => {
                message.reply("CEO Role added.");
            }).catch(err => {
                message.reply("Sorry, I don't have permission to add this Role.");
            });
            break;
        case '~removeceo':
            if (bot.preventPM(message)) return;

            var dmmRole = message.guild.roles.find('name', 'CEO');
            member.removeRole(dmmRole).then(output => {
                message.reply("CEO Role removed.");
            }).catch(err => {
                message.reply("Sorry, I don't have permission to remove this Role.");
            });
            break;
        }
    }
}