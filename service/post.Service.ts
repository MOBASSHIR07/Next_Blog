import { PostBlog } from "@/actions/blog.action";
import { BlogPost } from "@/components/BlogCard";
import { env } from "@/env";

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
}

export const postService = {
  getBlogPosts: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
        config.next = {...config.next , tags:["blogpost"]}
      const res = await fetch(url.toString(), config);
      // const res = await fetch(url.toString(), next:{
      // tags:["blogpost"]
  //    });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();


      return {
        data: data.data,
        error: null
      };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something Went Wrong" }
      };
    }
  },





  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },


  createPost: async function (payload:PostBlog) {
    try {
    
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookieStore.toString(), 
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: data.message || "Failed to create post" } };
      }

      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Server Connection Error" } };
    }
  }













};

// with no cache
// export const postService = {
//   getBlogPosts: async function (params?: GetBlogsParams) {
//     try {
//       const url = new URL(`${API_URL}/posts`);

//       if (params) {
//         Object.entries(params).forEach(([key, value]) => {
//           if (value !== undefined && value !== null && value !== "") {
//             url.searchParams.append(key, String(value));
//           }
//         });
//       }

//       // সবসময় fresh fetch
//       const res = await fetch(url.toString(), { cache: "no-store" });

//       if (!res.ok) {
//         throw new Error("Failed to fetch posts");
//       }

//       const data = await res.json();

//       return { data: data.data, error: null };
//     } catch (err) {
//       return { data: null, error: { message: "Something Went Wrong" } };
//     }
//   },
// };
