const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
module.exports = {
    commands: ['trigger'],
    expectedArgs: '<user>',
    minArgs: 1,
    callback: async (message, client, arguments, text) => {
        let user = message.mentions.users.first() || message.author;
        let triggered = await canvacord.Canvas.trigger(user.displayAvatarURL({ format: "png", dynamic: false }));
        let attachment = new MessageAttachment(triggered, "triggered.gif");
        return message.channel.send(attachment);
	},
};