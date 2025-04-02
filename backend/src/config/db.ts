
import { Pool } from 'pg';

let pool: Pool;
console.log('NODE_ENV:', process.env.NODE_ENV === "production");
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  });
} else if (process.env.NODE_ENV === 'development') {
  pool = new Pool({  

    user: process.env.DB_USER,
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'), 
    ssl: false,
  });
}

  
const connectDB = async () => {
    try {
      await pool.connect();
      console.log('PostgreSQL DATABASE connected');
    } catch (err) {
        const error = err as Error;
        console.error('DB connection error:', error.stack || error.message);
    }
  };
  
  export { pool, connectDB };
