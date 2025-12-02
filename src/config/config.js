import dotenv from "dotenv";
dotenv.config({ path: "./.env", override: true });

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
  PERSISTENCE: process.env.PERSISTENCE || "FS",
  JWT_SECRET: process.env.JWT_SECRET || "mi-jwt-secreto",
  NODE_ENV: process.env.NODE_ENV || "development",
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};

export default config;
