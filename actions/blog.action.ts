"use server"
import { postService } from "@/service/post.Service"

export const getBlogs = async()=>{
    return await postService.getBlogPosts()
}

// aita server a run hoy so it has access of .env or other server things

// This is not a just function , it behave like api end point so network request occur
