"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form"

export default function RegisterPage() {

 // 1 firsrt write this
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {

      console.log("Submit kora holo:", value);
    },
  });


  return (
    // 2 write form 
    <form onSubmit={(e) => {
      e.preventDefault()
      form.handleSubmit()
    }}>



{/* 3 akekta input field */}
{/* Field 1: Full Name */}
  <form.Field
  name="fullName"
  children={(field) => (
    <div className="space-y-1">
      <Label className="text-sm font-semibold ml-1">Full Name</Label>
      <Input
        value={field.state.value}

        onChange={(e) => field.handleChange(e.target.value)}
        placeholder="John Doe"
        className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 dark:bg-slate-950 px-4 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>
  )}
/>

{/* 3.1 akekta input field */}
  <form.Field
  name="email"
  children={(field) => (
    <div className="space-y-1">
      <Label className="text-sm font-semibold ml-1">Email</Label>
      <Input
        value={field.state.value}

        onChange={(e) => field.handleChange(e.target.value)}
        placeholder="John@gmail.com"
        className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 dark:bg-slate-950 px-4 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>
  )}
/>
{/* 3.2 akekta input field */}
  <form.Field
  
  name="password"
  children={(field) => (
    <div className="space-y-1">
      <Label className="text-sm font-semibold ml-1">Password</Label>
      <Input
        value={field.state.value}
        type="password"

        onChange={(e) => field.handleChange(e.target.value)}
        placeholder="password"
        className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 dark:bg-slate-950 px-4 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>
  )}
/>


      <Button type="submit" className="w-full mt-4"> Register</Button>
    </form>
  );
}