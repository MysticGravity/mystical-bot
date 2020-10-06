const Discord = require('discord.js');

module.exports = {
    commands: ['info'],
    callback: (message, client, arguments, text) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Bot Information:') 
        .setColor(0x00fff7)
        .addField('Current Version:', '1.0.0')
        .setFooter('This bot was made by Mystic#3275')
        .setTimestamp()
        message.channel.send(embed);
        
    }
}