import {
  Content,
  Navbar,
  Pagination,
  SearchBar,
  SideBar,
  Table,
} from "../components";
import { useEffect, useState } from "react";
import { useServicesStore } from "../hooks/useServicesStore";
import divideDataIntoPages from "../helpers/divideDataIntoPages ";
import ExchangeRate from "../components/ExchangeRate";

const Services = () => {
  const servicesStore = useServicesStore([]);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const pageSize = 8;

  useEffect(() => {
    servicesStore
      .getServices()
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 
 console.log(searchTerm);
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

  console.log(filteredData);
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
    <>
      <Navbar />
      <div className="lg:grid lg:grid-cols-4 md:grid-cols-4  xs:grid-cols-4 h-full  ">
        <div className="col-span-1 p-2 ">
          <SideBar />
        </div>
        <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 p-16">
          <div className="flex justify-between sm:p-8">
            <h1 className="flex text-2xl font-bold">Servicios</h1>
            <div className="flex ">
              <SearchBar filterFunction={setSearchTerm} />
            </div>
            <div className="flex ">
              <ExchangeRate />
            </div>
          </div>

          {Object.keys(services).length === 0 || services.length === 0 ? (
            <Content name={tableName} />
          ) : (
            <div >
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
          )}
        </div>
      </div>
    </>
  );
};
 export default Services