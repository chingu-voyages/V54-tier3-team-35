import express from "express";
import usersRouter from "./routes/users-routes";
import queriesRouter from "./routes/queries-routes";
import aiQueryRouter from "./routes/query-ai-routes";
import cors from "cors";
import usersMiddleware from "./middleware/users-middleware";
import { config } from "./config/env";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://54.246.48.7/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRouter);
app.use("/api/query-ai", usersMiddleware.verifyToken, aiQueryRouter);

app.use("/api/queries", queriesRouter );

export default app;
