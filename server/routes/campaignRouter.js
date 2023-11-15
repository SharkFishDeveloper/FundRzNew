import express from "express";
import { campaignModal } from "../models/CampaignModal.js";

const router = express.Router();

router.post("/create-campaign",async(req,res)=>{
    const {requestData} = req.body;
    console.log("reqdatad",requestData);
    console.log("requestData.ownerName",requestData.ownerName);
    console.log("requestData.ownerEmail",requestData.ownerEmail);
    try {
        if(req.user.name!==requestData.ownerName){
            //throw new Error("Enter the name by which you logged in!");
            return res.json({success:false,message:"Enter name by which you logged in !"})
        }
        if(req.user.email!==requestData.ownerEmail){
            return res.json({success:false,message:"Enter email by which you logged in !"})
        }

        try {
            const foundCampaign = await campaignModal.findOne({
                campaignName:requestData.campaignName
            });
            if(foundCampaign){
                //throw new Error("Name is already taken");
                return res.status(500).json({success:false,message:"Name is already taken"});
            }
            const campaign = await campaignModal.create({
                campaignName: requestData.campaignName,
                campaignSubject: requestData.campaignSubject,
                participants: requestData.participants,
                description: requestData.description,
                imageUrl: requestData.imageUrl,
                ownerAddress: requestData.ownerAddress,
                ownerName:requestData.ownerName,
                ownerEmail: requestData.ownerEmail,
                selectedCountry: requestData.selectedCountry,
                selectedState: requestData.selectedState,
                helpEmail: requestData.helpEmail,
                donationTarget: requestData.donationTarget,
            });
            return res.json({
                success: true,
                message: "Campaign created successfully",
                campaign,
              });

        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
        // else{
        //     return res.json({
        //         success: true,
        //         message: "User authenticated",
        //         user: {
        //             name: req.user.name,
        //             email: req.user.email,
        //         },
        //     });
        // }
    } catch (error) {
        console.error(error); 
        return res.json({success:false,message:error})
    }
});

export {router as campaignRouter};