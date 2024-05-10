import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Search, Xmark } from "../assets";
import { useCustomerStore } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import divideDataIntoPages from "../helpers/divideDataIntoPages ";
import { set } from "react-hook-form";

export default function SearchModal({ modalOpen, setModalOpen }) {
  const { getCustomes } = useCustomerStore();
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const pageSize = 8;
    
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("hola");
  //   dispatch(getCustomes());
    
  // }, [dispatch, getCustomes]);

  function closeModal() {
    setModalOpen(false);
  }

//const customers = useSelector((state) => state.customer);
//setServices(customers);
   useEffect(() => {
      const escapedSearchTerm = searchTerm
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedSearchTerm, "i");
      const filteredInvoices = services.filter(({ codclie, descrip }) => {
        const codservLower = codclie ? codclie.toLowerCase() : "";
        const descripLower = descrip ? descrip.toLowerCase() : "";

        return regex.test(codservLower) || regex.test(descripLower);
      });
      setFilteredData(filteredInvoices);
    }, [services, searchTerm]);

    console.log(filteredData);
    const pages = divideDataIntoPages(filteredData, pageSize);
    const newCurrentPageData = pages[currentPage] || [];

    const invoiceFields = [
      { name: "codclie", label: "Cedula" },
      { name: "descrip", label: "Nombre" },
    ];

    const codeMappings = {
      cod: "codserv",
    };

    const tableName = "servicio";

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={closeModal}
        initialFocus={cancelButtonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="flex items-center justify-center min-h-full">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative w-full max-w-md px-4 py-6 bg-white rounded-lg shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <button
                  ref={cancelButtonRef}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                  onClick={closeModal}
                >
                  <Xmark />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div>
                <input
                  type="search"
                  name="customerName"
                  id="customerName"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Cliente"
                  required
                  //  value={customerName}
                  //onChange={(event) => setCustomerName(event.target.value)}
                />
               
                <Table
                  data={newCurrentPageData}
                  fields={invoiceFields}
                  codeMappings={codeMappings}
                  tableName={tableName}
                />
              </div>
              {/* Aquí puedes agregar el contenido del modal */}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
