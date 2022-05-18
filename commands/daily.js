const Discord = require("discord.js");
const mongoose = require('mongoose')
const User = require('../models/user.js')
const Card = require('../models/card.js')
const cooldowns = new Map();
const nf = new Intl.NumberFormat()
require('dotenv').config();

mongoose.connect('mongodb+srv://URFAGuruUser:abdul251SGsucks@urfaguru.2g5kh.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true})

exports.run = async (client, message, args) => {
  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {
    const remaining = (cooldown - Date.now());
    let h,m,s;
    h = Math.floor(remaining/1000/60/60);
    m = Math.floor((remaining/1000/60/60 - h)*60);
    s = Math.floor(((remaining/1000/60/60 - h)*60 - m)*60);

    s < 10 ? s = `0${s}`: s = `${s}`
    m < 10 ? m = `0${m}`: m = `${m}`
    h < 10 ? h = `0${h}`: h = `${h}`

    const cooldownEmbed = new Discord.MessageEmbed()
    .setColor(16735840)
    .setDescription('You have just used this command. Try again in `' + `${h}` + ':' + `${m}` + ':' + `${s}` + '`.')
    message.channel.send({ embeds: [cooldownEmbed] });
  } else {
   User.findOne({
         userId: message.author.id
            }, (err, user) => {
          if(err) console.log(err)
          else{
              user.userCredits = user.userCredits + 2000
        user.save().catch(err => console.log(err))
        const dailyEmbed = new Discord.MessageEmbed()
          .setColor(5355891)
          .setDescription('2000 ⬡ Claimed!')

          .setFooter('URFA Sage')
        //SHAM ADD EMBED FORMATTING
        message.channel.send({embeds:[dailyEmbed]})
          }
            
     })
    
  }

  cooldowns.set(message.author.id, Date.now() + 86400000);
  setTimeout(() => cooldowns.delete(message.author.id), 86400000);
}