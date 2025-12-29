/* eslint-disable react/no-children-prop */
import { getAllPosts, getPostBySlug } from "@/utils/posts";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import DisqusComments from "@/components/comments";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Post({ params }) {
  const post = getPostBySlug(params.slug);
  const url = `https://chandrahaas02.github.io/blog/${params.slug}`;

  if (!post) {
    return notFound();
  }

  return (
    <main className="max-w-3xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-zinc-500 font-mono border-b border-white/5 pb-4">
          <time dateTime={post.date}>{post.date}</time>
          {post.tags && (
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-zinc-400">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <article className="font-sans prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h1:text-2xl prose-a:text-zinc-400 hover:prose-a:text-zinc-100 prose-code:text-zinc-200 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10">
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
                  customStyle={{ background: 'transparent', padding: 0 }}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            }
          }}
        />
      </article>

      <div className="mt-16 pt-8 border-t border-white/5">
        <h2 className="text-xl font-semibold text-zinc-200 mb-8">Comments</h2>
        <DisqusComments url={url} identifier={params.slug} title={post.title} />
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

