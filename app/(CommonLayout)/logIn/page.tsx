"use client";

import Link from "next/link";
import { Squirrel, Github, Chrome } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {


 const signIn = async()=>{
    const data = await authClient.signIn.social({
    provider: "google",
    callbackURL:"http://localhost:4000"
  });
 }



  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Squirrel className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your account</p>
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl">
        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button onClick={signIn} className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 h-11 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm">
            <Chrome className="h-4 w-4 text-red-500" /> Google
          </button>
          <button className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 h-11 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm">
            <Github className="h-4 w-4" /> Github
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100 dark:border-slate-800" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-slate-900 px-3 text-slate-400">Or email</span></div>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Email</label>
            <input
              placeholder="name@example.com"
              type="email"
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 dark:bg-slate-950 px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-sm font-semibold">Password</label>
              <Link href="#" className="text-xs text-primary hover:underline font-medium">Forgot?</Link>
            </div>
            <input
              type="password"
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 dark:bg-slate-950 px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            />
          </div>
          <button className="w-full bg-primary text-primary-foreground h-11 rounded-xl font-bold hover:opacity-90 transition-all shadow-md">
            Sign In
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-slate-500">
        New here?{" "}
        <Link href="/register" className="font-bold text-primary hover:underline">Create an account</Link>
      </p>
    </div>
  );
}