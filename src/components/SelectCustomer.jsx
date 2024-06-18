import { useEffect, useState } from "react";
import Select from "react-select";
import { Xmark } from "../assets";
import { useCustomerStore } from "../hooks";
import { convertirNumero } from "../helpers/roundToTwoDecimalPlaces"; // Asegúrate de importar correctamente esta función si es necesaria

const SelectCustomer = ({ modalOpen, setModalOpen, initialValue }) => {
  const { getCustomes } = useCustomerStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(initialValue); // Inicializar con el valor predeterminado
  const numero = 5;

  useEffect(() => {
    setLoading(true);
    getCustomes()
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      setFilteredData([]);
      return;
    }

    const escapedSearchTerm = searchTerm.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedSearchTerm, "i");
    const filteredInvoices = results.filter(({ codclie, descrip }) => {
      const codservLower = codclie ? codclie.toLowerCase() : "";
      const descripLower = descrip ? descrip.toLowerCase() : "";

      return regex.test(codservLower) || regex.test(descripLower);
    });

    setFilteredData(filteredInvoices.slice(0, numero));
  }, [results, searchTerm]);

  const handleSelectCustomer = (selectedOption) => {
    const customer = selectedOption ? selectedOption.value : null;
    setSelectedCustomer(customer);
    setSearchTerm(customer ? customer.descrip : "");
    setModalOpen(false);
    console.log(customer);
  };

  const handleInputChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <Select
        classNamePrefix="react-select"
        className="border-2 border-cyan-100"
        value={selectedCustomer ? { value: selectedCustomer, label: `${selectedCustomer.codclie} - ${selectedCustomer.descrip}` } : null}
        onChange={handleSelectCustomer}
        onInputChange={handleInputChange}
        options={filteredData.map((customer) => ({
          value: customer,
          label: `${customer.codclie} - ${customer.descrip}`,
        }))}
        isLoading={loading}
        placeholder="Buscar cliente por Cedula..."
        noOptionsMessage={() => (searchTerm ? "No encontramos el término" : "Ingresa un término de búsqueda")}
      />
    </div>
  );
};

export default SelectCustomer;
