import { getAllPosts , generateRSSFeed } from "@/utils/posts"
import SideBarBlog from "@/components/SideBarBlog.js"
const allPosts = getAllPosts();
generateRSSFeed()

export default function BlogLayout({ children }) {
    return (
        <div className="flex w-full">
            <SideBarBlog allPosts={allPosts}/>
            <div className="flex flex-1 overflow-y-auto justify-center max-h-screen space-y-5" >
                {children}
            </div>
        </div>
        )

}