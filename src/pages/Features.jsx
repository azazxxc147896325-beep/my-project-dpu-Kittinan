import React, { useState } from "react";

export default function Features() {
  const [color, setColor] = useState("indigo");
  const [text, setText] = useState("ข้อความตัวอย่างสำหรับทดสอบ");
  const [showBox, setShowBox] = useState(true);

  const colors = [
    { id: "indigo", name: "สีน้ำเงิน", bgClass: "bg-indigo-600 text-white" },
    { id: "emerald", name: "สีเขียว", bgClass: "bg-emerald-600 text-white" },
    { id: "amber", name: "สีส้ม", bgClass: "bg-amber-600 text-white" },
    { id: "rose", name: "สีแดง", bgClass: "bg-rose-600 text-white" },
  ];

  const currentColorObj = colors.find((c) => c.id === color) || colors[0];

  return (
    <div className="relative z-10 max-w-md mx-auto p-4 sm:p-6 text-center">
      <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          หน้า Features
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          ตัวอย่างฟังก์ชันเปลี่ยนสีและข้อความแบบเรียลไทม์
        </p>

        {/* Color Select Buttons */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-600 block mb-2 text-left">
            เลือกสีกล่อง:
          </label>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id)}
                className={`flex items-center justify-center text-center py-2.5 px-1 sm:px-3 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
                  color === c.id
                    ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="w-full text-center leading-none">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div className="mb-5 text-left">
          <label className="text-xs font-semibold text-gray-600 block mb-1">
            พิมพ์ข้อความที่ต้องการแสดง:
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="พิมพ์ข้อความที่นี่..."
          />
        </div>

        {/* Toggle Show/Hide Button */}
        <div className="mb-4">
          <button
            onClick={() => setShowBox(!showBox)}
            className="text-xs text-indigo-600 hover:underline font-medium"
          >
            {showBox ? "คลิกเพื่อซ่อนกล่อง" : "คลิกเพื่อแสดงกล่อง"}
          </button>
        </div>

        {/* Preview Box */}
        {showBox && (
          <div
            className={`p-6 rounded-xl text-center transition-all ${currentColorObj.bgClass}`}
          >
            <p className="text-xs opacity-80 mb-1">
              สีปัจจุบัน: {currentColorObj.name}
            </p>
            <h3 className="text-lg font-bold break-words">
              {text || "(ไม่มีข้อความ)"}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
