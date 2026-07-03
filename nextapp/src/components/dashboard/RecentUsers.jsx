
"use client";
export default function RecentUsers({ users }) {
  const recent = users.slice(-5).reverse();

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="font-bold mb-5">Recent Users</h2>

      <div className="space-y-4">
        {recent.map((user) => (
          <div key={user.id} className="flex justify-between">
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

<span className={`px-3 py-1 rounded-full text-xs
${
  user.status === "Active"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700"
}
`}>
              {user.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
