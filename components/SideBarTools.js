'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideBarTools({ allTools }) {
    const pathname = usePathname();
    return (
        <div className={`${pathname =="/tools"?'w-full sm:w-auto sm:min-w-80':'hidden'} pr-5 sm:flex flex-col bg-neutral-900`}>
            {allTools.map((tools, index) => (
                <div key={index} className={`space-x-5 min-h-3 pb-5 m-2 rounded-xl pl-2 pr-2 ${pathname == `/tools/${tools.path}`
                    ? 'bg-neutral-700'
                    : 'sm:hover:bg-neutral-800'}`}>
                    <Link href={`/tools/${tools.path}`}>
                        <p>{tools.title}</p>
                    </Link>

                </div>
            ))}
        </div>
    )
}