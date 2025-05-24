import express from 'express';
import { getAllTasks, createTask, deleteTask } from '../controllers/staff/TaskControllers.js';

const router = express.Router();




router.post('/create', createTask);
router.get('/all', getAllTasks);
router.get('/delete/:id', deleteTask);




export default router;