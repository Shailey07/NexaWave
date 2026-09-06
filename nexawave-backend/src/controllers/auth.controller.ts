import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";
import { smsService } from "../services/sms.service";
import { env } from "../config/env";
import { AppError } from "../utils/appError";

export const authController = {
  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone } = req.body;
      await smsService.sendOtp(phone, "LOGIN");
      res.json({ success: true, message: "OTP sent successfully" });
    } catch (err) {
      next(err);
    }
  },

  async verifyOtpAndLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone, otp, name, mode } = req.body;
      const isValid = await smsService.verifyOtp(phone, otp);
      if (!isValid) throw new AppError("Invalid or expired OTP", 400);

      let user = await prisma.user.findUnique({ where: { phone } });
      if (!user) {
        user = await prisma.user.create({
          data: { phone, name: name || "User", mode: mode || "RURAL" },
        });
      }

      // FIXED: Explicitly cast types to satisfy TypeScript
      const token = jwt.sign(
        { id: user.id, role: user.role, mode: user.mode },
        env.JWT_SECRET as string,
        {
          expiresIn: (env.JWT_EXPIRES_IN || "7d") as any,
        },
      );

      res.json({ success: true, token, user });
    } catch (err) {
      next(err);
    }
  },

  async adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const admin = await prisma.admin.findUnique({ where: { email } });
      if (!admin) throw new AppError("Invalid admin credentials", 401);

      // FIXED: Explicitly cast env.JWT_SECRET as string
      const token = jwt.sign({ id: admin.id, role: "ADMIN" }, env.JWT_SECRET as string, {
        expiresIn: "1d" as any,
      });
      res.json({ success: true, token });
    } catch (err) {
      next(err);
    }
  },
};