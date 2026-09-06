import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

// Masks Aadhaar (12 digit) and PAN (10 char) automatically before saving/returning
export const maskAadhaar = (aadhaar: string) => `XXXX-XXXX-${aadhaar.slice(-4)}`;
export const maskPAN = (pan: string) => `XXXXX${pan.slice(5, 9)}X`;

// Middleware that strips raw numbers from any outgoing response body
export const dpdpResponseGuard = (req: AuthRequest, res: Response, next: NextFunction) => {
  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    if (body?.data?.aadhaarNumber) delete body.data.aadhaarNumber;
    if (body?.data?.panNumber) delete body.data.panNumber;
    return originalJson(body);
  };
  next();
};
