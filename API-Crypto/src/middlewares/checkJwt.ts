import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  try {
    const decoded = verify(token, 'your_secret_key');
    res.locals.jwtPayload = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token.' });
  }
};