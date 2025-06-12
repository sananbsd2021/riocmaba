"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();

type Event = {
  id: string;
  title: string;
  date: string;
};

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);

  // ดึงข้อมูลจาก Supabase
  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*");
    if (data) setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // เพิ่ม event ใหม่
  const handleDateClick = async (arg: any) => {
    const title = prompt("ชื่อกิจกรรม:");
    if (!title) return;

    const { data, error } = await supabase.from("events").insert({
      title,
      date: arg.dateStr,
    });

    if (!error) fetchEvents();
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
    />
  );
}
