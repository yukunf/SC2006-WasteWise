import React from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const paginationWindow = 10;
    let startPage = Math.floor((currentPage - 1) / paginationWindow) * paginationWindow + 1;
    let endPage = Math.min(startPage + paginationWindow - 1, totalPages);
  
    // Go to the next page
    const nextPage = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    // Go to the previous page
    const prevPage = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    // Generate page buttons
    const renderPageButtons = () => {
      return [...Array(endPage - startPage + 1).keys()].map((_, index) => {
        const pageNumber = startPage + index;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 rounded-full font-poppins ${
              currentPage === pageNumber ? 'bg-[#016a70] text-white' : 'text-[#016a70]'}`}>
            {pageNumber}
          </button>
        );
      });
    };
  
    return (
      <div className="flex items-center gap-4 justify-center mt-4 overflow-x-auto">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 rounded-full px-4 py-2 font-poppins font-semibold ${
            currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#016a70]'}`}>
          <ArrowLeftIcon className="h-4 w-4" />
          Previous
        </button>
  
        <div className="flex items-center gap-2 font-poppins">{renderPageButtons()}</div>
  
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 rounded-full px-4 py-2 font-poppins font-semibold ${
            currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#016a70]'
          }`}
        >
          Next
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
  );
};


export default Pagination;