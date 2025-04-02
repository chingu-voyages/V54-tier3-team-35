import dotenv from "dotenv";
dotenv.config();
import { config } from "./config/env";
import { connectDB } from "./config/db";
import app from "./app";

const startServer = async () => {
  try {
    await connectDB();
    const port = Number(config.port);
    app.listen(port, "0.0.0.0", () =>
      console.log(`Server is running on port ${port}`)
    );
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
