import BlogCard from "@/components/BlogCard"; 
import { postService } from "@/service/post.Service";
export interface BlogPost {
  id: string | number;
  title: string;
  content: string;
  thumbnail?: string | null;
  tags?: string[];
  views: number;
  _count?: {
    comments: number;
  };
  isFeatured?: boolean;
}

export default async function Home() {
  const response = await postService.getBlogPosts(
    { isFeatured: false },
    { cache: "no-store" }
  );

  const posts: BlogPost[] = response?.data?.data || [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-10">Latest Blogs</h1>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No posts found.</p>
      )}
    </main>
  );
}


// jodi upore  multiple param pathatam
// const params = {
//   isFeatured: false,
//   tags: ["react", "nextjs"], // multiple
//   search: "blog",
// };

//*********solution in service

// const url = new URL(`${API_URL}/posts`);

// // loop through params
// Object.entries(params).forEach(([key, value]) => {
//   if (value === undefined || value === null || value === "") return;

//   // যদি value array হয়
//   if (Array.isArray(value)) {
//     value.forEach(v => url.searchParams.append(key, String(v)));
//   } else {
//     url.searchParams.append(key, String(value));
//   }
// });

// console.log(url.toString());

