import { getAllPosts } from "@/utils/posts"
import BlogList from "@/components/BlogList.js"

export const metadata = {
  title: 'Blog | Chandrahaas',
  description: 'Thoughts on software engineering, design, and philosophy.',
}

export default async function Home() {
  const posts = getAllPosts();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Blog</h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Thoughts on software engineering, design, and philosophy.
        </p>
      </div>
      
      <BlogList posts={posts} />
    </div>
  );
}