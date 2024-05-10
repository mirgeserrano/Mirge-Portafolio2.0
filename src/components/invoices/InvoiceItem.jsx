import { useEffect, useState } from "react";
import { Delete, Usd } from "../../assets";
import { useServicesStore } from "../../hooks";
import InvoiceField from "./InvoiceField";

export const InvoiceItem = ({
  id,
  coditem,
  descrip1,
  qty,
  price,
  mtotax,
  isloading,
  onDeleteItem,
  onEdtiItem,
}) => {

const deleteItemHandler = () => {

   onDeleteItem(id);
 };
  return (
    <tr>
      <td className="w-1/4">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className:
              "block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
            placeholder: "Codigo item",
            type: "text",
            name: "codItem",
            id: id,
            value: coditem,
          }}
        />
      </td>
      <td className="w-1/2">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className:
              "block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
            placeholder: "Descripcion",
            type: "text",
            name: "descrip1",
            id: id,
            value: descrip1,
          }}
        />
      </td>

      <td className="min-w-[65px] md:min-w-[80px]">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className:
              "block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
            type: "number",
            min: "1",
            name: "cantidad",
            id: id,
            value: qty,
          }}
        />
      </td>
      <td className="relative min-w-[100px] md:min-w-[150px]">
        {/* <Usd /> */}
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className:
              "block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",

            // className: "text-right bg-gray-200 border border-transparent rounded-lg",

            type: "number",
            min: "0.01",
            step: "0.0001",
            name: "precio",
            id: id,
            value: price,
          }}
        />
      </td>
      <td className="w-1/2">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className:
              "block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
            placeholder: "16%",
            type: "text",
            name: "mtotax",
            id: id,
            value:mtotax,
          }}
        />
      </td>

      <td className="flex items-center justify-center">
        <button
          className={`rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600 ${
            isloading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={deleteItemHandler}
          disabled={isloading ? true : false}
        >
          <Delete />
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;


// import { useEffect, useState } from "react";
// import { Delete, Usd } from "../../assets";
// import { useServicesStore } from "../../hooks";
// import InvoiceField from "./InvoiceField";

// export const InvoiceItem = ({
//   id,
//   coditem,
//   descrip1,
//   qty,
//   price,
//   isloading,
//   onDeleteItem,
//   onEdtiItem,
// }) => {
//   const servicesStore = useServicesStore([]);
//   const [services, setServices] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(coditem || descrip1);
//   const [filteredData, setFilteredData] = useState([]);
  
//   console.log(searchTerm);
//  useEffect(() => {
//    servicesStore
//      .getServices()
//      .then((data) => {
//        setServices(data);
//      })
//      .catch((error) => {
//        console.log(error);
//      });
//  }, []);

//   const handleSearchTermChange = (event) => {
//     const term=event.target.value;
//     console.log(term);
//     setSearchTerm(event.target.value);

//   };

 
// useEffect(() => {
//   // Filtrar los servicios basados en el término de búsqueda
//    const escapedSearchTerm = searchTerm
//       .trim()
//       .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     const regex = new RegExp(escapedSearchTerm, "i");
//     const filteredInvoices = services.filter(({ codserv, descrip }) => {
//       const codservLower = codserv ? codserv.toLowerCase() : "";
//       const descripLower = descrip ? descrip.toLowerCase() : "";

//       return regex.test(codservLower) || regex.test(descripLower);
//     });
//     console.log(escapedSearchTerm);
//     setFilteredData(filteredInvoices);
 
// }, [services, searchTerm]);
 
// console.log(filteredData);

 
// useEffect(() => {
//  // console.log(filteredData);
// }, [filteredData]);

//   const deleteItemHandler = () => {
//     onDeleteItem(id);
//   };

//   return (
//     <tr>
//       <td className="w-1/4">
//         <InvoiceField
//           onEditItem={(event) => onEdtiItem(event)}
//           cellData={{
//             className: `bg-gray-200 border border-transparent rounded-lg `,
//             placeholder: "Codigo item",
//             type: "text",
//             name: "codItem",
//             id: id,
//             value: coditem,
//           }}
//           onChange={handleSearchTermChange}
//         />
//       </td>
//        <td className="w-1/2">
//       <InvoiceField
//           onEditItem={(event) => onEdtiItem(event)}
//           cellData={{
//             className: "bg-gray-200 border border-transparent rounded-lg",
//             placeholder: "Descripcion",
//             type: "text",
//             name: "descrip1",
//             id: id,
//             value: descrip1,
//           }}
//         />
//       </td>
//       <td className="min-w-[65px] md:min-w-[80px]">
//         <InvoiceField
//           onEditItem={(event) => onEdtiItem(event)}
//           cellData={{
//             className:
//               "text-right bg-gray-200 border border-transparent rounded-lg",
//             type: "number",
//             min: "1",
//             name: "cantidad",
//             id: id,
//             value: qty,
//           }}
//         />
//       </td>
//       <td className="relative min-w-[100px] md:min-w-[150px]">
//         <Usd />
//         <InvoiceField
//           onEditItem={(event) => onEdtiItem(event)}
//           cellData={{
//             className:
//               "text-right bg-gray-200 border border-transparent rounded-lg",
//             type: "number",
//             min: "0.01",
//             step: "0.0001",
//             name: "precio",
//             id: id,
//             value: price,
//           }}
//         />
//       </td>

//       <td className="flex items-center justify-center">
//         <button
//           className={`rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600 ${
//             isloading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={deleteItemHandler}
//           disabled={isloading ? true : false}
//         >
//           <Delete />
//         </button>
//       </td>

//       {/* Resto del código del componente */}
//     </tr>
//   );
// };

// export default InvoiceItem;
