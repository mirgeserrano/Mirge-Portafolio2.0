import { deleteProdut } from "../redux/features/productSlice";
import { Link } from "react-router-dom";
import { Content, Navbar, Pagination, SearchBar, Table } from "../components";
import { SideBar } from "../components/SideBar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useProductStore } from "../hooks/useProductStore";
import {divideDataIntoPages} from "../helpers";

const Product = () => {
  const dispatch = useDispatch(deleteProdut);
  const productStore = useProductStore();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(products);
  const pageSize = 10;

  useEffect(() => {
    productStore
      .getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const invoiceFields = [
    { name: "codserv", label: "Código" },
    { name: "descrip", label: "Descripción" },
    { name: "precio1", label: "Cantidad" },
    { name: "precioi1", label: "Precio" },
    { name: "precioi1", label: "Precio" },
  ];
  const pages = divideDataIntoPages(filteredData, pageSize);
  const newCurrentPageData = pages[currentPage] || [];
const tableName = "servicio";

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4 h-screen bg-gray-100">
        <div className="col-span-1 p-4">
          <SideBar />
        </div>
        <div className="col-span-3 pt-20 p-6">
          <div className="flex  justify-between mb-4">
            <h1 className="text-2xl font-bold">Productos</h1>
            <div className="flex items-center">
              <SearchBar filterFunction={setSearchTerm} />
            </div>
            <Link to={`/modal-post`}>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="button"
              >
                Insertar Producto
              </button>
            </Link>
          </div>

          {Object.keys(products).length === 0 || products.length === 0 ? (
            <Content name={tableName} />
          ) : (
            <>
              <Table data={newCurrentPageData} fields={invoiceFields} />
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
};

export default Product;