import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "../routes/userRoute.js";


dotenv.config({path: "config.env"});
const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("Connected to the database")).catch(()=> console.log("error connecting to db - ",error));
    
app.listen(4000,()=>console.log("Server started"));

app.use("/registration",userRouter);