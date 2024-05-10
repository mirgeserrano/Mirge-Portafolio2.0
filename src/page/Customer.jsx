import { useEffect, useState } from "react";
import { Content, Navbar, Pagination, SearchBar, SideBar, Table } from "../components";
import { useCustomerStore } from "../hooks";
import divideDataIntoPages from "../helpers/divideDataIntoPages ";


const Customer = () => {
    const { getCustomes } = useCustomerStore();
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState(services);
    const pageSize = 10;

    
  useEffect(() => {
    getCustomes()
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(services);

  useEffect(() => {
    const escapedSearchTerm = searchTerm
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedSearchTerm, "i");
    const filteredInvoices = services.filter(({ codclie, document }) => {
      const codclieLower = codclie ? codclie.toLowerCase() : "";
      const documentLower = document ? document.toLowerCase() : "";

      return regex.test(codclieLower) || regex.test(documentLower);
    });
    setFilteredData(filteredInvoices);
  }, [services, searchTerm]);

  const pages = divideDataIntoPages(filteredData, pageSize);
  const newCurrentPageData = pages[currentPage] || [];

  const invoiceFields = [
    { name: "codclie", label: "Cedula" },
    { name: "descrip", label: "Nombres" },
    { name: "email", label: "Correo" },
  ];

  const codeMappings = {
    cod: "id",
  };

  const tableName = "cliente";

  return (
    <>
      <Navbar />
      <div className="lg:grid lg:grid-cols-4 md:grid-cols-4  xs:grid-cols-4  h-screen  pt-16">
        <div className="col-span-1 p-2 ">
          <SideBar />
        </div>
        <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 p-6">
          <div className="flex justify-between sm:p-8">
            <h1 className="text-2xl font-bold">Cliente</h1>
            <div className="flex items-center">
              <SearchBar filterFunction={setSearchTerm} />
            </div>
          </div>

          {Object.keys(services).length === 0 || services.length === 0 ? (
            <Content name={tableName} />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Customer