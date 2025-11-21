'use client'
import SideBarTools from "@/components/SideBarTools"

const allTools = [
  {
    title: "Base 64 Tools",
    description: "Base64 encoder decoder",
    path: "/base64"
  },
  {
    title: "JSON Tools",
    description: "Prettify JSON",
    path: "/json"
  },
  {
    title: "Cron Job",
    description: "Explains Cron Schedule",
    path: "/cron"
  },
  {
    title: "Markdown Editor",
    description: "markdown editor",
    path: "/markdown"
  },
  {
    title: "Tic Tac toe",
    path: "/tic"
  },
  {
    title: "Screen Recorder",
    path: "/recorder"
  },
  {
    title: "Image Converter",
    path: "/image"
  }
]

export default function ToolsLayout({ children }) {
  return (
    <div className="flex w-full min-h-screen bg-black">
      <SideBarTools allTools={allTools} prefix={"tools"} />
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-24">
          {children}
        </div>
      </div>
    </div>
  )
}