import { SearchBar, SearchResultList } from "./";

import { useState } from "react";

export const Search = () => {
    const [results, setResults] = useState([]);
  return (
    <div className="App bg-gray-200 w-screen h-screen">
      <div className="search-bar-container pt-20 w-40 mx-auto flex flex-col items-center min-w-200">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && (
          <SearchResultList results={results} />
        )}
      </div>
    </div>
  );
};
