'use client'
import { useState } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Rss, Search } from "lucide-react"
import { Index } from 'lunr'

export default function SideBarBlog({ allPosts, prefix, index }) {

    const [filterdPosts,setFilteredPosts] = useState(allPosts)
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
        setFilteredPosts(filterdPosts=>matchingSlugs)
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        const results = queryIndex.search(e.target.value)
        console.log(results)
        matchPosts(results)
    }

    return (
        <div className={`${pathname == "/" + prefix ? 'w-full' : 'hidden sm:block'} sm:w-96 sm:max-w-[30vw] flex-col border-r pr-5 border-neutral-900 text-primary overflow-y-auto max-h-screen space-y-5`}>
            {prefix === "blog" && (<div className='m-2 flex flex-row'>
                <h1 className='flex-1 text-xl'>Blog</h1>
                <div><Link href="/rss.xml"><Rss size={20} /></Link></div>
            </div>)}
            <label className="input input-bordered flex items-center gap-3 m-2">
                < Search size={20} />
                <input type="text" className="grow" placeholder="Search" onChange={handleChange} />
            </label>
            {filterdPosts.map((post, index) => (
                <div key={index} className={`flex rounded-md ml-2  pl-2 pr-2 pt-2 ${pathname == `/${prefix}/${post.slug}`
                    ? 'bg-neutral-700'
                    : 'sm:hover:bg-neutral-800'}`}>
                    <Link href={`/${prefix}/${post.slug}`}>
                        <p className='m-1'>{post.title}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}