import { postService } from '@/service/post.Service';
import React from 'react';
import HistoryTable from "@/components/History/HistoryTable"
import PaginationControl from '@/components/ui/paginationControl';
// SC params get system
const HistoryPage = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {

    const { page } = await searchParams
    const res = await postService.getBlogPosts({ page })
 // last part -  getting data based on the

    const posts = res.data?.data || []

    const meta = {
        page: res.data?.page || 1,
        limit: res.data?.limit || 10,
        total: res.data?.total || 0,
        totalPage: res.data?.totalPage || 1,
    };
    console.log(res);
    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-6'>Blog Post History</h1>
            <HistoryTable posts={posts} />
            <PaginationControl meta={meta} /> 
            {/* here doing first and second part */}
        </div>
    );
};

export default HistoryPage;