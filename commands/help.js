module.exports = {
    commands: ['help'],
    callback: (message, client, arguments, text) => {
        message.channel.send('If there are any issues with the bot please DM Mystic#3275');
    }
}