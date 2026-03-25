"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toast";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("lnp-landing-admin-page");
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
