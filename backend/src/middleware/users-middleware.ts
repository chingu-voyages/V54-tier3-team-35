import { NextFunction } from "express";
import { check, ValidationChain, validationResult } from "express-validator";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authUser } from "../interfaces/users.interfaces";

import { config } from "../config/env";
import { User } from "../models/users-models";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      currentUser?: authUser;
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

  public handleValidationErrors(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  }

  public requireAuth(req: Request, res: Response, next: NextFunction): void {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return
    }
  
    try {
      const decoded: authUser = jwt.verify(token, process.env.JWT_SECRET as string) as authUser; // Verify token
      req.currentUser = decoded; 
      next();
    } catch (error) {
      res.status(403).json({ error: 'Invalid or expired token.' });
      return;

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
