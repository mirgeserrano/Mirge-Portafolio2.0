import { Delete, InvoicesTrue } from "../assets";
import { Link } from "react-router-dom";

export const Table = ({ data, fields }) => {
    const numColumns = fields.length;
  return (
    <>
      <div className={`grid grid-cols-${numColumns} gap-4`}>
        {fields.map((field, index) => (
          <div className="font-semibold text-gray-700" key={index}>
            <div className="py-2">{field.label}</div>
          </div>
        ))}
      </div>

      {data &&
        data.map((table, index) => (
          <div className={`grid grid-cols-${numColumns} gap-4`} key={table.id}>
            {fields.map((field, index) => (
              <div key={index} className="text-gray-700">
                {table[field.name]}
              </div>
            ))}
            <div>
              <Link to={"/"}>
                <button
                  key={index}
                  className="rounded-md bg-green-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-green-600"
                >
                  <InvoicesTrue />
                </button>
              </Link>
              <button
                className="rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600"
                //    onClick={() => handleDelete(data.id)}
              >
                <Delete />
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
