"use client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Pagination from "@/components/Pagination";
import { getRegisteredClinics, editClinic, deleteClinic } from "@/server/common";

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
  { key: "createdAt", label: "Registration Date" },
  { key: "actions", label: "Actions" }
];

const ClinicsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [openServices, setOpenServices] = useState(null);
  const [openInterests, setOpenInterests] = useState(null);
  const [openDescription, setOpenDescription] = useState(null);
  const [editingClinic, setEditingClinic] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingClinicId, setDeletingClinicId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
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

  const handleEditClick = (clinic) => {
    setEditingClinic(clinic);
    setEditFormData({...clinic});
    setShowEditModal(true);
  };

  const handleDeleteClick = (clinicId) => {
    setDeletingClinicId(clinicId);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      setSubmitting(true);
      await editClinic(editingClinic._id, editFormData);
      // Refresh data
      const res = await getRegisteredClinics();
      setData(res);
      setShowEditModal(false);
      setEditingClinic(null);
    } catch (error) {
      console.error('Error updating clinic:', error);
      alert('Error updating clinic');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setSubmitting(true);
      await deleteClinic(deletingClinicId);
      // Refresh data
      const res = await getRegisteredClinics();
      setData(res);
      setShowDeleteModal(false);
      setDeletingClinicId(null);
    } catch (error) {
      console.error('Error deleting clinic:', error);
      alert('Error deleting clinic');
    } finally {
      setSubmitting(false);
    }
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
                        ) : col.key === "actions" ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleEditClick(row)}
                              className="px-3 py-2 text-sm font-medium bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(row._id)}
                              className="px-3 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                            >
                              Delete
                            </button>
                          </div>
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

      {/* Edit Modal */}
      {showEditModal && editingClinic && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-full overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Edit Clinic</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Clinic Name</label>
                <input
                  type="text"
                  value={editFormData.clinicName || ""}
                  onChange={(e) => setEditFormData({...editFormData, clinicName: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                <select
                  value={editFormData.country || ""}
                  onChange={(e) => setEditFormData({...editFormData, country: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Clinic Address</label>
                <textarea
                  value={editFormData.clinicAddress || ""}
                  onChange={(e) => setEditFormData({...editFormData, clinicAddress: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  rows="2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Clinic Phone</label>
                <input
                  type="text"
                  value={editFormData.clinicPhone || ""}
                  onChange={(e) => setEditFormData({...editFormData, clinicPhone: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Clinic Email</label>
                <input
                  type="email"
                  value={editFormData.clinicEmail || ""}
                  onChange={(e) => setEditFormData({...editFormData, clinicEmail: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Name</label>
                <input
                  type="text"
                  value={editFormData.contactName || ""}
                  onChange={(e) => setEditFormData({...editFormData, contactName: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Position</label>
                <input
                  type="text"
                  value={editFormData.contactPosition || ""}
                  onChange={(e) => setEditFormData({...editFormData, contactPosition: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Phone</label>
                <input
                  type="text"
                  value={editFormData.contactPhone || ""}
                  onChange={(e) => setEditFormData({...editFormData, contactPhone: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
                <input
                  type="email"
                  value={editFormData.contactEmail || ""}
                  onChange={(e) => setEditFormData({...editFormData, contactEmail: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Delete Clinic</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this clinic? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={submitting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
              >
                {submitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicsTable;