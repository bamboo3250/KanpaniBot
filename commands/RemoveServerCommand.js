const serverNameMap = {
    'Rose': ['Rose', 'ローズ'],
    'Siegrid': ['Siegrid', 'Sieg', 'ジークリット'],
    'Holly': ['Holly', 'Holy', 'ホリー'],
    'Judita': ['Judita', 'Yudita', 'ユディタ'],
    'Adelina': ['Adelina', 'Aderina', 'アデリーナ'],
}

function contains(serverName, alterNames) {
    for(var i=0;i<alterNames.length;i++) {
        if (serverName.toUpperCase() == alterNames[i].toUpperCase()) return true;
    }
    return false;
}

function getServerName(name) {
    for(var key in serverNameMap) {
        if (contains(name, serverNameMap[key])) return key;
    }
    return null;
}

module.exports = {
    names: ['removeserver'],
    usage: '`~removeserver server_name`',
    description: 'remove Server role from your account. server_name can be either Rose, Siegrid, Holly, Judita or Adelina.',
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        var member = message.member;
        if (member == null) return;

        if (bot.preventPM(message)) return;

        var roleName = command.args[0];
        if (!roleName) return;

        var serverName = getServerName(roleName);
        if (!serverName) {
            message.reply('Wrong server name. It can only be either Rose, Siegrid, Holly, Judita or Adelina.');
            return;
        }

        var serverRole = message.guild.roles.find('name', serverName);
        member.removeRole(serverRole).then(output => {
            message.reply(serverName + " Role removed.");
        }).catch(err => {
            message.reply("Error happended when removing " + serverName + " Role.");
        });
    }
}