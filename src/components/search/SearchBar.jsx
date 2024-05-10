import axios from "axios";
import { getEnvVariable, getToken } from "../../helpers";
import { useEffect, useState } from "react";
import { useCustomerStore, useInvoiceStore } from "../../hooks";
const { VITE_SANIT_API_URL } = getEnvVariable();

const SearchBar = () => {
  const { getCustomes } = useCustomerStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCustomer(null); // Resetea la selección al cambiar el término de búsqueda
  };

  useEffect(() => {
    getCustomes()
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const escapedSearchTerm = searchTerm
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedSearchTerm, "i");
    const filteredInvoices = results.filter(({ codclie, descrip }) => {
      const codservLower = codclie ? codclie.toLowerCase() : "";
      const descripLower = descrip ? descrip.toLowerCase() : "";

      return regex.test(codservLower) || regex.test(descripLower);
    });
    setFilteredData(filteredInvoices);
  }, [results, searchTerm]);

  console.log(filteredData);

  // useEffect(() => {
  //   if (searchTerm) {
  //     const timeoutId = setTimeout(() => {
  //       performSearch(searchTerm);
  //     }, 500); // Debounce para reducir llamadas innecesarias
  //     return () => clearTimeout(timeoutId);
  //   } else {
  //     setResults([]);
  //   }
  // }, [searchTerm]);

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setSearchTerm(customer.descrip); // Mostrar descripción en input al seleccionar
    //   setResults([]);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar cliente por código..."
      />
      {loading && <p>Cargando...</p>}
      {!loading && filteredData.length === 0 && searchTerm && (
        <div>No encontramos el término</div>
      )}
      {selectedCustomer && (
        <div>
          <strong>Cliente seleccionado:</strong> {selectedCustomer.codclie}-
          {selectedCustomer.descrip}
        </div>
      )}
      <ul>
        {filteredData.map((customer, index) => (
          <li key={index} onClick={() => handleSelectCustomer(customer)}>
            {customer.codclie} - {customer.descrip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
