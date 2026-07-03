"use client";

import { FiMenu } from "react-icons/fi";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAdmin, logout } from "@/utils/auth";

export default function Navbar({ open, setOpen }) {
  const router = useRouter();

  const [admin, setAdmin] = useState(() => getAdmin());

  const handleLogout = () => {
    logout();

    router.replace("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
      <div className="h-full px-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>
            <FiMenu />
          </button>

          <h1 className="text-xl font-bold text-blue-600">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-6">
          {/* <FaBell className="text-xl" /> */}

          <div className="flex items-center gap-2">
            <FaUserCircle className="text-3xl text-blue-600" />

            <Link
              href="/dashboard/profile"
              className="font-medium hover:text-blue-600"
            >
              {admin?.name}
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
