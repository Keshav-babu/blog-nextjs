import { deletePost, getPostBySlug, updatePost } from '@/lib/posts';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (typeof slug !== 'string') return res.status(400).end();

  if (req.method === 'PUT') {
    const { title, content } = req.body;
    const existing = getPostBySlug(slug);
    if (!existing) return res.status(404).json({ message: 'Post not found' });

    updatePost(slug, { title, content });
    return res.status(200).json({ message: 'Post updated' });
  }

  if (req.method === 'DELETE') {
    deletePost(slug);
    return res.status(204).end();
  }

  return res.status(405).end();
}
