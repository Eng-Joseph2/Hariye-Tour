import React, { useState, useEffect } from "react";

function DayAndDate() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Qaabaynta luuqadda (en-US ama so-SO hadaad rabto)
  const day = dateTime.toLocaleDateString("en-US", { weekday: "long" });
  const date = dateTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="bg-white border border-gray-100 shadow-xl w-[420px] h-32 rounded-[40px] p-8 flex flex-col justify-center items-center transition-all hover:scale-105">
      {/* Maalinta iyo Taariikhda */}
      <div className="flex justify-between items-center w-full px-4 mb-2">
        <span className="text-emerald-600 font-bold text-lg uppercase tracking-widest">
          {day}
        </span>
        <span className="text-slate-400 font-medium italic">{date}</span>
      </div>

      {/* Saacadda Weyn */}
      <div className="relative">
        <h2 className="text-6xl font-black text-blue-600 tracking-tighter tabular-nums">
          {time.split(" ")[0]}
          <span className="text-xl ml-2 text-blue-400 font-bold uppercase">
            {time.split(" ")[1]}
          </span>
        </h2>
      </div>

      {/* Khad hoose oo qurxin ah */}
      <div className="w-20 h-1.5 bg-emerald-500 rounded-full mt-4 opacity-50"></div>
    </div>
  );
}

export default DayAndDate;
