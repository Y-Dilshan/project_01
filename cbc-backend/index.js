import express from "express";
import mongoose from "mongoose";
import Student from "./models/student.js";

const mongodbUrl = "mongodb+srv://admin:123@cluster0.vs773oh.mongodb.net/?appName=Cluster0";

mongoose.connect(mongodbUrl).then(
    () =>{
        console.log("Connected to MongoDB Cluster");
    }
)

const app = express();

// Middleware (IMPORTANT for JSON body parsing)
app.use(express.json());

// GET → use query params
app.get("/", (req, res) => {
    Student.find().then(
    (student)=>{
        res.json(student);
    }
    )
});

// POST → use JSON body
app.post("/", (req, res) => {
    console.log(req.body);

    const student = new Student(req.body);
    student.save().then(
        ()=>{
            res.json({
                message : "Student saved successfully"
            })
        }
    )
});

// DELETE → use JSON body
app.delete("/", (req, res) => {
    const name = req.body.name;

    console.log("DELETE name:", name);

    res.json({
        message: name ? "Deleted " + name : "Name not provided"
    });
});

// PUT → use JSON body
app.put("/", (req, res) => {
    const name = req.body.name;

    console.log("PUT name:", name);

    res.json({
        message: name ? "Updated " + name : "Name not provided"
    });
});

// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});