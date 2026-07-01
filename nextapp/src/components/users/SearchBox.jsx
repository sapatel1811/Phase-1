"use client";

import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBox({ search, setSearch }) {
  return (
    <div className="relative w-full md:w-80">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-10 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}