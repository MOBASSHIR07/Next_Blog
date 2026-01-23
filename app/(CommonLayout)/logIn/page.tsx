"use client";

import Link from "next/link";
import { Squirrel, Github, Chrome } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const toastId = toast.loading("Signing in...");
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: "/dashboard",
        });

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Welcome back!", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (err) {
      toast.error(`Failed to sign in with ${provider}`);
    }
  };

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
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            onClick={() => handleSocialSignIn("google")}
            className="rounded-xl h-11"
          >
            <Chrome className="h-4 w-4 text-red-500 mr-2" /> Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialSignIn("github")}
            className="rounded-xl h-11"
          >
            <Github className="h-4 w-4 mr-2" /> Github
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-3 text-slate-400">
              Or email
            </span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="email"
            validators={{ onChange: loginSchema.shape.email }}
            children={(field) => (
              <div className="space-y-1">
                <Label className="text-sm font-semibold ml-1">Email</Label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="name@example.com"
                  className="rounded-xl h-11"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-red-500 ml-1">
                    {(field.state.meta.errors[0])?.message}
                  </p>
                )}
              </div>
            )}
          />

          <form.Field
            name="password"
            validators={{ onChange: loginSchema.shape.password }}
            children={(field) => (
              <div className="space-y-1">
                <div className="flex items-center justify-between px-1">
                  <Label className="text-sm font-semibold">Password</Label>
                  <Link href="#" className="text-xs text-primary hover:underline font-medium">
                    Forgot?
                  </Link>
                </div>
                <Input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-xl h-11"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-red-500 ml-1">
                    {(field.state.meta.errors[0]?.message)}
                  </p>
                )}
              </div>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.isSubmitting]}
            children={([isSubmitting]) => (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl font-bold shadow-md"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            )}
          />
        </form>
      </div>

      <p className="text-center text-sm text-slate-500">
        New here?{" "}
        <Link href="/register" className="font-bold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}