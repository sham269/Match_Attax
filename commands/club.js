const Discord = require("discord.js");
const mongoose = require('mongoose')
const User = require('../models/user.js')
const Card = require('../models/card.js')
const cooldowns = new Map();
const nf = new Intl.NumberFormat()
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
     message.channel.send({ embeds: [cooldownEmbed] })
  } else {
    User.findOne({
      userId: message.author.id
    }, (err, user) => {
              if (err) console.log(err);
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
        
                
      let objectIdArray = user.ownedCards.map(s => mongoose.Types.ObjectId(s));
      let numPages = Math.ceil(user.ownedCards.length / 10)
      let page = 1
      let totalItemsCount = user.ownedCards.length
      let totalItemsgiven = user.ownedCards.cardName
      let totaltItemscard = user.userStarterTeam
      let numberOfItemsPerPage = 10
      let numberOfPages = Math.floor((totalItemsCount + numberOfItemsPerPage - 1) / numberOfItemsPerPage)
      Card.find({"_id": {$in: objectIdArray}}).sort({"cardRating": -1}).skip(Number((page-1)*10)).exec(function (err, docs) {
        var start = (page * numberOfItemsPerPage) - (numberOfItemsPerPage - 1)
        var end = Math.min(start + numberOfItemsPerPage - 1, totalItemsCount)
        var inventoryArray = []
         var event1 = totalItemsgiven
          console.log(event1);
        for (var i = 0;i < docs.length;i++) {
        var rcv2 = nf.format(docs[i].cardValue)
         
          var string = '`' + parseFloat(i+1) + '.` `' + docs[i].cardName + '` `' + docs[i].cardRating + '` `' + rcv2 + '`\n'
         
          //var event1 = inventoryArray.cardName
          //console.log(event1)
         
          inventoryArray.push(string)
      
        }
        const clubEmbed = new Discord.MessageEmbed()
        .setColor(6355594)
        .setAuthor(user.teamName)
        .setTitle('**`' + message.author.username + ' Team`**')
        .setDescription('`id` `Name` `Rating` `Value` `Page '+ page + '/' + numberOfPages +'`\n\n' + inventoryArray.join("") + '')
        message.channel.send({ embeds: [clubEmbed] })
             
        
        })
            
          
        
      
    }
  
    })

     }
  

    
  // cooldowns.set(message.author.id, Date.now() + 5000);
  // setTimeout(() => cooldowns.delete(message.author.id), 5000);
}



