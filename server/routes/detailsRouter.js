import express from "express";
import { UserModal } from "../models/userModal.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get("/details",async(req,res)=>{
    const fztoken = req.cookies.fztoken;
    if (!fztoken) {
        return res.status(401).json({ success: false, message: "JWT not provided" });
    }
    console.log("Reading cookie bc",fztoken);
    try {
    const decodeToken = jwt.verify(fztoken,process.env.JWT_SECRET_KEY);
    const user = await UserModal.findById(decodeToken.userId);
    if(!user){
        return res.json({ success: false, message: "User not found" });
    }else{
        console.log(user);
        res.json({success:true,user:user,message:"foundUser"});
    }
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export {router as detailsRouter};