module.exports = {
    names: ['help'],
    usage: '`~help` or `~help command`',
    handle: function(message, bot) {
        var command = bot.functionHelper.parseCommand(message);
        if (!command.isCommand(this.names)) return;

        if (command.args.length == 0) {
            var text = '**List of available commands:**\n\n';
            for(var i=0;i<bot.commands().length;i++) {
                var command = bot.commands()[i];
                if (!command.names) continue;

                var commandText = '**~' + command.names[0] ;
                if (command.names.length > 1) {
                    commandText += ' or';
                    for(var j=1;j<command.names.length;j++) {
                        commandText += ' ~' + command.names[j];
                        if (j < command.names.length - 1) commandText += ',';
                    }
                }
                commandText += '** ';
                if (command.description) {
                    commandText += ': ' + command.description;
                }
                commandText += '\n';
                text += commandText;
            }
            text += '\nCheck details of each command via: `~help command`';
            message.author.send(text);    
        } else {
            var commandName = command.args[0].toLowerCase();
            if (commandName.charAt(0) == '~') commandName = commandName.substring(1);

            for(var i=0;i<bot.commands().length;i++) {
                var command2 = bot.commands()[i];
                if (!command2.names || !command2.names.includes(commandName)) continue;

                var text = 'Usage: ' + (command2.usage || 'Missing details') + '\n';
                message.channel.send(text);
                return;    
            }
            message.channel.send('No information of `' + commandName + '`.');
        }
    }
}
