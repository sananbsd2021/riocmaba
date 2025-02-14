"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";

const NewspropsPage = () => {
  const supabase = createClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numnews, setNumnews] = useState("B0001");
  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      setErrorMessage("Failed to fetch user information.");
      return;
    }
    if (data.user) {
      setUserId(data.user.id);
    }
  };

  const fetchLatestNumnews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("numnews")
        .order("numnews", { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        const numericPart = parseInt(data[0].numnews.slice(1));
        setNumnews(`B${(numericPart + 1).toString().padStart(4, "0")}`);
      } else {
        setNumnews("B0001");
      }
    } catch (err) {
      setErrorMessage("Failed to fetch the latest numnews.");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchLatestNumnews();
  }, []);

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
      const { error } = await supabase.from("news").insert([
        {
          numnews,
          topic,
          note,
          users_id: userId,
        },
      ]);

      if (error) throw error;

      alert("Form Submitted!");
      setIsModalOpen(false);
      setTopic("");
      setNote("");
      fetchLatestNumnews();
    } catch (err) {
      setErrorMessage("Failed to submit the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">จัดการทะเบียนคำสั่ง</h1>

      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        เพิ่มคำสั่งใหม่
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">เพิ่มคำสั่ง</h2>
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">ที่คำสั่ง</label>
            <input
              type="text"
              value={numnews}
              className="mt-1 p-2 border rounded w-full bg-gray-100"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">เรื่อง</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">หมายเหตุ</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default NewspropsPage;
