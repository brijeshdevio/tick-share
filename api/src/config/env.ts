import "dotenv/config";

export const env = {
  PORT: process.env.PORT ?? 3000,
  NODE_ENV: process.env.NODE_ENV!,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET!,
  APP_URL: process.env.APP_URL!,
  FRONTEND_URL: process.env.FRONTEND_URL!,
  APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT!,
  APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID!,
  APPWRITE_API_KEY: process.env.APPWRITE_API_KEY!,
  APPWRITE_BUCKET_ID: process.env.APPWRITE_BUCKET_ID!,
  APPWRITE_NOT_FOUND: process.env.APPWRITE_NOT_FOUND!,
};
