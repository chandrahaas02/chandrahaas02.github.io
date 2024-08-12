import {getAllPhilPosts} from "@/utils/phil"
import SideBarBlog from "@/components/SideBarBlog.js"
const allPosts = getAllPhilPosts();

export default function BlogLayout({ children }) {
    return (
        <div className="flex w-full">
            <SideBarBlog allPosts={allPosts} prefix={"phil"}/>
            <div className="flex flex-1 overflow-y-auto justify-center max-h-screen space-y-5" >
                {children}
            </div>
        </div>
        )

}