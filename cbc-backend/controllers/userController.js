import User from '../models/User.js';
import bcrypt from 'bcrypt';

function createUser(req, res){

    const data = req.body

const hashedPassword = bcrypt.hashSync(data.password, 10);

res.json({hashedPassword});

const user = new User({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: hashedPassword,
    role : data.role
});
    user.save().then(
        ()=>{
            res.json({
                message : "User saved successfully"
            })
        }
    )
}

function loginUser(req, res){
    const email = req.body.email;
    const password = req.body.password;

    User.find({email : email}).then(
        (users) =>{
            if(users[0] == null){
                res.json({
                    message : "User not found"
                })
            } else {
                const user = users[0];
                res.json(user);

                const isPasswordCorrect = bcrypt.compareSync(password, user.password);

                if(isPasswordCorrect){
                    res.json({
                        message : "Login successful"
                    })
                } else {
                    res.json({
                        message : "Incorrect password"
                    })
            }
        }
})
}

export { createUser, loginUser };