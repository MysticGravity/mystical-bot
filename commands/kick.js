const Discord = require('discord.js');

module.exports = {
    commands: ['kick'],
    expectedArgs: '<user> <reason>',
    minArgs: 2,
    callback: (message, client, arguments, text) => {
        if (!message.member.hasPermission("KICK_MEMBERS" || "ADMINISTRATOR")) return;
        if (!message.guild.me.hasPermission("KICK_MEMBERS" || "ADMINISTRATOR")) return message.channel.send('I don\'t have the right permissions to kick. Please grant me kick permissions.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0]);

        if (!arguments[0]) return message.channel.send('Please specify a user!');

        if (!member) return message.channel.send('I can\'t find the user you are trying to kick!');
        if (!member.kickable) return message.channel.send('This user can\'t be kicked. They are either a admin/mod or their role is higher than mine.');
        if (member.hasPermission("KICK_MEMBERS" || "ADMINISTRATOR")) return message.channel.send('You can\'t kick this user.')
        if (member.id === message.author.id) return message.channel.send('You can\'t kick yourself!');

        let reason = arguments.slice(1).join(" ");

        if (!reason) return message.channel.send('Please provide a reason.');

        member.send(`You were kicked from the server **${message.guild}** by ${message.author}, reason: ${reason}`)
        member.kick()
            .catch(err => {
                if (err) return message.channel.send('Something went wrong.')
            })
        const kickembed = new Discord.MessageEmbed()
            .setTitle('Member Kicked')
            .setColor(0x00fff7)
            .setThumbnail(member.user.displayAvatarURL())
            .addField('User Kicked', member)
            .addField('Kicked by', message.author)
            .addField('Reason', reason)
            .setFooter('Mystical Bot: Made by Mystic#3275', client.user.displayAvatarURL())
            .setTimestamp()

        message.channel.send(kickembed);
    },
    permissions: ['KICK_MEMBERS']
}