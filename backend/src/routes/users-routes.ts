import express from "express";
import { check } from "express-validator";
import UserController from "../controllers/users-controllers";
import { Request, Response } from "express";
import UserMiddleware from "../middleware/users-middleware";

const router = express.Router();

router.get("/register", (req: Request, res: Response): void => {
  res.json({ message: "Testing User Registration Route." });
});

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Please provide a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    check("username").not().isEmpty().withMessage("Username is required"),
  ],
  UserController.registerUser
);

router.post(
  "/login",
  UserMiddleware.validateLoginDetails(),
  UserMiddleware.handleValidationErrors,
  UserController.loginUser
);

export default router;
