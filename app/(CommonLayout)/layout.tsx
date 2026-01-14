import Navbar from '@/components/ui/navbar';
import React from 'react';
import { DashboardLayoutProps } from '../(DashboardLayout)/layout';

const CommonLayout = ({children}:DashboardLayoutProps) => {
    return (
        <div>
             <Navbar/>
             <div>{children}</div>
        </div>
    );
};

export default CommonLayout;