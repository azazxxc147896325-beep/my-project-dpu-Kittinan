import React from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import FloatingBackground from "./components/FloatingBackground";
import logoImg from "./assets/logo.png";

export default function App() {
  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
      isActive
        ? "bg-indigo-600 text-white shadow-sm"
        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
    }`;

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800 overflow-x-hidden">
      {/* Floating Background with Name */}
      <FloatingBackground />

      {/* Top Menu Header */}
      <header className="relative z-20 bg-white border-b border-gray-200 sticky top-0 py-3.5 px-4 sm:px-8 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Logo & Student Info (Clickable back to Main Page) */}
          <Link
            to="/"
            className="flex items-center gap-3 group cursor-pointer text-left"
            title="คลิกเพื่อกลับหน้าหลัก"
          >
            <img
              src={logoImg}
              alt="Kittinan Logo"
              className="h-8 sm:h-9 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block border-l border-gray-200 pl-3">
              <h1 className="text-xs font-bold text-gray-800 group-hover:text-indigo-600 transition-colors leading-tight">
                IG342 Project
              </h1>
              <p className="text-[11px] text-gray-500">
                กิตตินันท์ บุญคุ้ม (66112126)
              </p>
            </div>
          </Link>

          {/* Top Menu Navigation */}
          <nav className="flex items-center space-x-2 bg-gray-100 p-1 rounded-xl border border-gray-200">
            <NavLink to="/home" className={navLinkStyle}>
              Home
            </NavLink>

            <NavLink to="/features" className={navLinkStyle}>
              Features
            </NavLink>

            <NavLink to="/about" className={navLinkStyle}>
              About
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow flex items-center justify-center py-8 px-4">
        <Routes>
          {/* หน้าหลัก */}
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage />} />

          {/* 3 หน้าเนื้อหา */}
          <Route path="/home" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="relative z-20 bg-white border-t border-gray-200 py-4">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            กิตตินันท์ บุญคุ้ม • 66112126 • IG342 DPU 2026
          </p>
        </div>
      </footer>
    </div>
  );
}