require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const api = express();

var {mongoose} = require('./shared/db');
var Room = require('./models/room');

api.use(bodyParser.urlencoded({extended:true}));
api.use(bodyParser.json());


api.get('/mother', (req,res)=>{
    res.send("Hello mother fuckers");
});
api.get('/api/room/:id', (req,res)=>{
    var key = req.params.id;
    Room.findOne({key}, (room)=>{
        if(!room){return res.statusCode(404).send()};
        res.status(200).send({people:room.people})
    })
});
api.post('/api/create', (req,res)=>{
    var myroom = new Room(
        {room:req.body.room,
         key: req.body.key,
         url:req.body.url,
         host:req.body.email,
         capacity:req.body.capacity
        });
    myroom.save().then(()=>{
        res.status(200).send({url:req.body.url});
    }).catch(err=>res.status(500).send(err));
});
api.patch('/api/join',(req,res)=>{
    var key = req.body.key;
    Room.findOneAndUpdate({key}).then((room)=>{
        room.users.push({email:req.body.email,name:req.body.name});
        
    }).cath(err=>res.status(500).send(err));
})
api.listen(process.env.PORT, ()=>{
    console.log(`API is now running on port ${process.env.PORT}`)
});
module.exports = api;