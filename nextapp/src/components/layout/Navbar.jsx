"use client";

import { FiMenu } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ open, setOpen }) {
  return (
     <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
      <div className="h-full px-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>
            <FiMenu />
          </button>

          <h1 className="text-xl font-bold text-blue-600">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-5">
          <button className="text-xl">
            <FaBell />
          </button>

          <div className="flex items-center gap-2">
            <FaUserCircle className="text-3xl text-blue-600" />

            <span className="hidden md:block">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
