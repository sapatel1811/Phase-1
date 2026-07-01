"use client";

import Link from "next/link";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function UserTable({
  users,

  onDelete,
}) {
  return (
<div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
  <div className="overflow-x-auto">      
<table className="min-w-full text-sm text-left">
<thead className="bg-slate-800 text-white sticky top-0">
<tr>
<th className="px-6 py-4 font-semibold"></th>

            <th>Email</th>

            <th>Role</th>

            <th>Status</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>
<span className={`px-3 py-1
rounded-full
text-white
text-sm=
${user.status === "Active" ? "bg-green-500" : "bg-red-500"}
`}>
                  {user.status}
                </span>
              </td>

              <td>
                <div className="flex justify-center gap-3">
                  <Link href={`/users/view/${user.id}`}>
                    <FaEye className="text-blue-500" />
                  </Link>

                  <Link href={`/users/edit/${user.id}`}>
                    <FaEdit className="text-yellow-500" />
                  </Link>

                  <button onClick={() => onDelete(user.id)}>
                    <FaTrash className="text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
