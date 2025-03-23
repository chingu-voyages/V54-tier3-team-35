import express from 'express';
import usersRouter from './routes/users-routes';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: [
      'http://localhost',
      'http://localhost:5173',
      'https://v54-tier3-team-35.onrender.com'

    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);

export default app;
