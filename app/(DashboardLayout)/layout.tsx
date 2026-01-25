import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
  
} from "@/components/ui/sidebar"
import { userService } from "@/service/userService";
import { ReactNode } from "react";
export type DashboardLayoutProps = {
  admin : ReactNode;
  user : ReactNode

};




export default  async function DashboardLayout({ admin , user}:DashboardLayoutProps) {

  const session = await userService.getSession()

  const role = session.user.role
  console.log(role);
 
  return (
    <SidebarProvider>
      <AppSidebar role= {role as "ADMIN" | "USER"} />
      <SidebarInset>
        {role === "ADMIN" ? admin  : user}
      </SidebarInset>
    </SidebarProvider>
  )
}


//////////////////////////////////////////////////


// import { AppSidebar } from "@/components/app-sidebar"
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
// import { ReactNode } from "react";
// import { userService } from "@/services/user-service"; // আপনার সার্ভিসের পাথ

// export type DashboardLayoutProps = {
//   admin: ReactNode;
//   user: ReactNode;
// };

// export default async function DashboardLayout({ admin, user }: DashboardLayoutProps) {
//   // ১. সেশন ফেচ করা
//   const session = await userService.getSession();

//   // ২. ইউজার লগইন না থাকলে হ্যান্ডেল করা (Redirect করা ভালো)
//   if (!session?.user) {
//     return <div>Unauthorized. Please Login.</div>;
//   }

//   const role = session.user.role as "ADMIN" | "USER";

//   return (
//     <SidebarProvider>
//       {/* ৩. সাইডবারে ডাইনামিক রোল পাঠানো */}
//       <AppSidebar role={role} />
//       <SidebarInset>
//         {/* ৪. রোলের ওপর ভিত্তি করে কন্টেন্ট দেখানো */}
//         {role === "ADMIN" ? admin : user}
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }