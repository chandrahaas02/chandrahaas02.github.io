'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {RSS} from "./Icon"

export default function SideBarBlog({ allPosts }) {
    const pathname = usePathname();
    return (
        <div className={`${pathname =="/blog"?'w-full sm:w-auto':'hidden'} pr-5 sm:flex flex-col bg-neutral-900`}>
            <div className='p-5 flex flex-row'>
                <h1 className='underline flex-1'>Blog</h1>
                <div><Link href="/rss.xml"><RSS /></Link></div>
            </div>
            {allPosts.map((post, index) => (
                <div key={index} className={`space-x-5 min-h-3 pb-5 m-2 rounded-xl pl-2 pr-2 ${pathname == `/blog/${post.slug}`
                    ? 'bg-neutral-700'
                    : 'sm:hover:bg-neutral-800'}`}>
                    <Link href={`/blog/${post.slug}`}>
                        <p>{post.title}</p>
                    </Link>

                </div>
            ))}
        </div>
    )
}