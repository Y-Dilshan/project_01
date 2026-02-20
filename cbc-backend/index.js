import express from 'express';
import bodyParser from 'body-parser';
import Student from '../model/students.js';

const app = express();
app.use(bodyParser.json());
