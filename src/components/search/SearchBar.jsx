//import { searchProducts } from "../../hooks/useProductStore";

import { useDispatch } from "react-redux";
import { useState } from "react";

//import { Search } from "../assets";

export const SearchBar = ({ setResults }) => {
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
      {/* <form class="flex items-center max-w-sm mx-auto">
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search branch name..."
            required
          />
        </div>
        <button
          type="submit"
          class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Search />
          <span class="sr-only">Search</span>
        </button>
      </form> */}

      <div className="flex items-center  h-8 w-1/2 border border-gray-700 rounded  py-2 rounded-lgborder focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <input
          type="text"
          className=" h-4 border border-transparent rounded focus:border-transparent focus:outline-none focus:ring-0"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar cliente"
        />
      </div>
    </div>
  );
};
