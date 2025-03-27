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
      .then((result) => result.rows[0]);
    //   .catch((error) => {
    //     console.error("Error inserting query:", error);
    //     throw new Error("Database error");
    //   });
  }

  static fetchAllUserQueries(userId: number): Promise<Query[]> {
    return pool
      .query(
        "SELECT * FROM queries WHERE user_id = $1 ORDER BY updated_at DESC",
        [userId]
      )
      .then((result) => {
        return result.rows;
      });
  }

  static fetchSpecificUserQuery(
    userId: number,
    queryId: number
  ): Promise<Query | null> {
    return pool
      .query("SELECT * FROM queries WHERE user_id = $1 AND id = $2", [
        userId,
        queryId,
      ])
      .then((result) => {
        return result.rows[0];
      });
  }

  static updateQuery(
    queryId: number,
    userId: number,
    persona: string,
    context: string,
    task: string,
    response: string | null
  ): Promise<Query | null> {
    return pool
      .query(
        "UPDATE queries SET persona = $1, context = $2, task = $3, response = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
        [persona, context, task, response, queryId, userId]
      )
      .then((result) => (result.rows.length > 0 ? result.rows[0] : null));
  }

  static deleteQuery(queryId: number, userId: number): Promise<boolean> {
    return pool
      .query("DELETE FROM queries WHERE id = $1 AND user_id = $2 RETURNING *", [
        queryId,
        userId,
      ])
      .then((result) => (result.rows.length > 0 ? result.rows[0] : null));
  }
}

export default QueryModel;
