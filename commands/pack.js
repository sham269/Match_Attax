const Discord = require("discord.js");
const mongoose = require('mongoose')
const User = require('../models/user.js')
const Card = require('../models/card.js')
   const nf = new Intl.NumberFormat()
const {
  MessageEmbed,
  Message,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
require('dotenv').config();
const cooldowns = new Map();
mongoose.connect(
'mongodb+srv://ace:cWzlTNuTngtUDkL9@cluster0.o6xna.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true})

exports.run = async (client, message, args) => {


 function weightedRand2(spec) {
         var i, sum=0, r=Math.random();
         for (i in spec) {
           sum += spec[i];
      if (r <= sum) return i;

         }


 }
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
  }
  
    else{
      Card.count().exec(async function (err, count) {
      if(args[0]=="heroes"||args[0]=="Heroes"){
      var  wr2 = weightedRand2({"Rookie":1})
      }
      else if(args[0]=="rookie"||args[0]=="Rookie"){
      var  wr2 = weightedRand2({"Rookie":1})
      }

      Card.find({'cardLeague': wr2}, async function (err, docs) {
        console.log("wr2 during finding card: " + wr2)
       User.findOne({ userId: message.author.id },async (err, user) => {
        console.log(docs.length)
         if (!user) {
              const newMoney = new User({
                
                userId: message.author.id,
                userBalance: 0,
                userArenaRank: 50,
                ownedCards: [],
                userStarterTeam: [],
              });
              newMoney.save().catch((err) => console.log(err));
                const recordembed = new Discord.MessageEmbed() 
					.setColor(2105893)
					.setDescription('Your Pack Guru account has been created ' + `*${message.author.username}*`)
				
					 message.channel.send({embeds: [recordembed]})
            } 
      //else statement
      else{
        var item = docs[Math.floor(Math.random() * docs.length)];
         if(args[0]=="heroes"||args[0]=="Heroes"){
            const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("Yes")
            .setLabel("Buy")
            .setEmoji("✔️")
            .setStyle("PRIMARY"),
          new MessageButton()
            .setCustomId("No")
            .setLabel("Cancel")
            .setEmoji("❌")
            .setStyle("SECONDARY"),
      
            
        );
           const id2= "<@" + message.author.id + ">"
        console.log(id2)
        const claimEmbed = new MessageEmbed()
          
          .setTitle("PACK GURU")
          .setColor(6355594)
          .setDescription(`${id2}` + '\n' + 'Do you want to buy the Heroes Pack')
            
          
        
        
        const m = await message.channel.send({
          embeds: [claimEmbed],
          components: [row],
        });

        const collector = m.createMessageComponentCollector({
          max: 5,
          time: 60000,
        });
           
         }
        
        if(args[0]=="rookie"||args[0]=="Rookie"){
             const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("Yes")
            .setLabel("Buy")
            .setEmoji("✔️")
            .setStyle("PRIMARY"),
          new MessageButton()
            .setCustomId("No")
            .setLabel("Cancel")
            .setEmoji("❌")
            .setStyle("SECONDARY"),
      
            
        );
           const id2= "<@" + message.author.id + ">"
        console.log(id2)
        const claimEmbed = new MessageEmbed()
          
          .setTitle("PACK GURU")
          .setColor(6355594)
          .setDescription(`${id2}` + '\n' + 'Do you want to buy the Rookie Pack')
            
          
        
        
        const m = await message.channel.send({
          embeds: [claimEmbed],
          components: [row],
        });

        const collector = m.createMessageComponentCollector({
          max: 5,
          time: 60000,
        });
          collector.on("end", (collected, reason) => {
          // reason can be specified within collector.stop(reason);
          // if collector ends by time, reason is "time"

          console.log("Ended");
        });
        collector.on("collect", async (interaction) => {
            if(interaction.customId=="Yes"){
            await interaction.message.delete()
             const gifembed = new Discord.MessageEmbed()
                .setTitle('Your player is...')
                  .setColor(6355594)
                   .setImage('https://media.discordapp.net/attachments/924979540080607232/924979867261472768/urfa_sage.png')
                .setFooter("URFA Sage")
                
                // await interaction.update({ embeds: [gifembed],timeout:3000} )
                 // .then(async msg => {
                 //   await interaction.deleteReply({ timeout: 3000 })
                   
                   
               // })
                //.catch(console.log("error"))
                  message.channel.send({ embeds: [gifembed]})
                 
                    message.channel.delete({ timeout: 3000 
                })
                .catch(console.log("error"))
                setTimeout(function(){ 

                  
                   const claimEmbed = new Discord.MessageEmbed()
                    .setTitle(item.cardName + ' Joins Your 11!')
                  .setColor(6355594)
                   .setDescription('**Card Sell Value:** ' + item.carSellValue + '⬡ ')
                .setFooter("URFA Sage")
                 .setImage(item.cardImageLink);
                message.channel.send({ embeds: [claimEmbed]})

                //Code
                 }, 3300)
            }



          
        })
        }
      }
         
       })
       })
      })
    
  
//  cooldowns.set(message.author.id, Date.now() + 15000);
//  setTimeout(() => cooldowns.delete(message.author.id), 15000);
}
} 