import jwt from "jsonwebtoken";
import { UserModal } from "../models/userModal.js";

export const isLoggedIn = async (req,res,next)=>{
    const fztoken = req.cookies.fztoken;
    console.log("Reading cookie bc",fztoken);
    try {
    const decodeToken = jwt.verify(fztoken,process.env.JWT_SECRET_KEY);
    const user = await UserModal.findById(decodeToken.userId);
    if(!user){
        next();
    }else{
        console.log(user);
        res.json({success:true,foundUser:user,message:"foundUser"});
    }
    } catch (error) {
        console.log(error);
    }
}