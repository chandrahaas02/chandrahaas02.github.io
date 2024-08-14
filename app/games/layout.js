import SideBarTools from "@/components/SideBarTools"

const allTools = [
    {
      title: "Tic Tac Toe",
      description: "Tic Tac Toe",
      path: "/tic"
    },
  ]

export default function ToolsLayout({ children }) {
    return (
        <div className="flex w-full">
            <SideBarTools allTools={allTools} prefix={"games"}/>
            <div className="flex flex-1 overflow-y-auto space-y-5" >
                {children}
            </div>
        </div>
        )

}