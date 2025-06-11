"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Use this for dynamic parameters in app directory
import { createClient } from "@/utils/supabase/client";

const BooksendDetailsPage = () => {
  const params = useParams(); // Access dynamic route parameters
  const { id } = params; // Get the `id` from the URL
  const router = useRouter();
  const supabase = createClient();

  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    numsend: "",
    date: "",
    fromsend: "",
    tosend: "",
    topic: "",
    plan: "",
    note: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setError(null);
        setLoading(true);

        const { data, error } = await supabase
          .from("booksend")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw new Error("Error fetching post: " + error.message);
        }

        setPost(data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const { error } = await supabase.from("booksend").delete().eq("id", id);
      if (error) throw new Error("Error deleting post: " + error.message);

      alert("Post deleted successfully!");
      router.push("/booksend"); // Redirect after deletion
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the post.");
    }
  };

  const handleEditClick = () => {
    setEditingPostId(post.id);
    setEditForm({
      numsend: post.numsend,
      date: post.date,
      fromsend: post.fromsend,
      tosend: post.tosend,
      topic: post.topic,
      plan: post.plan,
      note: post.note,
    });
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditForm({
      numsend: "",
      date: "",
      fromsend: "",
      tosend: "",
      topic: "",
      plan: "",
      note: "",
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };


  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from("booksend") // Correct table name
        .update({
          numsend: editForm.numsend,
          date: editForm.date,
          fromsend: editForm.fromsend,
          tosend: editForm.tosend,
          topic: editForm.topic,
          plan: editForm.plan,
          note: editForm.note,
        })
        .eq("id", post.id);
  
      if (error) throw new Error("Error updating post: " + error.message);
  
      // Update the local state
      setPost({ ...post, ...editForm });
  
      // Exit edit mode
      handleCancelEdit();
    } catch (err: any) {
      console.error("Update Error Details:", err);
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
          <h1 className="text-2xl font-bold mb-4">แก้ไขทะเบียนรับ</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              เลขทะเยียนรับ
            </label>
            <input
              type="text"
              name="numsend"
              value={editForm.numsend}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              วันที่
            </label>
            <input
            type="date"
              name="date"
              value={editForm.date}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            จาก
            </label>
            <input
            type="text"
              name="fromsend"
              value={editForm.fromsend}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            ถึง
            </label>
            <input
            type="text"
              name="tosend"
              value={editForm.tosend}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            เรื่อง
            </label>
            <input
            type="text"
              name="topic"
              value={editForm.topic}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            การปฏิบัติ
            </label>
            <input
            type="text"
              name="plan"
              value={editForm.plan}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            หมายเหตุ
            </label>
            <input
            type="text"
              name="note"
              value={editForm.note}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              บันทึก
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="">ที่ทะเบียนรับ</label>
          <h1 className="text-2xl font-bold mb-4">{post.numsend}</h1>
          <label htmlFor="">วันที่</label>
          <p className="mb-4">{post.date}</p>
          <label htmlFor="">จาก</label>
          <p className="mb-4">{post.fromsend}</p>
          <label htmlFor="">ถึง</label>
          <p className="mb-4">{post.tosend}</p>
          <label htmlFor="">เรื่อง</label>
          <p className="mb-4">{post.topic}</p>
          <label htmlFor="">การปฏิบัติ</label>
          <p className="mb-4">{post.plan}</p>
          <label htmlFor="">หมายเหตุ</label>
          <p className="mb-4">{post.note}</p>
          <p className="text-sm text-gray-500">User ID: {post.users_id}</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              แก้ไข
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              ลบ
            </button>
            <button onClick={() => router.push("/")} className="px-4 py-2 bg-gray-500 text-white rounded">
            Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksendDetailsPage;
