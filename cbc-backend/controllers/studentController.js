import Student from "../models/student.js";

function createUser(req, res){
    const student = new Student(req.body);
    student.save().then(
        ()=>{
            res.json({
                message : "Student saved successfully"
            })
        }
    )
}

function getAllUsers(req, res){
    const student = new Student(req.body);
    student.save().then(
        ()=>{
            res.json({
                message : "Student saved successfully"
            })
        }
    )};

function deleteUser(req, res) {
    res.json({
        message: "DELETE request received"
    });
}

function updateUser(req, res){
    res.json({
        message: "PUT request received" + req.body.name
    });
}

export { createUser, getAllUsers, deleteUser, updateUser };