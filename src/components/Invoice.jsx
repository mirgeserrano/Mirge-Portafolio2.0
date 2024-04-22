import divideDataIntoPages from "../helpers/divideDataIntoPages ";
import { useInvoiceStore } from "../hooks/useInvoiceStore";
import { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";
import { Pagination } from "./Pagination";
import { Link } from "react-router-dom";
import { InvoicesTrue,Search } from "../assets";
import { SearchBar } from "./SearchBar";
import Navbar from "./Navbar";

//import Pagination from "./Pagination";

export const Invoice = () => {
  const invoiceStore = useInvoiceStore([]);
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState(invoices);
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

  useEffect(() => {
    const filteredInvoices = invoices.filter(
      ({ numerod, codclie, descrip }) =>
        numerod.toLowerCase().includes(searchTerm) ||
        codclie.toLowerCase().includes(searchTerm) ||
        descrip.toLowerCase().includes(searchTerm)
    );
    console.log(filteredInvoices);
    setFilteredData(filteredInvoices);
  }, [invoices, searchTerm]);

  const pages = divideDataIntoPages(filteredData, pageSize);
  const currentPageData = pages[currentPage] || [];
console.log(currentPageData);
  return (
    <>
      <Navbar/>
      <div className="lg:grid grid-cols-4 xs:grid-cols-4 h-full bg-gray-200 pt-16">
        <div className="col-span-1 p-2 ">
          <SideBar />
        </div>
        <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 p-6">
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
          <div className="grid grid-cols-6 gap-4">
            <div className="font-semibold text-gray-700">
              <div className="py-2">#</div>
            </div>
            <div className="font-semibold text-gray-700 sm">
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
                  <Link
                    to={`/invoice/invoiceForm/${invoice.numerod}/${invoice.codclie}`}
                  >
                    <button className="rounded-md bg-green-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-green-600">
                      <InvoicesTrue />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            filteredData={filteredData}
            pageSize={pageSize}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </>
  );
};
