import React from "react";

export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Soft background ambient gradient blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />

      {/* Large subtle watermark in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center animate-pulse-glow">
        <p className="text-4xl md:text-6xl font-black tracking-widest text-indigo-900/[0.04]">
          กิตตินันท์ บุญคุ้ม
        </p>
        <p className="text-3xl md:text-5xl font-black tracking-widest text-indigo-900/[0.04] mt-2">
          66112126
        </p>
      </div>

      {/* Floating Badge 1 - Top Left */}
      <div
        className="absolute top-24 left-6 md:left-20 animate-float-slow"
        style={{ animationDelay: "0s" }}
      >
        <div className="px-4 py-2 rounded-xl bg-indigo-500/15 backdrop-blur-sm border border-indigo-400/30 text-indigo-800 font-semibold text-sm shadow-sm">
          กิตตินันท์ บุญคุ้ม
        </div>
      </div>

      {/* Floating Badge 2 - Top Right */}
      <div
        className="absolute top-28 right-6 md:right-24 animate-float-reverse"
        style={{ animationDelay: "1s" }}
      >
        <div className="px-4 py-2 rounded-xl bg-purple-500/15 backdrop-blur-sm border border-purple-400/30 text-purple-800 font-bold text-sm shadow-sm">
          66112126
        </div>
      </div>

      {/* Floating Badge 3 - Middle Left */}
      <div
        className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 animate-float-drift"
        style={{ animationDelay: "2s" }}
      >
        <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/15 backdrop-blur-sm border border-blue-400/30 text-blue-800 font-medium text-xs shadow-sm">
          66112126 (IG342)
        </div>
      </div>

      {/* Floating Badge 4 - Middle Right */}
      <div
        className="absolute top-1/2 right-4 md:right-16 -translate-y-1/2 animate-float-slow"
        style={{ animationDelay: "3s" }}
      >
        <div className="px-4 py-2 rounded-xl bg-indigo-500/15 backdrop-blur-sm border border-indigo-400/30 text-indigo-800 font-semibold text-sm shadow-sm">
          กิตตินันท์ บุญคุ้ม
        </div>
      </div>

      {/* Floating Badge 5 - Bottom Left */}
      <div
        className="absolute bottom-24 left-8 md:left-28 animate-float-reverse"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="px-4 py-2 rounded-xl bg-emerald-500/15 backdrop-blur-sm border border-emerald-400/30 text-emerald-800 font-bold text-sm shadow-sm">
          66112126
        </div>
      </div>

      {/* Floating Badge 6 - Bottom Right */}
      <div
        className="absolute bottom-20 right-8 md:right-32 animate-float-drift"
        style={{ animationDelay: "2.5s" }}
      >
        <div className="px-4 py-2 rounded-xl bg-slate-500/15 backdrop-blur-sm border border-slate-400/30 text-slate-800 font-medium text-xs shadow-sm">
          กิตตินันท์ บุญคุ้ม (66112126)
        </div>
      </div>
    </div>
  );
}
