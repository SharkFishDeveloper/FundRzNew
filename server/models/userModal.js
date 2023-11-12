import mongoose from "mongoose";
import validator from 'validator';

const user = new mongoose.Schema({
    name:{type:String,required:true,unique:true,minlength: [6,"Name is too small"]},
    email:{type:String,required:true,unique:true,validate:[validator.isEmail,"Enter a valid email"]},
    password:{type:String,required:true,minlength: [6,"Password is too small"]},
    followingCampaigns:[{type:mongoose.Schema.Types.ObjectId,ref:"Campaign"}],
});

export const UserModal = mongoose.model("User",user);