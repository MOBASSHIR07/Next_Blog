"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createBlogPostAction } from "@/actions/blog.action";


export default function CreateBlogClient() {
  
  // ১. Zod Schema 
  const blogSchema = z.object({
    title: z.string().min(1, "Title is required").min(10, "Too short!"),
    content: z.string().min(1, "Content is required").min(20, "Detail more!"),
    tags: z.string().optional(),
  });

  
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Publishing blog...");
      console.log(toastId);
      
      try {
        
        const tagsArray = value.tags 
          ? value.tags.split(',').map(t => t.trim()).filter(i => i !== "") 
          : [];

        const payload = {
          title: value.title,
          content: value.content,
          tags: tagsArray
        };

      // call server action
        const result = await createBlogPostAction(payload);
        console.log(result);

        if (result.success) {
          toast.success(result.message, { id: toastId });
          
          form.reset(); 
        } else {
          toast.error(result.message, { id: toastId });
        }

      } catch (error) {
        toast.error("Something went wrong!", { id: toastId });
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl border shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      
     
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* Field 1: Title */}
        <form.Field
          name="title"
          validators={{ onChange: blogSchema.shape.title }}
          children={(field) => (
            <div className="space-y-1">
              <Label className="text-sm font-semibold ml-1">Blog Title</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Ex: Next.js Performance Tips"
                className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500 ml-1">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Field 2: Content (Textarea style) */}
        <form.Field
          name="content"
          validators={{ onChange: blogSchema.shape.content }}
          children={(field) => (
            <div className="space-y-1">
              <Label className="text-sm font-semibold ml-1">Content</Label>
              <textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Write your thoughts..."
                className="flex min-h-37.5 w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500 ml-1">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Field 3: Tags */}
        <form.Field
          name="tags"
          children={(field) => (
            <div className="space-y-1">
              <Label className="text-sm font-semibold ml-1">Tags (Comma separated)</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="react, nextjs, tech"
                className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
        />

       
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button 
              type="submit" 
              disabled={!canSubmit || isSubmitting} 
              className="w-full h-11 rounded-xl font-bold"
            >
              {isSubmitting ? "Publishing..." : "Publish Blog"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}