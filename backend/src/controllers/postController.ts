import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.userId!,
      },
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post' });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { author } = req.query;
    const posts = await prisma.post.findMany({
      where: author ? { authorId: author as string } : undefined,
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { author, search } = req.query;
    const posts = await prisma.post.findMany({
      where: {
        ...(author ? { authorId: author as string } : {}),
        ...(search ? {
          OR: [
            { title: { contains: search as string, mode: 'insensitive' } },
            { content: { contains: search as string, mode: 'insensitive' } },
          ],
        } : {}),
      },
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
};