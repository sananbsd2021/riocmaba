import React from "react";
import { AiFillForward } from "react-icons/ai";
// import { EnvVarWarning } from "@/components/env-var-warning";
// import HeaderAuth from "@/components/header-auth";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";

const ControlPanalPage = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-center gap-6">   
     

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/bookbidding">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ทะเบียนคำสั่ง
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการทะเบียนคำสั่ง
        </p>
        <a
          href="/bookbidding"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มคำสั่ง
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/bookre">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ทะเบียนหนังสือรับ
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการทะเบียนหนังสือรับ
        </p>
        <a
          href="/bookre"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มหนังสือรับ
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/booksend">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          ทะเบียนหนังสือส่ง
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการหนังสือส่ง
        </p>
        <a
          href="/booksend"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มหนังสือส่ง
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

    </div>
  );
};

export default ControlPanalPage;
