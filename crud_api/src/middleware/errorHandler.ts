import { Request, Response } from 'express';
import logger from '../utils/logger';

const errorHandler = (err: Error, req: Request, res: Response): void => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Ups, something went wrong :(!' });
};

export default errorHandler;
