const Discord = require('discord.js')

module.exports = {
    commands: ['unmute'],
    expectedArgs: '<user>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, client,arguments, text) => {
        if(!message.member.hasPermission("MUTE_MEMBERS")) return;
        if(!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send(`I don\'t have permission to mute. Please give me mute members permission.`)
        let member = message.mentions.users.first() || message.guild.members.cache.get(arguments[0]);
        if (!arguments[0]) return message.channel.send('Please specify a user!');
        if (!member) return message.channel.send('I can\'t find the user you are trying to mute!');
        if (!member.bannable) return message.channel.send('This user can\'t be muted. They are either a admin/mod or their role is higher than mine.');
        if (member.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR" || "MUTE_MEMBERS")) return message.channel.send('You can\'t mute this user.')
        if (member.id === message.author.id) return message.channel.send('You can\'t mute yourself!');


        let muterole = message.guild.roles.cache.find(role => role.name == 'Muted')
        if(!member.roles.cache.find(role => role.name == 'Muted')) return message.channel.send('This user is not muted.')
        member.roles.remove(muterole);
        member.send(`You were unmuted in the server **${message.guild}**.`)
        message.channel.send(`${member} has been unmuted.`)
    },
    permissions: ['MUTE_MEMBERS']
}