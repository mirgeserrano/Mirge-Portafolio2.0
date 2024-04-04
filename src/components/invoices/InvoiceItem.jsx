import { Delete, Usd } from "../../assets";
import InvoiceField from "./InvoiceField";

export const InvoiceItem = ({
  id,
  coditem,
  descrip1,
  qty,
  price,
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
            className: `bg-gray-200 border border-transparent rounded-lg `,
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
            className: "bg-gray-200 border border-transparent rounded-lg",
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
              "text-right bg-gray-200 border border-transparent rounded-lg",
            type: "number",
            min: "1",
            name: "cantidad",
            id: id,
            value: qty,
          }}
        />
      </td>
      <td className="relative min-w-[100px] md:min-w-[150px]">
        <Usd />
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className:
              "text-right bg-gray-200 border border-transparent rounded-lg",
            type: "number",
            min: "0.01",
            step: "0.0001",
            name: "precio",
            id: id,
            value: price,
          }}
        />
      </td>

      <td className="flex items-center justify-center">
        <button
          className={`rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600 ${
            isloading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={deleteItemHandler}
          disabled={isloading ?true: false}
        >
          <Delete />
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;
