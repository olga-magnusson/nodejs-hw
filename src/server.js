import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import {errors} from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

import authRoutes from './routes/authRoutes.js';

import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(notesRoutes);

app.use(userRoutes);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);



const bootstrap = async ()=>{
  try{
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

bootstrap();