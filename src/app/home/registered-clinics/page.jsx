"use client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Pagination from "@/components/Pagination";
import { getRegisteredClinics } from "@/server/common";

const columns = [
  { key: "index", label: "Sr No." },
  { key: "clinicName", label: "Clinic Name" },
  { key: "clinicAddress", label: "Address" },
  { key: "country", label: "Country" },
  { key: "clinicPhone", label: "Phone" },
  { key: "clinicEmail", label: "Email" },
  { key: "clinicWebsite", label: "Website" },
  { key: "contactName", label: "Contact Person" },
  { key: "contactPosition", label: "Position" },
  { key: "contactPhone", label: "Contact Phone" },
  { key: "contactEmail", label: "Contact Email" },
  { key: "services", label: "Services" },
  { key: "interests", label: "Interests" },
  { key: "clinicDescription", label: "Description" },
  { key: "brochureFile", label: "Brochure" },
  { key: "createdAt", label: "Registration Date" }
];

const ClinicsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [openServices, setOpenServices] = useState(null);
  const [openInterests, setOpenInterests] = useState(null);
  const [openDescription, setOpenDescription] = useState(null);
  const [openClinicAddress, setOpenClinicAddress] = useState(null);

  // Calculate pagination variables
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setOpenServices(null);
        setOpenInterests(null);
        setOpenDescription(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    getRegisteredClinics()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString('en-GB');
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <div className="min-h-full dark:bg-gray-700 p-6">
      <div className="max-w-full mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8">
          Registered Clinics
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
                    No clinics found.
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
                        {col.key === "index" ? (
                          indexOfFirstItem + currentItems.indexOf(row) + 1
                        ) : col.key === "services" ? (
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => setOpenServices(openServices === row._id ? null : row._id)}
                              className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition duration-200"
                            >
                              View
                            </button>
                            {openServices === row._id && row.services && (
                              <div className="absolute z-10 mt-2 w-60 origin-top-right right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-4 text-left text-sm">
                                <ul className="list-disc pl-4 space-y-1">
                                  {Object.entries(row.services)
                                    .filter(([key, value]) => {
                                      if (typeof value === "boolean") return value;
                                      return value && key === "otherText";
                                    })
                                    .map(([key, value], idx) => (
                                      <li key={idx}>
                                        {key === "otherText"
                                          ? value
                                          : key.charAt(0).toUpperCase() + key.slice(1)}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : col.key === "interests" ? (
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => setOpenInterests(openInterests === row._id ? null : row._id)}
                              className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition duration-200"
                            >
                              View
                            </button>
                            {openInterests === row._id && row.interests && (
                              <div className="absolute z-10 mt-2 w-60 origin-top-right right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-4 text-left text-sm">
                                <ul className="list-disc pl-4 space-y-1">
                                  {Object.entries(row.interests)
                                    .filter(([key, value]) => {
                                      if (typeof value === "boolean") return value;
                                      return value && key === "otherText";
                                    })
                                    .map(([key, value], idx) => (
                                      <li key={idx}>
                                        {key === "otherText"
                                          ? value
                                          : key.charAt(0).toUpperCase() + key.slice(1)}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : col.key === "clinicAddress" ? (
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => setOpenClinicAddress(openClinicAddress === row._id ? null : row._id)}
                              className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition duration-200"
                            >
                              View
                            </button>
                            {openClinicAddress === row._id && row.clinicAddress && (
                              <div className="absolute z-10 mt-2 w-72 origin-top-right right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-4 text-left text-sm">
                                {row.clinicAddress}
                              </div>
                            )}
                          </div>
                        ) :col.key === "clinicDescription" ? (
                          <div className="relative inline-block text-left">
                            <button
                              onClick={() => setOpenDescription(openDescription === row._id ? null : row._id)}
                              className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition duration-200"
                            >
                              View
                            </button>
                            {openDescription === row._id && row.clinicDescription && (
                              <div className="absolute z-10 mt-2 w-72 origin-top-right right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-4 text-left text-sm">
                                {row.clinicDescription}
                              </div>
                            )}
                          </div>
                        ) : col.key === "brochureFile" ? (
                          row.brochureFile ? (
                            <img
                              src={row.brochureFile}
                              alt="Clinic Brochure"
                              className="w-12 h-12 object-cover rounded-md mx-auto cursor-pointer"
                              onClick={() => window.open(row.brochureFile, "_blank")}
                            />
                          ) : (
                            <span className="text-gray-400">No brochure</span>
                          )
                        ) : col.key === "createdAt" ? (
                          <>
                            <div>{formatDate(row[col.key])}</div>
                            <div className="text-xs text-gray-500">
                              {formatTime(row[col.key])}
                            </div>
                          </>
                        ) : col.key === "clinicWebsite" && row[col.key] ? (
                          <a
                            href={row[col.key].startsWith("http") ? row[col.key] : `https://${row[col.key]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {row[col.key]}
                          </a>
                        ) : (
                          row[col.key] || <span className="text-gray-400">-</span>
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

export default ClinicsTable;