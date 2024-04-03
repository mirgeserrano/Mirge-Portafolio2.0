import { addProduct, editProduct } from "../redux/features/productSlice";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Plus, Xmark } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";


export default function Modal() {
  const [product, setProduct] = useState({
    id: "",
    codprod: "",
    descrip: "",
    existen: "",
    precio1: "",
  });
  const products = useSelector((state) => state.product);
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(true);


  //captura los valores
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    param.id
      ? dispatch(editProduct(product))
      : dispatch(
          addProduct({
            id: uuid(),
            ...product,
          })
        );
    navigate("/product");
  };

  useEffect(() => {
    if (param.id) {
      setProduct(products.find((product) => product.id === param.id));
    }
  }, [param.id, products]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Nuevo Producto
                  </h3>
                  <Link to={"/Product"}>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="crud-modal"
                    >
                      <Xmark />
                      <span className="sr-only">Close modal</span>
                    </button>
                  </Link>
                </div>

                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Codigo
                      </label>
                      <input
                        type="text"
                        name="codinst"
                        id="codinst"
                        onChange={handleChange}
                        value={product.codinst}
                        className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Descripcion
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name=""
                        id="name"
                        value={product.descrip}
                        className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type product name"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Existencia
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="descrip"
                        id="price"
                        value={product.existen}
                        className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder=""
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Precio
                      </label>
                      <input
                        onChange={handleChange}
                        type="number"
                        name="precio1"
                        id="price"
                        value={product.precio1}
                        className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="$2999"
                        required=""
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <Plus />
                    Agregar nuevo producto
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
