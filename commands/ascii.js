const figlet = require('figlet');

module.exports = {
    commands: ['ascii'],
    callback: async (message, client, arguments, text) => {
        if(!arguments[0]) return message.channel.send('Please provide some text');

        msg = arguments.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

            message.channel.send('```' + data + '```')
        })
    }
}