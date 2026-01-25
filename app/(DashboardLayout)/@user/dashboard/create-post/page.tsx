import CreateBlog from '@/components/Modules/user/CreateBlog';
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
    const { data } = await postService.getBlogPosts()

    return (
        <div>
            <CreateBlog />
            {data?.data.map((item: BlogPost) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                </div>
            ))}
        </div>
    );
};

export default CreatePost;