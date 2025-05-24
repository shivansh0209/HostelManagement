import express from 'express';
import { createFine , getAllFines, finePayment} from '../controllers/staff/FinesControllers.js';
import {sendPersonalNotification} from '../controllers/staff/StudentControllers.js';

const router = express.Router();




router.post('/imposefine', createFine);
router.get('/getallfines', getAllFines);
router.post('/payfine', finePayment);
router.post('/sendalert', sendPersonalNotification)

export default router;