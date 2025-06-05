import { Post, getAllPosts, getPostBySlug } from "@/lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    const res = await fetch(`/api/posts/${post.slug}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to delete post.");
    }
  };
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="text-lg text-gray-700 whitespace-pre-wrap">
          {post.content}
        </p>
        <div className="flex justify-between items-center">
        <Link href={`/edit-post/${post.slug}`}>
          <button className="mt-2 text-sm text-blue-600 hover:underline ">
            Edit
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="hover:text-red-500 text-sm "
        >
          Delete Post
        </button>
        </div>
      </div>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: "blocking", 
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const lklk = getAllPosts();
  const post = getPostBySlug(slug);
  console.log("Hello12", { post, lklk });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
