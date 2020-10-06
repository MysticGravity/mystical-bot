const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    commands: ['mute'],
    expectedArgs: '<user> <time> <reason>',
    minArgs: 3,
    callback: async (message, client, arguments, text) => {
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(`You don\'t have permission to use this command.`)
        if(!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send(`I don\'t have permission to mute. Please give me mute members permission.`)
        const member = message.mentions.members.first() || message.guild.members.cache.get(arguments[1]);
        if (!arguments[0]) return message.channel.send('Please specify a user!');

        if (!member) return message.channel.send('I can\'t find the user you are trying to mute!');
        if (!member.bannable) return message.channel.send('This user can\'t be muted. They are either a admin/mod or their role is higher than mine.');
        if (member.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR" || "MUTE_MEMBERS")) return message.channel.send('You can\'t mute this user.')
        if (member.id === message.author.id) return message.channel.send('You can\'t mute yourself!');


        let muterole = message.guild.roles.cache.find(role => role.name == 'Muted')
        let time = arguments[1];
        let reason = arguments.slice(2).join(" ");
        if(!reason) return message.reply('Please enter a reason to mute this user.')
        if(!time) return message.reply('Please enter a time you want to mute the user for. s = seconds m = minutes h = hours d = days. Example: .mute user 10s test');
        if(!muterole) {
            message.channel.send('I could not find a role called "Muted". I will create the role and mute the user when done.');
            muterole = await message.guild.roles.create({
            data:{
                name: "Muted",
                color: ('#4f4f4f'),
                permissions: []
            }
        })
        message.guild.channels.cache.each(async (channel, id) => {
            await channel.updateOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
}

        member.send(`You were muted in the server **${message.guild}** for **${time}** by ${message.author}, reason: ${reason}`)
        member.roles.add(muterole)
        const banembed = new Discord.MessageEmbed()
            .setTitle('Member Muted')
            .setColor(0x00fff7)
            .setThumbnail(member.user.displayAvatarURL())
            .addField('User Muted', member)
            .addField('Muted by', message.author)
            .addField('Reason', reason)
            .addField('Time', ms(ms(time)))
            .setFooter('Mystical Bot: Made by Mystic#3275', client.user.displayAvatarURL())
            .setTimestamp()

        message.channel.send(banembed);

        
            if(!member.roles.cache.find(role => role.name == 'Muted')) {
                return;
            } else setTimeout(function(){
            member.roles.remove(muterole);
            member.send(`You were unmuted in the server **${message.guild}**.`)
            message.channel.send(`${member} has been unmuted.`)
        }, ms(time));
    },
    permissions: ['MUTE_MEMBERS']
}