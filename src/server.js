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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(authRoutes);
app.use(notesRoutes);
app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

app.use(express.json());
app.use(cors());
app.use(cookieParser());

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