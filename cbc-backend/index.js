import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const mongodbUrl = process.env.MONGO_URL;

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next)=>{
    
    const authorizatinHeader = req.header("Authorization");

    if(authorizatinHeader != null){
        const token = authorizatinHeader.replace("Bearer ", "");

        jwt.verify(token, process.env.JWT_SECRET,
            (err, content) => {
                if(content == null){
                    console.log("Token verification failed:", err);
                    res.json({message: "Invalid token"});
                } else {
                    req.user = content;
                    next();
                }       
            }
        );
    } else {
        next();
    }
})
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});