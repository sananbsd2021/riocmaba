"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Import your Supabase client
import Modal from "./Modal"; // Adjust the path to the Modal component
import Button from "./Button"; // Optional reusable Button component
import { useRouter } from "next/navigation";

const BookRepropsPage = () => {
  const supabase = createClient(); // Create a Supabase client instance
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numreceive, setNumreceive] = useState("R0001");
  const [date, setDate] = useState("");
  const [fromreceive, setFromreceive] = useState("");
  const [toreceive, setToreceive] = useState("");
  const [topic, setTopic] = useState("");
  const [plan, setPlan] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

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

  // Fetch the latest numreceive from the database
  const fetchLatestNumreceive = async () => {
    try {
      const { data, error } = await supabase
        .from("bookreceive") // Replace with your table name
        .select("numreceive")
        .order("numreceive", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching latest numreceive:", error.message);
        setErrorMessage("Failed to fetch the latest numreceive.");
        return;
      }

      if (data && data.length > 0) {
        const lastNum = data[0].numreceive; // Example: "R0001"
        const numericPart = parseInt(lastNum.slice(1)); // Extract "0001" and parse to number
        const incremented = numericPart + 1; // Increment the number
        const newNumreceive = `R${incremented.toString().padStart(4, "0")}`; // Format back to "R0002"
        setNumreceive(newNumreceive); // Update state
      } else {
        setNumreceive("R0001"); // Default if no records exist
      }
    } catch (err) {
      console.error("Unexpected error fetching latest numreceive:", err);
      setErrorMessage("Unexpected error occurred while fetching numreceive.");
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user ID on component load
    fetchLatestNumreceive(); // Fetch numreceive on component load
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(""); // Reset error message

    if (!userId) {
      alert("User not authenticated. Please log in.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("bookreceive").insert([
        {
          numreceive,
          date,
          fromreceive,
          toreceive,
          topic,
          plan,
          note,
          users_id: userId, // Include authenticated user ID
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
      setFromreceive("");
      setToreceive("");
      setTopic("");
      setPlan("");
      setNote("");
      fetchLatestNumreceive(); // Refresh numreceive for next entry
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
      <h1 className="text-2xl font-bold mb-4">จัดการทะเบียนหนังสือรับ</h1>

      {/* Open Modal Button */}
      <Button
        label="เพิ่มหนังสือรับ"
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600"
      />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">เพิ่มหนังสือรับ</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-4">
            <div className="mb-4">
              <input
                type="text"
                value={numreceive}
                className="mt-1 p-2 border rounded w-full bg-gray-100"
                readOnly
              />
            </div>

            <div className="mb-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
          </div>
          <div className="mb-4 flex gap-4">
            <div className="mb-4">
              <input
                type="text"
                value={fromreceive}
                onChange={(e) => setFromreceive(e.target.value)}
                placeholder="จาก"
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={toreceive}
                onChange={(e) => setToreceive(e.target.value)}
                placeholder="ถึง"
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="เรื่อง"
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="การปฎิบัติ"
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="หมายเหตุ"
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

export default BookRepropsPage;
