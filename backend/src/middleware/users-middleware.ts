import { Request, Response, NextFunction } from "express";
import { check, ValidationChain, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import UserService from "../services/user-service";
import { User } from "../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

class UserMiddleware {
  public validateLoginDetails(): ValidationChain[] {
    return [
      check("email").isEmail().withMessage("Please enter a valid email"),
      check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ];
  }

  public validateRegistration() {
    return [
      check("username").notEmpty().withMessage("Username is required"),
      check("email").isEmail().withMessage("Please enter a valid email"),
      check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ];
  }

  public handleValidationErrors(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
    }
    next();
  }

  public checkDuplicateUser(req: Request, res: Response, next: NextFunction): void {
    const { username, email } = req.body;

    UserService.checkDuplicateUser(email, username)
      .then(({ emailExists, usernameExists }) => {
        if (emailExists || usernameExists) {
          return res.status(400).json({
            errors: [
              ...(emailExists ? ["Email already exists"] : []),
              ...(usernameExists ? ["Username already exists"] : []),
            ],
          });
        }
        next();
      })
      .catch((error) => {
        console.error("Error checking duplicate user:", error.message);
        return res.status(500).json({ message: "Server error" });
      });
  }

  public verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Authorisation token is required." });
      return;
    }

    try {
      const secretKey = config.SECRET_KEY;

      if (!secretKey) {
        res.status(500).json({ message: "Server error: Missing JWT secret key." });
        return;
      }

      const decoded = jwt.verify(token, secretKey) as User; 
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token." });
    }
  }
}

export default new UserMiddleware();
