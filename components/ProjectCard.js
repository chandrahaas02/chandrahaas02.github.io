import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const ProjectCard = ({ title, description, tags, link }) => {
    return (
        <Link href={link} target="_blank" className="group block h-full">
            <div className="h-full border border-white/10 bg-white/5 rounded-xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 relative overflow-hidden">
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-zinc-400">
                    <ArrowUpRight size={20} />
                </div>

                <div className="flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors">{title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {tags.map((tag, index) => (
                            <span key={index} className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard
