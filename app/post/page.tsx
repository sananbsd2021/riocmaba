"use client";

import React from "react";

interface SharePayment {
  description: string;
  month: string;
  amount: number;
  calculated: number;
}

const SharePaymentTable: React.FC = () => {
  const sharePayments: SharePayment[] = [
    { description: "ยกมา", month: "มกราคม 68", amount: 80000, calculated: 12000 },
    { description: "ส่งรายเดือน", month: "กุมภาพันธ์", amount: 1000, calculated: 1000 * 0.15 },
    { description: "ส่งรายเดือน", month: "มีนาคม", amount: 1000, calculated: 1000 * 0.125 },
    { description: "ส่งรายเดือน", month: "เมษายน", amount: 1000, calculated: 1000 * 0.1125 },
    { description: "ส่งรายเดือน", month: "พฤษภาคม", amount: 1000, calculated: 1000 * 0.1 },
    { description: "ส่งรายเดือน", month: "มิถุนายน", amount: 1000, calculated: 1000 * 0.0875 },
    { description: "ส่งรายเดือน", month: "กรกฎาคม", amount: 1000, calculated: 1000 * 0.075 },
    { description: "ส่งรายเดือน", month: "สิงหาคม", amount: 1000, calculated: 1000 * 0.0625 },
    { description: "ส่งรายเดือน", month: "กันยายน", amount: 1000, calculated: 1000 * 0.05 },
    { description: "ส่งรายเดือน", month: "ตุลาคม", amount: 1000, calculated: 1000 * 0.0375 },
    { description: "ส่งรายเดือน", month: "พฤศจิกายน", amount: 1000, calculated: 1000 * 0.025 },
    { description: "ส่งรายเดือน", month: "ธันวาคม", amount: 1000, calculated: 1000 * 0.0125 },
  ];

  return (
    <div className="container p-4">
      <h1 className="text-xl font-bold mb-4">ตารางเงินค่าหุ้น</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">เงินค่าหุ้น</th>
            <th className="border border-gray-300 px-4 py-2">เดือน</th>
            <th className="border border-gray-300 px-4 py-2">บาท</th>
            <th className="border border-gray-300 px-4 py-2">วิธีคำนวน (15%)</th>
          </tr>
        </thead>
        <tbody>
          {sharePayments.map((payment, index) => (
            <tr key={index} className="text-center even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{payment.description}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.month}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.amount.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2">
                {payment.calculated.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SharePaymentTable;
