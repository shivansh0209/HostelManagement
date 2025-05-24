import express from 'express';
import { getAllComplaints,createComplaint, markResolved } from '../controllers/student/ComplaintControllers.js';


const router = express.Router();



router.post('/create', createComplaint);
router.get('/all', getAllComplaints);
router.get('/markresolved/:id', markResolved);





export default router;