import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    sex:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }

});
const User = mongoose.model('User',userSchema);
export default User;