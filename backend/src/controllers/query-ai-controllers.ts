import { Request, Response } from "express";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import { geminiService } from "../services/gemini";
import { StatusCodes } from "http-status-codes";

dotenv.config();

class QueryAIController {
  public async  queryResponse(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const prompt: string = JSON.stringify(req.body);
      const response: string = await geminiService.generateResponse(prompt);

      res.status(StatusCodes.OK).json({ response: response });

    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new QueryAIController();
