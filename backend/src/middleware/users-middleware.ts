import { NextFunction } from "express";
import { check, ValidationChain, validationResult } from "express-validator";
import { Request, Response } from "express";

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
}

export default new UserMiddleware();
