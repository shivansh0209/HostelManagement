import express from 'express';
import { allocateMess, createOrUpdateMessMenu, sendMenu, senAllMessFeedbacks, approveMessCancellation} from '../controllers/staff/MessControllers.js';
import { createMessCancellation, sendAllCancellations, deleteMessCancellation, createMessFeedback } from '../controllers/student/MessControllers.js';


const router = express.Router();

router.post('/allocate', allocateMess);
router.post('/savemenu', createOrUpdateMessMenu);
router.get('/menu', sendMenu);
router.post('/messcancellation', createMessCancellation);
router.get('/messcancellation', sendAllCancellations);
router.get('/messcancellation/delete/:id', deleteMessCancellation);
router.post('/messfeedback', createMessFeedback);
router.get('/messfeedback', senAllMessFeedbacks);
router.get('/approve/:id', approveMessCancellation);



export default router;