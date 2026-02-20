import express from 'express';
import Student from '../model/students';

const studentRouter = express.Router();

StudentRouter.get('/', async (req, res) => {
    console.log('Received GET request for all students');

    res.json({ message: 'GET request received for all students' });
});

export default studentRouter;