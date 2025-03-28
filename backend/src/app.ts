import express from "express";
import usersRouter from "./routes/users-routes";
import queriesRouter from "./routes/queries-routes";
import aiQueryRouter from "./routes/query-ai-routes";
import cors from "cors";
import usersMiddleware from "./middleware/users-middleware";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost",
      "http://localhost:5173",
      "https://v54-tier3-team-35.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/query-ai", usersMiddleware.verifyToken, aiQueryRouter);

app.use("/queries", queriesRouter );

export default app;
