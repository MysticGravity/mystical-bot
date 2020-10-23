const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const mongoose = require('mongoose');
const client = new Discord.Client().setMaxListeners(100);

const config = require('./config.json')
const { setMaxListeners } = require('process')
const levels = require('./features/levels')


client.on('ready', async () => {
  console.log('Bot Started')

  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }

  readCommands('commands')
  levels(client)
})

client.login(config.token) 