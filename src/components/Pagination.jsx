const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <nav>
        <ul className="flex space-x-2">
          <li>
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-blue-600 text-white font-semibold disabled:opacity-50"
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded font-semibold border transition-colors duration-150 ${
                  currentPage === number
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white dark:bg-gray-800 text-blue-700 border-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => paginate(Math.min(pageNumbers.length, currentPage + 1))}
              disabled={currentPage === pageNumbers.length}
              className="px-3 py-1 rounded bg-blue-600 text-white font-semibold disabled:opacity-50"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
