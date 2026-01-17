import React from 'react';
import Navbar from '@/components/ui/navbar';

type CommonLayoutProps = {
    children: React.ReactNode;
};

const CommonLayout = ({ children }: CommonLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div
                className="flex-1 flex items-center justify-center bg-slate-50/50 dark:bg-slate-950 px-4 py-12"
                suppressHydrationWarning
            >
                <div className="w-full max-w-[400px]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CommonLayout;