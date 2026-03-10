import express from 'express';
import bodyParser from 'body-parser';
import Student from '../model/students.js';

const app = express();

const mongoUrl = "mongodb+srv://admin:123@cluster0.v1bzlcn.mongodb.net/?appName=Cluster0"

app.get("/", (req, res) => {
    res.send('Hello World');
});

app.post("/", ()=>{
    console.log("Post request received");
});
