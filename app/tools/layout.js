'use client'
import { useState } from "react"
import SideBarTools from "@/components/SideBarTools"
import {Expand,Shrink} from "lucide-react"

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
    title:"image Converter",
    path:"/image"
  }
]

export default function ToolsLayout({ children }) {

  const [fullscreen, setFullscreen] = useState(false)

  const handleScreen = () => {
    setFullscreen(fullscreen=>!fullscreen)
  }

  return (
    <div className="z-0 relative flex w-full">
      <SideBarTools allTools={allTools} prefix={"tools"} />
      <button className="btn absolute hidden sm:block z-[1000] right-0 rounded-sm opacity-50" onClick={handleScreen}>{fullscreen?<Shrink/>:<Expand/>}</button>
      <div className={`z-10 ${fullscreen?"absolute":"relative"} w-full h-full flex flex-1 overflow-y-auto space-y-5 align-top`} >
        {children}
      </div>
    </div>
  )

}