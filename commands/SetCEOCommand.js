module.exports = {
    names: ['setceo'],
    usage: '`~setceo`',
    description: 'add CEO role to your account',
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var member = message.member;
        if (member == null) return;

        if (bot.preventPM(message)) return;

        var dmmRole = message.guild.roles.find('name', 'CEO');
        member.addRole(dmmRole).then(output => {
            message.reply("CEO Role added.");
        }).catch(err => {
            message.reply("Sorry, I don't have permission to add this Role.");
        });
    }
}