import express from "express";
import { body } from "express-validator";
import QueryAIController from "../controllers/query-ai-controllers";

const router = express.Router();

router.post("/query-response",
  [  body('persona').notEmpty().withMessage('Persona is required'),
     body('task').notEmpty().withMessage('Task is required'),
     body('context').notEmpty().withMessage('Context is required'),
     body('output').notEmpty().withMessage('Output is required'),
     body('constraint').notEmpty().withMessage('Constraint is required')
  ],
  QueryAIController.queryResponse
  );


export default router;
