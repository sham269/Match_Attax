

const Discord = require("discord.js");
const mongoose = require('mongoose')
const User = require('../models/user.js')
const Card = require('../models/card.js')
const nf = new Intl.NumberFormat()
const cooldowns = new Map();
require('dotenv').config();

mongoose.connect('mongodb+srv://ace:cWzlTNuTngtUDkL9@cluster0.o6xna.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true})

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
    message.channel.send({ embeds: [cooldownEmbed]});
    } else {
      User.findOne({userId: message.author.id}, (err, user) => {
        //ARRAY
        let keeper = []
        let defs = []
        let mids = []
        let atts = []
        let combinedValue = 0
        let combinedRating = 0
        let combinedStats = 0
        if(err){
          console.log("error");
        }
         if (!user) {
              const newMoney = new User({
                
                username:message.author.username,
                userId: message.author.id,
                userBalance: 0,
                userArenaRank: 50,
                ownedCards: [],
              userStarterTeam: [],
                totalStats: 0,
              totalRating:0,
              teamName:"Reph is bad",
              dailyStreak:0
              });
      
              newMoney.save().catch((err) => console.log(err));
                 const recordembed = new Discord.MessageEmbed() 
					.setColor(2105893)
					.setDescription('Your Urfa Guru account has been               created ' + `*${message.author.username}*`)
				
					 message.channel.send({embeds: [recordembed]})
            } 

      else{
        
        //ADDS THE PLAYERS TO THE ARRAY AND DISPLAYS 
         let objectIdArray = user.userStarterTeam.map(s => mongoose.Types.ObjectId(s));
        Card.find({"_id": {$in: objectIdArray}}, function (err, docs) {
          
          for (let i=0;i < docs.length;i++) {
            if (docs[i].cardPosition === 'GK'&& keeper.length==0) {
              var totalstats = docs[i].cardStat1 + docs[i].cardStat2 + docs[i].cardStat3 + docs[i].cardStat4 + docs[i].cardStat5 + docs[i].cardStat6
              
              var rcv2 = nf.format(docs[i].cardValue)
              var string = '`' + docs[i].cardName + '` | `' + docs[i].cardRating + '` | `' + rcv2 + '` | `' + docs[i].cardPosition + '` | `'+ totalstats +  '`\n'
              keeper.push(string)
              combinedValue = combinedValue + Number(docs[i].cardValue)
              combinedRating = combinedRating + docs[i].cardRating
              combinedStats = combinedStats + totalstats
              
            } else if (docs[i].cardPosition === 'LB' || docs[i].cardPosition === 'CB' || docs[i].cardPosition === 'RB' ||user.userStarterTeam<=9) {
               var totalstats = docs[i].cardStat1 + docs[i].cardStat2 + docs[i].cardStat3 + docs[i].cardStat4 + docs[i].cardStat5 + docs[i].cardStat6
              var rcv2 = nf.format(docs[i].cardValue)
              var string = '`' + docs[i].cardName + '` | `' + docs[i].cardRating + '` | `' + rcv2 + '` | `' + docs[i].cardPosition + '` | `' + totalstats + '`\n'
              defs.push(string)
             
               
              
              combinedValue = combinedValue + Number(docs[i].cardValue)
              combinedRating = combinedRating + docs[i].cardRating
                combinedStats = combinedStats + totalstats
            } else if (docs[i].cardPosition === 'CM' || docs[i].cardPosition === 'CAM' || docs[i].cardPosition === 'CDM' || docs[i].cardPosition === 'LM' || docs[i].cardPosition === 'RM' || user.userStarterTeam<=9) {

              var totalstats = docs[i].cardStat1 + docs[i].cardStat2 + docs[i].cardStat3 + docs[i].cardStat4 + docs[i].cardStat5 + docs[i].cardStat6
              var rcv2 = nf.format(docs[i].cardValue)
              var string = '`' + docs[i].cardName + '` | `' + docs[i].cardRating + '` | `' + rcv2 + '` | `' + docs[i].cardPosition + '` | `' + totalstats + '`\n'
              mids.push(string)
              combinedValue = combinedValue + Number(docs[i].cardValue)
              combinedRating = combinedRating + docs[i].cardRating
                combinedStats = combinedStats + totalstats
            } else if (docs[i].cardPosition === 'RW' || docs[i].cardPosition === 'ST' || docs[i].cardPosition === 'LW'|| docs[i].cardPosition==='CF'|| user.userStarterTeam<=9) {
            var totalstats = docs[i].cardStat1 + docs[i].cardStat2 + docs[i].cardStat3 + docs[i].cardStat4 + docs[i].cardStat5 + docs[i].cardStat6
              var rcv2 = nf.format(docs[i].cardValue)
              var string = '`' + docs[i].cardName + '` | `' + docs[i].cardRating + '` | `' + rcv2 + '` | `' + docs[i].cardPosition +'` | `'+ totalstats+ '`\n'
              atts.push(string)
              combinedValue = combinedValue + Number(docs[i].cardValue)
              combinedRating = combinedRating + docs[i].cardRating
                combinedStats = combinedStats + totalstats
            }
            else{
              console.log("Player must be removed");
              
            }
            
          }
          var fcv = nf.format(combinedValue)
          user.totalStats = combinedStats
          user.totalRating = combinedRating
          console.log(user.totalStats)
          user.save().catch(err => console.log(err))
          const elevenEmbed = new Discord.MessageEmbed()
      .setColor(6355594)
      .setAuthor(user.teamName)
      .setTitle(message.author.username + ' first team:')
      .setDescription('`Name` ' + '`Rating` ' + '`Value` ' + '`Position`\n\n**Goalkeeper :gloves:**\n' + keeper.join("") + '\n**Defenders :shield:**\n' + defs.join("") + '\n**Midfielders :foot:**\n' + mids.join("") + '\n**Forwards :soccer:**\n' + atts.join("") + '\n\nOverall Team Rating: `' + combinedRating + '`\n\n Overall Team Value: `' + fcv + '`\n\n Overall Stats: `'+ combinedStats +'`\n\n**Urfa Sage (Developed by Sham)**')
      .setTimestamp()
      .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL())
      message.channel.send({ embeds: [elevenEmbed]})
      
        })
        if(keeper.length >1){
          console.log("only one keeper allowed")
        }
        /*if (keeper.length === 0) {
          keeper.push('\u200b')
        } else if (defs.length === 0) {
          defs.push('\u200b')
        } else if (mids.length === 0) {
          mids.push('\u200b')
        } else if (atts.length === 0) {
          atts.push('\u200b')
        }*/
      }
      })
  
  cooldowns.set(message.author.id, Date.now() + 5000);
  setTimeout(() => cooldowns.delete(message.author.id), 5000);
  }
}