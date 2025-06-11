"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Modal from "./Modal";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookBidpropsPage = () => {
  const supabase = createClient();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numbid, setNumbid] = useState("B0001");
  const [date, setDate] = useState("");
  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");
  const [year, setYear] = useState(""); // ให้ผู้ใช้เลือก
  const [plan, setPlan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ ดึง user ID
  const fetchUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error.message);
      setErrorMessage("Failed to fetch user information.");
    } else if (user) {
      setUserId(user.id);
    }
  };

  // ✅ ดึง `numbid` ตาม `year` ที่เลือก
  const fetchNumbidByYear = async (selectedYear: string) => {
    if (!selectedYear) return;

    try {
      const { data, error } = await supabase
        .from("bookbidding")
        .select("numbid")
        .eq("year", selectedYear)
        .order("numbid", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching numbid:", error.message);
        setErrorMessage("ไม่สามารถดึงข้อมูลเลขที่คำสั่งได้");
        return;
      }

      if (data && data.length > 0) {
        const lastNum = data[0].numbid;
        const numericPart = parseInt(lastNum.slice(1));
        const incremented = numericPart + 1;
        const newNumbid = `B${incremented.toString().padStart(4, "0")}`;
        setNumbid(newNumbid);
      } else {
        setNumbid("B0001");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("เกิดข้อผิดพลาดในการดึงเลขคำสั่ง");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ ดึง `numbid` ทุกครั้งที่ `year` เปลี่ยน
  useEffect(() => {
    if (year) {
      fetchNumbidByYear(year);
    }
  }, [year]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (!userId) {
      setErrorMessage("User is not authenticated.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("bookbidding").insert([
        {
          numbid,
          date,
          topic,
          note,
          year,
          plan,
          users_id: userId,
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error.message);
        setErrorMessage("Error submitting the form. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // alert("Form Submitted!");
      setIsModalOpen(false);
      setDate("");
      setTopic("");
      setNote("");
      setYear("");
      setPlan("");
      setNumbid("B0001"); // รีเซ็ตค่าหมายเลขคำสั่ง
      router.push("./");
    } catch (err) {
      console.error("Unexpected error submitting form:", err);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">จัดการทะเบียนคำสั่ง</h1>

      <Button
        label="เพิ่มคำสั่ง"
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600"
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">เพิ่มคำสั่ง</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="year">ปี</Label>
            <Select onValueChange={(value) => setYear(value)}>
              <SelectTrigger id="year">
                <SelectValue placeholder="เลือกปี" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="2562">2562</SelectItem>
                <SelectItem value="2563">2563</SelectItem>
                <SelectItem value="2564">2564</SelectItem>
                <SelectItem value="2565">2565</SelectItem>
                <SelectItem value="2566">2566</SelectItem>
                <SelectItem value="2567">2567</SelectItem>
                <SelectItem value="2568">2568</SelectItem>
                <SelectItem value="2569">2569</SelectItem>
                <SelectItem value="2570">2570</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label htmlFor="numbid">ที่คำสั่ง</Label>
            <Input
              type="text"
              value={numbid}
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="date">วันที่</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="topic">เรื่อง</Label>
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="plan">หมายเหตุ</Label>
            <Select onValueChange={(value) => setPlan(value)}>
              <SelectTrigger id="plan">
                <SelectValue placeholder="หมายเหตุ" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="กำลังดำเนินการ">กำลังดำเนินการ</SelectItem>
                <SelectItem value="เรียบร้อยแล้ว">เรียบร้อยแล้ว</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label htmlFor="note">หน่วยงาน</Label>
            <Select onValueChange={(value) => setNote(value)}>
              <SelectTrigger id="note">
                <SelectValue placeholder="เลือกสังกัด" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="สำนักปลัด">สำนักปลัด</SelectItem>
                <SelectItem value="กองคลัง">กองคลัง</SelectItem>
                <SelectItem value="กองการศึกษา">กองการศึกษา</SelectItem>
                <SelectItem value="กองช่าง">กองช่าง</SelectItem>
                <SelectItem value="กองสวัสดิการสังคม">
                  กองสวัสดิการสังคม
                </SelectItem>
                <SelectItem value="งานป้องกัน">งานป้องกัน</SelectItem>
              </SelectContent>
            </Select>
            {/* <Textarea value={topic} onChange={(e) => setTopic(e.target.value)} required /> */}
          </div>

          <Button
            label={isSubmitting ? "Submitting..." : "Submit"}
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </Modal>
    </div>
  );
};

export default BookBidpropsPage;
