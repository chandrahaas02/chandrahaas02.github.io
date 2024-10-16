import { getAllPosts , generateRSSFeed, createIndex } from "@/utils/posts"
import SideBarBlog from "@/components/SideBarBlog.js"
const allPosts = getAllPosts();
generateRSSFeed()
const index = createIndex();

export default function BlogLayout({ children }) {
    return (
        <div className="flex w-full">
            <SideBarBlog allPosts={allPosts} prefix={"blog"} index={JSON.stringify(index)}/>
            <div className="flex flex-1 overflow-y-auto justify-center max-h-screen space-y-5" >
                {children}
            </div>
        </div>
        )
}