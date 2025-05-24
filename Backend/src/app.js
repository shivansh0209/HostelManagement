import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authMiddleware from './middlewares/authMiddleware.js';


const app = express();


const corsOptions = {
    origin: [process.env.CLIENT_URL],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import AuthRoutes from "./routes/AuthRoutes.js";
import StudentRoutes from "./routes/StudentRoutes.js";
import HostelAnnouncementRoutes from './routes/HostelAnnouncementRoutes.js';
import LostAndFoundRoutes from './routes/LostAndFoundRoutes.js';
import ComplaintsRoutes from './routes/ComplaintsRoutes.js';
import TaskRoutes from './routes/TaskRoutes.js';
import MessRoutes from './routes/MessRoutes.js';
import FinesRoutes from './routes/FinesRoutes.js';

app.use('/api/auth',AuthRoutes)
app.use('/api/student', authMiddleware, StudentRoutes);
app.use('/api/hostelannouncements', authMiddleware, HostelAnnouncementRoutes);
app.use('/api/lostandfound', authMiddleware, LostAndFoundRoutes);
app.use('/api/complaints', authMiddleware, ComplaintsRoutes);
app.use('/api/tasks', authMiddleware, TaskRoutes);
app.use('/api/mess', authMiddleware, MessRoutes);
app.use('/api/fines', authMiddleware, FinesRoutes);

export default app;