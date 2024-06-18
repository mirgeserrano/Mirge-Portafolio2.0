// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useEffect, useRef, useState } from "react";
// import { Search, Xmark } from "../assets";
// import { useCustomerStore, useInvoiceStore } from "../hooks";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { getEnvVariable, getToken } from "../helpers";
// const { VITE_SANIT_API_URL } = getEnvVariable();

// export default function SearchModal({ modalOpen, setModalOpen }) {
//   const { getCustomes } = useCustomerStore();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filteredData, setFilteredData] = useState(null); // Inicializa como null
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const numero =5;

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setSelectedCustomer(null); // Resetea la selección al cambiar el término de búsqueda
//   };

//   useEffect(() => {
//     getCustomes()
//       .then((data) => {
//         setResults(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       // Si el término de búsqueda está vacío, no mostrar resultados
//       setFilteredData(null);
//       return;
//     }

//     const escapedSearchTerm = searchTerm
//       .trim()
//       .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     const regex = new RegExp(escapedSearchTerm, "i");
//     const filteredInvoices = results.filter(({ codclie, descrip }) => {
//       const codservLower = codclie ? codclie.toLowerCase() : "";
//       const descripLower = descrip ? descrip.toLowerCase() : "";

//       return regex.test(codservLower) || regex.test(descripLower);
//     });
//    // setFilteredData(filteredInvoices);
//        setFilteredData(filteredInvoices.slice(0, numero));
//   }, [results, searchTerm]);

//   const handleSelectCustomer = (customer) => {
//     setSelectedCustomer(customer);
//     setSearchTerm(customer.descrip);
//     console.log(customer); 
//     setModalOpen(false);// Mostrar descripción en input al seleccionar
//   };

//   const cancelButtonRef = useRef(null);

//   function closeModal() {
//     setModalOpen(false);
//   }

//   return (
//     <Transition.Root show={modalOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed inset-0 z-30 overflow-y-auto"
//         onClose={closeModal}
//         initialFocus={cancelButtonRef}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <div className="flex items-center justify-center min-h-full ">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             enterTo="opacity-100 translate-y-0 sm:scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//           >
//             <Dialog.Panel className="relative w-full h-3/6 max-w-md px-4 py-6 bg-slate-300 rounded-lg shadow-xl">
//               <div className="flex items-center justify-between mb-4">
//                 <button
//                   ref={cancelButtonRef}
//                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
//                   onClick={closeModal}
//                 >
//                   <Xmark />
//                   <span className="sr-only">Close modal</span>
//                 </button>
//               </div>
              
//               <div>
//                 <input
//                   type="search"
//                   className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   placeholder="Buscar cliente por Cedula..."
//                   required
//                 />

//                 {loading && <p>Cargando...</p>}
//                 {!loading && filteredData === null && searchTerm && (
//                   <div>No encontramos el término</div>
//                 )}
               
//                 <ul>
//                   {filteredData &&
//                     filteredData.map((customer, index) => (
//                       <li
//                       className=" p-2"
//                         key={index}
//                         onClick={() => handleSelectCustomer(customer)}
//                       >
//                         {customer.codclie} - {customer.descrip}
//                       </li>
//                     ))}
//                 </ul>
//               </div>

//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Xmark } from "../assets";
import { useCustomerStore } from "../hooks";

export default function SearchModal({ modalOpen, setModalOpen }) {
  const { getCustomes } = useCustomerStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const numero = 5;

  useEffect(() => {
    setLoading(true);
    getCustomes()
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      setFilteredData([]);
      return;
    }

    const escapedSearchTerm = searchTerm.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedSearchTerm, "i");
    const filteredInvoices = results.filter(({ codclie, descrip }) => {
      const codservLower = codclie ? codclie.toLowerCase() : "";
      const descripLower = descrip ? descrip.toLowerCase() : "";

      return regex.test(codservLower) || regex.test(descripLower);
    });

    setFilteredData(filteredInvoices.slice(0, 10));
  }, [results, searchTerm]);

  const handleSelectCustomer = (selectedOption) => {
    const customer = selectedOption ? selectedOption.value : null;
    setSelectedCustomer(customer);
    setSearchTerm(customer ? customer.descrip : "");
    setModalOpen(false);

    console.log(customer);
  
  };

  const handleInputChange = (value) => {
    setSearchTerm(value);
  };

  const cancelButtonRef = useRef(null);

  function closeModal() {
    setModalOpen(false);
  }

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
            <Dialog.Panel className="relative w-full h-3/6 max-w-md px-4 py-6 bg-slate-300 rounded-lg shadow-xl">
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
                <Select
                  value={selectedCustomer ? { value: selectedCustomer, label: `${selectedCustomer.codclie} - ${selectedCustomer.descrip}` } : null}
                  onChange={handleSelectCustomer}
                  onInputChange={handleInputChange}
                  options={filteredData.map((customer) => ({
                    value: customer,
                    label: `${customer.codclie} - ${customer.descrip}`,
                  }))}
                  isLoading={loading}
                  placeholder="Buscar cliente por Cedula..."
                  noOptionsMessage={() => (searchTerm ? "No encontramos el término" : "Ingresa un término de búsqueda")}
                />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
