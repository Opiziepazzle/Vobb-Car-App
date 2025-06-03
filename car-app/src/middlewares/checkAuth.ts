import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const checkAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return; // ✅ explicitly return to satisfy type checker
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY!);
    (req as AuthRequest).user = decoded;
    next(); // ✅ proceed if valid
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    return; // ✅ return here too
  }
};
