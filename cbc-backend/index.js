import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";

const mongodbUrl = "mongodb+srv://admin:123@cluster0.vs773oh.mongodb.net/?appName=Cluster0";

mongoose.connect(mongodbUrl).then(
    () =>{
        console.log("Connected to MongoDB Cluster");
    }
)

const app = express();

// Middleware (IMPORTANT for JSON body parsing)
app.use(express.json());

app.use((req, res, next)=>{
    
    const authorizatinHeader = req.header("Authorization");

    if(authorizatinHeader != null){
        const token = authorizatinHeader.replace("Bearer ", "");

        jwt.verify(token, "secretKey96$2025",
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

app.use("/student", StudentRouter);
app.use("/users", userRouter);

// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});