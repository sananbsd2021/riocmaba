"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import Button from "./Button";

const supabase = createClient();

export default function InvoiceTable() {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const { data, error } = await supabase
      .from("bookbidding")
      .select("*")
      .range(start, end);

    if (error) throw error;
    return data;
  };

  const fetchData = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPosts(page, pageSize);
      setPosts(data || []);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const filteredPosts = posts.filter(
    (post) =>
      post &&
      post.note &&
      post.note.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNextPage = () => {
    if (posts.length === pageSize) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by..."
        className="mb-4 p-2 border rounded w-full text-sm max-w-sm"
      />

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* ✅ Responsive Scroll Table */}
      {/* <div className="overflow-x-auto rounded shadow"> */}
      <div className="hidden md:block">
        <Table className="min-w-[650px] w-full text-sm">
          <TableBody>
            {filteredPosts.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-gray-50">
                <TableCell>{invoice.numbid}</TableCell>
                <TableCell>{invoice.topic}</TableCell>
                <TableCell>{invoice.note}</TableCell>
                <TableCell className="text-right">{invoice.year}</TableCell>
                {/* <TableCell>{invoice.note}</TableCell> */}
                <TableCell>
                  <Link
                    href={`/bookbidding/${invoice.id}`}
                    className="inline-block px-2 py-1 bg-blue-600 text-white rounded text-xs"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden">
        <div className="space-y-4">
          {filteredPosts.map((invoice) => (
            <div
              key={invoice.id}
              className="border rounded-lg p-4 bg-white shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-sm">#{invoice.numbid}</span>
                <Link
                  href={`/bookbidding/${invoice.id}`}
                  className="text-blue-600 text-xs underline"
                >
                  View
                </Link>
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-medium">Topic:</span> {invoice.topic}
                </p>
                <p>
                  <span className="font-medium">Plan:</span> {invoice.plan}
                </p>
                <p>
                  <span className="font-medium">Year:</span> {invoice.year}
                </p>
                <p>
                  <span className="font-medium">Note:</span> {invoice.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!searchQuery && (
        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
          <Button
            label="Previous"
            onClick={handlePreviousPage}
            className="bg-gray-600 text-sm px-4 py-2 w-full sm:w-auto"
            disabled={currentPage === 1 || isLoading}
          />
          <Button
            label="Next"
            onClick={handleNextPage}
            className="bg-blue-600 text-sm px-4 py-2 w-full sm:w-auto"
            disabled={posts.length < pageSize || isLoading}
          />
        </div>
      )}

      {isLoading && <p className="mt-4 text-center text-sm">Loading...</p>}
    </div>
  );
}
