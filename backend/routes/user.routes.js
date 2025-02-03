import express from 'express';
import {body} from 'express-validator';
import {loginUser,logoutUser,getUserProfile} from '../controllers/user.controller.js';
import {authUser} from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/login',[
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],loginUser);


router.get('/logout',authUser,logoutUser);
router.get('/profile',authUser,getUserProfile);

export default router;