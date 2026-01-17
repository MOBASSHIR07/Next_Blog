"use client";

import Link from "next/link";
import { Squirrel } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Squirrel className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
        <p className="text-sm text-muted-foreground">Join Inkwell today</p>
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl">
        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold ml-1">Full Name</label>
            <input placeholder="John Doe" className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 dark:bg-slate-950 px-4 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold ml-1">Email</label>
            <input placeholder="name@example.com" type="email" className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 dark:bg-slate-950 px-4 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold ml-1">Password</label>
            <input type="password" placeholder="••••••••" className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 dark:bg-slate-950 px-4 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
          </div>
          <button className="w-full bg-primary text-primary-foreground h-11 rounded-xl font-bold mt-4 hover:opacity-90 shadow-md">
            Get Started
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-slate-500 ">
        Have an account?{" "}
        <Link href="/logIn" className="font-bold text-primary hover:underline">Sign In</Link>
      </p>
    </div>
  );
}