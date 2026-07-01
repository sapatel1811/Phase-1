"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserForm from "@/components/users/UserForm";
import { addUser } from "@/services/userService";
import { toast } from "react-toastify";
export default function AddUser() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    await addUser(data);
    toast.success("User Added Successfully");
    router.push("/users");
  };

  return (
    <DashboardLayout>
      <div className="mt-16">
        <h1 className="text-3xl font-bold mb-8">Add User</h1>
        <UserForm loading={loading} onSubmit={submit} />
      </div>
    </DashboardLayout>
  );
}
