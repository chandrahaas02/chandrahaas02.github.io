import Link from 'next/link'
import { 
  Code, 
  FileText, 
  Hash, 
  Clock, 
  Image, 
  Video, 
  Grid3x3,
  ArrowRight
} from "lucide-react"

const toolIcons = {
  "Base 64 Tools": Hash,
  "JSON Tools": Code,
  "Cron Job": Clock,
  "Markdown Editor": FileText,
  "Tic Tac toe": Grid3x3,
  "Screen Recorder": Video,
  "Image Converter": Image
}

const featuredTools = ["JSON Tools", "Markdown Editor", "Base64 Tools"]

export default function Home() {
  const allTools = [
    {
      title: "Base 64 Tools",
      description: "Base64 encoder decoder",
      path: "/base64",
      category: "Utility",
      featured: false
    },
    {
      title: "JSON Tools",
      description: "Prettify JSON with diff tracking",
      path: "/json",
      category: "Developer",
      featured: true
    },
    {
      title: "Cron Job",
      description: "Explains Cron Schedule",
      path: "/cron",
      category: "Developer",
      featured: false
    },
    {
      title: "Markdown Editor",
      description: "Full-featured markdown editor with storage",
      path: "/markdown",
      category: "Editor",
      featured: true
    },
    {
      title: "Tic Tac toe",
      description: "Classic game implementation",
      path: "/tic",
      category: "Game",
      featured: false
    },
    {
      title: "Screen Recorder",
      description: "Screen capture utility",
      path: "/recorder",
      category: "Media",
      featured: false
    },
    {
      title: "Image Converter",
      description: "Convert between image formats",
      path: "/image",
      category: "Media",
      featured: false
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Developer Tools</h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          A collection of client-side utilities for developers and designers. All tools run entirely in your browser for privacy and speed.
        </p>
      </div>

      {/* Featured Tools */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          Featured Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTools.filter(tool => tool.featured).map((tool, index) => {
            const IconComponent = toolIcons[tool.title]
            return (
              <Link
                key={index}
                href={`/tools${tool.path}`}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                    <IconComponent size={24} className="text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded">
                    {tool.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-zinc-100 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-zinc-400 mb-4 line-clamp-2 group-hover:text-zinc-300 transition-colors">
                  {tool.description}
                </p>
                <div className="flex items-center text-zinc-500 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Use Tool</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* All Tools */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">All Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTools.map((tool, index) => {
            const IconComponent = toolIcons[tool.title]
            return (
              <Link
                key={index}
                href={`/tools${tool.path}`}
                className="group flex items-center gap-4 p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  <IconComponent size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white mb-1 group-hover:text-zinc-100 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors truncate">
                    {tool.description}
                  </p>
                </div>
                <ArrowRight size={16} className="text-zinc-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-16 p-6 rounded-xl border border-white/10 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50">
        <h3 className="text-lg font-semibold text-white mb-3">Client-Side Processing</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          All tools are built to run entirely in your browser using client-side JavaScript. This means your data never leaves your device, ensuring complete privacy and instant processing without server delays.
        </p>
      </div>
    </div>
  );
}