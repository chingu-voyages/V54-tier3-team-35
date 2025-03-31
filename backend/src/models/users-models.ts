import bcrypt from "bcryptjs";
import { pool } from "../config/db";
import { User } from "../interfaces/user";

class UserModel {
  static isUserEmailExists(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM Users WHERE Email = $1",
        [email],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          if (results && results.rowCount != null) {
            resolve(results.rowCount > 0);
          } else {
            reject(new Error("Invalid query result"));
          }
        }
      );
    });
  }

  static isUsernameExists(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM Users WHERE Username = $1",
        [username],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          if (results && results.rowCount != null) {
            resolve(results.rowCount > 0);
          }
        }
      );
    });
  }

  static createUser(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return pool.query(
          "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
          [username, email, hashedPassword]
        );
      })
      .then((result) => result.rows[0])
      .catch((error) => {
        console.error("Error inserting user:", error);
        throw new Error("Database error");
      });
  }

  static fetchUserEmailAndConfirmPassword(
    email: string,
    inputPassword: string
  ): Promise<User | null> {
    return pool
      .query("SELECT * FROM users WHERE email = $1", [email])
      .then((result) => {
        const user = result.rows[0];
        if (!user) return null; // User not found

        return bcrypt.compare(inputPassword, user.password).then((isMatch) => {
          return isMatch ? user : null; // Return user if password matches, otherwise null
        });
      })
      .catch((error) => {
        console.error("Database error:", error);
        throw new Error("Database error");
      });
  }
}

export default UserModel;
