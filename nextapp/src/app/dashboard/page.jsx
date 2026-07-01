"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardChart from "@/components/dashboard/DashboardChart";
import RecentUsers from "@/components/dashboard/RecentUsers";
import useUsers from "@/hooks/useUsers";

export default function Dashboard() {

const {
users,
loading,

  } = useUsers();

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  );

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  );

  const adminUsers = users.filter(
    (user) => user.role === "Admin"
  );

  return (

    <DashboardLayout>

      <div className="mt-16">

        <h1 className="text-3xl font-bold mb-8">

          Dashboard Overview

        </h1>

        {

          loading ?

          (

            <div className="text-lg">

              Loading...

            </div>

          )

          :

          (

            <>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                <DashboardCard
                  title="Total Users"
                  value={users.length}
                  type="total"
                />

                <DashboardCard
                  title="Active Users"
                  value={activeUsers.length}
                  type="active"
                />

                <DashboardCard
                  title="Inactive Users"
                  value={inactiveUsers.length}
                  type="inactive"
                />

                <DashboardCard
                  title="Admins"
                  value={adminUsers.length}
                  type="admin"
                />

              </div>

              <div className="grid lg:grid-cols-3 gap-6 mt-8">

                <div className="lg:col-span-2">

                  <DashboardChart
                    users={users}
                  />

                </div>

                <RecentUsers
                  users={users}
                />

              </div>

            </>

          )

        }

      </div>

    </DashboardLayout>

  );

}