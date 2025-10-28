import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
  PERSISTENCE: process.env.PERSISTENCE || "FS",
  JWT_SECRET: process.env.JWT_SECRET || "mi-jwt-secreto",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "mi-jwt-refresh-secreto"
};

export default config;
