import { Request, Response } from "express";
import QueryModel from "../models/queries-models";

class QueryController {
  public uploadQuery(req: Request, res: Response) {
    const { userId, persona, context, task, response } = req.body;
    QueryModel.postQuery(userId, persona, context, task, response)
      .then((query) => {
        res.status(201).json({ message: "Query uploaded succesfully", query });
      })
      .catch((error) => {
        console.error("Error uploading Query:", error.message);
        res.status(500).json({ message: "Server error" });
      });
  }
}

export default new QueryController();
