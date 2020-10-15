const Discord = require('discord.js');
module.exports = {
commands: ['purge', 'clear'],
expectedArgs: '<number>',
minArgs: 1,
maxArgs: 1,
callback: (message, client, arguments, text) => {
    if(message.deletable) {
        message.delete();
    }


if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.reply("You don't have permission to use this command.").then(m => m.delete(5000));

}

if (isNaN(arguments[0]) || parseInt(arguments[0]) <= 0) {
return message.reply("Thats not a number.").then(m => m.delete(5000));
}

if (!message.guild.me.hasPermission("MANAGE_MESSAGES")){
return message.reply('Please give me the "Manage Messages" permissions so I can delete messages.').then(m => m.delete(5000));

}
let deleteAmount;

if(parseInt(arguments[0]) > 100) {
deleteAmount = 100;
} else{
deleteAmount = parseInt(arguments[0]);
}

message.channel.bulkDelete(deleteAmount, true)
.then(deleted => message.channel.send(`Successfully deleted \`${deleted.size}\` messages.`).then(msg => {msg.delete({ timeout: 3000})}))
.catch(err => message.reply(`Something went wrong... ${err}`))



}

}