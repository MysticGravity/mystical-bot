const Discord = require('discord.js');

module.exports = {
    commands: ['cmds','commands','cmds'],
    callback: (message, client, arguments, text) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('List of Commands:') 
        .setColor(0x00fff7)
        .addField('Cmds/Commands', 'Shows a list of commands')
        .addField('Ban', 'Must have ban permissions')
        .addField('Kick', 'Must have kick permissions')
        .addField('Help', 'Shows you who to dm if bot has issues')
        .addField('Info', 'Shows info on the bot')
        .setFooter('This bot was made by Mystic#3275')
        .setTimestamp()
        
        message.channel.send(embed);
        
    }
}