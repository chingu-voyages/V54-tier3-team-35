import { Request, Response } from "express";
import { validationResult } from "express-validator";
import UserModel from "../models/users-models";
import jwt from "jsonwebtoken";

class UserController {
  
  public registerUser(req: Request, res: Response): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { username, email, password } = req.body;

    Promise.all([
      UserModel.isUserEmailExists(email),
      UserModel.isUsernameExists(username),
    ])
      .then(([emailExists, usernameExists]) => {
        const errors = [];
        if (emailExists) errors.push("Email already exists");
        if (usernameExists) errors.push("Username already exists");

        if (errors.length > 0) {
          return res.status(400).json({ errors });
        }

        UserModel.createUser(username, email, password)
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
      })
      .catch((error) => {
        console.error("Error checking email/username existence:", error.message);
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

        // Generate JWT token
        const token = jwt.sign(
          { id: user.id, email: user.email },
          "your_secret_key",
          { expiresIn: "1h" }
        );

        res.status(200).send({ message: "Login successful", token });
      })
      .catch((error) => {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
      });
  }
}

export default new UserController();
