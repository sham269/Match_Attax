

// import Discord from 'discord.js';
// const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })



// import chalk from 'chalk';
// import figlet from 'figlet';
// import fs from 'fs';
// import {keepAlive} from './server.js';
// //const mongo = require('mongo.js');
// import {mongo}  from './mongo.js';

const Discord = require('discord.js');
 const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })


const chalk = require('chalk');
const mongoose = require('mongoose')
const nf = new Intl.NumberFormat()
const figlet = require('figlet');
const fs = require('fs');
const keepAlive = require('./server.js');

let commandlist = [];




// const commands = [];
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const command = import (`./commands/${file}`)
// 	commands.push(command.data.toJSON());
// }
fs.readdir('./commands/', async (err, files) => {
    if(err){
        return console.log(chalk.red('An error occured when checking the commands folder for commands to load: ' + err));
    }
    files.forEach(async (file) => {
        if(!file.endsWith('.js')) return;
        let commandFile = `./commands/${file}`;
        commandlist.push({
            file: commandFile,
            name: file.split('.')[0]
        });
    });
});

client.on('ready', async () => {
  console.log(chalk.blue(figlet.textSync('URFA ?', { horizontalLayout: 'full' })));
  console.log(chalk.yellow(`Bot has booted up.\n---\n`
  + `> Users: ${client.users.cache.size}\n`
  + `> Channels: ${client.channels.cache.size}\n`
  + `> Servers: ${client.guilds.cache.size}`));
    client.user.setPresence({
      game: 'with Speed163',
      type: 'PLAYING'
    });
});

// export const run = (message)=>{
//  client.on('message', async (message) => {
//     if (message.author.bot) return;
//     if (message.content === '..') {
//       message.react('777822115558588437')
//     }
//     if (!message.content.startsWith(process.env.prefix)) return;
//     const args = message.content.slice(process.env.prefix.length).split(' ');
//     const commandName = args[0].toLowerCase();
//     args.shift();
//     const command = commandlist.findIndex((cmd) => cmd.name === commandName);
//     if(command == -1) return;
//      const command1 = import(commandlist[command].file);
     
//  });
// }
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content === '..') {
      message.react('777822115558588437')
    }
    if (!message.content.startsWith(process.env.prefix)) return;
    const args = message.content.slice(process.env.prefix.length).split(' ');
    const commandName = args[0].toLowerCase();
    args.shift();
    const command = commandlist.findIndex((cmd) => cmd.name === commandName);
    if(command == -1) return;
    
    
    const command1 =require (commandlist[command].file)
    command1.run(client,message,args)
    
})
    
//     //commandlist[command].file.run(client, message, args);
//     //console.log(commandlist[command])
//     //await mongoose().then((mongoose)=>{
//  // try{
//    // console.log('Connected');
//   //}
//   //finally{
//   //  mongoose.connection.close();
//  // }
// //})
// });
// };

 



keepAlive();

client.on('clickButton', async(button)=>{
      console.log(button)
    })

client.login(process.env.token);