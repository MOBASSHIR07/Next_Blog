"use server"
import { BlogPost } from "@/components/BlogCard"
import { postService } from "@/service/post.Service"
import { revalidateTag } from "next/cache"
export interface PostBlog {
 
  title: string;
  content: string;
  tags?: string[];
  
}

export const getBlogs = async()=>{
    return await postService.getBlogPosts()
}


export const createBlogPostAction = async (payload: PostBlog) => {
    
    const res = await postService.createPost(payload);

    if (res.data) {
        
        revalidateTag("blogpost" , "max");
        return { success: true, message: "Post published successfully!" };
    }

    return { success: false, message: res.error?.message || "Something went wrong" };
}

// aita server a run hoy so it has access of .env or other server things

// This is not a just function , it behave like api end point so network request occur
