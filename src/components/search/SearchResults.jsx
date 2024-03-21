
export const SearchResults = ({ result }) => {
 return (
   <div>
     <div className="search-result px-10 py-20"
       onClick={(e) => alert(`You selected ${result}!`)}>{result}
     </div>
   </div>
 );
};
