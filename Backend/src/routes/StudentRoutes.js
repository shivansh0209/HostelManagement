import express from 'express';
import { sendProfileData ,sendStudentList, addAStudent, getAllPersonalNotifications} from '../controllers/staff/StudentControllers.js';
import upload from '../middlewares/multerMiddleware.js';


const router = express.Router();

router.get('/', sendStudentList);
router.get('/:studentId', sendProfileData)
router.get('/dashboard/getnotifications', getAllPersonalNotifications);
router.post('/addAStudent' ,upload.fields(
    [
        { name: 'profilePic', maxCount: 1 },
        { name: 'messReciept', maxCount: 1 },
        { name: 'academicReceipt', maxCount: 1 }
    ]
) , addAStudent);


export default router;;