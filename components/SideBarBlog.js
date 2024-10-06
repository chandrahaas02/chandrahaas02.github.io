'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RSS } from "./Icon"

export default function SideBarBlog({ allPosts, prefix }) {
    const pathname = usePathname();
    return (
        <div className={`${pathname == "/" + prefix ? 'w-full sm:w-auto' : 'hidden sm:flex'} flex-col border-r border-neutral-700 text-primary overflow-y-auto max-h-screen space-y-5`}>
            {prefix === "blog" && (<div className='p-5 flex flex-row'>
                <h1 className='underline flex-1'>Blog</h1>
                <div><Link href="/rss.xml"><RSS /></Link></div></div>)}
            {allPosts.map((post, index) => (
                <div key={index} className={`flex rounded-r-md ${pathname == `/${prefix}/${post.slug}`
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