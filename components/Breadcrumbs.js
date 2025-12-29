"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'

const getDisplayName = (segment, fullPath) => {
  // Handle dynamic routes
  if (segment.includes('[') && segment.includes(']')) {
    return 'Post'
  }

  // Capitalize and format segment
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage or section homepages
  if (pathname === '/' || pathname === '/blog' || pathname === '/tools') {
    return null
  }

  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs = []

  // Build breadcrumb items starting from section level
  pathSegments.forEach((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/')
    const isLast = index === pathSegments.length - 1

    // Skip the first segment if it's a section homepage
    if (index === 0 && (segment === 'blog' || segment === 'tools')) {
      breadcrumbs.push({
        href: `/${segment}`,
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        isLast: pathSegments.length === 1
      })
    } else if (index > 0) {
      // Handle blog post slugs
      if (pathSegments[0] === 'blog' && index === 1) {
        breadcrumbs.push({
          href,
          label: getDisplayName(segment, href),
          isLast
        })
      } else if (pathSegments[0] === 'tools' && index === 1) {
        // For tools, use the tool name from the path
        breadcrumbs.push({
          href,
          label: getDisplayName(segment, href),
          isLast
        })
      }
    }
  })

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <nav className="flex items-center space-x-1 text-lg text-zinc-500" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <Fragment key={breadcrumb.href}>
          {index > 0 && <ChevronRight size={20} className="text-zinc-600" />}
          {breadcrumb.isLast ? (
            <span className="text-zinc-300 font-medium" aria-current="page">
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              href={breadcrumb.href}
              className="hover:text-zinc-300 transition-colors"
            >
              {breadcrumb.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  )
}