import express from "express";
import UserController from "../controllers/users-controllers";
import UserMiddleware from "../middleware/users-middleware";

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user by providing email, password, and username.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
*               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user (must be at least 6 characters).

 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully."
 *       400:
 *         description: Bad request. Invalid input data (e.g., invalid email).
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/register",
  UserMiddleware.validateRegistration(),
  UserMiddleware.handleValidationErrors,
  UserMiddleware.checkDuplicateUser,
  UserController.registerUser
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Login a user with email and password.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful."
 *                 token:
 *                   type: string
 *                   description: The JWT token used for subsequent requests.
 *       400:
 *         description: Bad request. Invalid email or password.
 *       401:
 *         description: Unauthorized. Incorrect email or password.
 *       500:
 *         description: Internal server error.
 */

router.post(
  "/login",
  UserMiddleware.validateLoginDetails(),
  UserMiddleware.handleValidationErrors,
  UserController.loginUser
);

export default router;
