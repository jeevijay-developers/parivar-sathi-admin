"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { IoAddCircleSharp, IoLogOut } from "react-icons/io5";
import { FaCalendar, FaClock, FaBlog, FaChevronDown, FaClinicMedical, FaCog } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { RiPagesLine } from "react-icons/ri";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PasswordChangeModal from "./PasswordChangeModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();

  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Navigation structure
  const navItems = {
    blog: {
      label: "Blog",
      icon: <FaBlog />,
      items: [
        {
          label: "Add Blog",
          icon: <IoAddCircleSharp />,
          href: "/home/create-blog"
        },
        {
          label: "View Blog",
          icon: <RiPagesLine />,
          href: "/home/blogs"
        }
      ]
    },
    patients: {
      label: "Patients",
      icon: <FaCalendar />,
      items: [
        {
          label: "Registered Patients",
          icon: <CgProfile />,
          href: "/home/registered-patients"
        },
        {
          label: "Consultation Enquiry",
          icon: <CgProfile />,
          href: "/home/consult-enquiry"
        },
      ]
    },
    clinic: {
      label: "Join partners",
      icon: <FaClinicMedical />,
      items: [
        {
          label: "Registered Clinics",
          icon: <IoAddCircleSharp />,
          href: "/home/registered-clinics"
        },
        {
          label: "Registered Doctors",
          icon: <IoAddCircleSharp />,
          href: "/home/registered-doctors"
        },

      ]
    },
    opds: {
      label: "OPDs",
      icon: <FaCalendar />,
      items: [
        {
          label: "Add OPDs",
          icon: <IoAddCircleSharp />,
          href: "/home/add-opds"
        },
        {
          label: "Today's OPDs",
          icon: <FaCalendar />,
          href: "/home/todays-opd"
        },
        {
          label: "Upcoming OPDs",
          icon: <LuCalendarClock />,
          href: "/home/upcoming-opds"
        },
        {
          label: "Previous OPDs",
          icon: <FaClock />,
          href: "/home/previous-opds"
        }
      ]
    }
  };

  return (
    <nav className="bg-blue-200 dark:bg-gray-900 shadow-md">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.svg"
              alt="Parivar Saathi Logo"
              width={100}
              height={100}
              className="object-fit"
            />
          </div>

          {/* Desktop Menu */}
          <div ref={dropdownRef} className="hidden justify-end md:flex md:items-center md:space-x-4">
            {/* Clinic Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('clinic')}
                className="px-3 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  {navItems.clinic.icon} {navItems.clinic.label} <FaChevronDown className={`ml-1 transform ${activeDropdown === 'clinic' ? 'rotate-180' : ''} transition-transform duration-200`} />
                </span>
              </button>
              {activeDropdown === 'clinic' && (
                <div className="absolute right-0 mt-2 w-max bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200">
                  {navItems.clinic.items.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="px-2 py-2 text-gray-800 hover:bg-blue-100 flex items-center gap-2"
                    >
                      {item.icon} {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown('patients')}
                className="px-3 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  {navItems.patients.icon} {navItems.patients.label} <FaChevronDown className={`ml-1 transform ${activeDropdown === 'patients' ? 'rotate-180' : ''} transition-transform duration-200`} />
                </span>
              </button>
              {activeDropdown === 'patients' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200">
                  {navItems.patients.items.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="px-2 py-2 text-gray-800 hover:bg-blue-100 flex items-center gap-2"
                    >
                      {item.icon} {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown('blog')}
                className="px-3 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  {navItems.blog.icon} {navItems.blog.label} <FaChevronDown className={`ml-1 transform ${activeDropdown === 'blog' ? 'rotate-180' : ''} transition-transform duration-200`} />
                </span>
              </button>
              {activeDropdown === 'blog' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200">
                  {navItems.blog.items.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center gap-2"
                    >
                      {item.icon} {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>


            {/* OPDs Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('opds')}
                className="px-3 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  {navItems.opds.icon} {navItems.opds.label} <FaChevronDown className={`ml-1 transform ${activeDropdown === 'opds' ? 'rotate-180' : ''} transition-transform duration-200`} />
                </span>
              </button>
              {activeDropdown === 'opds' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200">
                  {navItems.opds.items.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center gap-2"
                    >
                      {item.icon} {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('profile')}
                className="px-3 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <CgProfile /> Profile <FaChevronDown className={`ml-1 transform ${activeDropdown === 'profile' ? 'rotate-180' : ''} transition-transform duration-200`} />
                </span>
              </button>
              {activeDropdown === 'profile' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200">
                  <button
                    onClick={() => {
                      setIsPasswordModalOpen(true);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center gap-2 text-left"
                  >
                    <FaCog /> Change Password
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      localStorage.removeItem("admin-token");
                      localStorage.removeItem("lnp-landing-admin-page");
                      router.push("/");
                      setActiveDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-red-600 hover:bg-red-100 flex items-center gap-2 text-left"
                  >
                    <IoLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-white hover:bg-gray-800 focus:outline-none"
              aria-label="Main menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-7 w-7" />
              ) : (
                <Bars3Icon className="block h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="mx-auto px-4 pt-4 pb-6 space-y-3 flex flex-col">
            {/* Mobile Blog Section */}
            <div className="border-b border-gray-200 pb-2 mb-2">
              <div className="text-lg font-medium text-gray-800 mb-2 flex items-center gap-2">
                {navItems.blog.icon} {navItems.blog.label}
              </div>
              <div className="pl-4 space-y-2">
                {navItems.blog.items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="w-full px-4 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
                  >
                    <span className="flex items-center gap-2">
                      {item.icon} {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile OPDs Section */}
            <div className="border-b border-gray-200 pb-2 mb-2">
              <div className="text-lg font-medium text-gray-800 mb-2 flex items-center gap-2">
                {navItems.opds.icon} {navItems.opds.label}
              </div>
              <div className="pl-4 space-y-2">
                {navItems.opds.items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="w-full px-4 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
                  >
                    <span className="flex items-center gap-2">
                      {item.icon} {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Profile Section */}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <button
                onClick={() => {
                  setIsPasswordModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span className="flex items-center gap-2">
                  <FaCog /> Change Password
                </span>
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("admin-token");
                  localStorage.removeItem("lnp-landing-admin-page");
                  router.push("/");
                  setIsMenuOpen(false);
                }}
                className="w-full mt-2 px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span className="flex items-center gap-2">
                  <IoLogOut /> Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;