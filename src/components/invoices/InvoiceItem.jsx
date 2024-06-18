import { Delete, Usd } from "../../assets";
import InvoiceField from "./InvoiceField";

export const InvoiceItem = ({
  id,
  codItem,
  descrp,
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
   console.log(isloading);
  const total = price*qty
  const iva = ((total / 1.16) * 0.16).toFixed(2);
  return (
    <tr>
      <td className="w-1/2">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className:
              "block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
            placeholder: "Codigo item",
            type: "text",
            name: "id",
            id: id,
            value: codItem,
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
            name: "descrp",
            id: id,
            value: descrp,
          }}
        />
      </td>

      <td className="relative min-w-[100px] md:min-w-[150px]">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className:
              "block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
            type: "number",
            min: "1",
            name: "unidades",
            id: id,
            value: qty,
          }}
        />
      </td>
      <td className="relative min-w-[100px] md:min-w-[150px]">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className:
              "block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
            type: "number",
            min: "0.01",
            step: "0.0001",
            name: "precio",
            id: id,
            value: price,
          }}
        />
      </td>
      <td className="relative min-w-[100px] md:min-w-[150px]">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className: `block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 ${
              isloading ? "opacity-50 cursor-not-allowed" : ""
            }`,
            placeholder: "16%",
            type: "number",
            name: "imp",
            id: id,
            value: iva || "",
          }}
        />
      </td>
      <td className="relative min-w-[100px] md:min-w-[150px]">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className:
              "block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
            type: "number",
            min: "0.01",
            step: "0.0001",
            name: "total",
            id: id,
            value: total,
          }}
        />
      </td>

      <td className="flex items-center justify-center">
        <button
          className={`rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600 ${
            isloading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={deleteItemHandler}
    //      disabled={isloading ? true : false}
        >
          <Delete />
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;
