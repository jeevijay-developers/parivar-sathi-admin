"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { axiosInstance } from "@/lib/axiosInstance";

const ChangePassword = ({ onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validations
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (form.currentPassword === form.newPassword) {
      setError("New password must be different from current password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/admin/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        
        // Call success callback after a delay
        setTimeout(() => {
          onSuccess?.();
        }, 1500);
      }
    } catch (err) {
      console.error("Change password error:", err);
      const errorMsg = err.response?.data?.message || "Failed to change password. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg min-w-[320px] w-full max-w-sm transition-colors"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Change Password
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Update your admin password
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
            {error}
          </div>
        )}

        {/* Current Password */}
        <div className="mb-4">
          <label
            htmlFor="currentPassword"
            className="block mb-2 text-gray-700 dark:text-gray-200"
          >
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("current")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPasswords.current ? (
                <FaRegEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block mb-2 text-gray-700 dark:text-gray-200"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("new")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPasswords.new ? (
                <FaRegEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-gray-700 dark:text-gray-200"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("confirm")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPasswords.confirm ? (
                <FaRegEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold rounded transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                Updating...
                <AiOutlineLoading3Quarters className="animate-spin mx-1 h-5 w-5 text-white" />
              </>
            ) : (
              "Change Password"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
