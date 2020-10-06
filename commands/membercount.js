const Discord = require('discord.js');

module.exports = {
    commands: ['members','membercount','mc'],
    callback: (message, client,arguments, text) => {
        const thememberCount = message.guild.memberCount;
        message.channel.send(`A total of ${thememberCount} members in **${message.guild.name}**.`)
    }
}