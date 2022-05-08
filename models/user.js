const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  userId: Number,
  userBalance: Number,
  userArenaRank: Number,
  ownedCards: Array,
  userStarterTeam: Array,
  totalStats:Number,
  totalRating:Number
})

module.exports = mongoose.model("User", userSchema)
