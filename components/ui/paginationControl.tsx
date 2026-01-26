"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
}

const PaginationControl = ({ meta }: PaginationProps) => {
    const router = useRouter(); // URL পরিবর্তন করার জন্য, so that in History page ( parent) we get value based on url which is last part
    const pathname = usePathname(); // বর্তমান পাথ (/history) পাওয়ার জন্য
    const searchParams = useSearchParams(); // আগের সব URL Params পড়ার জন্য
    console.log("before", searchParams);

    const handlePageChange = (newPage: number) => {
        // ১. আগের সব প্যারামিটার কপি করা (যেমন search, filter ইত্যাদি)
        const params = new URLSearchParams(searchParams);
        console.log("After", params);

        // ২. শুধু 'page' কি-টি আপডেট করা
        params.set("page", newPage.toString());

        // ৩. নতুন URL তৈরি করে ব্রাউজারের অ্যাড্রেস বারে পুশ করা so that in History page ( parent) we get value based on url which is last part
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-center space-x-4 py-6">
            <Button
                variant="outline"
                size="icon"
                disabled={meta.page <= 1}
                onClick={() => handlePageChange(1)}
                title="First Page"
            > <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                disabled={meta.page <= 1}
                onClick={() => handlePageChange(meta.page - 1)}
            >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>

            <span className="text-sm font-medium">
                Page {meta.page} of {meta.totalPage}
            </span>

            <Button
                variant="outline"
                className="flex items-center gap-1"
                disabled={meta.page >= meta.totalPage}
                onClick={() => handlePageChange(meta.page + 1)}
            >
                Next <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                disabled={meta.page >= meta.totalPage}
                onClick={() => handlePageChange(meta.totalPage)}
                title="Last Page"
            >
                <ChevronsRight className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default PaginationControl;