import { Pagination, SearchBar, SideBar, Table } from "../components";
import { useEffect, useState } from "react";
import { UseServicesStore } from "../hooks/UseServicesStore";
import divideDataIntoPages from "../helpers/divideDataIntoPages ";

export const Services = () => {
  const servicesStore = UseServicesStore([]);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState(services);
  const pageSize = 10;

  useEffect(() => {
    servicesStore
      .getAccountsReceivable()
      .then((data) => {
        setServices(data);
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
    const filteredInvoices = services.filter(({ codserv, descrip }) => {
      const codservLower = codserv ? codserv.toLowerCase() : "";
      const descripLower = descrip ? descrip.toLowerCase() : "";

      return regex.test(codservLower) || regex.test(descripLower);
    });
    setFilteredData(filteredInvoices);
  }, [services, searchTerm]);

  const pages = divideDataIntoPages(filteredData, pageSize);
  const newCurrentPageData = pages[currentPage] || [];

  const invoiceFields = [
    { name: "codserv", label: "Codigo de Servicio" },
    { name: "descrip", label: "Nombre" },
    { name: "precio1", label: "Bolivares" },
    { name: "precioi1", label: "Otra moneda" },
  ];

  const codeMappings = {
    cod: "codserv",
  };

  const tableName = "servicio";

  return (
    <div className="grid grid-cols-4 h-full bg-gray-200">
      <SideBar />
      <div className="col-span-3 p-5">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Servicios</h1>
          <div className="flex items-center">
            <SearchBar filterFunction={setSearchTerm} />
          </div>
        </div>

        <Table
          data={newCurrentPageData}
          fields={invoiceFields}
          codeMappings={codeMappings}
          tableName={tableName}
        />

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          filteredData={filteredData}
          pageSize={pageSize}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};
