// import InvoiceItem from "./InvoiceItem";
// import InvoiceModal from "./InvoiceModal";
// import incrementString from "../../helpers/incrementString";
// import useAuthStore from "../../hooks/useAuthStore";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { v4 as uuid } from "uuid";
// import { useInvoiceStore } from "../../hooks/useInvoiceStore";
// import { useCustomerStore } from "../../hooks/useCustomerStore";
// import convertirFecha from "../../helpers/convertirFecha";
// import Stepper from "../Stepper";
// import Navbar from "../Navbar";
// import { Search } from "../../assets";
// import SearchModal from "../SearchModal";

// const date = new Date();

// const today = date.toLocaleDateString("es-ES", {
//   month: "numeric",
//   day: "numeric",
//   year: "numeric",
// });

// const fechaA = convertirFecha(date);

// const InvoiceForm2 = () => {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const numerod = params.id;
//   obtengo el usuario
//   const { user } = useAuthStore();
//   obtengo los item de la facturas
//   const { getInvoce, invoicePost } = useInvoiceStore();
//   obtener el cliente
//   const { getCustomer } = useCustomerStore();

//   const [invoiceData, setInvoiceData] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [discount, setDiscount] = useState("");
//   const [tax, setTax] = useState("");
//   const [invoiceNumber, setInvoiceNumber] = useState(numerod | 1);
//   const [codVend, setCodVend] = useState(user.user);
//   const [nameVend, setNameVend] = useState(user.firstname);
//   const [codCustomer, setCodCustomer] = useState("");
//   const [addresCustomer, setAddresCustomer] = useState("");
//   const [customerName, setCustomerName] = useState("");
//   const [customerTlf, setCustomerTlf] = useState("");
//   const [customerEmail, setCustomerEmail] = useState("");
//   const [customerType, setCustomerType] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(false);
//       try {
//         const [invoiceResponse, customerResponse] = await Promise.all([
//           dispatch(getInvoce(params)),
//           dispatch(getCustomer(params)),
//         ]);

//         Procesar respuesta de la factura
//         const invoiceData = invoiceResponse.map(
//           ({
//             id,
//             codubic,
//             coditem,
//             descrip1,
//             precio,
//             totalitem,
//             cantidad,
//             mtotax,
//             mtotaxo,
//             signo,
//                  contado,
//             credito,
//             costo,
//             descto,
//             esserv,
//             factor,
//           }) => ({
//             id,

//             codUbic: codubic,
//             codItem: coditem,
//             codVend,
//             descrip1,
//             priceO: precio,
//             precio: totalitem,
//             cantidad,
//                     contado,
//             credito,
//             mtoTax: mtotax,
//             fechaE: fechaA,
//             CodUsua: codVend,
//             TotalItem: precio,
//             Signo: signo,
//             Costo: costo,
//             Descto: descto,
//             EsServ: esserv,
//             Factor: factor,
//             mtoTaxo: mtotaxo,
//           })
//         );
//         console.log(invoiceData.data[0].id);
//         console.log(invoiceData);
//         setItems(invoiceData);

//         Procesar respuesta del cliente
//         const customerData = customerResponse[0];
//         setCodCustomer(customerData.codclie || "");
//         setAddresCustomer(customerData.direc1 || "");
//         setCustomerName(customerData.descrip || "");
//         setCustomerTlf(customerData.telef || "");
//         setCustomerEmail(customerData.email || "");
//         setCustomerType(customerData.tipocli || "");
//         setInvoiceNumber(customerData.numerouv || "");
//         setLoading(true);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [dispatch, params]);

//   useEffect(() => {
//     getInvoce(params)
//        .then((data) => {
//         console.log(data);
//         //dispatch(getInvoce(params)),

//        })
//        .catch((error) => {
//          console.log(error);
//        });
//   }, []);

//   const [items, setItems] = useState([
//     {
//       id: uuid(),
//       codItem: "",
//       descrip1: "",
//       cantidad: "",
//       precio: "",
//     },
//   ]);

//   const reviewInvoiceHandler = async (event) => {
//     event.preventDefault();

//     const invoiceData = [
//       {
//         invoice: {
//           codClie: codCustomer,
//           codVend: codVend,
//           codUbic: "DP01",
//           descrip: customerName,
//           direc1: addresCustomer,
//           direc2: "Maracaibo, Venezuela",
//           mtoTotal: total,
//           tgravable: 100,
//           texento: 0,
//           monto: 100,
//           mtoTax: taxRate,
//           credito: 116.0,
//           tipoCli: customerType,
//           fechaE: fechaA,
//           fechaV: fechaA,
//           Id3: "V01",
//           ordenC: "01",
//           telef: customerTlf,
//           tipoFac: "A",
//         },
//         items,
//         payments: [
//           {
//             monto: total,
//             codTarj: "-EFE-",
//             fechae: fechaA,
//             descrip: "efectivo",
//           },
//         ],

//       },
//     ];

//     try {
//       await dispatch(invoicePost(invoiceData));
//       setIsOpen(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addNextInvoiceHandler = () => {
//     setInvoiceNumber((prevNumber) => incrementString(prevNumber));
//     setItems([
//       {
//         id: uuid(6),
//         coditem: "00",
//         name: "",
//         qty: 1,
//         price: "1.00",
//       },
//     ]);
//   };

//   const addItemHandler = () => {
//     setItems((prevItem) => [
//       ...prevItem,
//       {
//         id: uuid(),
//         codItem: "",
//         descrip1: "",
//         cantidad: "",
//         precio: "",
//       },
//     ]);
//   };

//   Borrar item
//   const deleteItemHandler = (id) => {
//     console.log(id);
//     setItems((prevItem) => prevItem.filter((item) => item.id !== id));
//   };

//   const edtiItemHandler = (event) => {
//     const editedItemId = event.target.id;
//     const editedItemField = event.target.name;
//     const editedItemValue = event.target.value;

//     const updatedItems = items.map((item) => {
//       if (item.id === editedItemId) {
//         return {
//           ...item,
//           [editedItemField]: editedItemValue,
//         };
//       }
//       return item;
//     });
//     setItems(updatedItems);
//   };

//   const subtotal = items.reduce((prev, curr) => {
//     if (curr.descrip1 && curr.descrip1.trim().length > 0)
//       return prev + Number(curr.precio * Math.floor(curr.cantidad));
//     else return prev;
//   }, 0);

//   const handleInputChange = (e) => {
//     const changeItemValue = e.target.value;
//     console.log(changeItemValue);
//   };
//   const taxRate = (tax * subtotal) / 100;
//   const discountRate = (discount * subtotal) / 100;
//   const total = subtotal - discountRate + taxRate;

//      const [modalOpen, setModalOpen] = useState(false);

//      Esta función se ejecuta cuando se hace clic en el botón de búsqueda
//      const handleOpenModal = () => {
//        Cambiamos el estado 'modalOpen' a true para abrir el modal
//        setModalOpen(true);
//      };
//   return (
//     <>
//       <div className="flex flex-col  ">
//         <Navbar />

//         <form
//           className="flex flex-wrap place-content-between p-2 md:flex-row  pt-20 "
//           onSubmit={reviewInvoiceHandler}
//         >
//           <div
//             className="grow rounded-lg w-3/4 m-4" >
//             <Stepper />
//             <div className="h-8 m-2">
//               <h6 className="text-green-600 text-2xl">Nueva Factura</h6>
//             </div>
//             <div className="flex flex-col justify-between space-y-2 h-8 m-2 border-gray-900/10 md:flex-row md:items-center md:space-y-0">
//               <div className="flex space-x-2">
//                 <span className="font-bold">Fecha Actual:</span>
//                 <span>{today}</span>
//               </div>
//               <div className="flex items-center space-x-2 m-2 ">
//                 <label className="font-bold" htmlFor="invoiceNumber">
//                   FACTURA:
//                 </label>
//                 <input
//                   required
//                   className="max-w-[130px] bg-[#F8F9FD] text-red-600 font-bold border border-transparent rounded-lg h-8 "
//                   type="text"
//                   name="invoiceNumber"
//                   id="invoiceNumber"
//                   min="1"
//                   step="1"
//                   value={invoiceNumber}
//                   onChange={(event) => setInvoiceNumber(event.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex space-x-2 border-b border-gray-900/10 h-8 m-2">
//               <p className="font-bold ">Vendedor:</p>
//               <h2>{codVend}</h2> <span>{nameVend}</span>
//               <p>{user.lastname}</p>
//             </div>
//             <div>
//               <div className="grid grid-cols-2 gap-2 p-2">
//                 <div className="relative w-full  ">
//                   <input
//                     type=""
//                     name="codCustomer"
//                     id="codCustomer"
//                     className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//                     placeholder="Cedula"
//                     required
//                     value={codCustomer}
//                     onChange={(event) => setCodCustomer(event.target.value)}
//                     onBlur={handleInputChange}
//                   />
//                   <button
//                     type="submit"
//                     className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#BFE1D5] rounded-e-lg border border-[#BFE1D5]  hover:bg-[#74c7aa]  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   >
//                     <Search />
//                     <span className="sr-only">Search</span>
//                   </button>
//                 </div>

//                 <div className="relative w-full col-start-2 row-start-1">
//                   <input
//                     type="search"
//                     name="customerName"
//                     id="customerName"
//                     className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//                     placeholder="Cliente"
//                     required
//                     value={customerName}
//                     onChange={(event) => setCustomerName(event.target.value)}
//                   />

//                 </div>

//                 <SearchModal
//                   modalOpen={modalOpen}
//                   setModalOpen={setModalOpen}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-2 p-2">
//                 <input
//                   required
//                   className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//                   placeholder="Tipo de precio "
//                   type="text"
//                   name="customerType"
//                   id="customerType"
//                   value={customerType}
//                   onChange={(event) => setCustomerType(event.target.value)}
//                 />

//                 <input
//                   required
//                   className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//                   placeholder="Telefono"
//                   type="tel"
//                   name="customerTlf"
//                   id="customerTlf"
//                   value={customerTlf}
//                   onChange={(event) => setCustomerTlf(event.target.value)}
//                 />
//               </div>

//               <div className=" flex flex-col gap-4 p-2">
//                 <input
//                   required
//                   className="block w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//                   placeholder="Direccion"
//                   type="text"
//                   name="addresCustomer"
//                   id="addresCustomer"
//                   value={addresCustomer}
//                   onChange={(event) => setAddresCustomer(event.target.value)}
//                 />

//                 <input
//                   required
//                   className="block w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//                   placeholder="Correo "
//                   type="email"
//                   name="customerEmail"
//                   id="customerEmail"
//                   value={customerEmail}
//                   onChange={(event) => setCustomerEmail(event.target.value)}
//                 />
//               </div>
//             </div>

//             <button
//               className={`rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600 ${
//                 loading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               type="button"
//               onClick={addItemHandler}
//               disabled={loading}
//             >
//               Agregar Producto
//             </button>
//           </div>
// {/*
//           <InvoiceModal
//             isOpen={isOpen}
//             setIsOpen={setIsOpen}
//             invoiceInfo={{
//               infomacion del vendedor
//               invoiceNumber,
//               codVend,
//               nameVend,
//               informacion del cliente
//               codCustomer,
//               addresCustomer,
//               customerName,
//               customerTlf,
//               customerEmail,
//               customerType,

//               operaciones logicas
//               subtotal,
//               taxRate,
//               discountRate,
//               total,
//             }}
//             items={items}
//             onAddNextInvoice={user ? null : addNextInvoiceHandler}
//           /> */}
//           <div
//             className="flex-1 space-y-2  w-1/2"
//             className="mt-4 my-6 space-y-2 rounded-lg bg-white p-4 shadow-sm"
//             className=" grow rounded-lg bg-gray-200 p-3 border-1 border-gray-300my-4 "
//           >
//             <div className="space-y-2 ">
//               <label className="text-sm font-bold md:text-base" htmlFor="tax">
//                 Porcentaje de iva
//               </label>
//               <div className="flex items-center">
//                 <input
//                   disabled={loading}
//                   className="flex-1 bg-whiter border border-transparent rounded-lg "
//                   type="number"
//                   name="tax"
//                   id="tax"
//                   min="0.01"
//                   step="0.01"
//                   placeholder="0.0"
//                   value={tax}
//                   onChange={(event) => setTax(event.target.value)}
//                 />
//                 <span className="rounded-lg bg-gray-300 py-2 px-4 text-gray-800  shadow-sm">
//                   %
//                 </span>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <label
//                 className="text-sm font-bold md:text-base"
//                 htmlFor="discount"
//               >
//                 Descuento
//               </label>
//               <div className="flex items-center">
//                 <input
//                   disabled={loading}
//                   className="flex-1 bg-white border border-transparent rounded-lg"
//                   type="number"
//                   name="discount"
//                   id="discount"
//                   min="0"
//                   step="0.01"
//                   placeholder="0.0"
//                   value={discount}
//                   onChange={(event) => setDiscount(event.target.value)}
//                 />
//                 <span className="rounded-lg bg-gray-300 py-2 px-4 text-gray-800 shadow-sm">
//                   %
//                 </span>
//               </div>

//               <div className="flex w-full justify-between md:w-1/2">
//                 <span className="font-bold">Subtotal:</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex w-full justify-between md:w-1/2">
//                 <span className="font-bold">Descuento:</span>
//                 <span>
//                   ({discount || "0"}%)${discountRate.toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex w-full justify-between md:w-1/2">
//                 <span className="font-bold">Iva:</span>
//                 <span>
//                   ({tax || "0"}%)${taxRate.toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
//                 <span className="font-bold">Total:</span>
//                 <span className="font-bold">
//                   ${total % 1 === 0 ? total : total.toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <button
//                   className="flex flex-col items-center w-32 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
//                   type="submit"
//                 >
//                   Procesar Factura
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default InvoiceForm2;


// import React, { useState } from "react";
// import axios from "axios";
// import { getEnvVariable, getToken } from "../../helpers";

// const SearchForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     identificationNumber: "",
//   });
//   const [searchResults, setSearchResults] = useState([]);
//   const { VITE_SANIT_API_URL } = getEnvVariable();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const codclie = formData.identificationNumber;
//     console.log(formData.identificationNumber);
//     try {
//       let config = {
//         method: "get",
//         maxBodyLength: Infinity,
//         url: `${VITE_SANIT_API_URL}adm/customers/?CodClie=${codclie}`,
//         headers: {
//           Pragma: getToken(),
//         },
//       };
//       console.log(config);
//       const response = await axios.request(config);
//       console.log(response.data);
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error al realizar la búsqueda:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Buscar Persona por Cédula</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="firstName"
//           placeholder="Nombre"
//           value={formData.firstName}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Apellido"
//           value={formData.lastName}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="phoneNumber"
//           placeholder="Número de teléfono"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="identificationNumber"
//           placeholder="Cédula"
//           value={formData.identificationNumber}
//           onChange={handleChange}
//         />
//         <button type="submit">Buscar</button>
//       </form>

//       <div>
//         <h3>Resultados de la Búsqueda:</h3>
//         <ul>
//           {searchResults.map((result) => (
//             <li key={result.id}>
//               {result.name} - {result.id}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

//export default SearchForm;
 import axios from "axios";
import { getEnvVariable, getToken } from "../../helpers";

import React, { useEffect, useState } from 'react';
const { VITE_SANIT_API_URL } = getEnvVariable();
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Simulación de una función de búsqueda que se realiza automáticamente
//   const performSearch = async (searchTerm) => {
//     console.log('Realizando búsqueda:', searchTerm);
    
//     try {
//       let config = {
//         method: "get",
//         maxBodyLength: Infinity,
//         url: `${VITE_SANIT_API_URL}adm/customers/?CodClie=${searchTerm}`,
//         headers: {
//           Pragma: getToken(),
//         },
//       };
//       console.log(config);
//       const response = await axios.request(config);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error al realizar la búsqueda:", error);
//  }
//     // Aquí podrías realizar la búsqueda en tu backend o en algún otro origen de datos
//   };

  // Esta función se ejecutará cada vez que el valor de searchTerm cambie
  // Realizará la búsqueda automáticamente en función del término de búsqueda actual
  useEffect(() => {
    performSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar..."
      />
    </div>
  );
};

export default SearchBar;

