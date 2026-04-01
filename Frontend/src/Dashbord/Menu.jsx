import React from "react";
import SideBar from "./SideBar";

function Menu() {
  return (
    <div className="flex flex-col h-full ">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-4 py-6">
        <img src="/favicon.svg" className="w-8 h-8 object-contain" alt="Logo" />
        <h1 className="hidden lg:block font-bold text-white text-sm tracking-tight leading-none">
          East Africa Tour
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
