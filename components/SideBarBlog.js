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
        matchPosts(results)
    }

    return (
        <div className={`${pathname == "/" + prefix ? 'w-full' : 'hidden sm:block'} sm:w-96 sm:max-w-[30vw] flex-col  relative border-r pr-5 border-neutral-900 text-primary overflow-y-auto max-h-screen`}>
            {prefix === "blog" && (<div className='mt-2 flex flex-row'>
                <h1 className='flex-1 text-xl ml-2'>Blog</h1>
                <div><Link href="/rss.xml"><Rss size={20} /></Link></div>
            </div>)}
            <label className="input input-bordered flex items-center gap-0 m-2 w-full">
                < Search size={20} />
                <input type="text" className="grow m-2" placeholder="Search" onChange={handleChange} />
            </label>
            {filterdPosts.map((post, index) => (
                <div
                    key={index}
                    className={`flex rounded-md ml-2 p-2 ${pathname == `/${prefix}/${post.slug}`
                        ? 'bg-neutral-700'
                        : 'sm:hover:bg-neutral-800'}`}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <Link href={`/${prefix}/${post.slug}`} className="w-full flex items-center" style={{ height: '100%' }}>
                        <p className='m-1 w-full text-left text-[16px] flex items-center'>{post.title}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}