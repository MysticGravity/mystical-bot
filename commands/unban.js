const Discord = require('discord.js');

module.exports = {
    commands: ['unban'],
    expectedArgs: '<userid>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, client,arguments, text) => {
        if (!message.member.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR")) return;
        if (!message.guild.me.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR")) return message.channel.send('I don\'t have the right permissions to unban. Please grant me ban permissions.')
        
        const member = arguments[0];

        if (!member) {
             return message.channel.send(`Please enter a id!`)
        }

        try {
            message.guild.fetchBans().then(bans => {
                message.guild.members.unban(member)
            })
            await message.channel.send(`${member} has been unbanned!`)
        } catch (e) {
            return message.channel.send(`An error occured!`)
        }

    },
    permissions: ['BAN_MEMBERS']
}