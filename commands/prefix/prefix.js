const mongo = require('../../mongoose')
const commandPrefixSchema = require('../../schemas/command-prefix-schema')

// Importing command-base so we have access to the
// "updateCache" function which I forgot to cover in the video
const commandBase = require('../command-base')

module.exports = {
  commands: 'changeprefix',
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<your desired prefix>",
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, text) => {
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id
        const prefix = arguments[0]

        await commandPrefixSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            prefix,
          },
          {
            upsert: true,
          }
        )

        message.reply(`The prefix is now ${prefix}`)

        // Update the cache
        commandBase.updateCache(guildId, prefix)
      } finally {
        mongoose.connection.close()
      }
    })
  },
}