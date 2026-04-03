import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function createUser(req, res){

    const data = req.body;

    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const user = new User({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
        role : data.role
    });

    user.save().then(
        ()=>{
            return res.json({
                message : "User saved successfully"
            });
        }
    );
}

async function loginUser(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const users = await User.find({email : email});

    if(users[0] == null){
        return res.json({
            message : "User not found"
        });
    } else {
        const user = users[0]; 

        const isPasswordCorrect = await bcrypt.compare(password, user.password); // ✅ fixed

        if(isPasswordCorrect){

            const payload = {
                email : user.email,
                firstName : user.firstName,
                lastName : user.lastName,
                role : user.role,
                isEmailVerified : user.isEmailVerified,
                image : user.image
            };

            const token = jwt.sign(payload, "secretKey96$2025");

            return res.json({
                message : "Login successful",
                token : token
            });

        } else {
            return res.json({
                message : "Incorrect password"
            });
        }
    }
}

export { createUser, loginUser };