import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/appError';

export interface AuthRequest extends Request {
  user?: { id: string; role: string; mode: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new AppError('Not authenticated. Token missing.', 401);

    const decoded = jwt.verify(token, env.JWT_SECRET) as any;
    req.user = { id: decoded.id, role: decoded.role, mode: decoded.mode };
    next();
  } catch (err) {
    next(new AppError('Invalid or expired token.', 401));
  }
};
