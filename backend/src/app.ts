import express from "express";
import usersRouter from "./routes/users-routes";
import queriesRouter from "./routes/queries-routes";
import aiQueryRouter from "./routes/query-ai-routes";
import cors from "cors";
import usersMiddleware from "./middleware/users-middleware";
import { config } from "./config/env";

const app = express();

// "http://localhost:3000",
// "http://localhost:5173",
// "https://deploy-preview-88--staging-askiq.netlify.app/",
// "https://staging-askiq.netlify.app/",
// "https://askiq-live.netlify.app/",
app.use(
  cors({
    origin: [
      "*",
      config.CLIENT_URL
    ],
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

app.use("/users", usersRouter);
app.use("/query-ai", usersMiddleware.verifyToken, aiQueryRouter);

app.use("/queries", queriesRouter );

export default app;
