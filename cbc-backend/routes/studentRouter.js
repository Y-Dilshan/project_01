import express from "express";
import Student from "../models/student.js";

const studentRouter = express.Router();

studentRouter.get("/", (req, res) => {
    Student.find().then(
    (student)=>{
        res.json(student);
    }
    )
});

studentRouter.post("/", (req, res) => {
    const student = new Student(req.body);
    student.save().then(
        ()=>{
            res.json({
                message : "Student saved successfully"
            })
        }
    )
});

studentRouter.delete("/", (req, res) => {
    res.json({
        message: "DELETE request received"
    });
});

studentRouter.put("/", (req, res) => {
    res.json({
        message: "PUT request received" + req.body.name
    })
});


export default studentRouter;