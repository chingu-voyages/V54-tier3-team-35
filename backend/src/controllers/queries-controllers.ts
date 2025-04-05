import { Request, Response } from "express";
import QueryModel from "../models/queries-models";

class QueryController {
  public uploadQuery(req: Request, res: Response) {
    const { persona, context, task, output, constraint, response } = req.body;

    // Extracts user Id from  request header
    const userId: number = Number(req.user?.id);

    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    QueryModel.postQuery(
      userId,
      persona,
      context,
      task,
      output,
      constraint,
      response
    )
      .then((query) => {
        res.status(201).json({ message: "Query uploaded successfully", query });
      })
      .catch((error) => {
        console.error("Error uploading Query:", error.message);
        res.status(500).json({ message: "Server error" });
      });
  }

  public getQueries(req: Request, res: Response) {
    const userId: number = Number(req.user?.id);

    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    QueryModel.fetchAllUserQueries(userId)
      .then((queries) => {
        if (queries.length === 0) {
          return res
            .status(404)
            .json({ message: "No queries found for this user" });
        }
        res
          .status(200)
          .json({ message: "User Queries fetched successfully", queries });
      })
      .catch((error) => {
        console.error("Error fetching Queries:", error.message);
        res.status(500).json({ message: "Server error" });
      });
  }

  public getSpecificQuery(req: Request, res: Response) {
    const queryId: number = Number(req.params.id);
    const userId: number = Number(req.user?.id);

    if (isNaN(queryId) || isNaN(userId)) {
      res.status(400).json({ message: "Invalid queryId or userId" });
      return;
    }

    QueryModel.fetchSpecificUserQuery(userId, queryId)
      .then((query) => {
        if (!query) {
          return res.status(404).json({ message: "Query not found" });
        }
        res
          .status(200)
          .json({ message: "User Query fetched successfully", query });
      })
      .catch((error) => {
        console.error("Error fetching Query:", error.message);
        res.status(500).json({ message: "Server error" });
      });
  }

  public editQuery(req: Request, res: Response) {
    const queryId: number = Number(req.params.id);
    const userId: number = Number(req.user?.id);

    if (isNaN(queryId) || isNaN(userId)) {
      res.status(400).json({ message: "Invalid queryId or userId" });
    }

    const { persona, context, task, output, constraint, response } = req.body;

    QueryModel.updateQuery(
      queryId,
      userId,
      persona,
      context,
      task,
      output,
      constraint,
      response
    )
      .then((updatedQuery) => {
        if (!updatedQuery) {
          return res
            .status(404)
            .json({ message: "Query not found or Unauthorised." });
        }
        res
          .status(200)
          .json({ message: "Query updated successfully", updatedQuery });
      })
      .catch((error) => {
        console.error("Error updating query:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
      });
  }

  public deleteQuery(req: Request, res: Response) {
    const queryId: number = Number(req.params.id);
    const userId: number = Number(req.user?.id);
    if (!queryId) {
      res.status(400).json({ message: "Query ID is required" });
    }

   if (!userId || isNaN(userId)) {
      res.status(401).json({ message: "Unauthorised: No user ID found" });
    }

    QueryModel.deleteQuery(queryId, userId)
      .then((result) => {
        if (!result) {
          return res
            .status(404)
            .json({ message: "Query not found or unauthorised" });
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
