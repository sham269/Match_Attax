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
  MessageSelectMenu
} = require("discord.js");
const client = require("../index.js")
require('dotenv').config();
const cooldowns = new Map();
mongoose.connect(
  'mongodb+srv://ace:cWzlTNuTngtUDkL9@cluster0.o6xna.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })

exports.run = async (client, message, args) => {


  function weightedRand2(spec) {
    var i, sum = 0, r = Math.random();
    for (i in spec) {
      sum += spec[i];
      if (r <= sum) return i;

    }


  }
  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {
    const remaining = (cooldown - Date.now());
    let h, m, s;
    h = Math.floor(remaining / 1000 / 60 / 60);
    m = Math.floor((remaining / 1000 / 60 / 60 - h) * 60);
    s = Math.floor(((remaining / 1000 / 60 / 60 - h) * 60 - m) * 60);

    s < 10 ? s = `0${s}` : s = `${s}`
    m < 10 ? m = `0${m}` : m = `${m}`
    h < 10 ? h = `0${h}` : h = `${h}`

    const cooldownEmbed = new Discord.MessageEmbed()
      .setColor(16735840)
      .setDescription('You have just used this command. Try again in `' + `${h}` + ':' + `${m}` + ':' + `${s}` + '`.')
    message.channel.send(cooldownEmbed);
  }

  else {

    User.findOne({ userId: message.author.id }, async (err, user) => {
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

        message.channel.send({ embeds: [recordembed] })
      }
      //else statement
      else {
        // console.log("Hello")
        const row = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("menu1")
            .setPlaceholder("Choose")
            .setDisabled(false)

            .addOptions([
              {
                label: "Pack 1 - Rookie",
                value: `Rookie`,
                description: "Rookie Pack",


              },
              {
                label: "Pack 2 - Heroes",
                value: "Heroes",
                description: "This is the Heroes Pack"
              },
              {
                label: "Pack 3 - Icons",
                value: "Icons",
                description: "This is the Icons Pack"
              }
            ])
        );
        const embed1 = new MessageEmbed().setTitle("Choose a pack")
        message.channel.send({ embeds: [embed1], components: [row] });
        const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id

        const collector = message.channel.createMessageComponentCollector({
          filter,
          max: 1,
        })
        collector.on('collect', async (collected) => {
          const value = collected.values[0];
          Card.count().exec(async function(err, count) {
            if (value == "Rookie") {
              var wr2 = weightedRand2({ "Rookie": 1 })
            }
            else if (value == "Icons") {
              var wr2 = weightedRand2({ "Icons": 1 })
            }
            else if (value == "Heroes") {
              var wr2 = weightedRand2({ "Heroes": 1 })
            }

            Card.find({ 'cardLeague': wr2 }, async function(err, docs) {
              console.log("wr2 during finding card: " + wr2)


              collected.deleteReply()
              collected.deferUpdate();
              //console.log(collected)
              //collected.channel.send({content:value})
              if (value === "Rookie") {
                var item = docs[Math.floor(Math.random() * docs.length)];
                const claimEmbed = new Discord.MessageEmbed()
                  .setTitle(item.cardName + ' Joins Your 11!')
                  .setColor(6355594)
                  .setDescription('**Card Sell Value:** ' + item.cardSellValue + ' ⬡ ')
                  .setFooter("URFA Sage")
                  .setImage(item.cardImageLink);
                message.channel.send({ embeds: [claimEmbed] })
              }
              else if (value === "Icons") {
                var item = docs[Math.floor(Math.random() * docs.length)];
                const claimEmbed = new Discord.MessageEmbed()
                  .setTitle(item.cardName + ' Joins Your 11!')
                  .setColor(6355594)
                  .setDescription('**Card Sell Value:** ' + item.cardSellValue + ' ⬡ ')
                  .setFooter("URFA Sage")
                  .setImage(item.cardImageLink);
                message.channel.send({ embeds: [claimEmbed] })
              }
              else if (value === "Heroes") {
                var item = docs[Math.floor(Math.random() * docs.length)];
                const claimEmbed = new Discord.MessageEmbed()
                  .setTitle(item.cardName + ' Joins Your 11!')
                  .setColor(6355594)
                  .setDescription('**Card Sell Value:** ' + item.cardSellValue + ' ⬡ ')
                  .setFooter("URFA Sage")
                  .setImage(item.cardImageLink);
                message.channel.send({ embeds: [claimEmbed] })
              }
            })
          })













        })
      }
    })


  }
}
