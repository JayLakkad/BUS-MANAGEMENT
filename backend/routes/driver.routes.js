import express from 'express';
import {body} from 'express-validator';
import {loginDriver,logoutDriver,getDriverProfile} from '../controllers/driver.controller.js';
import {authDriver} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login',[
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],loginDriver);

router.get('/logout',authDriver,logoutDriver);
router.get('/profile',authDriver,getDriverProfile);

export default router;