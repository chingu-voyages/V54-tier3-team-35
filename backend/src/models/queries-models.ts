import bcrypt from "bcryptjs";
import { pool } from "../config/db";

interface Query {
  id: number;
  userId: number;
  persona: string;
  context: string;
  task: string;
  response: string | null;
}

class QueryModel {
  static postQuery(
    userId: number,
    persona: string,
    context: string,
    task: string,
    response: string | null
  ): Promise<Query> {
    return pool
      .query(
        "INSERT INTO queries (user_id, persona, context, task, response) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [userId, persona, context, task, response]
      )
      .then((result) => result.rows[0])
    //   .catch((error) => {
    //     console.error("Error inserting query:", error);
    //     throw new Error("Database error");
    //   });
  }
}

export default QueryModel;
