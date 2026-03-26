import express from "express";

let mongodbUrl = "mongodb+srv://admin:123@cluster0.v1bzlcn.mongodb.net/?appName=Cluster0";

const app = express();

// Middleware (IMPORTANT for JSON body parsing)
app.use(express.json());

// GET → use query params
app.get("/", (req, res) => {
    const name = req.body.name;

    console.log("GET name:", name);

    res.json({
        message: name ? "Hello World " + name : "Hello World"
    });
});

// POST → use JSON body
app.post("/", (req, res) => {
    const name = req.body.name;

    console.log("POST name:", name);

    res.json({
        message: name ? "Hello World " + name : "Name not provided"
    });
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