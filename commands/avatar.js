const Discord = require('discord.js');
module.exports = {
    commands: ['avatar', 'av'],
    callback: (message, client, arguments, text) => {
        let user;
  
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else if (arguments[0]) {
          user = message.guild.members.cache.get(arguments[0]).user;
        } else {
          user = message.author;
        }
        
        let avatar = user.displayAvatarURL({size: 4096, dynamic: true});
        // 4096 is the new biggest size of the avatar.
        // Enabling the dynamic, when the user avatar was animated/GIF, it will result as a GIF format.
        // If it's not animated, it will result as a normal image format.
        
        const embed = new Discord.MessageEmbed()
        .setTitle(`${user.tag} avatar`)
        .setDescription(`[Avatar URL of **${user.tag}**](${avatar})`)
        .setColor(0x00fff7)
        .setImage(avatar)
        
        return message.channel.send(embed);
    },
    permissions: [],
    requiredRoles: [],
}