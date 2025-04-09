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
    origin: config.CORS_ORIGINS, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  import("./swagger")
    .then(({ setupSwagger }) => {
      setupSwagger(app);
    })
    .catch((err) => {
      console.error("Failed to load Swagger setup:", err);
    });
}

app.use("/api/users", usersRouter);
app.use("/api/query-ai", usersMiddleware.verifyToken, aiQueryRouter);

app.use("/api/queries", queriesRouter );

export default app;