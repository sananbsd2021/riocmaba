"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface BookBid {
  id: number;
  numbid: string;
  date: string;
  topic: string;
  note: string;
  plan: string;
  year: string;
  users_id: string;
}

const BookBidDetailsPage = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const supabase = createClient();

  const [post, setPost] = useState<BookBid | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<BookBid>({
    id: 0,
    numbid: "",
    date: "",
    topic: "",
    note: "",
    plan: "",
    year: "",
    users_id: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setError(null);
        setLoading(true);

        const { data, error } = await supabase
          .from("bookbidding")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw new Error("Error fetching bookbidding: " + error.message);
        }

        setPost(data as BookBid);
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(
          err.message || "An error occurred while fetching the bookbidding."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this bookbidding?")) return;

    try {
      const { error } = await supabase
        .from("bookbidding")
        .delete()
        .eq("id", id);
      if (error)
        throw new Error("Error deleting bookbidding: " + error.message);

      alert("Bookbidding deleted successfully!");
      router.push("/bookbidding");
    } catch (err: any) {
      console.error("Delete Error:", err);
      setError(
        err.message || "An error occurred while deleting the bookbidding."
      );
    }
  };

  const handleEditClick = () => {
    if (!post) return;
    setEditingPostId(post.id);
    setEditForm(post);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditForm({
      id: 0,
      numbid: "",
      date: "",
      topic: "",
      note: "",
      plan: "",
      year: "",
      users_id: "",
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field: keyof BookBid, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from("bookbidding")
        .update({
          numbid: editForm.numbid,
          date: editForm.date,
          topic: editForm.topic,
          note: editForm.note,
          plan: editForm.plan,
          year: editForm.year,
        })
        .eq("id", post?.id);

      if (error) throw new Error("Error updating post: " + error.message);

      setPost({ ...post, ...editForm });
      handleCancelEdit();
    } catch (err: any) {
      console.error("Update Error:", err);
      setError(err.message || "An error occurred while updating the post.");
    }
  };

  if (loading) return <p>Loading post...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="container p-4">
      {editingPostId === post.id ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">แก้ไขคำสั่ง</h1>

          <div className="mb-4">
            <Label>ที่คำสั่ง</Label>
            <Input
              type="text"
              name="numbid"
              value={editForm.numbid}
              onChange={handleFormChange}
            />
          </div>

          <div className="mb-4">
            <Label>วันที่</Label>
            <Input
              type="date"
              name="date"
              value={editForm.date}
              onChange={handleFormChange}
            />
          </div>

          <div className="mb-4">
            <Label>เรื่อง</Label>

            <Textarea
              name="topic"
              value={editForm.topic}
              onChange={handleFormChange}
            />
          </div>

          <div className="mb-4">
            <Label>หมายเหตุ</Label>
            <Select
              value={editForm.note}
              onValueChange={(value) => handleSelectChange("note", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือก" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="สำนักปลัด">สำนักปลัด</SelectItem>
                <SelectItem value="กองคลัง">กองคลัง</SelectItem>
                <SelectItem value="กองการศึกษา">กองการศึกษา</SelectItem>
                <SelectItem value="กองสวัสดิการ">กองสวัสดิการ</SelectItem>
                <SelectItem value="รอดำเนินการ">รอดำเนินการ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label>ปี</Label>
            <Select
              value={editForm.year}
              onValueChange={(value) => handleSelectChange("year", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือก" />
              </SelectTrigger>
              <SelectContent>
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
            <Label>การปฏิบัติ</Label>
            <Select
              value={editForm.plan}
              onValueChange={(value) => handleSelectChange("plan", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือก" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="รอดำเนินการ">รอดำเนินการ</SelectItem>
                <SelectItem value="เรียบร้อยแล้ว">เรียบร้อยแล้ว</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{post.numbid}</CardTitle>
              <CardDescription>วันที่ : {post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>เรื่อง : {post.topic}</p>
              <p>หน่วยงาน : {post.note}</p>
              <p>การปฏิบัติ : {post.plan}</p>
            </CardContent>
            <CardFooter>
              <p>ปี : {post.year}</p>
            </CardFooter>
          </Card>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              แก้ไข
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              ลบ
            </button>

            <button
              onClick={() => router.push("./")}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookBidDetailsPage;
