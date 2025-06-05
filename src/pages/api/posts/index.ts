import type { NextApiRequest, NextApiResponse } from "next";
import { Post, createPost, getAllPosts } from "@/lib/posts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(getAllPosts());
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const newPost: Post = {
      slug,
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    createPost(newPost);


    res.status(201).json(newPost);
  }

  return res.status(405).end();
}
