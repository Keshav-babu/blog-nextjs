import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { Post, getAllPosts } from "../lib/posts";

interface HomeProps {
  initialPosts: Post[];
}

export default function HomePage({ initialPosts }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState("");


  useEffect(() => {
    async function refreshPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    }


    refreshPosts();
  }, []);

  const filteredPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <div className="max-w-3xl mx-auto p-4 bg-white">
        <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>

        <input
          type="text"
          placeholder="Search posts..."
          className="w-full p-2 border rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link href="/new-post">
          <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
            + New Post
          </button>
        </Link>

        {filteredPosts?.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredPosts?.map((post) => (
              <>
                <li
                  key={post.slug}
                  className="border p-4 rounded hover:bg-gray-700"
                >
                  <Link href={`/posts/${post.slug}`}>
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                  </Link>
                  {/* <p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleString()}</p> */}
                  <p className="mt-2 text-gray-700">
                    {post.content.slice(0, 100)}...
                  </p>
                  <Link href={`/edit-post/${post.slug}`}>
                    <button className="mt-2 text-sm text-blue-600 hover:underline">
                      Edit
                    </button>
                  </Link>
                </li>
              </>
            ))}
          </ul>
        )}
        <Link href="/quote">
          <button className="mb-4 ml-4 px-4 py-2 bg-purple-600 text-white rounded">
            📝 Get a Random Quote
          </button>
        </Link>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const initialPosts = getAllPosts();
  return {
    props: {
      initialPosts,
    },
    revalidate: 10,
  };
};
