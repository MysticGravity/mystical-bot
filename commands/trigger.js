const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
module.exports = {
    commands: ['trigger'],
    expectedArgs: '<user>',
    callback: async (message, client, arguments, text) => {
        let user = message.mentions.users.first() || message.guild.members.cache.get(arguments[0]) || message.author;
        let triggered = await canvacord.Canvas.trigger(user.displayAvatarURL({ format: "png", dynamic: false }));
        let attachment = new MessageAttachment(triggered, "triggered.gif");
        return message.channel.send(attachment);
	},
};