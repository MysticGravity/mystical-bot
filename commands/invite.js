const Discord = require('discord.js')

module.exports = {
    commands: ['invite'],
    callback: async (message, client,arguments, text) => {
        const link = 'https://discord.com/oauth2/authorize?client_id=760307039901057104&scope=bot&permissions=2146958847'
        const embed = new Discord.MessageEmbed()
          .setTitle('Invite Bot')
          .setColor(0x00fff7)
          .setFooter('This bot was made by Mystic#3275')
          .setTimestamp()
          .addFields( {
            name: 'Invite the bot to your server here: ',
            value: `[Click Here](${link})`
        })
        await message.channel.send(embed)
    }
}