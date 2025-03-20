import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'), 
  ssl: false,
});
  
const connectDB = async () => {
    try {
      await client.connect();
      console.log('PostgreSQL DATABASE connected');
    } catch (err) {
        const error = err as Error;
        console.error('DB connection error:', error.stack || error.message);
    }
  };
  
  export { client, connectDB };
