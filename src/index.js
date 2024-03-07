//require('dotenv').config({path: './env'}) (this syntax is inconsistent so for that we have to import the env and then need to be config)
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

import dotenv from "dotenv";
// -r dotenv/config --experimental-json-modules to use import we have to write this in the json package 
// after nodemon and before scr
import connectDB from "./db/index.js";
dotenv.config({path: './env'});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is listening at port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MONGODB connection failed !!",error);
})

//the code below is use if we cannot write the code in the db folder
// but this is the recommended
// as the professional approch is to make seperate folder for each task 
// it maintain the consistency of the code 

/*import express from "express";
const app = express();
(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.error("Error: ",error)
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening at port ${process.env.PORT}`)
        })

    } catch(error){
        console.error("Error: ",error)
        throw err
    }
}) */
