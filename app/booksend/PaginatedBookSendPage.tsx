'use client';

import React, { useState, useEffect } from "react";
import Button from "./Button"; // Reusable button component
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const supabase = createClient();

const PaginatedBookRePage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // จำนวนรายการต่อหน้า
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">ทะเบียนหนังสือส่ง</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto mb-4">
        <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-200 text-left">#</th>
              <th className="px-4 py-2 border border-gray-200 text-left">เลขทะเบียนส่ง</th>
              <th className="px-4 py-2 border border-gray-200 text-left">วันที่</th>
              <th className="px-4 py-2 border border-gray-200 text-left">จาก</th>
              <th className="px-4 py-2 border border-gray-200 text-left">ถึง</th>
              <th className="px-4 py-2 border border-gray-200 text-left">เรื่อง</th>
              {/* <th className="px-4 py-2 border border-gray-200 text-left">การปฏิบัติ</th> */}
              {/* <th className="px-4 py-2 border border-gray-200 text-left">หมายเหตุ</th> */}
              <th className="px-4 py-2 border border-gray-200 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.numsend} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-200">{index + 1 + (currentPage - 1) * pageSize}</td>
                <td className="px-4 py-2 border border-gray-200">{post.numsend}</td>
                <td className="px-4 py-2 border border-gray-200">{post.date}</td>
                <td className="px-4 py-2 border border-gray-200">{post.fromsend}</td>
                <td className="px-4 py-2 border border-gray-200">{post.tosend}</td>
                <td className="px-4 py-2 border border-gray-200">{post.topic}</td>
                {/* <td className="px-4 py-2 border border-gray-200">{post.plan}</td> */}
                {/* <td className="px-4 py-2 border border-gray-200">{post.note}</td> */}
                <td>
                  <Link href={`/booksend/${post.id}`} className="px-4 py-2 bg-gray-600 text-white rounded">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <Button
          label="Previous"
          onClick={handlePreviousPage}
          className="bg-gray-600"
          disabled={currentPage === 1 || isLoading}
        />
        <Button
          label="Next"
          onClick={handleNextPage}
          className="bg-blue-600"
          disabled={posts.length < pageSize || isLoading}
        />
      </div>
    </div>
  );
};

export default PaginatedBookRePage;

const fetchPosts = async (page: number, pageSize: number) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data, error } = await supabase
    .from("booksend")
    .select("*")
    .range(start, end);

  if (error) throw error;
  return data;
};
