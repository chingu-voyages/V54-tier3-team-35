const isProduction = process.env.NODE_ENV === 'production';
export const config = {
  port: process.env.PORT || 3000,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  SECRET_KEY: process.env.SECRET_KEY,
  CORS_ORIGINS: isProduction
    ? process.env.CORS_ORIGINS_PROD
      ? process.env.CORS_ORIGINS_PROD.split(',')
      : ['https://staging-askiq.netlify.app','http://localhost:3000', 'http://localhost:5173'] 
    : process.env.CORS_ORIGINS_DEV
      ? process.env.CORS_ORIGINS_DEV.split(',')
      : ['http://localhost:3000', 'http://localhost:5173'],
};