"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const supabase = createClient();

const SuppliesPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPosts(page, pageSize);
      setPosts(data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("supplies")
        .select("*")
        .ilike("topic", `%${searchQuery}%`);

      if (error) {
        setError("Error fetching search results");
        return;
      }

      setSearchResults(data || []);
    } catch (err) {
      setError("Unexpected error occurred while searching");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const truncateText = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        ทะเบียนจัดการวัสดุสำนักงาน
      </h1>

      {/* ฟอร์มค้นหา */}
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

      {error && <p className="text-red-500">{error}</p>}

      {/* แสดงผลลัพธ์การค้นหา */}
      {searchQuery && searchResults.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">ผลลัพธ์การค้นหา</h2>
          <ul className="space-y-2">
            {searchResults.map((result: any) => (
              <li key={result.numsub} className="p-2 border rounded">
                <p>
                  <strong>ลำดับ:</strong> {result.numsub}
                </p>
                <p>
                  <strong>ชนิดหรือชื่อวัสดุ:</strong> {result.topic}
                </p>
                <p>
                  <strong>วันที่:</strong> {result.amount}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ตารางข้อมูล */}
      {!searchQuery && (
        <div className="overflow-x-auto shadow-md rounded-lg mb-4">
          <table className="w-full text-left text-sm border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-200">ลำดับ</th>
                <th className="px-4 py-2 border border-gray-200">วันที่</th>
                <th className="px-4 py-2 border border-gray-200">
                  ชนิดหรือชื่อวัสดุ
                </th>
                <th className="px-4 py-2 border border-gray-200">จำนวน</th>
                <th className="px-4 py-2 border border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.numsub} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200">
                    {post.numsub}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {post.date}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {truncateText(post.topic, 50)}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {truncateText(post.amount, 50)}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <Link
                      href={`/supplies/${post.id}`}
                      className="px-2 py-1 bg-blue-600 text-white rounded"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* การเปลี่ยนหน้า */}
      {!searchQuery && (
        <div className="flex justify-between">
          <Button
            label="Previous"
            onClick={handlePreviousPage}
            className="bg-gray-600 text-sm px-4 py-2"
            disabled={currentPage === 1 || isLoading}
          />
          <Button
            label="Next"
            onClick={handleNextPage}
            className="bg-blue-600 text-sm px-4 py-2"
            disabled={posts.length < pageSize || isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default SuppliesPage;

const fetchPosts = async (page: number, pageSize: number) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data, error } = await supabase
    .from("supplies")
    .select("*")
    .range(start, end);

  if (error) throw error;
  return data;
};
