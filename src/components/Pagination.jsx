import { useEffect, useState } from "react";
import { Next, Previous } from "../assets";
import { divideDataIntoPages } from "../helpers";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  pageSize,
  filteredData,
}) => {
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  const pages = divideDataIntoPages(filteredData, pageSize);
  const totalPages = pages.length;
  const totalInvoice = filteredData ? filteredData.length : 0;

  useEffect(() => {
    setPrevPage(currentPage > 0);
    setNextPage(currentPage < totalPages - 1);
  }, [currentPage, totalPages]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Define el rango de números de página a mostrar
  const maxButtons = 10;
  let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
  let endPage = Math.min(startPage + maxButtons - 1, totalPages - 2);

  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(endPage - maxButtons + 1, 1);
  }
  const startInvoiceIndex = currentPage * pageSize + 1;
  const endInvoiceIndex = Math.min(startInvoiceIndex + pageSize - 1, totalInvoice);


  return (
    <div className="col-span-2 sm:col-span-3 w-auto bg-[#CDEBFC] rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-between border-t  px-4 py-3 sm:px-6">
        <div className="hidden p-2 sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <p className="text-sm text-gray-700">
            Mostrando
            <span className="font-medium"> {startInvoiceIndex } </span> al 
            <span className="font-medium"> {endInvoiceIndex} </span> de un total de 
            <span className="font-medium"> {totalInvoice} </span>
          </p>
        </div>
        <div>
          <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!prevPage}
            >
              <span className="sr-only">Previous</span>
              <Previous />
            </button>
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <button
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === 0
                      ? 'text-blue-600 bg-blue-50 border-gray-300 hover:bg-blue-100 hover:text-blue-700'
                      : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                  } dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  onClick={() => handlePageChange(0)}
                >
                  1
                </button>
              </li>
              {startPage > 1 && <li  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === totalPages - 1
                      ? 'text-blue-600 bg-blue-50 border-gray-300 hover:bg-blue-100 hover:text-blue-700'
                      : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                  } dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>...</li>}
              {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
                const pageIndex = startPage + index;
                return (
                  <li key={pageIndex}>
                    <button
                      className={`flex items-center justify-center px-3 h-8  ${
                        currentPage === pageIndex
                          ? 'text-blue-600 bg-blue-50 border-gray-300 hover:bg-blue-100 hover:text-blue-700'
                          : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                      } dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      onClick={() => handlePageChange(pageIndex)}
                    >
                      {pageIndex + 1}
                    </button>
                  </li>
                );
              })}
              {endPage < totalPages - 2 && <li  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === totalPages - 1
                      ? 'text-blue-600 bg-blue-50 border-gray-300 hover:bg-blue-100 hover:text-blue-700'
                      : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                  } dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>...</li>}
              <li>
                <button
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === totalPages - 1
                      ? 'text-blue-600 bg-blue-50 border-gray-300 hover:bg-blue-100 hover:text-blue-700'
                      : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                  } dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  onClick={() => handlePageChange(totalPages - 1)}
                >
                  {totalPages}
                </button>
              </li>
            </ul>
            <button
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!nextPage}
            >
              <span className="sr-only">Next</span>
              <Next />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
