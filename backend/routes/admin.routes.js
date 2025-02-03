import express from 'express';
import { loginAdmin,logoutAdmin,createDriver,createUser,getAdminProfile } from '../controllers/admin.controller.js';
import { authAdmin } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';
import { get } from 'mongoose';
const router = express.Router();

router.post('/login',[
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
]
,loginAdmin
);

router.post('/create-user',authAdmin,createUser);
router.post('/create-driver',authAdmin,createDriver);
router.get('/profile',authAdmin,getAdminProfile);
router.get('/logout',authAdmin,logoutAdmin);

export default router;
