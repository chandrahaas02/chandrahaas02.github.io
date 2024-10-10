'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Rss } from "lucide-react"

export default function SideBarBlog({ allPosts, prefix }) {
    const pathname = usePathname();
    return (
        <div className={`${pathname == "/" + prefix ? 'w-full sm:w-auto' : 'hidden sm:flex'} flex-col border-r pr-5 border-neutral-900 text-primary overflow-y-auto max-h-screen space-y-5`}>
            {prefix === "blog" && (<div className='m-2 flex flex-row'>
                <h1 className='flex-1 text-xl'>Blog</h1>
                <div><Link href="/rss.xml"><Rss size={20}/></Link></div>
                </div>)}
            {allPosts.map((post, index) => (
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