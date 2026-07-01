"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getUser } from "@/services/userService";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCheckCircle,
  FaArrowLeft,
  FaEdit,
} from "react-icons/fa";
import { useParams } from "next/navigation";

export default function ViewUser() {

const params = useParams();  const router = useRouter();

  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const data = await getUser(params.id);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await getUser(params.id);
        if (mounted) setUser(data);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [params.id]);

  if (!user) {
    return (
      <DashboardLayout>
        <div className="mt-20 text-center text-lg">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mt-16 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-40"></div>

          {/* Profile */}

          <div className="px-8 pb-8">
            <div className="-mt-16 flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="bg-white rounded-full p-2 shadow-lg">
                <FaUserCircle className="text-8xl text-blue-600" />
              </div>

              <div>
                <h2 className="text-3xl font-bold">{user.name}</h2>

                <p className="text-gray-500">User Profile</p>
              </div>
            </div>

            {/* User Details */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                <FaEnvelope className="text-blue-600 text-xl" />

                <div>
                  <p className="text-gray-500 text-sm">Email</p>

                  <h3 className="font-semibold">{user.email}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                <FaPhone className="text-green-600 text-xl" />

                <div>
                  <p className="text-gray-500 text-sm">Phone</p>

                  <h3 className="font-semibold">{user.phone}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                <FaUserShield className="text-yellow-500 text-xl" />

                <div>
                  <p className="text-gray-500 text-sm">Role</p>

                  <span className="inline-block mt-1 px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                <FaCheckCircle className="text-green-500 text-xl" />

                <div>
                  <p className="text-gray-500 text-sm">Status</p>

                  <span
                    className={`inline-block mt-1 px-4 py-1 rounded-full font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl"
              >
                <FaArrowLeft />
                Back
              </button>

              <button
                onClick={() => router.push(`/users/edit/${user.id}`)}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                <FaEdit />
                Edit User
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
