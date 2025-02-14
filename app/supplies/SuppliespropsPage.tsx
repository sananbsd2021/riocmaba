"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Import your Supabase client
import Modal from "./Modal"; // Adjust the path to the Modal component
import Button from "./Button"; // Optional reusable Button component
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SuppliespropsPage = () => {
  const supabase = createClient(); // Create a Supabase client instance
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numbid, setNumbid] = useState("B0001");
  const [date, setDate] = useState("");
  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");
  const [year, setYear] = useState("");
  const [plan, setPlan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null); // State to hold the current user's ID

  // Fetch the authenticated user's ID
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

  // Fetch the latest numbid from the database
  const fetchLatestNumbid = async () => {
    try {
      const { data, error } = await supabase
        .from("bookbidding")
        .select("numbid")
        .order("numbid", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching latest numbid:", error.message);
        setErrorMessage("Failed to fetch the latest numbid. Please try again.");
        return;
      }

      if (data && data.length > 0) {
        const lastNum = data[0].numbid; // Example: "B0001"
        const numericPart = parseInt(lastNum.slice(1)); // Extract "0001" and parse to number
        const incremented = numericPart + 1; // Increment the number
        const newNumbid = `B${incremented.toString().padStart(4, "0")}`; // Format back to "B0002"
        setNumbid(newNumbid); // Update state
      } else {
        setNumbid("B0001"); // Default if no records exist
      }
    } catch (err) {
      console.error("Unexpected error fetching latest numbid:", err);
      setErrorMessage("Unexpected error occurred while fetching numbid.");
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user information on component load
    fetchLatestNumbid(); // Fetch numbid on component load
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(""); // Reset error message

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
          users_id: userId, // Include the current user's ID
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error.message);
        setErrorMessage("Error submitting the form. Please try again.");
        setIsSubmitting(false);
        return;
      }

      alert("Form Submitted!");
      setIsModalOpen(false);
      setDate("");
      setTopic("");
      setNote("");
      setYear("");
      setPlan("");
      fetchLatestNumbid(); // Refresh numbid for next entry
      router.push("/");
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

      {/* Open Modal Button */}
      <Button
        label="เพิ่มคำสั่ง"
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600"
      />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">เพิ่มคำสั่ง</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <Label htmlFor="numbid">ที่คำสั่ง</Label>
            <Input
              type="text"
              value={numbid}
              className="mt-1 p-2 border rounded w-full bg-gray-100"
              readOnly
            />
          </div>

          <div className="mb-4">
          <Label htmlFor="date">วันที่</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
          <Label htmlFor="topic">เรื่อง</Label>
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="note">หมายเหตุ</Label>
            {/* <Select> */}
            <Select onValueChange={(value) => setNote(value)}>
              <SelectTrigger id="note">
                <SelectValue placeholder="เลือก" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="สำนักปลัด">สำนักปลัด</SelectItem>
                <SelectItem value="กองคลัง">กองคลัง</SelectItem>
                <SelectItem value="กองการศึกษา">กองการศึกษา</SelectItem>
                <SelectItem value="กองสวัสดิการ">กองสวัสดิการ</SelectItem>
                <SelectItem value="รอดำเนินการ">รอดำเนินการ</SelectItem>
              </SelectContent>
            </Select>
                  </div>

          <div className="mb-4">
            <Label htmlFor="year">ปี</Label>
            {/* <Select> */}
            <Select onValueChange={(value) => setYear(value)}>
              <SelectTrigger id="year">
                <SelectValue placeholder="เลือก" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="2566">2566</SelectItem>
                <SelectItem value="2567">2567</SelectItem>
                <SelectItem value="2568">2568</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label htmlFor="plan">การปฎิบัติ</Label>
            {/* <Select> */}
            <Select onValueChange={(value) => setPlan(value)}>
              <SelectTrigger id="plan">
                <SelectValue placeholder="เลือก" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="รอดำเนินการ">รอดำเนินการ</SelectItem>
                <SelectItem value="เรียบร้อยแล้ว">เรียบร้อยแล้ว</SelectItem>
              </SelectContent>
            </Select>
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

export default SuppliespropsPage;
