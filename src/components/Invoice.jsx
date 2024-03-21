import {  InvoicesTrue, Next, Previous, Search } from "../assets";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import divideDataIntoPages from "../helpers/divideDataIntoPages ";
import { useInvoiceStore } from "../hooks/useInvoiceStore";
import InvoiceForm from "./invoices/InvoiceForm";


export const Invoice = () => {
  const invoiceStore = useInvoiceStore([]);
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    invoiceStore
      .invoicesGet()
      .then((data) => {
        console.log(data);
        setInvoices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredInvoices = invoices.filter(
    ({ numerod, codclie, descrip }) =>
      numerod.toLowerCase().includes(searchTerm) ||
      codclie.toLowerCase().includes(searchTerm) ||
      descrip.toLowerCase().includes(searchTerm)
  );

  const pages = divideDataIntoPages(filteredInvoices, pageSize);
  const currentPageData = pages[currentPage] || [];
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPrevPage(pageNumber > 0);
    setNextPage(pageNumber < pages.length - 1);
  };

  const TotalInvoice = filteredInvoices ? filteredInvoices.length : 0;
  const length = currentPageData ? currentPageData.length : 0;

  return (
    <div className="grid grid-cols-4 h-screen bg-gray-100">
      <div className="col-span-1 bg-white p-4">
        <SideBar />
      </div>
      <div className="col-span-3 p-6">
        <div className="flex  justify-between mb-4">
          <h1 className="text-2xl font-bold">Facturas</h1>
          <div className="flex items-center">
            <Search />
            <input
              type="text"
              className="rounded-lg w-48 py-2 px-4  text-gray-700 leading-tight focus:outline-none"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Buscar factura"
            />
          </div>
          <Link to={`/modal-post`}>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button"
            >
              Insertar Factura
            </button>
          </Link>
        </div>
        <div className="flex items-center mb-4"></div>
        <div className="grid grid-cols-6 gap-4">
          <div className="font-semibold text-gray-700">
            <div className="py-2">#</div>
          </div>
          <div className="font-semibold text-gray-700">
            <div className="py-2">Número de Factura</div>
          </div>
          <div className="font-semibold text-gray-700">
            <div className="py-2">Cliente</div>
          </div>
          <div className="font-semibold text-gray-700">
            <div className="py-2">Nombre</div>
          </div>
          <div className="font-semibold text-gray-700">
            <div className="py-2">Fecha de vencimiento</div>
          </div>
          <div className="font-semibold text-gray-700">
            <div className="py-2">Acciones</div>
          </div>
        </div>
      
        {currentPageData &&
          currentPageData.map((invoice, index) => (
            <div className="grid grid-cols-6 gap-4" key={invoice.id}>
              <div className="text-gray-700">
                <div className="py-2">{index + 1}</div>
              </div>
              <div className="text-gray-500">
                <div className="py-2">{invoice.numerod}</div>
              </div>
              <div className="text-gray-500">
                <div className="py-2">{invoice.codclie}</div>
              </div>
              <div className="text-gray-500">
                <div className="py-2">{invoice.descrip}</div>
              </div>
              <div className="text-gray-500">
                <div className="py-2">{invoice.fechav}</div>
              </div>

              <div className="flex items-center">
                <Link to={`/invoice/invoiceForm/${invoice.numerod}/${invoice.codclie}`}>
                  <button className="rounded-md bg-green-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-green-600">
                    <InvoicesTrue />
                  </button>
                </Link>
              </div>
            </div>
          ))}

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Pagina
                <span className="font-medium"> {currentPage + 1} </span>a
                <span className="font-medium"> {length} </span>
                de
                <span className="font-medium"> {TotalInvoice} </span>
                Facturas
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
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
      </div>
    </div>
  );
};
