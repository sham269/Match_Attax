const Discord = require("discord.js");
const mongoose = require('mongoose')
const User = require('../models/user.js')
const Card = require('../models/card.js')
const cooldowns = new Map();
const {
  MessageEmbed,
  Message,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
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
    message.channel.send(cooldownEmbed);
  } else {
    Card.find({ 'cardName': message.content.substr("urfa!buy ".length) }).sort({"cardRating": -1}).exec( async function (err, docs) {
      
      if (docs[0] && docs[0].cardName === message.content.substr("urfa!buy ".length)) {
        var i = 0
        var totalstats = docs[i].cardStat1 + docs[i].cardStat2 + docs[i].cardStat3 + docs[i].cardStat4 + docs[i].cardStat5 + docs[i].cardStat6

        
        var rcv = nf.format(docs[i].cardValue)
        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("back")
            .setLabel("Back")
            .setEmoji("◀️")
            .setStyle("PRIMARY"),
          new MessageButton()
            .setCustomId("next")
            .setLabel("Next")
            .setEmoji("▶️")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId("bu")
            .setLabel("Buy")
            .setEmoji("✅")
            .setStyle("SECONDARY")
            
        );
        var i = 0
        var totalstats = docs[i].cardStat1 + docs[i].cardStat2 + docs[i].cardStat3 + docs[i].cardStat4 + docs[i].cardStat5 + docs[i].cardStat6
        
       
        var rcv = nf.format(docs[i].cardValue)
        const buyEmbed = new Discord.MessageEmbed() 
        .setColor(6355594)
        .setTitle(`Please select the card you're looking for:`)
        .setDescription('`Price: ' + rcv + ' credits`')
        .setImage(docs[i].cardImageLink)
        .setFooter(`Reactions will be collected for 1 minute || Overall stats: `+`${totalstats}`)

            const m = await message.channel.send({
          embeds: [buyEmbed],
          components: [row],
        });

        const collector = m.createMessageComponentCollector({
        
          time: 60000,
        });
        
        collector.on("end", (collected, reason) => {
          // reason can be specified within collector.stop(reason);
          // if collector ends by time, reason is "time"

          console.log("Ended");
        });
        collector.on("collect", async (interaction) => {
             if (interaction.customId == "back") {
               if (interaction.user.id === message.author.id) {
                //console.log("Back has been pressed")
                 //collector.stop();
                  if (i > 0) {
                 i = i - 1
                 var totalstats2= docs[i].cardStat1 + docs[i].cardStat2 + docs[i].cardStat3 + docs[i].cardStat4 + docs[i].cardStat5 + docs[i].cardStat6
                 var rcv2 = nf.format(docs[i].cardValue)
                 const newBuyEmbed = new Discord.MessageEmbed() 
                .setColor(6355594)
                .setTitle(`Please select the card you're looking for:`)
                .setDescription('`Price: ' + rcv2 + ' credits`')
                .setImage(docs[i].cardImageLink)
                .setFooter(`Reactions will be collected for 1 minute || Overall stats: `+`${totalstats2}`)
                await interaction.update({ embeds: [newBuyEmbed] })
                  }
                  else{
                   i = 0
                 var totalstats3 = docs[i].cardStat1 + docs[i].cardStat2 + docs[i].cardStat3 + docs[i].cardStat4 + docs[i].cardStat5 + docs[i].cardStat6
                 var rcv2 = nf.format(docs[i].cardValue)
                 const newBuyEmbed = new Discord.MessageEmbed() 
                .setColor(6355594)
                .setTitle(`Please select the card you're looking for:`)
                .setDescription('`Price: ' + rcv2 + ' credits`')
                .setImage(docs[i].cardImageLink)
                .setFooter(`Reactions will be collected for 1 minute || Overall stats: `+`${totalstats3}`)
                await interaction.update({ embeds: [newBuyEmbed]})
                  }
               }
             }
             else if(interaction.customId == "next"){
                //collector.stop();
                if (docs.length > i+1) {
                i = i + 1
                 var totalstats3 = docs[i].cardStat1 + docs[i].cardStat2 + docs[i].cardStat3 + docs[i].cardStat4 + docs[i].cardStat5 + docs[i].cardStat6
                 var rcv2 = nf.format(docs[i].cardValue)
                 const newBuyEmbed = new Discord.MessageEmbed() 
                .setColor(6355594)
                .setTitle(`Please select the card you're looking for:`)
                .setDescription('`Price: ' + rcv2 + ' credits`')
                .setImage(docs[i].cardImageLink)
                .setFooter(`Reactions will be collected for 1 minute || Overall stats: `+`${totalstats3}`)
                await interaction.update({ embeds: [newBuyEmbed]}) 
               }
               else{
                 i = 0
                 var totalstats3 = docs[i].cardStat1 + docs[i].cardStat2 + docs[i].cardStat3 + docs[i].cardStat4 + docs[i].cardStat5 + docs[i].cardStat6
                 var rcv2 = nf.format(docs[i].cardValue)
                 const newBuyEmbed = new Discord.MessageEmbed() 
                .setColor(6355594)
                .setTitle(`Please select the card you're looking for:`)
                .setDescription('`Price: ' + rcv2 + ' credits`')
                .setImage(docs[i].cardImageLink)
                .setFooter(`Reactions will be collected for 1 minute || Overall stats: `+`${totalstats3}`)
                await interaction.update({ embeds: [newBuyEmbed]})

               }

             
             }
            else if(interaction.customId == "bu"){
              collector.stop()
             
            
             User.findOne({
                      userId: message.author.id
                    },async (err, money) => {

                        // let objectIdArray2 = money.ownedCards.map(s => mongoose.Types.ObjectId(s));
                        // console.log(objectIdArray2)

                        console.log(money.ownedCards)
                        console.log(docs[i])
                        let array = money.ownedCards
                        if (money.userBalance < docs[i].cardValue) {
                      
                       const nemEmbed = new Discord.MessageEmbed()
                        .setColor(16774510)
                        .setImage(docs[i].cardImageLink)
                        .setDescription(`You don't have enough credits to buy this player.`)
                        await interaction.reply({ embeds: [nemEmbed]})

                        }
                        else if(array.includes(docs[i]._id)){
                            const dupe = new Discord.MessageEmbed()
                        .setColor(6355594)
                        .setDescription(docs[i].cardName + '         is already in your team `')
                        .setImage(docs[i].cardImageLink)
                      
                        
                        await interaction.reply({ embeds: [dupe]})
                        
                        }
                        else{
                         
                         rcv = nf.format(docs[i].cardValue)
                        const boughtEmbed = new Discord.MessageEmbed()
                        .setColor(6355594)
                        .setDescription(docs[i].cardName + ' has joined your club for `' + rcv + '` credits')
                        .setImage(docs[i].cardImageLink)
                        money.userBalance = money.userBalance - docs[i].cardValue
                        money.ownedCards.push(docs[i]._id)
                        money.save().catch(err => console.log(err))
                        await interaction.reply({ embeds: [boughtEmbed]})
                      
                        }
                    })

            }
            

        })
       
       }
       else{
          const noCardEmbed = new Discord.MessageEmbed() 
                .setColor(2105893)
                .setDescription('No 2022 player with the name `' + `${message.content.substr("urfa!buy ".length)}` + '` was found to buy.\nPlease use the exact name that appears on the card.')
                message.channel.send({ embeds: [noCardEmbed]})
      }
    })
  }
  
}