import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

function Calender() {
  const [currDate, setCurrDate] = useState(new Date());

  // ✅ Maalinta la doortay (Blue) - Waxaan ka dhignay maanta markii hore
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Logic-ga in toddobaadku ka bilaawdo Monday (Isniin)
  let firstDayOfMonth = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    1,
  ).getDay();
  firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const daysInMonth = new Date(
    currDate.getFullYear(),
    currDate.getMonth() + 1,
    0,
  ).getDate();

  const prevMonth = () =>
    setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() - 1));
  const nextMonth = () =>
    setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() + 1));

  return (
    <div className="bg-white w-[420px] mt-2 p-8 font-sans rounded-3xl shadow-sm border border-gray-100">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10 px-2">
        <button
          onClick={prevMonth}
          className="text-gray-400 hover:text-black transition-colors"
        >
          <FaChevronLeft size={14} />
        </button>

        <h2 className="font-bold text-xl text-gray-800">
          {months[currDate.getMonth()]} {currDate.getFullYear()}
        </h2>

        <button
          onClick={nextMonth}
          className="text-gray-400 hover:text-black transition-colors"
        >
          <FaChevronRight size={14} />
        </button>
      </div>

      {/* Days Header (MON - SUN) */}
      <div className="grid grid-cols-7 mb-6 text-center text-[11px] font-black tracking-widest">
        {days.map((d) => (
          <div
            key={d}
            className={
              d === "SAT" || d === "SUN" ? "text-[#0f9f6e]" : "text-[#1e293b]"
            }
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-7 text-center gap-y-1">
        {/* Empty slots for previous month */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div
            key={i}
            className="h-12 text-gray-200 flex items-center justify-center text-sm"
          >
            {/* Blank */}
          </div>
        ))}

        {/* Current month days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;

          const isSpecialDay = day === 9;
          const isSelected = day === selectedDay;

          return (
            <div
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`h-12 flex items-center justify-center cursor-pointer text-sm font-bold transition-all duration-200
                ${isSpecialDay ? "bg-[#0f9f6e] text-gray-800" : ""} 
                ${isSelected ? "bg-[#1e293b] text-[#0066cc]" : ""}
                ${!isSpecialDay && !isSelected ? "text-gray-700 hover:bg-gray-50" : ""}
                ${(i + firstDayOfMonth) % 7 === 5 || (i + firstDayOfMonth) % 7 === 6 ? "text-red-500" : ""}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calender;
