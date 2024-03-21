import { Delete, Usd } from "../../assets";
import InvoiceField from "./InvoiceField";

export const InvoiceItem = ({
  id,
  coditem,
  descrip1,
  qty,
  price,
  onDeleteItem,
  onEdtiItem,
}) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };
  return (
    <tr>
      <td className="min-w-[65px] md:min-w-[80px]">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: "text",
            min: "1",
            name: "codigo",
            id: coditem,
            value: coditem,
          }}
        />
      </td>
      <td className="w-full">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            placeholder: "Item name",
            type: "text",
            name: "name",
            id: descrip1,
            value: descrip1,
          }}
        />
      </td>
      <td className="min-w-[65px] md:min-w-[80px]">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: "number",
            min: "1",
            name: "qty",
            id: qty,
            value: qty,
          }}
        />
      </td>
      <td className="relative min-w-[100px] md:min-w-[150px]">
        <Usd />
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className: "text-right",
            type: "number",
            min: "0.01",
            step: "0.0001",
            name: "price",
            id: price,
            value: price,
          }}
        />
      </td>

      <td className="flex items-center justify-center">
        <button
          className={`rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600 ${
            price ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={deleteItemHandler}
          disabled={price ? true : false}
        >
          <Delete />
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;
