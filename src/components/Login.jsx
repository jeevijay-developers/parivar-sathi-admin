"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  useEffect(() => {
    if (localStorage.getItem("lnp-landing-admin-page")) {
      router.push("/home/todays-opd");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Please enter both username and password.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    // Simulate loading delay
    setTimeout(() => {
      if(form.username === "admin@gmail.com" && form.password === "password") {
        toast.success("Login successful!");
        router.push("/home/todays-opd");
        localStorage.setItem(
          "lnp-landing-admin-page",
          JSON.stringify({ role: "admin" })
        );
        setLoading(false);
        return;
      }
      
      toast.error("Invalid credentials");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg min-w-[320px] w-full max-w-sm transition-colors"
      >
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image 
              src="/logo.svg" 
              alt="Parivar Saathi Logo" 
              width={150}
              height={150}
              className="object-fit"
            />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Admin Panel
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 text-gray-700 dark:text-gray-200"
          >
            Email
          </label>
          <input
            type="mail"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-gray-700 dark:text-gray-200"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <FaRegEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold rounded transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              Signing in...
              <AiOutlineLoading3Quarters className="animate-spin mx-1 h-5 w-5 text-white" />
            </>
          ) : (
            "Login"
          )}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
