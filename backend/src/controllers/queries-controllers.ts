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
  public editQuery(req: Request, res: Response) {
    const { persona, context, task, response } = req.body;
    const queryId: number = Number(req.body.queryId);
    const userId: number = Number(req.user?.id);
    console.log(`queryId: ${queryId}, userId: ${userId}`); // Debugging log
    console.log(userId);

    if (!queryId) {
      res.status(400).json({ message: "Query ID is required" });
    }

    if (!userId) {
      res.status(401).json({ message: "Unauthorised: No user ID found" });
    }

    //  TODO Check if the logged-in user is the owner of the query once load query is done.

    QueryModel.updateQuery(queryId, userId, persona, context, task, response)
      .then((updatedQuery) => {
        if (!updatedQuery) {
          return res.status(404).json({ message: "Query not found" });
        }
        res.status(200).json({ message: "Query updated successfully", updatedQuery });
      })
      .catch((error) => {
        console.error("Error updating query:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
      });
  }

  public deleteQuery(req: Request, res: Response) {
    const queryId: number = Number(req.body.queryId || req.params.queryId);

    const userId: number = Number(req.user?.id);
    if (!queryId) {
      res.status(400).json({ message: "Query ID is required" });
    }

    if (!userId) {
      res.status(401).json({ message: "Unauthorised: No user ID found" });
    }

    //  TODO Check if the logged-in user is the owner of the query once load query is done.

    QueryModel.deleteQuery(queryId, userId)
      .then((result) => {
        if (!result) {
          return res.status(404).json({ message: "Query not found or unauthorised" });
        }
        res.status(200).json({ message: "Query deleted successfully" });
      })
      .catch((error) => {
        console.error("Error deleting query:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
      });
  }
}

export default new QueryController();
