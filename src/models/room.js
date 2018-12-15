var mongoose = require('mongoose');
//import email from '../shared/email';
const schema = mongoose.Schema;
const RoomSchema = new schema(
    {
        room:{
            type:String,
            required: true
        },
        roomkey:{
            type:String,
            required: true,
            unique: true
        },
        url:{
            type:String,
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
                },
                image:{
                    type:String
                },
                join:{
                    type: Date
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
        this.url = Math.random().toString(36).substring(7);
        next();
    }
})

module.exports =  Room = mongoose.model('Room',RoomSchema);