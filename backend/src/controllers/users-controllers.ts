import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserModel from '../models/users-models';

class UserController {

    public registerUser(req: Request, res: Response): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { username, email, password } = req.body;

    UserModel.createUser(username, email, password)
      .then(user => {
        res.status(201).json({
          message: 'User registered successfully',
          user,
        });
      })
      .catch(error => {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Server error' });
      });
  }
}

export default new UserController();
