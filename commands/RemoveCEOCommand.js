module.exports = {
    names: ['removeceo'],
    usage: '`~removeceo`',
    description: 'remove CEO role from your account',
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var member = message.member;
        if (member == null) return;

        if (bot.preventPM(message)) return;

        var dmmRole = message.guild.roles.find('name', 'CEO');
        member.removeRole(dmmRole).then(output => {
            message.reply("CEO Role removed.");
        }).catch(err => {
            message.reply("Sorry, I don't have permission to remove this Role.");
        });
    }
}