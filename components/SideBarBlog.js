'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RSS } from "./Icon"

export default function SideBarBlog({ allPosts, prefix }) {
    const pathname = usePathname();
    return (
        <div className={`${pathname == "/" + prefix ? 'w-full sm:w-auto' : 'hidden'} pr-5 sm:flex flex-col border-r border-neutral-700 text-primary-content`}>
            {prefix === "blog" && (<div className='p-5 flex flex-row'>
                <h1 className='underline flex-1'>Blog</h1>
                <div><Link href="/rss.xml"><RSS /></Link></div></div>)}
            {allPosts.map((post, index) => (
                <div key={index} className={`space-x-5 min-h-3 pb-5 m-2 rounded-xl pl-2 pr-2 pt-2 ${pathname == `/${prefix}/${post.slug}`
                    ? 'bg-neutral-700'
                    : 'sm:hover:bg-neutral-800'}`}>
                    <Link href={`/${prefix}/${post.slug}`}>
                        <p>{post.title}</p>
                    </Link>

                </div>
            ))}
        </div>
    )
}