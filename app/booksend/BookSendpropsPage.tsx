// "use client";

// import React, { useState, useEffect } from "react";
// import Modal from "./Modal"; // Adjust the path to the Modal component
// import Button from "./Button"; // Optional reusable Button component
// import { createClient } from "@/utils/supabase/client"; // Supabase client
// import { useRouter } from "next/navigation";

// const supabase = createClient();

// const BooksendpropsPage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [numsend, setNumsend] = useState("");
//   const [date, setDate] = useState("");
//   const [fromsend, setFromsend] = useState("");
//   const [tosend, setTosend] = useState("");
//   const [topic, setTopic] = useState("");
//   const [plan, setPlan] = useState("");
//   const [note, setNote] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [userId, setUserId] = useState<string | null>(null);
//   const router = useRouter();

//   // Fetch the authenticated user's ID
//   const fetchUser = async () => {
//     const {
//       data: { user },
//       error,
//     } = await supabase.auth.getUser();
//     if (error) {
//       console.error("Error fetching user:", error.message);
//       setErrorMessage("Failed to fetch user information.");
//     } else if (user) {
//       setUserId(user.id);
//     }
//   };

//   // Fetch the latest numsends and set a new numsends value
//   const fetchLatestNumsend = async () => {
//     const { data, error } = await supabase
//       .from("booksend")
//       .select("numsend")
//       .order("numsend", { ascending: false })
//       .limit(1);

//     if (error) {
//       console.error("Error fetching latest numsends:", error);
//       return "S0001";
//     }

//     if (data && data.length > 0) {
//       const lastNum = data[0].numsend;
//       const newNum = `S${(parseInt(lastNum.slice(1)) + 1).toString().padStart(4, "0")}`;
//       return newNum;
//     }

//     return "S0001"; // Default if no data
//   };

//   useEffect(() => {
//     fetchUser(); // Fetch user information on component load
//   }, []);

//   const handleOpenModal = async () => {
//     const newNumsend = await fetchLatestNumsend();
//     setNumsend(newNumsend);
//     setIsModalOpen(true);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!userId) {
//       alert("User not authenticated. Please log in.");
//       setIsSubmitting(false);
//       return;
//     }

//     // Check for duplicate numsends in the database
//     const { data: duplicateCheck, error: checkError } = await supabase
//       .from("booksend")
//       .select("numsend")
//       .eq("numsend", numsend);

//     if (checkError) {
//       console.error("Error checking duplicate numsends:", checkError);
//       alert("Error checking duplicate numsends");
//       setIsSubmitting(false);
//       return;
//     }

//     if (duplicateCheck.length > 0) {
//       alert("Duplicate numsends found. Please refresh and try again.");
//       setIsSubmitting(false);
//       return;
//     }

//     // Insert new data into the database with users_id
//     const { error: insertError } = await supabase.from("booksend").insert([
//       {
//         numsend,
//         date,
//         fromsend,
//         tosend,
//         topic,
//         plan,
//         note,
//         users_id: userId, // Include the user ID
//       },
//     ]);

//     if (insertError) {
//       console.error("Error inserting data:", insertError);
//       alert("Error submitting the form");
//     } else {
//       alert("Form Submitted Successfully!");
//       setIsModalOpen(false);
//       setNumsend("");
//       setDate("");
//       setFromsend("");
//       setTosend("");
//       setTopic("");
//       setPlan("");
//       setNote("");
//       router.push("./");
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div className="container p-4">
//       <h1 className="text-2xl font-bold mb-4">จัดการทะเบียนหนังสือส่ง</h1>

//       {/* Open Modal Button */}
//       <Button
//         label="เพิ่มหนังสือส่ง"
//         onClick={handleOpenModal}
//         className="bg-blue-600"
//       />

//       {/* Modal */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <h2 className="text-xl font-bold mb-4">เพิ่มหนังสือส่ง</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4 flex gap-4">
//             <div className="flex-1">
//               <label className="block text-sm font-medium">ที่หนังสือส่ง</label>
//               <input
//                 type="text"
//                 value={numsend}
//                 onChange={(e) => setNumsend(e.target.value)}
//                 className="mt-1 p-2 border rounded w-full"
//                 readOnly
//               />
//             </div>

//             <div className="flex-1">
//               <label className="block text-sm font-medium">วันที่</label>
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="mt-1 p-2 border rounded w-full"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mb-4 flex gap-4">
//             <div className="flex-1">
//               <label className="block text-sm font-medium">จาก</label>
//               <input
//                 type="text"
//                 value={fromsend}
//                 onChange={(e) => setFromsend(e.target.value)}
//                 className="mt-1 p-2 border rounded w-full"
//                 required
//               />
//             </div>

//             <div className="flex-1">
//               <label className="block text-sm font-medium">ถึง</label>
//               <input
//                 type="text"
//                 value={tosend}
//                 onChange={(e) => setTosend(e.target.value)}
//                 className="mt-1 p-2 border rounded w-full"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium">เรื่อง</label>
//             <textarea
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               className="mt-1 p-2 border rounded w-full"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium">การปฎิบัติ</label>
//             <input
//               type="text"
//               value={plan}
//               onChange={(e) => setPlan(e.target.value)}
//               className="mt-1 p-2 border rounded w-full"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium">หมายเหตุ</label>
//             <input
//               type="text"
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               className="mt-1 p-2 border rounded w-full"
//               required
//             />
//           </div>

//           <Button
//             label={isSubmitting ? "Submitting..." : "Submit"}
//             type="submit"
//             disabled={isSubmitting}
//           />
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default BooksendpropsPage;

"use client";

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

const BooksendpropsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numsend, setNumsend] = useState("");
  const [date, setDate] = useState("");
  const [fromsend, setFromsend] = useState("");
  const [tosend, setTosend] = useState("");
  const [topic, setTopic] = useState("");
  const [plan, setPlan] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

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

  // Fetch the latest numsends and generate the next one
  const fetchLatestNumsend = async () => {
    const { data, error } = await supabase
      .from("booksend")
      .select("numsend")
      .order("numsend", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching latest numsends:", error);
      return "S0001";
    }

    if (data && data.length > 0) {
      const lastNum = data[0].numsend;
      const newNum = `S${(parseInt(lastNum.slice(1)) + 1)
        .toString()
        .padStart(4, "0")}`;
      return newNum;
    }

    return "S0001"; // Default if no data
  };

  useEffect(() => {
    fetchUser(); // Get user on load
  }, []);

  const handleOpenModal = async () => {
    const newNumsend = await fetchLatestNumsend();
    setNumsend(newNumsend);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userId) {
      alert("User not authenticated. Please log in.");
      setIsSubmitting(false);
      return;
    }

    // Check for duplicate numsends
    const { data: duplicateCheck, error: checkError } = await supabase
      .from("booksend")
      .select("numsend")
      .eq("numsend", numsend);

    if (checkError) {
      console.error("Error checking duplicate numsends:", checkError);
      alert("Error checking duplicate numsends");
      setIsSubmitting(false);
      return;
    }

    if (duplicateCheck.length > 0) {
      alert("Duplicate numsends found. Please refresh and try again.");
      setIsSubmitting(false);
      return;
    }

    // Prepare insert payload
    const payload = {
      numsend,
      date,
      fromsend,
      tosend,
      topic,
      plan,
      note,
      users_id: userId,
    };

    console.log("Insert payload:", payload);

    try {
      // Attempt to insert data and throw on error
      await supabase.from("booksend").insert([payload]).throwOnError();

      alert("Form Submitted Successfully!");
      setIsModalOpen(false);

      // Clear form fields
      setNumsend("");
      setDate("");
      setFromsend("");
      setTosend("");
      setTopic("");
      setPlan("");
      setNote("");

      router.push("./");
    } catch (insertError) {
      console.error("Insert error:", insertError);
      alert("Error submitting the form. Check console for details.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">จัดการทะเบียนหนังสือส่ง</h1>

      <Button
        label="เพิ่มหนังสือส่ง"
        onClick={handleOpenModal}
        className="bg-blue-600"
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">เพิ่มหนังสือส่ง</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">ที่หนังสือส่ง</label>
              <input
                type="text"
                value={numsend}
                readOnly
                className="mt-1 p-2 border rounded w-full"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">วันที่</label>
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
            <div className="flex-1">
              <label className="block text-sm font-medium">จาก</label>
              <input
                type="text"
                value={fromsend}
                onChange={(e) => setFromsend(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">ถึง</label>
              <input
                type="text"
                value={tosend}
                onChange={(e) => setTosend(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
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
            <label className="block text-sm font-medium">การปฎิบัติ</label>
            <input
              type="text"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
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

export default BooksendpropsPage;
