import express from 'express';
import { signup, login } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup as express.RequestHandler);
router.post('/login', login as express.RequestHandler);

export default router;