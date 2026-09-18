import React, { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative z-10 max-w-md mx-auto p-4 sm:p-6 text-center">
      <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          หน้า Home
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          ตัวอย่างฟังก์ชันตัวนับจำนวน (Counter)
        </p>

        {/* Counter Display */}
        <div className="my-6">
          <span className="text-gray-600 text-sm block mb-1">จำนวนปัจจุบัน</span>
          <div className="text-5xl font-bold text-indigo-600">
            {count}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-4">
          <button
            onClick={() => setCount(count + 1)}
            className="flex-1 min-w-[80px] py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center text-center"
          >
            เพิ่ม (+1)
          </button>

          <button
            onClick={() => setCount(count > 0 ? count - 1 : 0)}
            disabled={count === 0}
            className="flex-1 min-w-[80px] py-2.5 px-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-semibold rounded-lg transition-colors flex items-center justify-center text-center"
          >
            ลด (-1)
          </button>

          <button
            onClick={() => setCount(0)}
            className="flex-1 min-w-[80px] py-2.5 px-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition-colors flex items-center justify-center text-center"
          >
            รีเซ็ต
          </button>
        </div>
      </div>
    </div>
  );
}
