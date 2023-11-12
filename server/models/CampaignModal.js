import mongoose from "mongoose";

const campaign = new mongoose.Schema({
    campaignName:{type:String,required:true,unique:true},
    members:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    campaignDesc:{type:String,required:true},
    upvotes:{type:Number,default:0},
    downvotes:{type:Number,default:0}
});

export const campaignModal = mongoose.model("Campaign",campaign);