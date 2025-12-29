"use client"
import Breadcrumbs from "@/components/Breadcrumbs.js"
import { usePathname } from 'next/navigation'

export default function BlogLayout({ children }) {
    const pathname = usePathname()

    return (
        <div className="w-full min-h-screen bg-black">
            <div className={`${pathname === '/blog' ? "hidden" : "flex"} absolute w-full bg-black px-6 py-3 sm:pt-6 mb-6 border-b border-white/10 z-10}`}>
                <Breadcrumbs />
            </div>
            <div className="max-w-5xl mx-auto px-6 py-3 sm:pt-6 mt-24">
                {children}
            </div>
        </div>
    )
}