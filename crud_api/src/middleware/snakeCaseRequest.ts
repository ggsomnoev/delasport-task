import { Request, Response, NextFunction } from 'express';

const toSnakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();
};

const snakeCaseRequest = (req: Request, res: Response, next: NextFunction) => {
  if (req.body && typeof req.body === 'object') {
    req.body = Object.keys(req.body).reduce((acc, key) => {
      acc[toSnakeCase(key)] = req.body[key];
      return acc;
    }, {} as any);
  }
  next();
};

export default snakeCaseRequest;
