import express from 'express';
import { getAllLostAndFound, createLostAndFound, deleteLostAndFound } from '../controllers/staff/LostAndFoundControllers.js';


const router = express.Router();

router.post('/', createLostAndFound);
router.get('/', getAllLostAndFound);
router.delete('/:id', deleteLostAndFound);




export default router;