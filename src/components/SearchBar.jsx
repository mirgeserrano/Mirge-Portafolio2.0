import { Search } from "../assets";

export const SearchBar = ({ filterFunction }) => {
  const handleSearchTermChange = (event) => {
    const searchTerm = event.target.value;
    filterFunction(searchTerm);
  };

  return (
    <div className="flex relative items-center">
      <div className="absolute right-2 top-2">
        <Search />
      </div>
      <input
        className="flex-grow bg-gray-300 border border-transparent rounded-lg py-2 px-4  text-gray-700 leading-tight focus:outline-none"
        type="text"
        onChange={handleSearchTermChange}
        placeholder="Buscar..."
      />
    </div>
  );
};
