
import CreateBlogClient from '@/components/Modules/user/CreateBlogClient';
import { postService } from '@/service/post.Service';
import React from 'react';
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

const CreatePost = async () => {
    const { data } = await postService.getBlogPosts({} , {cache:"no-cache"})

    return (
        <div>
            {/* <CreateBlog />  // flow-> SSG to SeverSide Rendering  */} 
            <CreateBlogClient/>
            {data?.data.map((item: BlogPost) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                </div>
            ))}
        </div>
    );
};

export default CreatePost;