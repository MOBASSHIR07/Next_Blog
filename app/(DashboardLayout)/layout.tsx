import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
  
} from "@/components/ui/sidebar"
import { ReactNode } from "react";
export type DashboardLayoutProps = {
  admin : ReactNode;
  user : ReactNode

};




export default function DashboardLayout({ admin , user}:DashboardLayoutProps) {

  const userinfo  = {
  role : "admin"
}
  return (
    <SidebarProvider>
      <AppSidebar role= {userinfo.role as "admin" | "user"} />
      <SidebarInset>
        {userinfo.role === "admin" ? admin  : user}
      </SidebarInset>
    </SidebarProvider>
  )
}
