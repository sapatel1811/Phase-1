"use client";

import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}) {

  const [open, setOpen] = useState(false);

  return (

    <div className="min-h-screen">

<Navbar open={open} setOpen={setOpen} />

<div className="flex">

{/* // sidebar component is rendered here, passing the open state and setOpen function as props */}

<Sidebar
open={open}
setOpen={setOpen}
/>

<main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8 transition-all duration-300">

{children}

</main>
</div>
</div>

  );

}