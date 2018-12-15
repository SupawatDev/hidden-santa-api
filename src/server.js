require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const api = express();
var {mongoose} = require('./shared/db');
var Room = require('./models/room');


var storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./images")
    },
    filename: (req,file,cb)=>{
        cb(null,
            Math.random().toString(14).substring(2)+ '-'+Date.now()+".png"
        )
    } 
})
var upload = multer({storage});


api.use(bodyParser.urlencoded({extended:true}));
api.use(bodyParser.json());
api.use(cors());

api.get('/hello', (req,res)=>{
    res.send("Hello mr server.");
});

api.get('/image/:id', (req,res)=>{
    let imgurl = req.params.id;
    res.sendFile(path.join(__dirname,"../images/"+imgurl));
})

api.post('/upload',upload.single('image'),(req,res)=>{
    if(!req.file){
        console.log("No file!");
        return res.status(500).send({error:"no file"});
    }
    return res.status(200).send({success: "done", url: req.file.filename});

});


api.post('/api/room/', (req,res)=>{
    var ikey = req.body.key;
    //console.log(ikey);
    Room.findOne({"roomkey":ikey}).then((data)=>{
        if(!res)res.status(404).send('this key is invalid');
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(404).send('error');
    })
});
api.post('/api/create', (req,res)=>{
    var myroom = new Room(
        {room:req.body.room,
         roomkey: req.body.key,
         url:req.body.url,
         host:req.body.email,
         capacity:req.body.capacity
        });
    myroom.save().then((data)=>{
        res.status(200).send({url:data.url});
    }).catch(err=>res.status(500).send(err));
});
api.patch('/api/join',(req,res)=>{
    var roomkey = req.body.key;
    Room.findOneAndUpdate({key}).then((room)=>{
        room.users.push({email:req.body.email,name:req.body.name});
        
    }).catch(err=>res.status(500).send(err));
})
api.listen(process.env.PORT, ()=>{
    console.log(`API is now running on port ${process.env.PORT}`)
});
module.exports = api;