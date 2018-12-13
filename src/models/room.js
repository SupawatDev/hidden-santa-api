import mongoose, {Schema} from 'mongoose';
import email from '../shared/email';


export const RoomSchema = new Schema(
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
        email({type: "welcome",email:this.host})
        .then(()=>{
            next();
        })
        .catch(err =>{
            logger.error(err);
            next();
        })
    }
})

RoomSchema.index({room:1})
module.exports = exports = mongoose.model('Room',RoomSchema);
