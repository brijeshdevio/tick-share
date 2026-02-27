import 'dotenv/config';

export const envConfig = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV!,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET!,
  APP_URL: process.env.APP_URL!,
  FRONTEND_URL: process.env.FRONTEND_URL!,
};
