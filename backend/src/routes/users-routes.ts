import express from 'express';

const router = express.Router();

router.get('/register', (req, res) => {
  res.json({ message: 'Testing User Registation Route.' });
});

export default router;