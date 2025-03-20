import bcrypt from "bcryptjs";
import { pool } from "../config/db";

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
}

class UserModel {
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

  static fetchUserEmailAndConfirmPassword(email:string, inputPassword:string): Promise<User | null> {
    return pool.query('SELECT * FROM users WHERE email = $1', [email])
      .then((result) => {
        const user = result.rows[0];
        if (!user) return null; // User not found

        return bcrypt.compare(inputPassword, user.password).then((isMatch) => {
          return isMatch ? user : null; // Return user if password matches, otherwise null
        });
      })
      .catch((error) => {
        console.error('Database error:', error);
        throw new Error('Database error');
      });
  }
}

export default UserModel;
