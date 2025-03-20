import express from 'express';
import usersRouter from './routes/users-routes';
import { config } from './config/env';
import { connectDB } from './config/db';
const app = express();

app.use('/users', usersRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  await connectDB();  // Connect to DB before starting the app
  app.listen(config.port, () =>
    console.log(`Server is running on port ${config.port}`));

};

startServer();