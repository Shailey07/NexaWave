import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  ADMIN_ACCESS_KEY: process.env.ADMIN_ACCESS_KEY!,
  SMS_API_KEY: process.env.SMS_API_KEY || '',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY || '',
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || '',
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || '',
  PLATFORM_FEE_PERCENT: 3,
  ORG_PREMIUM_FEE: 500,
};
