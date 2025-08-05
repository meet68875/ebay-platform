import React from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPagesToShow = () => {
    const pages = [];
    const maxPages = 5;

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(maxPages / 2));
      const end = Math.min(totalPages, start + maxPages - 1);

      if (start > 1) {
        pages.push(1, "...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        pages.push("...", totalPages);
      }
    }

    return pages;
  };

  const pages = getPagesToShow();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <GrFormPrevious size={24} />
      </button>

      <div className="flex items-center space-x-1">
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 border rounded-full text-sm font-semibold transition-colors duration-200 ${
                currentPage === page
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <GrFormNext size={24} />
      </button>
    </div>
  );
}

export default Pagination;