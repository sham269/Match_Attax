// import express from 'express';
// const server = express();
// import path from 'path'
// const router = express.Router();


// server.all('/', (req, res) => {
//     res.send('OK')
//     router.get('/',function(req,res){
//       res.sendFile(path.join(__dirname+'/index.html'));
//     });
// });

// export function keepAlive() {
//     server.listen(process.env.port, () => {
//         console.log('Your app is currently listening on port: ' + process.env.port);
//     });
// }


const express = require('express');
const server = express();
const path = require('path');
const router = express.Router();


server.all('/', (req, res) => {
    res.send('OK')
    router.get('/',function(req,res){
      res.sendFile(path.join(__dirname+'/index.html'));
    });
});

function keepAlive() {
    server.listen(process.env.port, () => {
        console.log('Your app is currently listening on port: ' + process.env.port);
    });
}


module.exports = keepAlive;