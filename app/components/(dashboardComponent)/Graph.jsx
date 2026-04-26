"use client";

import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Sat", messages: 2000 },
  { day: "Sun", messages: 3000 },
  { day: "Mon", messages: 2000 },
  { day: "Tue", messages: 2780 },
  { day: "Wed", messages: 1890 },
  { day: "Thu", messages: 2390 },
  { day: "Fri", messages: 3490 },
];

export default function CardinalAreaChart() {
  return (
    <div className="w-full h-75 mt-10 bg-transparent max-w-150">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#7c3aed" offset="5%" stopOpacity="1" />

              <stop stopColor="#7c3aed" offset="95%" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="messages"
            stroke="#7c3aed"
            strokeWidth="2"
            fill="url(#customGradient)"
            fillOpacity={0.2}
            activeDot={{
              r: 6,
              fill: "#7c3aed",
              stroke: "#0a0a0f",
              strokeWidth: 3,
            }}
          ></Area>

          <Tooltip
            contentStyle={{
              backgroundColor: "#11121a",
              backdropFilter: "blur(10px)",
              borderRadius: "10px",
              color: "#f8fafc",
              border: "none",
              boxSizing: "border-box",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
