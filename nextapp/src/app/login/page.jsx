"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { loginAdmin } from "@/services/authService";
import { getAdmin } from "@/utils/auth";

export default function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [remember, setRemember] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {

    if (getAdmin()) {

      router.replace("/dashboard");

    }

  }, [router]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!form.email.trim()) {

      return toast.error("Email is required");

    }

    if (!form.password.trim()) {

      return toast.error("Password is required");

    }

    setLoading(true);

    try {

      const admin = await loginAdmin(
        form.email,
        form.password
      );

      if (!admin) {

        toast.error("Invalid Email or Password");

        return;

      }

      localStorage.setItem(
        "admin",
        JSON.stringify(admin)
      );

      toast.success("Login Successful");

      router.push("/dashboard");

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

        <h1 className="text-3xl font-bold text-center">

          Welcome Back

        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">

          Login to continue

        </p>

        <form onSubmit={handleLogin}>

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
                placeholder="Enter Password"
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

                {

                  showPassword

                  ?

                  <FaEyeSlash/>

                  :

                  <FaEye/>

                }

              </button>

            </div>

          </div>

          <div className="flex justify-between items-center mb-6">

            <label className="flex items-center gap-2">

              <input
                type="checkbox"
                checked={remember}
                onChange={() =>
                  setRemember(!remember)
                }
              />

              Remember Me

            </label>

            <Link
              href="#"
              className="text-blue-600 text-sm"
            >

              Forgot Password?

            </Link>

          </div>

          <button
           type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >

            {

              loading

              ?

              "Logging..."

              :

              "Login"

            }

          </button>

        </form>

        <p className="text-center mt-6">

          Dont have an account?

          <Link
            href="/signup"
            className="text-blue-600 font-semibold ml-2"
          >

            Sign Up

          </Link>

        </p>

      </div>

    </div>

  );

}