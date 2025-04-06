import express from "express";
import { body } from "express-validator";
import QueryAIController from "../controllers/query-ai-controllers";

const router = express.Router();

/**
 * @swagger
 * /query-response:
 *   post:
 *     summary: Generates a response from Gemini AI based on input parameters.
 *     tags:
 *       - Query
 *     security:
 *       - BearerAuth: []  # JWT token required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - persona
 *               - task
 *               - context
 *               - output
 *               - constraint
 *             properties:
 *               persona:
 *                 type: string
 *                 example: Friendly assistant
 *               task:
 *                 type: string
 *                 example: Summarise the given article
 *               context:
 *                 type: string
 *                 example: The article is about climate change impact in coastal cities
 *               output:
 *                 type: string
 *                 example: Provide bullet points with key findings
 *               constraint:
 *                 type: string
 *                 example: Limit to 100 words
 *     responses:
 *       200:
 *         description: Successfully generated AI response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "- Sea levels rising faster\n- Increased flooding risks"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: Persona is required
 *                       param:
 *                         type: string
 *                         example: persona
 *                       location:
 *                         type: string
 *                         example: body
 *       500:
 *         description: Internal server error
 */
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
