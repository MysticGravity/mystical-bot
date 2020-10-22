const Discord = require('discord.js');
module.exports = {
    commands: ['profile'],
    callback: async (message, client, arguments, text) => {
      let user = message.mentions.members.first() || message.guild.members.cache.get(arguments[0]) || message.member;

      let status;
      switch (user.presence.status) {
          case "online":
              status = "Online";
              break;
          case "dnd":
              status = "Do not disturb";
              break;
          case "idle":
              status = "Idle";
              break;
          case "offline":
              status = "Offline";
              break;
      }

      const embed = new Discord.MessageEmbed()
          .setTitle(`${user.user.username} stats`)
          .setColor(0x00fff7)
          .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
          .setFooter('This bot was made by Mystic#3275')
          .setTimestamp()
          .addFields(
              {
                  name: "Name: ",
                  value: user.user.username,
                  inline: true
              },
              {
                  name: "Tag: ",
                  value: `#${user.user.discriminator}`,
                  inline: true
              },
              {
                  name: "ID: ",
                  value: user.user.id,
              },
              {
                  name: "Current Status: ",
                  value: status,
                  inline: true
              },
              {
                  name: "Activity: ",
                  value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`,
                  inline: true
              },
              {
                  name: 'Avatar link: ',
                  value: `[Click Here](${user.user.displayAvatarURL()})`
              },
              {
                  name: 'Creation Date: ',
                  value: user.user.createdAt.toLocaleDateString("en-us"),
                  inline: true
              },
              {
                  name: 'Joined Date: ',
                  value: user.joinedAt.toLocaleDateString("en-us"),
                  inline: true
              },
              {
                  name: 'User Roles: ',
                  value: user.roles.cache.map(role => role.toString()).join(" ,"),
                  inline: true
              }
          )

      await message.channel.send(embed)
  }
}