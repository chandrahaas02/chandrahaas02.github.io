import { getAllPosts} from "@/utils/posts"
const allPosts = getAllPosts();

export default function sitemap() {
    const siteObj = [
        {
            url: 'https://chandrahaas02.github.io/',
            lastModified: new Date(),
            changeFrequency: 'yearly'
          },
          {
            url: 'https://chandrahaas02.github.io/blog',
            lastModified: new Date(),
            changeFrequency: 'monthly'
          },
          {
            url: 'https://chandrahaas02.github.io/tools',
            lastModified: new Date(),
            changeFrequency: 'monthly'
          },
    ]
    allPosts.forEach(post => {
        const mapObj = {
            url:`https://chandrahaas02.github.io/blog/${post.slug}`,
            lastModified: new Date(),
            changeFrequency: 'yearly'
        }
        siteObj.push(mapObj);
    });
    return siteObj
}