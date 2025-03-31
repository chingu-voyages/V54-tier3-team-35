import { Request, Response } from "express";
import UserModel from "../models/users-models";
import jwt from "jsonwebtoken";
import UserService from "../services/user-service";

class UserController {

  public registerUser(req: Request, res: Response): void {
    const { username, email, password } = req.body;

    UserService.createUser(username, email, password)
      .then((user) => {
        res.status(201).json({
          message: "User registered successfully",
          user,
        });
      })
      .catch((error) => {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: "Server error" });
      });
  }


  public loginUser(req: Request, res: Response): void {
    const { email, password } = req.body;

    UserModel.fetchUserEmailAndConfirmPassword(email, password)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const secretKey = process.env.SECRET_KEY;

        if (!secretKey) {
          throw new Error(
            "SECRET_KEY is not defined in the environment variables!"
          );
        }
        // Generate JWT token
        const token = jwt.sign(
          { id: user.id, email: user.email, username: user.username },
          secretKey,
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({ message: "Login successful", token });
      })
      .catch((error) => {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
      });
  }
}

export default new UserController();
