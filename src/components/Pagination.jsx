import { useEffect, useState } from "react";
import { Next, Previous } from "../assets";
import divideDataIntoPages from "../helpers/divideDataIntoPages ";

 export const Pagination = ({
  currentPage,
  setCurrentPage,
  pageSize,
  filteredData,
}) => {
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);
 

  const pages = divideDataIntoPages(filteredData, pageSize);
  useEffect(() => {
    setPrevPage(pageNumber > 0);
    setNextPage(pageNumber < pages.length - 1);
  }, []);

  const handlePageChange = (pageNumber) => {
       if (pageNumber >= 0 && pageNumber < pages.length) {
         setCurrentPage(pageNumber);
       }
    // if (pageNumber >= 0) {
    //   setCurrentPage(pageNumber);
    // }
  };
  const TotalInvoice = filteredData ? filteredData.length : 0;
  const pageNumber = Math.ceil(TotalInvoice / pageSize);

  return (
    <div
      className="col-span-2 sm:col-span-3 w-auto "
    >
      <div className="flex items-center justify-between border-t border-gray-200 bg-slate-300 px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <p className="text-sm text-gray-700">
            Pagina
            <span className="font-medium"> {currentPage + 1} </span>
            de
            <span className="font-medium"> {pageNumber} </span>- Facturas
            <span className="font-medium"> {TotalInvoice} </span>
          </p>
        </div>
        <div>
          <nav
            className="inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <span className="sr-only">Previous</span>
              <Previous />
            </a>
            <a
              href="#"
              //     className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              //     nextPage ? "cursor-pointer" : "cursor-not-allowed"
              //   }`}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <span className="sr-only">Next</span>
              <Next />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

