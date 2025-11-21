'use client'
import { useState } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Rss, Search } from "lucide-react"
import { Index } from 'lunr'

export default function SideBarBlog({ allPosts, prefix, index }) {

    const [filterdPosts, setFilteredPosts] = useState(allPosts)
    const pathname = usePathname();
    const queryIndex = Index.load(JSON.parse(index))

    const matchPosts = (results) => {
        const slugMap = new Map();
        const matchingSlugs = [];

        // Create a map for quick slug lookup
        allPosts.forEach(post => {
            slugMap.set(post.slug, post);
        });

        results.forEach(item => {
            const ref = item.ref;
            const post = slugMap.get(ref);
            if (post) {
                matchingSlugs.push(post);
            }
        });
        setFilteredPosts(filterdPosts => matchingSlugs)
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        const results = queryIndex.search(e.target.value)
        matchPosts(results)
    }

    return (
        <div className={`${pathname == "/" + prefix ? 'w-full' : 'hidden sm:flex'} sm:w-80 flex-col relative border-r border-white/10 bg-black h-screen overflow-y-auto`}>
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md p-4 border-b border-white/10">
                {prefix === "blog" && (
                    <div className='flex items-center justify-between mb-4'>
                        <h1 className='text-sm font-mono text-zinc-500 tracking-widest uppercase'>Blog</h1>
                        <Link href="/rss.xml" className="text-zinc-500 hover:text-white transition-colors">
                            <Rss size={16} />
                        </Link>
                    </div>
                )}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={14} className="text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-9 pr-3 py-1.5 border border-white/10 rounded-lg leading-5 bg-white/5 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:bg-white/10 focus:border-zinc-500 text-sm transition-all"
                        placeholder="Search posts..."
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="p-2 space-y-1">
                {filterdPosts.map((post, index) => (
                    <Link
                        key={index}
                        href={`/${prefix}/${post.slug}`}
                        className={`group flex flex-col p-3 rounded-lg transition-all duration-200 ${pathname == `/${prefix}/${post.slug}`
                                ? 'bg-white/10 text-white'
                                : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                            }`}
                    >
                        <span className="text-sm font-medium leading-snug mb-1">{post.title}</span>
                        <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-500 transition-colors">{post.date}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}