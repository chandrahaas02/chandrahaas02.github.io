import { getAllPosts, generateRSSFeed, createIndex } from "@/utils/posts"
import SideBarBlog from "@/components/SideBarBlog.js"

const allPosts = getAllPosts();
generateRSSFeed();
const index = createIndex();

export default function BlogLayout({ children }) {
    return (
        <div className="flex w-full min-h-screen bg-black">
            <SideBarBlog allPosts={allPosts} prefix={"blog"} index={JSON.stringify(index)} />
            <div className="flex-1 h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    )
}