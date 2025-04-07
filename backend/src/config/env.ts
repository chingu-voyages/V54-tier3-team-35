import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    CLIENT_URL: process.env.CLIENT_URL || 'https://staging-askiq.netlify.app',
    SECRET_KEY: process.env.SECRET_KEY
  };