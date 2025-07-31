"use client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Pagination from "@/components/Pagination";
import { getAllProfessionals, getProfessionalById, deleteProfessionalById } from "@/server/common";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const columns = [
  { key: "index", label: "Sr No." },
  { key: "fullName", label: "Full Name" },
  { key: "emailAddress", label: "Email" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "preferredRole", label: "Role" },
  { key: "actions", label: "Actions" },
];

const ProfessionalsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [professionalToDelete, setProfessionalToDelete] = useState(null);

  // Calculate pagination variables
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = () => {
    setLoading(true);
    getAllProfessionals()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch professionals");
      })
      .finally(() => setLoading(false));
  };

  const handleViewDetails = async (id) => {
    try {
      const professional = await getProfessionalById(id);
      setSelectedProfessional(professional);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch professional details");
    }
  };

  const handleDeleteProfessional = async (id) => {
    setProfessionalToDelete(id);
    setDeleteConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!professionalToDelete) return;
    
    setDeleteLoading(true);
    try {
      await deleteProfessionalById(professionalToDelete);
      toast.success("Professional deleted successfully");
      fetchProfessionals();
      setDeleteConfirmModal(false);
      setProfessionalToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete professional");
    } finally {
      setDeleteLoading(false);
    }
  };

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
          Registered Job seekers/Doctors
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
                    No professionals found.
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
                        ) : col.key === "actions" ? (
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleViewDetails(row._id)}
                              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
                              title="View details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleDeleteProfessional(row._id)}
                              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200"
                              title="Delete professional"
                              disabled={deleteLoading}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        ) : col.key === "preferredRole" && row[col.key] === "Other" && row.otherRole ? (
                          `${row[col.key]}: ${row.otherRole}`
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

      {/* Professional Details Modal */}
      {modalOpen && selectedProfessional && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  Professional Details
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 dark:text-gray-200">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <span className="font-semibold">Full Name:</span>{" "}
                  {selectedProfessional.fullName}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedProfessional.emailAddress}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <span className="font-semibold">Phone Number:</span>{" "}
                  {selectedProfessional.phoneNumber}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <span className="font-semibold">City/State:</span>{" "}
                  {selectedProfessional.cityState}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <span className="font-semibold">Preferred Role:</span>{" "}
                  {selectedProfessional.preferredRole === "Other" && selectedProfessional.otherRole
                    ? `${selectedProfessional.preferredRole}: ${selectedProfessional.otherRole}`
                    : selectedProfessional.preferredRole}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <span className="font-semibold">Current Occupation:</span>{" "}
                  {selectedProfessional.currentOccupation}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <span className="font-semibold">Years of Experience:</span>{" "}
                  {selectedProfessional.yearsOfExperience}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <span className="font-semibold">Preferred Work Mode:</span>{" "}
                  {selectedProfessional.preferredWorkMode}
                </div>
                {selectedProfessional.linkedInOrWebsite && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg col-span-1 md:col-span-2">
                    <span className="font-semibold">LinkedIn/Website:</span>{" "}
                    <a
                      href={selectedProfessional.linkedInOrWebsite.startsWith("http") ? selectedProfessional.linkedInOrWebsite : `https://${selectedProfessional.linkedInOrWebsite}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {selectedProfessional.linkedInOrWebsite}
                    </a>
                  </div>
                )}
                {selectedProfessional.resume && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg col-span-1 md:col-span-2">
                    <span className="font-semibold">Resume:</span>{" "}
                    <a
                      href={selectedProfessional.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  </div>
                )}
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg col-span-1 md:col-span-2">
                  <span className="font-semibold">Reason for Joining:</span>
                  <p className="mt-1">{selectedProfessional.reasonForJoining}</p>
                </div>
                {selectedProfessional.anythingElse && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg col-span-1 md:col-span-2">
                    <span className="font-semibold">Additional Information:</span>
                    <p className="mt-1">{selectedProfessional.anythingElse}</p>
                  </div>
                )}
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg col-span-1 md:col-span-2">
                  <span className="font-semibold">Registration Date:</span>{" "}
                  {formatDate(selectedProfessional.createdAt)} at {formatTime(selectedProfessional.createdAt)}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4 text-red-600 dark:text-red-400">
                <svg 
                  className="w-8 h-8 mr-3" 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <h2 className="text-xl font-semibold">Confirm Deletion</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete this professional? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setDeleteConfirmModal(false);
                    setProfessionalToDelete(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
                  disabled={deleteLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 flex items-center"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <>
                      <ClipLoader color={"#ffffff"} size={16} className="mr-2" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalsTable;
