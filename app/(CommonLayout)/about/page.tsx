"use client"

import { postService } from '@/service/post.Service';
import React, { useEffect, useState } from 'react';
import { BlogPost } from '../page';
import { getBlogs } from '@/actions/blog.action';

const AboutPage = () => {
    // ডাটা সেভ করার জন্য স্টেট
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 🔥 IIFE (Immediately Invoked Function Expression)
        (async () => {
            try {
                const { data } = await getBlogs();
                
                // আপনার সার্ভিস অনুযায়ী: { data: { data: [] } }
                if (data && data.data) {
                    setBlogs(data.data);
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        })(); // এখানে ফাংশনটি সাথে সাথে কল হচ্ছে
    }, []);

    if (loading) return <div className='p-10'>Loading blogs...</div>;

    return (
        <div className='p-10'>
            <h1 className='text-2xl font-bold mb-5'>This AboutPage (Client Fetch)</h1>
            
            <div className='grid gap-4'>
                {blogs.length > 0 ? (
                    blogs.map((post) => (
                        <div key={post.id} className='p-4 border rounded shadow-sm'>
                            <h2 className='font-semibold'>{post.title}</h2>
                            <p className='text-sm text-gray-500 line-clamp-1'>{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
        </div>
    );
};

export default AboutPage;