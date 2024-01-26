import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const UserSchema = new mongoose.Schema({
    phone_number: {
        type: String,
        require: true,
        unique:true,
    },
    priority:{
        type:String,
        require:true,
    },
}, {
    timestamps: true
})

UserSchema.pre('save',function(){
    return this.priority=Math.floor(Math.random()*3);
})
UserSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
    }, process.env.ACCESS_SECRET, { expiresIn: "1d" })
}

export const User = mongoose.model('user', UserSchema);