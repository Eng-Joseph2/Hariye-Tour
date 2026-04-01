import React from "react";
import AdminImage from "../img/TZ/AdminImage.avif";
import { Search, Bell } from "lucide-react";

function AdminAvatar() {
  return (
    <header className="p-3 flex justify-between items-center bg-white border-b border-slate-200 sticky top-0 z-50">
      {/* 1. Title */}
      <h2 className="hidden md:block text-slate-800 font-bold px-4">
        Dashboard Overview
      </h2>

      {/* 2. Search Bar (Modern Style) */}
      <div className="relative flex-1 max-w-md mx-8">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={18} className="text-slate-400" />
        </span>
        <input
          type="search"
          placeholder="Search tours, bookings..."
          className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
        />
      </div>

      {/* 3. Right Side (Notification + Profile) */}
      <div className="flex items-center gap-5 px-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
          <div className="text-right hidden sm:block">
            <h1 className="text-sm font-bold text-slate-800 leading-none">
              Admin Panel
            </h1>
            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
              Super Admin
            </span>
          </div>
          <div className="relative">
            <img
              src={AdminImage}
              alt="Admin"
              className="rounded-full w-10 h-10 object-cover border-2 border-emerald-500/20 p-0.5"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminAvatar;
