import { Request, Response, NextFunction } from 'express';

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
};