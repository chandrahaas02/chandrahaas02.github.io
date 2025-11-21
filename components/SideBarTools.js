'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wrench } from "lucide-react"

export default function SideBarTools({ allTools, prefix, hidden }) {
    const pathname = usePathname();
    return (
        <div className={`${pathname == "/" + prefix ? 'w-full' : 'hidden'} z-0 relative ${hidden ? 'sm:hidden' : 'sm:flex'} sm:w-80 flex-col border-r border-white/10 bg-black h-screen overflow-y-auto`}>
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md p-4 border-b border-white/10">
                <div className='flex items-center gap-2 mb-1'>
                    <Wrench size={16} className="text-zinc-500" />
                    <h1 className='text-sm font-mono text-zinc-500 tracking-widest uppercase'>Tools</h1>
                </div>
            </div>

            <div className="p-2 space-y-1">
                {allTools.map((tools, index) => (
                    <Link
                        key={index}
                        href={`/${prefix}${tools.path}`}
                        className={`group flex flex-col p-3 rounded-lg transition-all duration-200 ${pathname == `/${prefix}${tools.path}`
                                ? 'bg-white/10 text-white'
                                : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                            }`}
                    >
                        <span className="text-sm font-medium leading-snug mb-1">{tools.title}</span>
                        {tools.description && (
                            <span className="text-[10px] text-zinc-600 group-hover:text-zinc-500 transition-colors line-clamp-1">{tools.description}</span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    )
}