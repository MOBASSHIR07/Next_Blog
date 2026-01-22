import { postService } from '@/service/post.Service';
import React from 'react';
import Image from 'next/image';
import { Calendar, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '../../page';




export async function generateStaticParams() {
    const {data}  = await postService.getBlogPosts()

    return data?.data?.map((blog:BlogPost)=>({id:blog.id})).splice(0,3)
    
}



const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: blog } = await postService.getBlogById(id);

    if (!blog || !blog.data) {
        return <div className="text-center py-20">Blog not found!</div>;
    }

    const post = blog.data;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Back Button */}
            <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6">
                <ArrowLeft size={16} /> Back to Home
            </Link>

            {/* Simple Dynamic Card */}
            <div className="bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm">
                
                {/* Image Section */}
                <div className="relative h-100 w-full bg-slate-100">
                    {post.thumnail ? (
                        <Image 
                            src={post.thumnail} 
                            alt={post.title} 
                            fill 
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">No Image Available</div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-8">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Eye size={14}/> {post.view} Views</span>
                    </div>

                    <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
                        {post.title}
                    </h1>

                    <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                        {post.content}
                    </div>

                    {/* Tags */}
                    {post.tags && (
                        <div className="mt-10 pt-6 border-t flex gap-2">
                            {post.tags.map((tag: string) => (
                                <span key={tag} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-600">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;


// ১. কীভাবে প্রভাব পড়বে? (Working Process) generateStaticParams
// Next.js যখন আপনার প্রজেক্ট বিল্ড করবে, তখন সে দেখবে আপনি ৩টি ID দিয়েছেন। সে তখন অটোমেটিক:

// ওই ৩টি ID-এর জন্য একে একে BlogPage কম্পোনেন্টটিকে কল করবে।

// কম্পোনেন্টের ভেতরে থাকা const { data: blog } = await postService.getBlogById(id); লাইনটি বিল্ড টাইমেই এক্সিকিউট হবে।

// অর্থাৎ, ওই ৩টি ব্লগের ডাটা এপিআই থেকে এনে, এইচটিএমএল (HTML) তৈরি করে সার্ভারে সেভ করে রাখবে।