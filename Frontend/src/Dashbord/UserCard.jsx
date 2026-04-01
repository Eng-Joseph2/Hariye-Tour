import React from "react";
import { MoreHorizontal } from "lucide-react";

function UserCard({ bg, count, title }) {
  return (
    <div
      className={`${bg} flex-1 w-[180px] h-24 rounded-3xl p-2 mt-4 flex flex-col justify-between shadow-sm transition-transform hover:scale-105`}
    >
      {/* Top Row: Year and Icon */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white/90 px-2 py-0.5 text-black font-bold rounded-full">
          2025/26
        </span>
        <MoreHorizontal size={24} className="text-white cursor-pointer" />
      </div>

      {/* Bottom Content */}
      <div className="flex flex-col">
        <span className="text-white font-bold text-xl leading-none">
          {count}
        </span>
        <h1 className="text-white/80 font-medium text-sm mt-1 uppercase tracking-wider">
          {title}
        </h1>
      </div>
    </div>
  );
}

export default UserCard;
