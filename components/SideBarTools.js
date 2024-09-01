'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideBarTools({ allTools , prefix }) {
    const pathname = usePathname();
    return (
        <div className={`${pathname =="/"+prefix ?'w-full':'hidden'} z-0 relative sm:w-auto sm:min-w-80 pr-5 sm:flex flex-col border-r border-neutral-800`}>
            {allTools.map((tools, index) => (
                <div key={index} className={`space-x-5 min-h-3 pb-5 m-2 rounded-xl pl-2 pr-2 pt-2 ${pathname == `/${prefix}${tools.path}`
                    ? 'bg-neutral-700'
                    : 'sm:hover:bg-neutral-800'}`}>
                    <Link href={`/${prefix}${tools.path}`}>
                        <p>{tools.title}</p>
                    </Link>

                </div>
            ))}
        </div>
    )
}