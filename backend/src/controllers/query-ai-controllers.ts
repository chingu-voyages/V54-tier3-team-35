import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { geminiService } from "../services/gemini";
import { StatusCodes } from "http-status-codes";
import { queries } from "../services/queries";


class QueryAIController {
  public async  queryResponse(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { persona, context, task, output, constraint } = req.body;
      const prompt: string = JSON.stringify({persona, context, task, output, constraint});
      const response: string = await geminiService.generateResponse(prompt);

      if (!response) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error generating content, please try again" });
        return;
      }

      await queries.saveQuery({
        userId: Number(req.user?.id),
        persona,
        context,
        task,
        output,
        constraint,
        response,
      });
     

      res.status(StatusCodes.OK).json({ response: response });

    } catch (error) {
      res.status(500).json({ error: "Error generating content, please try again" });
    }
  }
}

export default new QueryAIController();
