import React from "react";
import SideBar from "./SideBar";

function Menu() {
  return (
    <div className="flex flex-col h-full ">
      {/* Logo Section */}
      <div className="flex items-center gap-1 px-4 py-6">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient
              id="logo-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path
            stroke="url(#logo-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke="url(#logo-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <h1 className="hidden lg:block font-bold text-white text-sm tracking-tight leading-none">
          Hariye Tour Agency
        </h1>
      </div>

      <hr className="border-slate-800 mx-4 mb-4" />

      {/* Navigation Links */}
      <div className="flex-1">
        <SideBar />
      </div>
    </div>
  );
}

export default Menu;
