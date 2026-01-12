"use client"
import { Calendar } from "@/components/ui/calendar"
import React from "react";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div>
       <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
  />
    </div>
  );
}
