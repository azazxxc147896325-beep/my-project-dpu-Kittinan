import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";

export default function MainPage() {
  return (
    <div className="relative z-10 max-w-2xl w-full mx-auto p-6 text-center">
      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-md border border-gray-200">
        {/* Logo */}
        <div className="mb-5 flex justify-center">
          <img
            src={logoImg}
            alt="Kittinan Logo"
            className="h-14 sm:h-16 object-contain mx-auto"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-2">
          Welcome to IG342
        </h2>

        {/* Student Info */}
        <p className="text-base font-semibold text-gray-700">
          กิตตินันท์ บุญคุ้ม • รหัสนักศึกษา 66112126
        </p>

        <p className="text-sm text-gray-500 max-w-md mx-auto mt-3 mb-6 leading-relaxed">
          ยินดีต้อนรับสู่หน้าหลัก สามารถเลือกเปิดดูเนื้อหาในแต่ละหน้าได้จากเมนูด้านบน หรือคลิกปุ่มด้านล่าง
        </p>

        {/* Main Action Button */}
        <div className="mb-8">
          <Link
            to="/home"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm transition-colors"
          >
            ไปที่หน้า Home
          </Link>
        </div>

        {/* Navigation Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <Link
            to="/home"
            className="p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 transition-all block"
          >
            <h3 className="font-bold text-sm text-gray-800">
              หน้า Home
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              ฟังก์ชันตัวนับจำนวน (Counter)
            </p>
          </Link>

          <Link
            to="/features"
            className="p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 transition-all block"
          >
            <h3 className="font-bold text-sm text-gray-800">
              หน้า Features
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              ฟังก์ชันเปลี่ยนสีและข้อความ
            </p>
          </Link>

          <Link
            to="/about"
            className="p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 transition-all block"
          >
            <h3 className="font-bold text-sm text-gray-800">
              หน้า About
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              ข้อมูลประวัติผู้พัฒนา
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
