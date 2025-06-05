
import { GetServerSideProps } from "next";
import Head from "next/head";

interface QuoteProps {
  content: string;
  author: string;
}

export default function QuotePage({ content, author }: QuoteProps) {
  return (
    <>
      <Head>
        <title>Random Quote</title>
      </Head>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Random Quote</h1>
        <div className=" p-4 rounded shadow">
          <p className="italic text-lg">"{content}"</p>
          <p className="text-right mt-2 text-sm text-gray-600">– {author}</p>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const url = "https://api.quotable.io/random";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); 

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch quote: ${response.status}`);
    }

    const data = await response.json();

    return {
      props: {
        content: data.content,
        author: data.author,
      },
    };
  } catch (error) {
    console.error("Failed to fetch quote:", error);

    return {
      props: {
        content: "Unable to fetch quote at this time.",
        author: "Unknown",
      },
    };
  }
};
