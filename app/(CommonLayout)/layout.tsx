import React from 'react';
import Navbar from '@/components/ui/navbar';

type CommonLayoutProps = {
  children: React.ReactNode;
};

const CommonLayout = ({ children }: CommonLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
             <Navbar />
             <main className="flex-1">
                {children}
             </main>
        </div>
    );
};

export default CommonLayout;