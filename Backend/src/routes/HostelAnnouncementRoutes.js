import express from 'express';
import { getAllHostelAnnouncements, createHostelAnnouncement, deleteHostelAnnouncement } from '../controllers/staff/HostelAnnouncementControllers.js';


const router = express.Router();

router.post('/', createHostelAnnouncement);
router.get('/', getAllHostelAnnouncements);
router.delete('/:id', deleteHostelAnnouncement);




export default router;