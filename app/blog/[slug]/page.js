/* eslint-disable react/no-children-prop */
import { getAllPosts, getPostBySlug } from "@/utils/posts";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import markdownStyles from "./markdown-styles.module.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'


export default async function Post({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className="text-xl sx:ml-20 space-y-5 bg-neutral-950">
      <div className="max-w-prose flex flex-col justify-center mb-10 ml-3 p-5">
        <div className="underline text-3xl text-primary-content  flex felx-col">
          {post.title}
        </div>
        <div className="text-neutral-500 pb-5 text-lg">
          {post.date}
        </div>
        <div className={markdownStyles["markdown"]}>
          <Markdown
            children={post.content}
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={atomDark}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                )
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}


export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with`;

  return {
    title
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

