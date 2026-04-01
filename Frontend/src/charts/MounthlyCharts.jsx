import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
  { name: "May", uv: 1890, pv: 4800 },
  { name: "Jun", uv: 2390, pv: 3800 },
  { name: "Jul", uv: 3490, pv: 4300 },
  { name: "Aug", uv: 3490, pv: 4300 },
  { name: "sept", uv: 3490, pv: 4300 },
  { name: "oct", uv: 3490, pv: 4300 },
  { name: "nov", uv: 3490, pv: 4300 },
  { name: "Dec", uv: 3490, pv: 4300 },
];

export default function MonthlyCharts() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 w-full h-[450px]">
      <div className="flex justify-between items-center mb-6 px-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Monthly Analytics
          </h2>
          <p className="text-slate-500 text-sm">
            Comparison between UV and PV metrics
          </p>
        </div>
        <div className="flex gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span> UV
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span> PV
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          {/* Qurxinta Grid-ka */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          {/* Tooltip la qurxiyey */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "none",
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              padding: "12px",
            }}
            itemStyle={{ fontWeight: "bold" }}
          />

          <Legend
            verticalAlign="top"
            align="right"
            height={36}
            iconType="circle"
          />

          {/* Line 1: PV (Buluug) */}
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#3b82f6"
            strokeWidth={4}
            dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 8, strokeWidth: 0 }}
            animationDuration={1500}
          />

          {/* Line 2: UV (Cagaar) */}
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#10b981"
            strokeWidth={4}
            dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 8, strokeWidth: 0 }}
            animationDuration={2000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
