const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
  cardName: String,
  cardPosition: String,
  cardRating: Number,
  cardValue: String,
  cardSellValue: Number,
  cardStat1: Number,
  cardStat2: Number,
  cardStat3: Number,
  cardStat4: Number,
  cardStat5: Number,
  cardStat6: Number,
  cardImageLink: String,
  cardCountry: String,
  cardTeam: String
},
{typeKey: '$cardSellValue'}
)

module.exports = mongoose.model("Card", cardSchema)