"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Import your Supabase client
import Modal from "./Modal"; // Adjust the path to the Modal component
import Button from "./Button"; // Optional reusable Button component

const BookBidpropsPage = () => {
  const supabase = createClient(); // Create a Supabase client instance

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numbid, setNumbid] = useState("B0001");
  const [date, setDate] = useState("");
  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    fetchLatestNumbid(); // Fetch on component load
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(""); // Reset error message

    try {
      const { error } = await supabase.from("bookbidding").insert([
        {
          numbid,
          date,
          topic,
          note,
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
      fetchLatestNumbid(); // Refresh numbid for next entry
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
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">ที่คำสั่ง</label>
            <input
              type="text"
              value={numbid}
              className="mt-1 p-2 border rounded w-full bg-gray-100"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">วันที่</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
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
