"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers, FaCog } from "react-icons/fa";

export default function Sidebar({ open, setOpen }) {

const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
        fixed
        top-16
        left-0
        z-40
        h-[calc(100vh-64px)]
        w-64
        bg-slate-900
        text-white
        transition-transform
        duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="p-5">
          <h2 className="text-lg font-bold mb-8">MENU</h2>

          <ul className="space-y-3">
            <li>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-700"
              >
                <FaHome />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/users"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-700"
              >
                <FaUsers />
                Users
              </Link>
            </li>

            <li>
              <Link
                href="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-700"
              >
                <FaCog />
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
