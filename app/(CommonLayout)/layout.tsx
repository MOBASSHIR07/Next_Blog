import  Navbar  from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/sonner";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Toaster richColors  />
    </div>
  );
}