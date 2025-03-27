import { NextFunction } from "express";
import { check, ValidationChain, validationResult } from "express-validator";
import { Request, Response } from "express";

class QueryMiddleware {
  public validateQueryInputs(): ValidationChain[] {
    return [
      check("userId").isInt().withMessage("userId must be a valid integer"),
      check("persona")
        .isString()
        .isLength({ min: 1, max: 500 })
        .withMessage("persona must be a non-empty string (max 255 chars)"),
      check("context")
        .isString()
        .isLength({ min: 1, max: 1000 })
        .withMessage("context must be a non-empty string (max 1000 chars)"),
      check("task")
        .isString()
        .isLength({ min: 1, max: 1000 })
        .withMessage("task must be a non-empty string (max 1000 chars)"),
      check("response")
        .optional({ nullable: true })
        .isString()
        .withMessage("response must be a string or null"),
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

export default new QueryMiddleware();
