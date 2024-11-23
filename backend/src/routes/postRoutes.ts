import express from 'express';
import { createPost, getPosts, getPost } from '../controllers/postController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createPost);
router.get('/', getPosts);
router.get('/:id', getPost as express.RequestHandler);

export default router;