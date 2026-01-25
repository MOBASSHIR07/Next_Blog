"use client"

import * as React from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  PenTool, 
 
  Users, Settings
 
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"

const menuItems = {
  ADMIN: [
    { title: "Admin Panel", url: "/dashboard/admin", icon: Users },
    { title: "Analytics", url: "/dashboard/analytics", icon: PenTool },
  ],
  USER: [
    { title: "My Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Create Post", url: "/dashboard/create-post", icon: Settings },
  ],
}

export function AppSidebar({ role }: { role: "ADMIN" | "USER" }) {
  const links = menuItems[role]

  return (
   <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          {links.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}