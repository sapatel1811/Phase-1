"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        router.replace("/login");
      } else {
        await Promise.resolve();
        setChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Checking Authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar open={open} setOpen={setOpen} />

      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} />

        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}