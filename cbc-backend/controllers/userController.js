import User from "../models/userModel.js";

function createUser(req, res){
    const user = new User(req.body);
    user.save().then(
        ()=>{
            res.json({
                message : "User saved successfully"
            })
        }
    )
}