import { Delete, Edit, Search } from "../assets";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { deleteProdut } from "../redux/features/productSlice";
import { useDispatch } from "react-redux";
import { useProductStore } from "../hooks/useProductStore";

const Product = () => {
  const dispatch = useDispatch(deleteProdut);
  const productStore = useProductStore();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleDelete = (id) => {
    dispatch(deleteProdut(id));
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.codprod.includes(searchTerm)
  );

  return (
    <>
      <div className="grid grid-cols-4 h-screen bg-gray-100">
        <div className="col-span-1 bg-white p-4">
          <SideBar />
        </div>
        <div className="col-span-3 p-6">
          <div className="flex  justify-between mb-4">
            <h1 className="text-2xl font-bold">Productos</h1>
            <div className="flex items-center"> 
            <Search />
            <input
              type="text"
              className="rounded-lg w-48 py-2 px-4  text-gray-700 leading-tight focus:outline-none"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Buscar producto"
            />
           
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
          <div className="flex items-center mb-4"></div>
          <div className="grid grid-cols-6 gap-4">
            <div className="font-semibold text-gray-700">
              <div className="py-2">#</div>
            </div>
            <div className="font-semibold text-gray-700">
              <div className="py-2">Código</div>
            </div>
            <div className="font-semibold text-gray-700">
              <div className="py-2">Descripción</div>
            </div>
            <div className="font-semibold text-gray-700">
              <div className="py-2">Cant</div>
            </div>
            <div className="font-semibold text-gray-700">
              <div className="py-2">Precio</div>
            </div>
            <div className="font-semibold text-gray-700">
              <div className="py-2">Acciones</div>
            </div>
          </div>

          {filteredProducts.map((product, index) => (
            <div className="grid grid-cols-6 gap-4" key={product.id}>
              <div className="text-gray-700">
                <div className="py-2">{index + 1}</div>
              </div>
              <div className="text-gray-500">
                <div className="py-2">{product.codprod}</div>
              </div>
              <div className="text-gray-500">
                <div className="py-2">{product.descrip}</div>
              </div>
              <div className="text-gray-500">
                <div className="py-2">{product.existen}</div>
              </div>
              <div className="text-gray-500">
                <div className="py-2">{product.precio1}</div>
              </div>
              <div className="flex items-center">
                <Link to={`/modal-edit/${product.id}`}>
                  <button className="rounded-md bg-gray-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-gray-600">
                    <Edit />
                  </button>
                </Link>
                <button
                  className="rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600"
                  onClick={() => handleDelete(product.id)}
                >
                  <Delete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;