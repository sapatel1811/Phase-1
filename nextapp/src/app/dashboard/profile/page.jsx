"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAdmin } from "@/utils/auth";
import { getAdminById } from "@/services/authService";
import { updateAdmin } from "@/services/authService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function ProfilePage() {
  const [admin, setAdmin] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const currentAdmin = getAdmin();
        if (!currentAdmin) return;
        const data = await getAdminById(currentAdmin.id);
        setAdmin(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  // new uplod function...
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      await updateAdmin(admin.id, admin);

      localStorage.setItem("admin", JSON.stringify(admin));

      toast.success("Profile Updated");

      setEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        Loading...
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        No profile available.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <div className="flex flex-col items-center">
          <img
            src={preview || admin.image || "/assets/default.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border object-cover"
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          <button
            type="button"
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Upload Image
          </button>

          <h2 className="text-2xl font-bold mt-4">{admin.name}</h2>

          <p className="text-gray-500">{admin.email}</p>
        </div>

        <hr className="my-8" />

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="font-semibold">Name</label>

            {editing ? (
              <input
                type="text"
                name="name"
                value={admin.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p>{admin.name}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Email</label>

            {editing ? (
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p>{admin.email}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Admin ID</label>

            <p>{admin.id}</p>
          </div>

          <div>
            <label className="font-semibold">Address</label>

            {editing ? (
              <input
                type="text"
                name="address"
                value={admin.address || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p>{admin.address}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-5 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
