"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold">Settings</h1>

        <div className="mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            Change Password
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
