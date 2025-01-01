export function RSS() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rss">
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" />
        </svg>
    )
}

export function ChevronLeft() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
            <path d="m15 18-6-6 6-6" />
        </svg>
    )
}

export function Hamburger() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}

export const TickMark = () => {
    return (<div className="timeline-middle rounded-full bg-neutral-700 p-3">
        <svg xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="lucide lucide-briefcase-business"><path d="M12 12h.01"/>
        <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <path d="M22 13a18.15 18.15 0 0 1-20 0"/>
        <rect width="20" height="14" x="2" y="6" rx="2"/>
        </svg>
    </div>)
}


export function Hovertext({children, text}) {
    return (
        <div className="flex items-center justify-center group m-10">
        <div className="flex items-center justify-center group">
            <div className="absolute m-0 group-hover:opacity-50">{children}</div>
            <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">{text}</div>
        </div>
        </div>
    )
}