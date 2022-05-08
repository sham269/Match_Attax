// import mongoose from 'mongoose'
// //const {mongoPath} = require('server.js')
// const mongoPath = 'mongodb+srv://URFAGuruUser:abdul251SGsucks@urfaguru.2g5kh.mongodb.net/test'

// export function mongo(){
//    mongoose.connect(mongoPath,{
//     useNewUrlParser : true,
//     useUnifiedTopology : true,
//   })
//   return mongoose
// }
// mongoose.connection.on('connected',() => {
//   console.log('Mongoose Connection Successful');
// });

// mongoose.connection.on('err', err=>{
//   console.error(`Mongoose connection error: \n {$err.stack}`);
// });


const mongoose = require('mongoose')
//const {mongoPath} = require('server.js')
const mongoPath = 'mongodb+srv://URFAGuruUser:abdul251SGsucks@urfaguru.2g5kh.mongodb.net/test'

module.exports = async()=> {
  await mongoose.connect(mongoPath,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
  })
  return mongoose
}
mongoose.connection.on('connected',() => {
  console.log('Mongoose Connection Successful');
});

mongoose.connection.on('err', err=>{
  console.error(`Mongoose connection error: \n {$err.stack}`);
});