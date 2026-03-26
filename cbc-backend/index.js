import express from 'express';

let app =express();

app.use(express.json());

app.get("/", (req, res)=>{
    console.log(req.body)
    console.log("Get request recieved")
})

app.post("/", (req, res)=>{
    console.log("Get request recieved")
})

app.listen(5000, 
    ()=> {
        console.log("Server is running")
    }
);