import express from "express";
import UserController from "../controllers/users-controllers";
import UserMiddleware from "../middleware/users-middleware";

const router = express.Router();

router.post(
  "/register",
  UserMiddleware.validateRegistration(),
  UserMiddleware.handleValidationErrors,
  UserMiddleware.checkDuplicateUser,
  UserController.registerUser
);

router.post(
  "/login",
  UserMiddleware.validateLoginDetails(),
  UserMiddleware.handleValidationErrors,
  UserController.loginUser
);

export default router;
