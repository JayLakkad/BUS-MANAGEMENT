import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';   


import userRoutes from './routes/user.routes.js';
import driverRoutes from './routes/driver.routes.js';
import adminRoutes from './routes/admin.routes.js';
import {connectDB} from './db/db.js';


dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/user',userRoutes);
app.use('/driver',driverRoutes);
app.use('/admin',adminRoutes);

export default app;

