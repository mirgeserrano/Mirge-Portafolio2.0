import { divideDataIntoPages } from "../helpers";
import { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";
import { Pagination } from "./Pagination";
import { Link } from "react-router-dom";
import { InvoicesTrue, Loading } from "../assets";
import { SearchBar } from "./SearchBar";
import Navbar from "./Navbar";
import useApiFibre from "../hooks/useApiFibre";

export const Invoice = () => {
  const { loading, error, processInvoices } = useApiFibre();
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState(invoices);
  const pageSize = 10;

  useEffect(() => {
    processInvoices()
      .then((data) => {
        setInvoices(data);
        //    setFilteredData(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(invoices);
    } else {
      const filteredInvoices = invoices
        .filter(({ id, clientDetails }) => {
          const idStr = (id || "").toString().toLowerCase();
          const cedulaStr = (clientDetails?.cedula || "")
            .toString()
            .toLowerCase();
          const nombreStr = (clientDetails?.nombre || "")
            .toString()
            .toLowerCase();

          return (
            idStr.includes(searchTerm.toLowerCase()) ||
            cedulaStr.includes(searchTerm.toLowerCase()) ||
            nombreStr.includes(searchTerm.toLowerCase())
          );
        })
        .slice(0, 10);
      setFilteredData(filteredInvoices);
    }
  }, [invoices, searchTerm]);

  const pages = divideDataIntoPages(filteredData, pageSize);
  const currentPageData = pages[currentPage] || [];
  console.log(currentPageData);

  if (error)
    return (
      <p>
        Error: Se ha producido un error al cargar las facturas. Por favor,
        inténtalo de nuevo más tarde.
      </p>
    );

  return (
    <>
      <Navbar />
      <div className="lg:grid lg:grid-cols-4 md:grid-cols-4  xs:grid-cols-4  h-screen  pt-16">
        <div className="col-span-1 p-2 ">
          <SideBar />
        </div>
        <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 p-6 bg-white">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold">Facturas</h1>
            <SearchBar filterFunction={setSearchTerm} />
            <Link to={`/invoice/invoiceForm`}>
              <button
                className="px-2 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="button"
              >
                Insertar Factura
              </button>
            </Link>
          </div>

          <div className="flex place-content-between items-center rounded-lg bg-[#8FD3F7] p-2 ">
            <div className="font-semibold text-gray-700">
              <div className="py-2">#</div>
            </div>
            <div className="font-semibold text-gray-700 sm">
              <div className="py-2">Factura</div>
            </div>
            <div className="font-semibold text-gray-700">
              <div className="py-2">Cedula</div>
            </div>
            <div className="font-semibold text-gray-700">
              <div className="py-2">Nombre</div>
            </div>
            <div className="font-semibold text-gray-700">
              <div className="py-2">Estatus</div>
            </div>
            <div className="font-semibold text-gray-700">
              <div className="py-2">Fecha de vencimiento</div>
            </div>
            <div className="font-semibold text-gray-700">
              <div className="py-2">Acciones</div>
            </div>
          </div>

          {loading ? (
            <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 p-6">
              <div className="flex items-center justify-center w-full h-[760px] border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div role="status">
                  <Loading />
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {currentPageData &&
                currentPageData.map((invoice, index) => (
                  <div className="grid grid-cols-7 gap-4" key={invoice.id}>
                    <div className="text-gray-700">
                      <div className="py-2">{index + 1}</div>
                    </div>
                    <div className="text-gray-500">
                      <div className="py-2">{invoice.id}</div>
                    </div>
                    <div className="text-gray-500">
                      <div className="py-2">
                        {invoice.clientDetails?.cedula || "Cargando..."}
                      </div>
                    </div>
                    <div className="text-gray-500">
                      <div className="py-2">
                        {invoice.clientDetails?.nombre || "Cargando..."}
                      </div>
                    </div>
                    <div className="text-gray-500">
                      <div className="py-2">{invoice.estado}</div>
                    </div>
                    <div className="text-gray-500">
                      <div className="py-2">{invoice.vencimiento}</div>
                    </div>
                    <div className="flex items-center">
                      <Link
                        to={`/invoice/invoiceForm/${invoice.id}/${invoice.idcliente}`}
                      >
                        <button className="rounded-md bg-green-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-green-600">
                          <InvoicesTrue />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              {!loading && filteredData.length === 0 && (
                <div className="text-gray-700">No se encontraron facturas.</div>
              )}
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                filteredData={filteredData}
                pageSize={pageSize}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
