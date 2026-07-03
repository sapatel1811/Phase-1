"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getAdmin, logout } from "@/utils/auth";
import { changePassword, getAdminById } from "@/services/authService";

export default function ChangePassword() {
  const router = useRouter();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const admin = getAdmin();

      const user = await getAdminById(admin.id);

      if (form.currentPassword !== user.password) {
        return toast.error("Current Password is incorrect");
      }

      if (form.newPassword.length < 6) {
        return toast.error("Password must be at least 6 characters");
      }

      if (form.newPassword !== form.confirmPassword) {
        return toast.error("Passwords do not match");
      }

      await changePassword(admin.id, form.newPassword);

      toast.success("Password Updated Successfully");

      logout();

      router.replace("/login");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>

      <form onSubmit={handleSubmit}>
        {/* Current Password */}

        <div className="mb-4">
          <label className="block mb-2">Current Password</label>

          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Enter Current Password"
          />
        </div>

        {/* New Password */}

        <div className="mb-4">
          <label className="block mb-2">New Password</label>

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Enter New Password"
          />
        </div>

        {/* Confirm Password */}

        <div className="mb-6">
          <label className="block mb-2">Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Confirm Password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
