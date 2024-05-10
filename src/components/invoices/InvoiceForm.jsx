import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import useAuthStore from "../../hooks/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useInvoiceStore } from "../../hooks/useInvoiceStore";
import { useCustomerStore } from "../../hooks/useCustomerStore";
import convertirFecha from "../../helpers/convertirFecha";
import Stepper from "../Stepper";
import Navbar from "../Navbar";
import { Search } from "../../assets";
import SearchModal from "../SearchModal";
import ExchangeRate from "../ExchangeRate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import {
  formatDateString,
  formatearFechaTheFactory,

} from "../../helpers";
import ApiTheFatory from "../../api/ApiThefatory";
import exchargeRateBCV from "../../helpers/exchargeRateBCV";

const date = new Date();

const today = date.toLocaleDateString("es-ES", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const fechaA = convertirFecha(date);

const InvoiceForm = () => {
  const { Emision } = ApiTheFatory();
  const { getCustomer } = useCustomerStore();
  const { getInvoce, invoicePost } = useInvoiceStore();
  const { user } = useAuthStore();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const params = useParams();
  const numerod = params.id;
  const [selection, setSelection] = useState("");
  const [adjustedTotal, setAdjustedTotal] = useState(0);
  const [dolar, setDolar] = useState(null);
  const [esexento, setesExento] = useState(null);
  const [invoiceData, setInvoiceData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(numerod | 1);
  const [codVend, setCodVend] = useState(user.user);
  const [nameVend, setNameVend] = useState(user.firstname);
  const [codCustomer, setCodCustomer] = useState("");
  const [addresCustomer, setAddresCustomer] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerTlf, setCustomerTlf] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [items, setItems] = useState([
    {
      id: uuid(),
      codItem: "jdhd",
      descrip1: "gh",
      cantidad: "1",
      precio: "1",
      mtoTax: "1",
    },
  ]);

  //*--------fecha del Modal ------------------------------
  const [selectedDate, setSelectedDate] = useState(null);
  const handleChange = (date) => {
    setSelectedDate(date);
  };
  const fechaB = formatDateString(selectedDate);
  //*--------fecha------------------------------

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      try {
        const [invoiceResponse, customerResponse] = await Promise.all([
          dispatch(getInvoce(params)),
          dispatch(getCustomer(params)),
        ]);

        // Procesar respuesta de la factura
        const invoiceData = invoiceResponse.map(
          ({
            id,
            codubic,
            coditem,
            descrip1,
            precio,
            totalitem,
            cantidad,
            mtotax,
            mtotaxo,
            signo,
            //      contado,
            credito,
            costo,
            descto,
            esserv,
            factor,
            esexento,
          }) => ({
            id,
            codUbic: codubic,
            codItem: coditem,
            codVend,
            descrip1,
            priceO: precio,
            precio: totalitem,
            cantidad,
            //         contado,
            credito,
            mtoTax: mtotax,
            fechaE: fechaA,
            CodUsua: codVend,
            TotalItem: precio,
            Signo: signo,
            Costo: costo,
            Descto: descto,
            EsServ: esserv,
            Factor: factor,
            mtoTaxo: mtotaxo,
            esexento,
          })
        );
        setItems(invoiceData);
        // Procesar respuesta del cliente
        const customerData = customerResponse[0];
        setCodCustomer(customerData.codclie || "");
        setAddresCustomer(customerData.direc1 || "");
        setCustomerName(customerData.descrip || "");
        setCustomerTlf(customerData.telef || "");
        setCustomerEmail(customerData.email || "");
        setCustomerType(customerData.tipocli || "");
        setInvoiceNumber(customerData.numerouv || "");
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, params]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await exchargeRateBCV();
        const dolar = resp.monitors.usd.price;
        // Actualiza el estado con el valor del dólar
        setDolar(dolar);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Ejecuta una vez al montar el componente

  const addItemHandler = () => {
    setItems((prevItem) => [
      ...prevItem,
      {
        id: "",
        codItem: "",
        descrip1: "",
        cantidad: "",
        precio: "",
        mtotax: "",
      },
    ]);
  };

  //Borrar item
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItemId = event.target.id;
    const editedItemField = event.target.name;
    const editedItemValue = event.target.value;

    const updatedItems = items.map((item) => {
      if (item.id === editedItemId) {
        return {
          ...item,
          [editedItemField]: editedItemValue,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  //*Procedimientos para facturar en bolivares
  let subtotalExento = 0;

  // Utilizamos reduce para sumar los precios de los items según tengan o no IVA
  subtotalExento = items.reduce((prev, curr) => {
    // Si el item tiene IVA (esexento === 0), sumamos su precio al subtotal
    // De lo contrario, no sumamos nada (se mantiene el subtotal igual)
    if (curr.esexento === 1) {
      return prev + Number(curr.precio);
    } else {
      return prev;
    }
  }, 0);

  const subtotal = items.reduce((prev, curr) => {
    if (curr.descrip1 && curr.descrip1.trim().length > 0)
      return prev + Number(curr.precio * Math.floor(curr.cantidad));
    else return prev;
  }, 0);

  let subtotalConIVA = 0;
  subtotalConIVA = items.reduce((prev, curr) => {
    if (curr.descrip1 && curr.descrip1.trim().length > 0) {
      const totalConIVA = Number(curr.mtoTax);
      // Calcula el total del ítem sumando el precio y el impuesto
      return prev + totalConIVA; // Suma el total del ítem con IVA al subtotal
    } else {
      return prev;
    }
  }, 0);

  const discountRate = (discount * subtotal) / 100;
  const subTotal = subtotal - subtotalConIVA;
  const taxRate = (tax * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  const handleInputChange = (e) => {
    const changeItemValue = e.target.value;
    setSelection(changeItemValue);
    if (changeItemValue === "option1") {
      setAdjustedTotal((total * 1.03) / 100);
    } else {
      setAdjustedTotal(0);
    }
  };

  let IGTF = 0; // Declaración fuera del alcance de la condición

  if (IGTF > 0) {
    // IGTF se mantiene sin cambios si ya tiene un valor mayor a cero
  } else {
    // Si IGTF es cero, se calcula su valor (esto podría hacerse de otras formas dependiendo de tu lógica)
    IGTF = adjustedTotal;
  }

  // Uso de totalAPagar en lugar de TotalAPagar
  const totalAPagar = total + IGTF;

  //*Procedimiento para factura en dolares
  const refBaseIm = subtotalExento / dolar;
  const refBaseExento = subtotalExento / dolar;
  const refDescueto = subtotalExento / dolar;
  const refSubtotal = subTotal / dolar;
  const refIva = subtotalConIVA / dolar;
  const refTotal = subtotal / dolar;
  const refIgtf = IGTF / dolar;
  const refTotalAPagar = totalAPagar / dolar;

  const reviewInvoiceHandler = async (event) => {
    event.preventDefault();

    const formData = {
      //Datos en BS
      addresCustomer,
      codCustomer,
      customerEmail,
      customerName,
      customerTlf,
      customerType,
      discount,
      dolar,
      codVend,
      fechaA,
      fechaB,
      invoiceNumber,
      selectedDate,
      subtotal,
      subTotal,
      subtotalConIVA,
      subtotalExento,
      tax,
      totalAPagar,
      IGTF,
      total,
      //Valores en dolares
      refBaseIm,
      refBaseExento,
      refDescueto,
      refSubtotal,
      refIva,
      refTotal,
      refIgtf,
      refTotalAPagar,
      items,
    };

    try {
      await dispatch(invoicePost(formData ));
      await dispatch(Emision(formData));

      setIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Esta función se ejecuta cuando se hace clic en el botón de búsqueda
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    // Cambiamos el estado 'modalOpen' a true para abrir el modal
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col  ">
        <Navbar />

        <form
          className="flex flex-wrap place-content-between p-2 md:flex-row  pt-20 "
          onSubmit={reviewInvoiceHandler}
        >
          <div
            className="grow rounded-lg w-3/4 m-4 "
            // className="my-6 flex-1 space-y-2 rounded-lg bg-white p-6 shadow-sm sm:space-y-4 md:p-6"
          >
            <div className="">
              <ExchangeRate />
            </div>
            <div className="h-8 m-2">
              <h6 className="text-green-600 text-2xl">Nueva Factura</h6>
            </div>
            <div className="flex flex-col justify-between space-y-2 h-8 m-2 border-gray-900/10 md:flex-row md:items-center md:space-y-0">
              <div className="flex space-x-2">
                <span className="font-bold">Fecha Actual:</span>
                <span>{today}</span>
              </div>
              <div className="flex items-center space-x-2 m-2 ">
                <label className="font-bold" htmlFor="invoiceNumber">
                  FACTURA:
                </label>
                <input
                  required
                  className="max-w-[130px] bg-[#F8F9FD] text-red-600 font-bold border border-transparent rounded-lg h-8 "
                  type="text"
                  name="invoiceNumber"
                  id="invoiceNumber"
                  min="1"
                  step="1"
                  value={invoiceNumber}
                  onChange={(event) => setInvoiceNumber(event.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-2 border-b border-gray-900/10 h-8 m-2">
              <p className="font-bold ">Vendedor:</p>
              <h2>{codVend}</h2> <span>{nameVend}</span>
              <p>{user.lastname}</p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="relative w-full  ">
                  <input
                    type="text"
                    name="codCustomer"
                    id="codCustomer"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Cedula"
                    required
                    value={codCustomer}
                    onChange={(event) => setCodCustomer(event.target.value)}
                    onBlur={handleInputChange}
                  />
                  {/* <Link to="/SearchModal"> */}
                  <button
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#BFE1D5] rounded-e-lg border border-[#BFE1D5]  hover:bg-[#74c7aa]  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <Search />
                    <span className="sr-only">Search</span>
                  </button>
                  {/* </Link> */}
                </div>
                <SearchModal
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                />

                <div className="relative w-full col-start-2 row-start-1">
                  <input
                    type="search"
                    name="customerName"
                    id="customerName"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Cliente"
                    required
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 p-2">
                <input
                  required
                  className="block p-2.5 w-full  text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Tipo de precio "
                  type="text"
                  name="customerType"
                  id="customerType"
                  value={customerType}
                  onChange={(event) => setCustomerType(event.target.value)}
                />

                <input
                  required
                  className="block p-2.5 w-full text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Telefono"
                  type="tel"
                  name="customerTlf"
                  id="customerTlf"
                  value={customerTlf}
                  onChange={(event) => setCustomerTlf(event.target.value)}
                />
              </div>

              <div className=" flex flex-col gap-4 p-2">
                <input
                  required
                  className="block w-fulltext-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Direccion"
                  type="text"
                  name="addresCustomer"
                  id="addresCustomer"
                  value={addresCustomer}
                  onChange={(event) => setAddresCustomer(event.target.value)}
                />

                <input
                  required
                  className="block w-full text-sm text-gray-900 bg-[#F8F9FD] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Correo "
                  type="email"
                  name="customerEmail"
                  id="customerEmail"
                  value={customerEmail}
                  onChange={(event) => setCustomerEmail(event.target.value)}
                />
              </div>
            </div>
            <table className="w-full p-2 text-left">
              <thead>
                <tr className="border-b border-gray-900/10 text-sm md:text-base">
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Alícuota I.V.A</th>
                  <th className="text-center">ACCION</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <InvoiceItem
                    key={index.id}
                    id={item.id}
                    coditem={item.codItem}
                    descrip1={item.descrip1}
                    mtotax={item.mtoTax}
                    qty={item.cantidad}
                    price={item.precio}
                    isloading={loading}
                    onDeleteItem={deleteItemHandler}
                    onEdtiItem={edtiItemHandler}
                  />
                ))}
              </tbody>
            </table>
            <button
              className={`rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="button"
              onClick={addItemHandler}
              disabled={loading}
            >
              Agregar Producto
            </button>
          </div>

          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              //infomacion del vendedor
              invoiceNumber,
              codVend,
              nameVend,
              //informacion del cliente
              codCustomer,
              addresCustomer,
              customerName,
              customerTlf,
              customerEmail,
              customerType,

              //operaciones logicas
              subtotal,
              taxRate,
              discountRate,
              total,
            }}
            items={items}
            onAddNextInvoice={user ? null : addNextInvoiceHandler}
          />

          <div
            // className="flex-1 space-y-2  w-full"
            // className="mt-4 my-6 space-y-2 rounded-lg bg-white p-4 shadow-sm"
            className=" grow rounded-lg bg-gray-200 p-3 border-1 border-gray-300 my-4 "
          >
            <div className="flex ">
              <div className="space-y-3">
                <label
                  className="text-sm font-bold md:text-base "
                  htmlFor="selecMoneda"
                >
                  Tipo de moneda:
                </label>
                <div className="flex items-center">
                  <select
                    className="flex-1 bg-white border border-transparent rounded-lg"
                    id="selecMoneda"
                    value={selection}
                    onChange={handleInputChange}
                  >
                    <option value="option2">VES (Bs)</option>
                    <option value="option1">USD ($)</option>
                  </select>
                </div>

                <label className="text-sm font-bold md:text-base" htmlFor="tax">
                  Porcentaje de iva
                </label>
                <div>
                  <div className="flex col-span-1 ">
                    <input
                      disabled={loading}
                      className="flex-1 bg-whiter w-4 border border-transparent rounded-lg "
                      type="number"
                      name="tax"
                      id="tax"
                      min="0.01"
                      step="0.01"
                      placeholder="0.0"
                      value={tax}
                      onChange={(event) => setTax(event.target.value)}
                    />

                    <span className="rounded-lg bg-gray-300 py-2 px-4 text-gray-800  shadow-sm">
                      %
                    </span>
                    <span>
                      ({tax || "0"}%) {taxRate.toFixed(2)}
                    </span>
                  </div>
                </div>
                <label
                  className="text-sm font-bold md:text-base"
                  htmlFor="discount"
                >
                  Descuento
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loading}
                    className="flex-1 bg-white border border-transparent rounded-lg w-4 "
                    type="number"
                    name="discount"
                    id="discount"
                    min="0"
                    step="0.01"
                    placeholder="0.0"
                    value={discount}
                    onChange={(event) => setDiscount(event.target.value)}
                  />
                  <span className="rounded-lg bg-gray-300 py-2 px-4 text-gray-800 shadow-sm">
                    %
                  </span>
                  ({discount || "0"}%) {discountRate.toFixed(2)}
                </div>

                <div className="my-4">
                  <label
                    htmlFor="myDatePicker"
                    className="text-sm font-bold md:text-base block"
                  >
                    Fecha de Vecimiento
                  </label>
                  <DatePicker
                    id="myDatePicker"
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    className="block w-full mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" // Estilos del DatePicker
                  />
                </div>

                <label
                  className="text-sm font-bold md:text-base"
                  htmlFor="mySelect"
                >
                  Tipo de pago:
                </label>
                <div className="flex items-center">
                  <select
                    className="flex-1 bg-white border border-transparent rounded-lg"
                    id="mySelect"
                    //value=""
                    //onChange={handleSelectionChange}
                  >
                    <option value="">-</option>
                    <option value="option1">Debito</option>
                    <option value="option2">Credito</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <div className="border-2 border-gray-900/10">
                    <div className="flex w-full justify-between ">
                      <span className="font-bold">Base Imponible:</span>
                      <span>Bs {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span>Base Excepta :</span>
                      <span>Bs {subtotalExento.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span className="font-bold">Descuento:</span>
                      <span>Bs {discountRate.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span className="font-bold">Subtotal:</span>
                      <span>Bs {subTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span>IVA 16%:</span>
                      <span>Bs {subtotalConIVA.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span className="font-bold">Total:</span>
                      <span>Bs {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span className="font-bold">IGTF 3% :</span>
                      <span>Bs {IGTF.toFixed(2)} </span>
                    </div>
                    <div className="flex w-full justify-between  pt-2 ">
                      <span className="font-bold">Total a pagar:</span>
                      <span className="font-bold">
                        Bs {totalAPagar.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {/* Dolares-------------------------------------------------------------------- */}

                  <div className="border-2 border-gray-900/10">
                    <div className="flex w-full justify-between ">
                      <span className="font-bold">Base Imponible:</span>
                      <span>$ {refTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span>Base Excepta :</span>
                      <span>$ {subtotalExento.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span className="font-bold">Descuento:</span>
                      <span>$ {discountRate.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span className="font-bold">Subtotal:</span>
                      <span>$ {refSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span>IVA 16%:</span>
                      <span>$ {refIva.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span className="font-bold">Total:</span>
                      <span>$ {refTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between ">
                      <span className="font-bold">IGTF 3% :</span>
                      <span>$ {refIgtf.toFixed(2)} </span>
                    </div>
                    <div className="flex w-full justify-between  pt-2 ">
                      <span className="font-bold">Total a pagar:</span>
                      <span className="font-bold">
                        $ {refTotalAPagar.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    className="flex flex-col items-center w-32 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                    type="submit"
                  >
                    Procesar Factura
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InvoiceForm;
