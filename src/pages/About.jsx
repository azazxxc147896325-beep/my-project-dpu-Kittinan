import React, { useState } from "react";
import logoImg from "../assets/logo.png";

export default function About() {
  const [likes, setLikes] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText("66112126");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 max-w-md mx-auto p-6 text-center">
      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          หน้า About
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          ข้อมูลผู้พัฒนาเว็บแอปพลิเคชัน
        </p>

        {/* Profile Logo */}
        <div className="mx-auto w-28 h-20 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-center p-3 mb-4 shadow-xs">
          <img
            src={logoImg}
            alt="Kittinan Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Name & ID */}
        <h3 className="text-xl font-bold text-gray-900">
          กิตตินันท์ บุญคุ้ม
        </h3>
        <p className="text-sm font-semibold text-indigo-600 mt-1">
          รหัสนักศึกษา: 66112126
        </p>

        {/* Info List */}
        <div className="mt-4 py-3 px-4 bg-gray-50 rounded-xl text-xs text-gray-600 space-y-1.5 text-left">
          <p><strong>รหัสนักศึกษา:</strong> 66112126</p>
          <p><strong>วิชา:</strong> IG342 การพัฒนาแอปพลิเคชันบนอุปกรณ์เคลื่อนที่ 1</p>
          <p><strong>สถาบัน:</strong> มหาวิทยาลัยธุรกิจบัณฑิตย์ (DPU)</p>
          <p><strong>สถานะ:</strong> นักศึกษา</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            onClick={handleCopyId}
            className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-lg transition-colors border border-gray-300"
          >
            {copied ? "คัดลอกรหัสเรียบร้อยแล้ว" : "คัดลอกรหัสนักศึกษา"}
          </button>

          <button
            onClick={() => setLikes(likes + 1)}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            กดถูกใจ ({likes})
          </button>
        </div>
      </div>
    </div>
  );
}
