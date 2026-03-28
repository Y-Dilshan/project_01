import express from "express";
import mongoose from "mongoose";
import Student from "./models/student.js";
import StudentRouter from "./routes/studentRouter.js";

const mongodbUrl = "mongodb+srv://admin:123@cluster0.vs773oh.mongodb.net/?appName=Cluster0";

mongoose.connect(mongodbUrl).then(
    () =>{
        console.log("Connected to MongoDB Cluster");
    }
)

const app = express();

// Middleware (IMPORTANT for JSON body parsing)
app.use(express.json());

app.use("/student", StudentRouter);

// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});