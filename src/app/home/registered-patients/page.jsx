"use client";
import React, { useEffect, useState } from "react";
import { getRegisteredPatients } from "@/server/common";
import { ClipLoader } from "react-spinners";
import Pagination from "@/components/Pagination";

const columns = [
    { key: "index", label: "Sr No." },
    { key: "fullName", label: "Full Name" },
    { key: "gender", label: "Gender" },
    { key: "age", label: "Age" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },

    { key: "department", label: "Department" },
    { key: "primaryConcern", label: "Primary Concern" },
    { key: "symptoms", label: "Symptoms" },
    { key: "medicalHistory", label: "Medical History" },
    { key: "createdAt", label: "Registration Date" }
]

const TodaysQueryPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // You can adjust this number
    const [openRow, setOpenRow] = useState(null);
    const [openSymptomId, setOpenSymptomId] = useState(null);
    const [openPrimaryConcern, setOpenPrimaryConcert] = useState(null);

    // Calculate pagination variables
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".relative")) {
                setOpenRow(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        getRegisteredPatients()
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.error(err);
            }).finally(() => setLoading(false));
    }, []);

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-GB');

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHour = hours % 12 === 0 ? 12 : hours % 12;
        return `${displayHour}:${minutes} ${period}`;
    };


    return (
        <div className="min-h-full dark:bg-gray-700 p-6">
            <div className="max-w-full mx-auto">
                <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8">
                    Registered Patients
                </h1>
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-blue-200 dark:bg-gray-900 text-center text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-4">
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
                                        colSpan={columns.length}
                                        className="px-6 py-4 text-center text-gray-400"
                                    >
                                        No data found.
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((row) => (
                                    <tr
                                        key={row._id}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                    >
                                        {columns.map((col) => (
                                            <td
                                                key={col.key}
                                                className="px-4 py-2 border-b text-center border-gray-200 dark:border-gray-700"
                                            >
                                                {col.key === "medicalHistory" ? (
                                                    <div className="relative inline-block text-left">
                                                        <button
                                                            onClick={() => setOpenRow(openRow === row._id ? null : row._id)}
                                                            className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-4xl hover:bg-blue-700 transition duration-200"
                                                        >
                                                            View
                                                        </button>

                                                        {openRow === row._id && (
                                                            <div className="absolute z-10 mt-2 w-60 origin-top-right right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-4 text-left text-sm">
                                                                <ul className="list-disc pl-4 space-y-1">
                                                                    {Object.entries(row.preExistingConditions)
                                                                        .filter(([key, value]) => {
                                                                            if (typeof value === "boolean") return value;
                                                                            return value && key === "otherText";
                                                                        })
                                                                        .map(([key, value], idx, arr) =>
                                                                            arr.length > 0 ? (
                                                                                <li key={idx}>
                                                                                    {key === "otherText"
                                                                                        ? value
                                                                                        : key.charAt(0).toUpperCase() + key.slice(1)}
                                                                                </li>
                                                                            ) : null
                                                                        )}
                                                                    {Object.entries(row.preExistingConditions).every(
                                                                        ([key, value]) =>
                                                                            (typeof value === "boolean" && !value) ||
                                                                            (key === "otherText" && !value)
                                                                    ) && (
                                                                            <li className="text-gray-500 italic list-none">No medical history</li>
                                                                        )}
                                                                </ul>
                                                            </div>
                                                        )}

                                                    </div>
                                                ) : col.key === "index" ? (
                                                    indexOfFirstItem + currentItems.indexOf(row) + 1
                                                )
                                                    : col.key === "image" ? (
                                                        <img
                                                            src={row[col.key]}
                                                            alt="OPD Image"
                                                            className="w-12 h-12 object-cover rounded-md mx-auto"
                                                        />
                                                    ) : col.key === "time" ? (
                                                        formatTime(row[col.key])
                                                    ) : col.key === "date" ? (
                                                        formatDate(row[col.key])
                                                    ) : col.key === "symptoms" ? (
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                onClick={() =>
                                                                    setOpenSymptomId(openSymptomId === row._id ? null : row._id)
                                                                }
                                                                className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-4xl hover:bg-blue-700 transition duration-200">
                                                                View
                                                            </button>

                                                            {openSymptomId === row._id && row.symptoms && (
                                                                <div className="origin-top-right absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 p-2 z-20 text-sm">
                                                                    {row.symptoms}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : col.key === "primaryConcern" ? (
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                onClick={() =>
                                                                    setOpenPrimaryConcert(openPrimaryConcern === row._id ? null : row._id)
                                                                }
                                                                className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-4xl hover:bg-blue-700 transition duration-200">
                                                                View
                                                            </button>

                                                            {openPrimaryConcern === row._id && row.primaryConcern && (
                                                                <div className="origin-top-right absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 p-2 z-20 text-sm">
                                                                    {row.primaryConcern}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : col.key === "createdAt" ? (
                                                        <>
                                                            <div>{formatDate(row[col.key])}</div>
                                                            <div className="text-xs text-gray-500">{formatTime(row[col.key])}</div>
                                                        </>
                                                    ) : (
                                                        row[col.key]
                                                    )}

                                            </td>
                                        ))}
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
        </div>
    );
};

export default TodaysQueryPage;
