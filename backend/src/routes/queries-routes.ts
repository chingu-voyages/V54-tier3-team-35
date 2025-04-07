import express from "express";
import QueryController from "../controllers/queries-controllers";
import QueryMiddleware from "../middleware/queries-middleware";
import usersMiddleware from "../middleware/users-middleware";

const queriesRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Query:
 *       type: object
 *       required:
 *         - id
 *         - persona
 *         - context
 *         - task
 *         - output
 *         - constraint
 *         - response
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the query.
 *           example: 1
 *         persona:
 *           type: string
 *           description: The persona for the query.
 *         context:
 *           type: string
 *           description: The context or situation for the query.
 *         task:
 *           type: string
 *           description: The task or action to be performed.
 *         output:
 *           type: string
 *           description: The expected output from the task.
 *         constraint:
 *           type: string
 *           description: Any constraints related to the query.
 *         response:
 *           type: string
 *           description: The expected response for the query.
 *     QueryInput:
 *       type: object
 *       required:
 *         - persona
 *         - context
 *         - task
 *         - output
 *         - constraint
 *         - response
 *       properties:
 *         persona:
 *           type: string
 *         context:
 *           type: string
 *         task:
 *           type: string
 *         output:
 *           type: string
 *         constraint:
 *           type: string
 *         response:
 *           type: string
 *     QueryResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         query:
 *           $ref: '#/components/schemas/Query'
 */


/**
 * @swagger
 * /queries:
 *   post:
 *     summary: Upload a new query
 *     description: Upload a new query with user-specific data.
 *     tags:
 *       - Queries
 *     security:
 *       - BearerAuth: []  # JWT token required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QueryInput'
 *     responses:
 *       201:
 *         description: Query uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QueryResponse'
 *       400:
 *         description: Invalid user ID or missing required fields.
 *       401:
 *         description: Unauthorised. JWT token missing/invalid.
 *       500:
 *         description: Server error.
 */
queriesRouter.post(
  "/",
  usersMiddleware.verifyToken,
  QueryMiddleware.validateQueryInputs(),
  QueryMiddleware.handleValidationErrors,
  QueryController.uploadQuery
);

/**
 * @swagger
 * /queries:
 *   get:
 *     summary: Get all queries
 *     description: Retrieve a list of all queries for the authenticated user.
 *     tags:
 *       - Queries
 *     security:
 *       - BearerAuth: []  # JWT token required
 *     responses:
 *       200:
 *         description: A list of queries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Query'
 *       401:
 *         description: Unauthorised. JWT token missing/invalid.
 *       500:
 *         description: Server error.
 */
queriesRouter.get("/", usersMiddleware.verifyToken, QueryController.getQueries);

/**
 * @swagger
 * /queries/{id}:
 *   get:
 *     summary: Get a specific query
 *     description: Retrieve a specific query by its ID.
 *     tags:
 *       - Queries
 *     security:
 *       - BearerAuth: []  # JWT token required
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the query to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A specific query object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Query'
 *       401:
 *         description: Unauthorised. JWT token missing/invalid.
 *       404:
 *         description: Query not found.
 *       500:
 *         description: Server error.
 */
queriesRouter.get(
  "/:id",
  usersMiddleware.verifyToken,
  QueryController.getSpecificQuery
);

/**
 * @swagger
 * /queries/{id}:
 *   patch:
 *     summary: Edit an existing query
 *     description: Edit an existing query identified by the provided `id`.
 *     tags:
 *       - Queries
 *     security:
 *       - BearerAuth: []  # JWT token required
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the query to edit.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QueryInput'
 *     responses:
 *       200:
 *         description: Query updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QueryResponse'
 *       400:
 *         description: Invalid user ID, missing required fields, or invalid data format.
 *       401:
 *         description: Unauthorised. JWT token missing/invalid.
 *       404:
 *         description: Query not found.
 *       500:
 *         description: Server error.
 */
queriesRouter.patch(
  "/:id",
  usersMiddleware.verifyToken,
  QueryMiddleware.validateQueryInputs(),
  QueryMiddleware.handleValidationErrors,
  QueryController.editQuery
);

/**
 * @swagger
 * /queries/{id}:
 *   delete:
 *     summary: Delete a query
 *     description: Delete a query identified by its `id`.
 *     tags:
 *       - Queries
 *     security:
 *       - BearerAuth: []  # JWT token required
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the query to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Query deleted successfully.
 *       401:
 *         description: Unauthorised. JWT token missing/invalid.
 *       404:
 *         description: Query not found.
 *       500:
 *         description: Server error.
 */
queriesRouter.delete(
  "/:id",
  usersMiddleware.verifyToken,
  QueryController.deleteQuery
);

export default queriesRouter;
