import React from "react";
import { AiFillForward } from "react-icons/ai";
import Link from "next/link";

const ControlPanelPage = () => {
  const items = [
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
    //   title: "พัสดุ",
    //   desc: "จัดการพัสดุ",
    //   buttonText: "เพิ่มทะเบียนพัสดุ",
    // },
  ];

  return (
    <div className="card bg-base-100 w-96 shadow-xl m-3">
      <div className="flex flex-wrap gap-3 justify-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-[250px] max-w-sm p-6 bg-white border border-gray-200 rounded-lg 
          shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <Link href={item.href}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {item.desc}
            </p>
            <Link
              href={item.href}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {item.buttonText}
              <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanelPage;
