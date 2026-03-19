import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// MongoDB Connection
const mongoUrl = "mongodb+srv://admin:123@cluster0.v1bzlcn.mongodb.net/testDB?retryWrites=true&w=majority";

mongoose.connect(mongoUrl)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("DB Error:", err);
});

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/", (req, res) => {
    console.log("Post request received");
    res.send("POST request successful");
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});