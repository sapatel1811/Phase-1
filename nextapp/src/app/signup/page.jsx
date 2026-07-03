"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  signupAdmin,
  checkEmailExists,
} from "@/services/authService";

export default function SignupPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSignup = async (e) => {

    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Name is required");
    }

    if (!form.email.trim()) {
      return toast.error("Email is required");
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      return toast.error("Invalid Email");
    }

    if (form.password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {

      const exists = await checkEmailExists(
        form.email
      );

      if (exists) {

        toast.error("Email already exists");

        setLoading(false);

        return;

      }

      await signupAdmin({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Signup Successful");

      router.push("/login");

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray p-5">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2">

          Create Account

        </h1>

        <p className="text-center text-gray-500 mb-8">

          Admin Signup

        </p>

        <form onSubmit={handleSignup}>

          {/* Name */}

          <div className="mb-5">

            <label className="font-medium">

              Full Name

            </label>

            <div className="relative mt-2">

              <FaUser className="absolute left-4 top-4 text-gray-400"/>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

          {/* Email */}

          <div className="mb-5">

            <label className="font-medium">

              Email

            </label>

            <div className="relative mt-2">

              <FaEnvelope className="absolute left-4 top-4 text-gray-400"/>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

          {/* Password */}

          <div className="mb-5">

            <label className="font-medium">

              Password

            </label>

            <div className="relative mt-2">

              <FaLock className="absolute left-4 top-4 text-gray-400"/>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border rounded-xl pl-11 pr-11 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-4"
              >

                {showPassword ? (
                  <FaEyeSlash/>
                ) : (
                  <FaEye/>
                )}

              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div className="mb-6">

            <label className="font-medium">

              Confirm Password

            </label>

            <div className="relative mt-2">

              <FaLock className="absolute left-4 top-4 text-gray-400"/>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border rounded-xl pl-11 pr-11 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-4"
              >

                {showConfirmPassword ? (
                  <FaEyeSlash/>
                ) : (
                  <FaEye/>
                )}

              </button>

            </div>

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >

            {loading
              ? "Creating Account..."
              : "Sign Up"}

          </button>

        </form>

        <p className="text-center mt-6">

          Already have an account?

          <Link
            href="/login"
            className="text-blue-600 font-semibold ml-2"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}