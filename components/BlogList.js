"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function BlogList({ posts }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    return (
        <div>
            <div className="relative mb-12">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg leading-5 bg-white/5 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-white/10 focus:border-zinc-500 sm:text-sm transition-colors"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-12">
                {filteredPosts.map((post) => (
                    <article key={post.slug} className="group relative flex flex-col items-start">
                        <div className="flex items-center gap-x-4 text-xs mb-2">
                            <time dateTime={post.date} className="text-zinc-500 font-mono">
                                {post.date}
                            </time>
                            {post.tags && post.tags.map(tag => (
                                <span key={tag} className="relative z-10 rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-zinc-400 hover:bg-white/10 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-xl font-semibold text-zinc-200 group-hover:text-white transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                                <span className="absolute inset-0" />
                                {post.title}
                            </Link>
                        </h2>
                        {/* Excerpt would go here if available in frontmatter, for now just title/date/tags */}
                    </article>
                ))}
                {filteredPosts.length === 0 && (
                    <p className="text-zinc-500 text-center py-12">No posts found.</p>
                )}
            </div>
        </div>
    );
}
