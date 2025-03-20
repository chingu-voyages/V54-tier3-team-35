import bcrypt from "bcryptjs";
import { pool } from "../config/db";

export interface User {
    id: number;
    username: string;
    email: string;
    password?: string;
  }
  
  class UserModel {
    static createUser(username: string, email: string, password: string): Promise<User> {
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword =>
          pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
          )
        )
        .then(result => result.rows[0] as User)
        .catch(error => {
          console.error('Error inserting user:', error);
          throw new Error('Database error');
        });
    }
  }
  
  export default UserModel;