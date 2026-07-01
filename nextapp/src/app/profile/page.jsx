"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold">Admin Profile</h1>

        <div className="mt-8 space-y-3">
          <p>Name : Admin</p>

          <p>Email : admin@gmail.com</p>

          <p>Role : Super Admin</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
