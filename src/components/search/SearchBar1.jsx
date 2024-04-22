//import { searchProducts } from "../../hooks/useProductStore";

import { useDispatch } from "react-redux";
import { useState } from "react";

//import { Search } from "../assets";

export const buscador = ({ setResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const data = setSearchTerm(event.target.value);
    console.log(data);
    ///  dispatch(searchProducts(data|''));
  };
  console.log(searchTerm);

  return (
    <div>

      <div className="flex items-center  h-8 w-1/2 border border-gray-700 rounded  py-2 rounded-lgborder focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <input
          type="text"
          className=" h-4 border border-transparent rounded focus:border-transparent focus:outline-none focus:ring-0"
          value={searchTerm}
       //   onChange={handleInputChange}
          placeholder="Buscar cliente"
        />
      </div>
    </div>
  );
};
