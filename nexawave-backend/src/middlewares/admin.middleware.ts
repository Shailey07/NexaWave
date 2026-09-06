import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { AppError } from '../utils/appError';
import { env } from '../config/env';

// Blocks anyone who is not verified admin role
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return next(new AppError('Access denied. Admins only.', 403));
  }
  next();
};

// Extra layer specifically for the secret dashboard login route
export const verifyAdminAccessKey = (req: any, res: Response, next: NextFunction) => {
  const key = req.headers['x-admin-access-key'];
  if (key !== env.ADMIN_ACCESS_KEY) {
    return next(new AppError('Unauthorized dashboard access attempt.', 403));
  }
  next();
};
