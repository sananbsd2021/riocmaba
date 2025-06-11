"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Import your Supabase client
import Modal from "./Modal"; // Adjust the path to the Modal component
import Button from "./Button"; // Optional reusable Button component
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

const SuppliespropsPage = () => {
  const supabase = createClient(); // Create a Supabase client instance
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numsub, setNumsub] = useState("SP001"); // เลขลำดับการเบิก
  const [topic, setTopic] = useState(""); // ชนิดหรือชื่อวัสดุ
  const [date, setDate] = useState(""); // วัน เดือน ปี
  const [price, setPrice] = useState(""); // ราคาต่อหน่วย
  const [form, setForm] = useState(""); // รับจาก
  const [who, setWho] = useState(""); // จ่ายใคร
  const [amount, setAmount] = useState(""); // จำนวนรับ
  const [amount1, setAmount1] = useState(""); // จำนวนจ่าย
  const [amount2, setAmount2] = useState(""); // คงเหลือ
  const [note, setNote] = useState(""); // หมายเหตุ
  const [year, setYear] = useState(""); // ปี
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
  const fetchLatestNumsub = async () => {
    try {
      const { data, error } = await supabase
        .from("supplies")
        .select("numsub")
        .order("numsub", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching latest numbid:", error.message);
        setErrorMessage("Failed to fetch the latest numbid. Please try again.");
        return;
      }

      if (data && data.length > 0) {
        const lastNum = data[0].numsub; // Example: "B0001"
        const numericPart = parseInt(lastNum.slice(1)); // Extract "0001" and parse to number
        const incremented = numericPart + 1; // Increment the number
        const newNumsub = `B${incremented.toString().padStart(4, "0")}`; // Format back to "B0002"
        setNumsub(newNumsub); // Update state
      } else {
        setNumsub("SP001"); // Default if no records exist
      }
    } catch (err) {
      console.error("Unexpected error fetching latest numbid:", err);
      setErrorMessage("Unexpected error occurred while fetching numbid.");
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user information on component load
    fetchLatestNumsub(); // Fetch numbid on component load
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
      const { error } = await supabase.from("supplies").insert([
        {
          numsub,
          date,
          topic,
          note,
          year,
          price,
          amount,
          form,
          amount1,
          amount2,
          who,
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
      setPrice("");
      setAmount("");
      setForm("");
      setAmount1("");
      setAmount2("");
      setWho("");
      fetchLatestNumsub(); // Refresh numbid for next entry
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
      <h1 className="text-2xl font-bold mb-4">จัดการทะเบียนวัสดุสำนักงาน</h1>

      {/* Open Modal Button */}
      <Button
        label="เพิ่ม"
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600"
      />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">เพิ่มวัสดุสำนักงาน</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="numbid">ลำดับ</Label>
            <Input
              type="text"
              value={numsub}
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
            <Label htmlFor="topic">ชนิดหรือชื่อวัสดุ</Label>
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="amount">จำนวนรับ</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          {/* <div className="mb-4">
            <Label htmlFor="year">ปี</Label>
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
            <Label htmlFor="note">การปฎิบัติ</Label>
            <Select onValueChange={(value) => setNote(value)}>
              <SelectTrigger id="note">
                <SelectValue placeholder="เลือก" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="รอดำเนินการ">รอดำเนินการ</SelectItem>
                <SelectItem value="เรียบร้อยแล้ว">เรียบร้อยแล้ว</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

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
