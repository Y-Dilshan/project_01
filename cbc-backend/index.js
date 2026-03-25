import express from 'express';

let app =express();

app.get("/", ()=>{
    console.log("Get request recieved")
})

app.post("/", ()=>{
    console.log("Get request recieved")
})

app.listen(5000, 
    ()=> {
        console.log("Server is running")
    }
);