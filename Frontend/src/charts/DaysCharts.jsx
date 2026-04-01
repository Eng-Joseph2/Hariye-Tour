import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { day: "Sat", bookings: 40 },
  { day: "Sun", bookings: 30 },
  { day: "mon", bookings: 60 },
  { day: "Thu", bookings: 45 },
  { day: "Wed", bookings: 90 },
];

// Midab kala duwan si uu chart-ku u noqdo mid nool (Vibrant)
const COLORS = [
  "#3b82f6",
  "#10b981",
  "#6366f1",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

function DaysCharts() {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 w-[60%] h-[300px]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Weekly Activity</h2>
        <p className="text-slate-500 text-sm">
          Number of tour bookings per day
        </p>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 13, fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
            }}
          />
          <Bar dataKey="bookings" radius={[8, 8, 8, 8]} barSize={45}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DaysCharts;
