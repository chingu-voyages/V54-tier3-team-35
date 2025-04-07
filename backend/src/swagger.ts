import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AskIQ API",
      version: "1.0.0",
      description: "API documentation for AskIQ",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
    if (process.env.NODE_ENV === "development") {
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
  }
