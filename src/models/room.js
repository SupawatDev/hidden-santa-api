import mongoose, {Schema} from 'mongoose';



export const RoomSchema = new Schema(
    {
        room:{
            type:String,
            required: true
        },
        key:{
            type:String,
            required: true
        }
    }

);