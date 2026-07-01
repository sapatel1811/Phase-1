"use client";

import { useState } from "react";

export default function UserForm({
  initialData,

  onSubmit,

  loading,
}) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    role: initialData?.role || "User",
    status: initialData?.status || "Active",
  });
  // all error msg store karne ke liye...
  const [errors, setErrors] = useState({});


// form validation....
const validateField = (name, value) => {
  let error = "";

  switch (name) {
    case "name":
      if (!value.trim()) {
        error = "Name is required.";
      } else if (value.trim().length < 2) {
        error = "Name must be at least 2 characters.";
      } else if (!/^[A-Za-z ]+$/.test(value)) {
        error = "Name must contain only letters.";
      }
      break;

    case "email":
      if (!value.trim()) {
        error = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
      ) {
        error = "Please enter valid email.";
      }
      break;

    case "phone":
      if (!value.trim()) {
        error = "Phone is required.";
      } else if (!/^\d+$/.test(value)) {
        error = "Only digits allowed.";
      } else if (value.length !== 10) {
        error = "Phone must be 10 digits.";
      }
      break;
  }

  setErrors((prev) => ({
    ...prev,
    [name]: error,
  }));
};



  // form validation...
const validateForm = () => {
  validateField("name", form.name);
  validateField("email", form.email);
  validateField("phone", form.phone);

  const newErrors = {};

  if (!form.name.trim())
    newErrors.name = "Name is required.";

  if (!form.email.trim())
    newErrors.email = "Email is required.";

  if (!form.phone.trim())
    newErrors.phone = "Phone is required.";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  //   const handleChange = (e) => {
  //     setForm({
  //       ...form,

  //       [e.target.name]: e.target.value,
  //     });
  //   };

const handleChange = (e) => {
  const { name, value } = e.target;

  
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

  validateField(name, value);
};

  const submit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
        
            className={`mt-2 w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : ""
            }`}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
        
            className={`mt-2 w-full border rounded-xl p-3 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            
            className={`mt-2 w-full border rounded-xl p-3 ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label>Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-2 w-full border rounded-xl p-3"
          >
            <option>Admin</option>
            <option>User</option>
          </select>
        </div>

        <div>
          <label>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-2 w-full border rounded-xl p-3"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <button
        disabled={loading}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
      >
        {loading ? "Saving..." : "Save User"}
      </button>
    </form>
  );
}
