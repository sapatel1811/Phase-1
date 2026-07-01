"use client";

import { paginate, totalPages } from "@/utils/helpers";
import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserTable from "@/components/users/UserTable";
import SearchBox from "@/components/users/SearchBox";
import DeleteModal from "@/components/users/DeleteModal";
import useUsers from "@/hooks/useUsers";
import { deleteUser } from "@/services/userService";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Users() {
  const {
    users,
    refreshUsers,
    loading,
  } = useUsers();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

// for sarch containt ke liye...
const filteredUsers = useMemo(() => {
  const searchText = search.toLowerCase().trim();
  return (users || []).filter((user) => {
    return (
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText) ||
      user.role?.toLowerCase().includes(searchText)
    );
  });
}, [users, search]);

const pages = totalPages(filteredUsers, limit);
const currentUsers = useMemo(() => {
  return paginate(filteredUsers, page, limit);
}, [filteredUsers, page, limit]);


// const [status, setStatus] = useState("");
//   const [role, setRole] = useState("");
//   const [sort, setSort] = useState("");
//   const pages = totalPages(filteredUsers, limit);


  const handleDelete = (id) => {
    setSelected(id);
    setOpen(true);
  };

  const confirmDelete = async () => {
    await deleteUser(selected);
    toast.success("User deleted");
    setOpen(false);
    refreshUsers();
  };

  return (
    <DashboardLayout>
      <div className="mt-16">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Users</h1>
          <Link
            href="/users/add"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            Add User
          </Link>
        </div>

<SearchBox
  search={search}
  setSearch={(value) => {
    setSearch(value);
    setPage(1);
  }}
/>
        <div className="mt-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <UserTable users={currentUsers} onDelete={handleDelete} />
          )}
        </div>



 <div className="flex justify-center items-center gap-2 mt-6">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Previous
  </button>

  {Array.from({ length: pages }, (_, index) => (
    <button
      key={index}
      onClick={() => setPage(index + 1)}
      className={`px-4 py-2 rounded ${
        page === index + 1
          ? "bg-blue-600 text-white"
          : "bg-gray-200"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={page === pages}
    onClick={() => setPage(page + 1)}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>       

        <DeleteModal
          open={open}
          onClose={() => setOpen(false)}
          onDelete={confirmDelete}
        />
      </div>
    </DashboardLayout>
  );
}
