"use client";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { IoAddCircleSharp, IoLogOut  } from "react-icons/io5";
import { FaCalendar, FaClock } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("lnp-landing-admin-page");
    window.location.href = "/"; 
  };

  return (
    <nav className="bg-blue-200 dark:bg-gray-900 shadow-md rounded-b-xl">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="w-[65px] flex items-center">
            <img className="w-full" src="/logo.svg" alt="parivar-sathi-logo" /> 
            <div className="text-2xl font-bold flex gap-1">Parivar <span className="text-blue-500"> Saathi</span></div>
          </div>          
          
          {/* Desktop Menu */}
          <div className="hidden justify-end md:flex md:items-center md:space-x-4">
            <button
              onClick={() => {
                window.location.href = "/home/create-blog";
              }}
              className="px-2 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
            >
              <span className="flex items-center gap-2"><IoAddCircleSharp /> Add Blogs</span>
            </button>
            <button
              onClick={() => {
                window.location.href = "/home/add-opds";
              }}
              className="px-2 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
            >
              <span className="flex items-center gap-2"><IoAddCircleSharp /> Add OPDs</span>
            </button>
            <button
              onClick={() => {
                window.location.href = "/home/todays-opd";
              }}
              className="px-2 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
            >
              <span className="flex items-center gap-2"><FaCalendar />Today's OPDs</span>
            </button>
            <button
              onClick={() => {
                window.location.href = "/home/upcoming-opds";
              }}
              className="px-2 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
            >
              <span className="flex items-center gap-2"> <LuCalendarClock /> Upcoming OPDs</span>
            </button>
            <button
              onClick={() => {
                window.location.href = "/home/previous-opds";
              }}
              className="px-2 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
            >

              <span className="flex items-center gap-2"> <FaClock /> Previous OPDs</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105"
            >

              <span className="flex items-center gap-2"><IoLogOut /> Logout</span>
            </button>
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
            <button
              onClick={() => {
                window.location.href = "/create-blog";
              }}
              className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Add Blog</span>
            </button>

            <button
              onClick={() => {
                window.location.href = "/home/add-opds";
              }}
              className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Add OPDs</span>
            </button>

            <button
              onClick={() => {
                window.location.href = "/home/todays-opd";
              }}
              className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Today's OPDs</span>
            </button>

            <button
              onClick={() => {
                window.location.href = "/home/upcoming-opds";
              }}
              className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >

              <span>Upcoming OPDs</span>
            </button>
            <button
              onClick={() => {
                window.location.href = "/home/previous-opds";
              }}
              className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >

              <span>Previous OPDs</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;