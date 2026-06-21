"use client";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { IoAddCircleSharp, IoLogOut } from "react-icons/io5";
import { FaCalendar, FaClock, FaBlog, FaClinicMedical, FaCog } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { RiPagesLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import PasswordChangeModal from "./PasswordChangeModal";

// Navigation structure (mirrors the previous top navbar). All groups are
// listed in the sidebar consistently — including Patients and Join partners,
// which the old mobile menu omitted.
const navItems = {
  blog: {
    label: "Blog",
    icon: <FaBlog />,
    items: [
      { label: "Add Blog", icon: <IoAddCircleSharp />, href: "/home/create-blog" },
      { label: "View Blog", icon: <RiPagesLine />, href: "/home/blogs" },
    ],
  },
  patients: {
    label: "Patients",
    icon: <FaCalendar />,
    items: [
      { label: "Registered Patients", icon: <CgProfile />, href: "/home/registered-patients" },
      { label: "Consultation Enquiry", icon: <CgProfile />, href: "/home/consult-enquiry" },
    ],
  },
  clinic: {
    label: "Join partners",
    icon: <FaClinicMedical />,
    items: [
      { label: "Registered Clinics", icon: <IoAddCircleSharp />, href: "/home/registered-clinics" },
      { label: "Registered Doctors", icon: <IoAddCircleSharp />, href: "/home/registered-doctors" },
    ],
  },
  opds: {
    label: "OPDs",
    icon: <FaCalendar />,
    items: [
      { label: "Add OPDs", icon: <IoAddCircleSharp />, href: "/home/add-opds" },
      { label: "Today's OPDs", icon: <FaCalendar />, href: "/home/todays-opd" },
      { label: "Upcoming OPDs", icon: <LuCalendarClock />, href: "/home/upcoming-opds" },
      { label: "Previous OPDs", icon: <FaClock />, href: "/home/previous-opds" },
    ],
  },
};

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("lnp-landing-admin-page");
    router.push("/");
  };

  const closeMobile = () => setIsMobileOpen(false);

  // Shared inner content of the sidebar (logo + groups + profile actions)
  const SidebarBody = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-center px-4 py-4 border-b border-blue-300 dark:border-gray-800">
        <Image
          src="/logo.svg"
          alt="Parivar Saathi Logo"
          width={120}
          height={120}
          className="object-fit"
        />
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {Object.entries(navItems).map(([key, group]) => (
          <div key={key}>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-300 mb-2 px-2">
              {group.icon} {group.label}
            </div>
            <div className="space-y-1">
              {group.items.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={closeMobile}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {item.icon} {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Profile actions */}
      <div className="border-t border-blue-300 dark:border-gray-800 px-3 py-4 space-y-2">
        <button
          onClick={() => {
            setIsPasswordModalOpen(true);
            closeMobile();
          }}
          className="w-full px-3 py-2 rounded-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-all duration-200"
        >
          <FaCog /> Change Password
        </button>
        <button
          onClick={() => {
            handleLogout();
            closeMobile();
          }}
          className="w-full px-3 py-2 rounded-lg font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center gap-2 transition-all duration-200"
        >
          <IoLogOut /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar (hamburger + logo) */}
      <div className="md:hidden flex items-center justify-between bg-blue-200 dark:bg-gray-900 shadow-md px-4 py-2">
        <Image src="/logo.svg" alt="Parivar Saathi Logo" width={80} height={80} className="object-fit" />
        <button
          onClick={() => setIsMobileOpen(true)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-white hover:bg-gray-800 focus:outline-none"
          aria-label="Open menu"
          aria-expanded={isMobileOpen}
        >
          <Bars3Icon className="block h-7 w-7" />
        </button>
      </div>

      {/* Desktop sidebar (always visible md+) */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 bg-blue-200 dark:bg-gray-900 shadow-md z-30">
        {SidebarBody}
      </aside>

      {/* Mobile slide-in drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/80 transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
      >
        <aside
          className={`absolute inset-y-0 left-0 w-64 bg-blue-200 dark:bg-gray-900 shadow-md transform transition-transform duration-300 ease-in-out ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end p-2">
            <button
              onClick={closeMobile}
              className="p-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-white hover:bg-gray-800"
              aria-label="Close menu"
            >
              <XMarkIcon className="block h-7 w-7" />
            </button>
          </div>
          {SidebarBody}
        </aside>
      </div>

      {/* Password Change Modal */}
      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
