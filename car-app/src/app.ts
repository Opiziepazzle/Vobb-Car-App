import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoute';
import carRoutes from './routes/carRoute';
import { errorHandler } from './middlewares/errorHandler'

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);




app.use(errorHandler)


export default app;
