"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardChart() {
  const data = [
    { name: "Jan", users: 10 },
    { name: "Feb", users: 20 },
    { name: "Mar", users: 35 },
    { name: "Apr", users: 18 },
    { name: "May", users: 40 },
    { name: "Jun", users: 30 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="font-bold mb-5">Monthly Users</h2>

      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="users" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
