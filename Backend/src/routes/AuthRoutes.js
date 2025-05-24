import express from 'express';
import { login , verifyAccess ,changePassword , refreshAccessToken , logout } from '../controllers/Auth/AuthContollers.js';


const router = express.Router();

router.post('/', login);
router.get('/verifyaccess', verifyAccess);
router.get('/refresh-token', refreshAccessToken);
router.post('/changepassword', changePassword);
router.get('/logout', logout);


export default router;