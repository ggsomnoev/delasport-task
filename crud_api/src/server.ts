import express from 'express';
import userRoutes from './routes/userRoutes';
import { connectToDB } from './database/db';
import logger from './utils/logger';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();
app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [
  'http://localhost:3000',
];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 100, // 100 req per IP
  message: { error: 'Too many requests, please try again later.' },
});

app.use(rateLimiter);

app.use('/users', userRoutes);

const startServer = async (): Promise<void> => {
  try {
    await connectToDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Error starting the server:', error);
  }
};

startServer();
