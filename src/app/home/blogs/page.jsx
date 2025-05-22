"use client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Pagination from "@/components/Pagination";
import { X } from "lucide-react";
import { getBlogs } from "@/server/common";


const BlogTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Calculate pagination variables
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        setLoading(true);
        getBlogs()
            .then((res) => {
                setData(res);
                console.log("Data: ",res);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    // Open drawer with animation
    const openDrawer = (blog) => {
        setSelectedBlog(blog);
        // Prevent scrolling on the body when drawer is open
        document.body.style.overflow = "hidden";
        // Small delay to ensure DOM update before animation
        setTimeout(() => {
            setDrawerOpen(true);
        }, 10);
    };

    // Close drawer
    const closeDrawer = () => {
        // First fade the overlay, then unmount the component
        setDrawerOpen(false);
        // Wait for animation to finish before removing the blog
        setTimeout(() => {
            setSelectedBlog(null);
            // Re-enable scrolling
            document.body.style.overflow = "auto";
        }, 300); // Match the duration of the CSS transition
    };

    // Close drawer when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerOpen && !event.target.closest(".drawer-content") && !event.target.closest(".view-button")) {
                closeDrawer();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [drawerOpen]);

    // Close drawer on escape key
    useEffect(() => {
        const handleEscKey = (event) => {
            if (drawerOpen && event.key === "Escape") {
                closeDrawer();
            }
        };

        document.addEventListener("keydown", handleEscKey);
        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [drawerOpen]);

    return (
        <div className="min-h-full dark:bg-gray-700 p-6">
            <div className="max-w-full mx-auto">
                <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6">
                    Blog Posts
                </h1>
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-blue-200 dark:bg-gray-900 text-center text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                                    Sr No.
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-blue-200 dark:bg-gray-900 text-center text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                                    Title
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-blue-200 dark:bg-gray-900 text-center text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                                    Description
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-blue-200 dark:bg-gray-900 text-center text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4">
                                        <div className="flex justify-center items-center w-full">
                                            <ClipLoader
                                                color={"#3b82f6"}
                                                loading={loading}
                                                size={30}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ) : currentItems.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-4 text-center text-gray-400"
                                    >
                                        No blog posts found.
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((blog, index) => (
                                    <tr
                                        key={blog._id}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className="px-4 py-4 border-b text-center border-gray-200 dark:border-gray-700">
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className="px-4 py-4 border-b text-center border-gray-200 dark:border-gray-700">
                                            {blog.title}
                                        </td>
                                        <td className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                                            <p className="truncate max-w-xs mx-auto">
                                                {blog.desc}
                                            </p>
                                        </td>
                                        <td className="px-4 py-4 border-b text-center border-gray-200 dark:border-gray-700">
                                            <button
                                                onClick={() => openDrawer(blog)}
                                                className="view-button px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    usersPerPage={itemsPerPage}
                    totalUsers={data.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>

            {/* Right side drawer */}
            {selectedBlog && (
                <div className={`fixed inset-0 bg-black/80 transition-opacity duration-300 z-40 flex justify-end ${drawerOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}`}>
                    <div
                        className={`drawer-content bg-white dark:bg-gray-800 w-full max-w-2xl overflow-y-auto h-full transform transition-all duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
                        style={{ boxShadow: "-4px 0 15px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="relative">
                            {/* Banner Image */}
                            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 relative">
                                {selectedBlog.bannerImage ? (
                                    <img
                                        src={selectedBlog.bannerImage}
                                        alt={selectedBlog.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No banner image
                                    </div>
                                )}
                                {/* Close button */}
                                <button
                                    onClick={closeDrawer}
                                    className="absolute top-4 right-4 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                >
                                    <X size={24} className="text-gray-800 dark:text-gray-200" />
                                </button>
                            </div>

                            {/* Blog content */}
                            <div className="p-6">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    {selectedBlog.title}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 italic">
                                    {selectedBlog.desc}
                                </p>
                                <div
                                    dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                                    className="prose dark:prose-invert max-w-none mb-8"
                                />

                                {/* Content Images */}
                                {selectedBlog.contentImages && selectedBlog.contentImages.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                            Gallery
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedBlog.contentImages.map((img, idx) => (
                                                <div key={idx} className="rounded-lg overflow-hidden shadow-md">
                                                    <img
                                                        src={img}
                                                        alt={`Content image ${idx + 1}`}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogTable;