import dotenv from "dotenv";
dotenv.config();
import { config } from './config/env'; 
import { connectDB } from './config/db';
import app from './app';

const startServer = async () => {
    await connectDB();  // Connect to DB before starting the app
    app.listen(config.port, () =>
        console.log(`Server is running on port ${config.port}`));

  };
  
  startServer(); 
