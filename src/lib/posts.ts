import fs from 'fs';
import path from 'path';

export interface Post {
  slug: string;
  title: string;
  content: string;
  createdAt: string;
}

const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');

function readPosts(): Post[] {
  if (!fs.existsSync(postsFilePath)) return [];
  const fileContents = fs.readFileSync(postsFilePath, 'utf8');
  return JSON.parse(fileContents);
}

function writePosts(posts: Post[]) {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
}

export function getAllPosts(): Post[] {
  return readPosts();
}

export function getPostBySlug(slug: string): Post | undefined {
  return readPosts().find((p) => p.slug === slug);
}

export function createPost(post: Post) {
  const posts = readPosts();
  console.log("pppppp",{posts})
  posts.push(post);
  writePosts(posts);
}

export function updatePost(slug: string, updatedData: Partial<Post>) {
  let posts = readPosts();
  posts = posts.map((p) => (p.slug === slug ? { ...p, ...updatedData } : p));
  writePosts(posts)
}

export function deletePost(slug: string) {
  let posts = readPosts();
  posts = posts.filter((p) => p.slug !== slug);
  writePosts(posts)
}