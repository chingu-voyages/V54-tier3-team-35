import express from 'express';
import { check } from 'express-validator';
import UserController from '../controllers/users-controllers';

const router = express.Router();

router.get('/register', (req, res) => {
  res.json({ message: 'Testing User Registration Route.' });
});

router.post(
  '/register',
  [
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('username').not().isEmpty().withMessage('Username is required'),
  ],
  UserController.registerUser
);

router.post('/login', UserController.loginUser)

export default router;
