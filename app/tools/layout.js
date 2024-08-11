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
    }
  ]

export default function ToolsLayout({ children }) {
    return (
        <div className="flex w-full">
            <SideBarTools allTools={allTools}/>
            <div className="flex flex-1 overflow-y-auto space-y-5" >
                {children}
            </div>
        </div>
        )

}