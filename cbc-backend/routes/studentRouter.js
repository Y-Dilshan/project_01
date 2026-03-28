import express from "express";
import Student from "../models/student.js";
import { createUser, getAllUsers, deleteUser, updateUser } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/", createUser);

studentRouter.post("/", getAllUsers);

studentRouter.delete("/", deleteUser);

studentRouter.put("/", updateUser);


export default studentRouter;