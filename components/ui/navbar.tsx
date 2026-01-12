"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Squirrel, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const routes = [
  { title: "Blogs", href: "/blogs" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* --- LOGO SECTION --- */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <Squirrel className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tighter italic">INKWELL</span>
          </Link>

          {/* --- DESKTOP NAV --- */}
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {routes.map((route) => (
                  <NavigationMenuItem key={route.href}>
                    <NavigationMenuLink asChild className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === route.href && "bg-accent text-accent-foreground"
                    )}>
                      <Link href={route.href}>
                        {route.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        {/* --- DESKTOP AUTH --- */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" className="rounded-full shadow-md px-6" asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>

        {/* --- MOBILE MENU --- */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" >
              <SheetHeader>
                <SheetTitle className="text-left font-bold italic tracking-tighter">INKWELL</SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-6 mt-10">
                {/* Mobile Links */}
                <nav className="flex flex-col gap-4">
                  {routes.map((route) => (
                    <Link 
                      key={route.href} 
                      href={route.href} 
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === route.href ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {route.title}
                    </Link>
                  ))}
                </nav>

                <Separator />

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full justify-center" asChild>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button className="w-full justify-center" asChild>
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}