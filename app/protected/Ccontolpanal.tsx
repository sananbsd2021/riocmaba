// import React from "react";
// import { AiFillForward } from "react-icons/ai";
// import Link from "next/link";

// import {
//   Card,
//   // CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const ControlPanelPage = () => {
//   const items = [
//     {
//       href: "/bookbidding",
//       title: "คำสั่ง",
//       desc: "จัดการคำสั่ง",
//       buttonText: "เพิ่มคำสั่ง",
//     },
//     {
//       href: "/bookre",
//       title: "หนังสือรับ",
//       desc: "จัดการหนังสือรับ",
//       buttonText: "เพิ่มหนังสือรับ",
//     },
//     {
//       href: "/booksend",
//       title: "หนังสือส่ง",
//       desc: "จัดการหนังสือส่ง",
//       buttonText: "เพิ่มหนังสือส่ง",
//     },
//     {
//       href: "/supplies",
//       title: "วัสดุสำนักงาน",
//       desc: "จัดการวัสดุสำนักงาน",
//       buttonText: "วัสดุสำนักงาน",
//     },
//   ];

//   return (
//     <div className="h-96">
//       <Card>
//         <CardHeader>
//           <CardTitle>Card Title</CardTitle>
//           <CardDescription>Card Description</CardDescription>
//           {/* <CardAction>Card Action</CardAction> */}
//         </CardHeader>
//         <CardContent>
//           <p>Card Content</p>
//         </CardContent>
//         <CardFooter>
//           <p>Card Footer</p>
//         </CardFooter>
//       </Card>

//       <div className="card bg-base-100 w-96 shadow-xl m-3">
//         <div className="flex flex-wrap gap-3 justify-center">
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className="w-full sm:w-[250px] max-w-sm p-6 bg-white border border-gray-200 rounded-lg
//           shadow dark:bg-gray-800 dark:border-gray-700"
//             >
//               <Link href={item.href}>
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                   {item.title}
//                 </h5>
//               </Link>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                 {item.desc}
//               </p>
//               <Link
//                 href={item.href}
//                 className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 {item.buttonText}
//                 <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ControlPanelPage;

import React from "react";
import { AiFillForward } from "react-icons/ai";
import Link from "next/link";

interface PanelItem {
  href: string;
  title: string;
  desc: string;
  buttonText: string;
}

const items: PanelItem[] = [
  {
    href: "/bookbidding",
    title: "คำสั่ง",
    desc: "จัดการคำสั่ง",
    buttonText: "เพิ่มคำสั่ง",
  },
  {
    href: "/bookre",
    title: "หนังสือรับ",
    desc: "จัดการหนังสือรับ",
    buttonText: "เพิ่มหนังสือรับ",
  },
  {
    href: "/booksend",
    title: "หนังสือส่ง",
    desc: "จัดการหนังสือส่ง",
    buttonText: "เพิ่มหนังสือส่ง",
  },
  // {
  //   href: "/supplies",
  //   title: "วัสดุสำนักงาน",
  //   desc: "จัดการวัสดุสำนักงาน",
  //   buttonText: "วัสดุสำนักงาน",
  // },
];

const ControlPanelPage: React.FC = () => {
  return (
    <div className="min-w-screen bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <Link href={item.href}>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
            </Link>
            <p className="mb-4 text-gray-700 dark:text-gray-400">{item.desc}</p>
            <Link
              href={item.href}
              aria-label={`ไปยัง ${item.title}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {item.buttonText}
              <AiFillForward className="ml-2 w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanelPage;
