import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { Feed } from 'feed';
import lunr from "lunr";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory,{ withFileTypes: true })
  .filter(dirent => dirent.isFile())
  .map(dirent => dirent.name);;
}

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content }
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function createIndex() {
  const allPosts = getAllPosts();
  const index = lunr(function(){
    this.ref("slug")
    this.field("title")
    this.field("content")
    allPosts.forEach(function (post) {
      this.add(post)
    }, this)
  })
  return index
}

export function generateRSSFeed() {
  const allPosts = getAllPosts();
  const site_url = 'localhost:3000';

  const feedOptions = {
    title: 'Blog posts | RSS Feed',
    description: 'Welcome to this blog posts!',
    id: site_url,
    link: site_url,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
    },
  };

  const feed = new Feed(feedOptions);

  allPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.slug}`,
      link: `${site_url}/blog/${post.slug}`,
      date: new Date(post.date),
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.rss2());
}

