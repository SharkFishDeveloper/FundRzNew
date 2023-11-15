import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "../routes/userRoute.js";
import cookieParser from "cookie-parser";
import { isLoggedIn } from "../middleware/userMiddleware.js";
import { detailsRouter } from "../routes/detailsRouter.js";
import { campaignRouter } from "../routes/campaignRouter.js";

dotenv.config({path: "config.env"});
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000',credentials:true}));

mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("Connected to the database")).catch((error)=> console.log("error connecting to db - ",error));
    
app.listen(4000,()=>console.log("Server started"));

app.use("/user",detailsRouter);
app.use("/registration",userRouter);
app.use("/campaign",isLoggedIn,campaignRouter);