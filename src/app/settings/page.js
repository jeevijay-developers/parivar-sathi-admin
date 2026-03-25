"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ChangePassword from "@/components/ChangePassword";
import LogoutButton from "@/components/LogoutButton";

const AdminSettings = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const router = useRouter();

  const handlePasswordChangeSuccess = () => {
    setShowChangePassword(false);
    // Redirect to login after password change
    setTimeout(() => {
      localStorage.removeItem("admin-token");
      localStorage.removeItem("lnp-landing-admin-page");
      router.push("/");
    }, 1000);
  };

  if (showChangePassword) {
    return (
      <ChangePassword
        onSuccess={handlePasswordChangeSuccess}
        onCancel={() => setShowChangePassword(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Admin Settings
          </h1>
          <LogoutButton />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Account Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Change Password
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Update your admin password
                </p>
              </div>
              <button
                onClick={() => setShowChangePassword(true)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
