"use client"
import Breadcrumbs from "@/components/Breadcrumbs.js"
import { usePathname } from 'next/navigation'

export default function ToolsLayout({ children }) {
  const pathname = usePathname()

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="px-6 py-3 sm:pt-6">
        <Breadcrumbs />
      </div>
      {pathname !== '/tools' && (
        <div className="border-t border-white/10"></div>
      )}
      <div className="max-w-5xl mx-auto px-6 py-3 sm:pt-6">
        {children}
      </div>
    </div>
  )
}