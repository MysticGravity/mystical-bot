const Discord = require('discord.js');

module.exports = {
    commands: ['ban'],
    expectedArgs: '<user> <reason>',
    minArgs: 2,
    callback: (message, client, arguments, text) => {
        if (!message.member.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR")) return;
        if (!message.guild.me.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR")) return message.channel.send('I don\'t have the right permissions to ban. Please grant me ban permissions.')
        
        const member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0]);

        if (!arguments[0]) return message.channel.send('Please specify a user!');

        if (!member) return message.channel.send('I can\'t find the user you are trying to ban!');
        if (!member.bannable) return message.channel.send('This user can\'t be banned. They are either a admin/mod or their role is higher than mine.');
        if (member.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR")) return message.channel.send('You can\'t ban this user.')
        if (member.id === message.author.id) return message.channel.send('You can\'t ban yourself!');

        let reason = arguments.slice(1).join(" ");

        if (!reason) return message.channel.send('Please provide a reason.');

        member.send(`You were banned from the server **${message.guild}** by ${message.author}, reason: ${reason}`)
        member.ban()
            .catch(err => {
                if (err) return message.channel.send('Something went wrong.')
            })
        const banembed = new Discord.MessageEmbed()
            .setTitle('Member Banned')
            .setColor(0x00fff7)
            .setThumbnail(member.user.displayAvatarURL())
            .addField('User Banned', member)
            .addField('Banned by', message.author)
            .addField('Reason', reason)
            .setFooter('Mystical Bot: Made by Mystic#3275', client.user.displayAvatarURL())
            .setTimestamp()

        message.channel.send(banembed);
    },
    permissions: ['BAN_MEMBERS']
}