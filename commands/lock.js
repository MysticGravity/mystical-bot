const Discord = require('discord.js');

module.exports = {
    commands: ['lock'],
    expectedArgs: '<on/off>',
    callback: (message, client, arguments, text) => {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if(!message.member.hasPermission("ADMINISTRATOR") || !message.guild.owner) return;
        if (arguments[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            })
            return message.channel.send('locked all channels');
        } else if (arguments[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
            })
            return message.channel.send('unlocked all channels')
        }
    },
    permissions: ['ADMINISTRATOR']
}