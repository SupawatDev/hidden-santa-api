var mongoose = require('mongoose');
//import email from '../shared/email';
const schema = mongoose.Schema;
const RoomSchema = new schema(
    {
        room:{
            type:String,
            required: true
        },
        key:{
            type:String,
            required: true,
            unique: true
        },
        url:{
            type:String,
            required: true,
            trim: true,
        },
        host:{
            type:String,
            required:true,
            trim:true
        },
        capacity:{
            type: Number,
            required: true
        },
        users:[
            {
                name:{
                    type:String,
                    required: true,
                    trim: true,
                    unique: true
                },
                email:{
                    type:String,
                    required: true,
                    trim: true,
                    unique: true
                }
            }
        ]
    }

);
RoomSchema.pre('save', function(next){
    if(!this.isNew){
        next();
    }else{
        console.log('saving');
        /*email({type: "welcome",email:this.host})
        .then(()=>{
            next();
        })
        .catch(err =>{
            console.log(err);
            next();
        })*/
        next();
    }
})

module.exports =  Room = mongoose.model('Room',RoomSchema);