import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

const data = [
  {
    name: "Boys",
    value: 450,
    fill: "#1e293b",
  },
  {
    name: "Girls",
    value: 520,
    fill: "#10b981",
  },
];

function BoysAndGirlsRadialChart() {
  return (
    <div className="p-6 rounded-3xl shadow-sm border border-gray-100 bg-white w-[40%] h-[300px]">
      <h2 className="text-xl font-bold text-slate-800 mb-2 text-center">
        Gender Distribution
      </h2>
      <p className="text-center text-slate-500 text-sm mb-6">
        Comparison of Boys and Girls
      </p>

      <ResponsiveContainer width="100%" height="80%">
        <RadialBarChart
          cx="40%" // 👈 moved left to give space for legend
          cy="50%"
          innerRadius="30%"
          outerRadius="100%"
          barSize={20}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            minAngle={15}
            label={{
              position: "insideStart",
              fill: "#fff",
              fontSize: 12,
              fontWeight: "bold",
            }}
            background
            clockWise
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </RadialBar>

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
          />

          <Legend
            iconSize={12}
            layout="vertical"
            verticalAlign="middle"
            align="Bottom"
            wrapperStyle={{
              right: -9,
              top: "50%",
              bottom: 300,
              left: 90,
              transform: "translateY(-50%)",
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BoysAndGirlsRadialChart;
