import React from "react";
import { AiFillForward } from "react-icons/ai";

const ControlPanalPage = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6 p-4">
      {[
        { href: "/bookbidding", title: "ทะเบียนคำสั่ง", desc: "จัดการทะเบียนคำสั่ง", buttonText: "เพิ่มคำสั่ง" },
        { href: "/bookre", title: "ทะเบียนหนังสือรับ", desc: "จัดการทะเบียนหนังสือรับ", buttonText: "เพิ่มหนังสือรับ" },
        { href: "/booksend", title: "ทะเบียนหนังสือส่ง", desc: "จัดการหนังสือส่ง", buttonText: "เพิ่มหนังสือส่ง" },
        { href: "/supplies", title: "ทะเบียนพัสดุ", desc: "จัดการทะเบียนพัสดุ", buttonText: "เพิ่มทะเบียนพัสดุ" },
      ].map((item, index) => (
        <div key={index} className="w-full sm:w-[300px] max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href={item.href}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.desc}</p>
          <a
            href={item.href}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {item.buttonText}
            <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default ControlPanalPage;
