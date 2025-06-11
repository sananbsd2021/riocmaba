"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client

const SearchBookreForm = () => {
  const supabase = createClient(); // สร้างอินสแตนซ์ Supabase
  const [searchQuery, setSearchQuery] = useState(""); // เก็บค่าค้นหา
  const [results, setResults] = useState<any[]>([]); // เก็บผลลัพธ์การค้นหา
  const [errorMessage, setErrorMessage] = useState(""); // เก็บข้อความผิดพลาด

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // ล้างข้อความผิดพลาดก่อนค้นหา

    try {
      // เรียกข้อมูลจากฐานข้อมูลด้วย Supabase
      const { data, error } = await supabase
        .from("bookreceive") // เปลี่ยนชื่อเป็นตารางที่คุณต้องการค้นหา
        .select("*")
        .ilike("topic", `%${searchQuery}%`); // ค้นหาคำในคอลัมน์ topic (ปรับตามตารางของคุณ)

      if (error) {
        console.error("Error fetching data:", error.message);
        setErrorMessage("เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง");
        return;
      }

      setResults(data || []); // อัปเดตผลลัพธ์การค้นหา
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("เกิดข้อผิดพลาดที่ไม่คาดคิด");
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">ค้นหา</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="ป้อนคำค้นหา..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ค้นหา
          </button>
        </div>
      </form>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {/* แสดงผลลัพธ์ */}
      <div>
        {results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((result: any) => (
              <li key={result.numbid} className="p-2 border rounded">
                <p>
                  <strong>ที่:</strong> {result.numreceive}
                </p>
                <p>
                  <strong>เรื่อง:</strong> {result.topic}
                </p>
                <p>
                  <strong>วันที่:</strong> {result.date}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">ไม่พบข้อมูล</p>
        )}
      </div>
    </div>
  );
};

export default SearchBookreForm;
