"use client";
import React, { useEffect, useState } from "react";
import { getAllPreviousOPDCamps } from "@/server/common";
import { ClipLoader } from "react-spinners";
import Pagination from "@/components/Pagination";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import apiClient from "@/server/axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const columns = [
  { key: "image", label: "" },
  { key: "index", label: "Sr No." },
  { key: "title", label: "Title" },
  { key: "location", label: "Location" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "action", label: "Action" }
];

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-GB');

const formatTime = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${period}`;
};

const PreviousOPDsPage = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(7); 
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes, Delete',
          onClick: async () => {
            try {
              const res = await apiClient.delete(`/opds/opdcamps/${id}`);
              toast.success("OPD deleted");
              console.log("Deletion response: ", res);
              setData((prev) => prev.filter((opd) => opd._id !== id));
            } catch (error) {
              toast.error("Error in deleting OPD");
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });

  }

  useEffect(() => {
    setLoading(true);
    getAllPreviousOPDCamps()
      .then((res) => {
        console.log("Previous OPDs data: ", res);
        
        setData(res);
        // setTotalPages(res.total ? Math.ceil(res.total / limit) : 1);
      })
      .catch((err) => {
        setData([]);
        setTotalPages(1);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [pageNo]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-700 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8">
          Previous OPDs
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
              ) :  currentItems.length <= 0 ? (
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
                        {col.key === "index" ? (
                          indexOfFirstItem + currentItems.indexOf(row) + 1
                        )                        
                        :col.key === "image" ? (
                          <img 
                            src={row[col.key]} 
                            alt="OPD Image"
                            className="w-12 h-12 object-cover rounded-md mx-auto"
                          />
                        ) : col.key === "time" ? (
                          formatTime(row[col.key])                        ) : col.key === "date" ? (
                          formatDate(row[col.key])
                        ) : col.key === "action" ? (
                          <button
                            onClick={() => handleDelete(row._id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <MdDelete size={20} />
                          </button>
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

export default PreviousOPDsPage;
