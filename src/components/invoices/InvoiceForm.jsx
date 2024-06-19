// React and related libraries
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Third-party libraries
import { v4 as uuid } from "uuid";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-hot-toast";
import es from "date-fns/locale/es"; // Importa la localización en español
import "tailwindcss/tailwind.css";

// Internal hooks
import useAuthStore from "../../hooks/useAuthStore";
import { useInvoiceStore } from "../../hooks/useInvoiceStore";
import useApiFibre from "../../hooks/useApiFibre";

// Internal components
import Navbar from "../Navbar";
import {
  MemoizedInvoiceCostumerInfo,
  MemoizedInvoiceTable,
  MemoizedInvoiceTotals,
  PagoFactura,
} from "./index.jsx";
import InvoiceModal from "./InvoiceModal";
import ExchangeRate from "../ExchageRate/ExchangeRate.jsx";
import RenderLoading from "../RenderLoading";

// Internal helpers
import {
  formatDateString,
  convertirFecha,
  calculateInvoiceTotals,
} from "../../helpers";
import { Emision } from "../../hooks";
//import DatePicker from "tailwind-datepicker-react";

// Registra la localización
registerLocale("es", es);

const date = new Date();

const today = date.toLocaleDateString("es-ES", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const fechaA = convertirFecha(date);

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const numerod = params.id;
  const location = useLocation();

  const pending = useSelector((state) => state.multiple.invoiceEmision.pending);
  const dolarApi = useSelector((state) => state.multiple.dolarPrice);

  const { user } = useAuthStore();

  const [showModal, setShowModal] = useState(false);
  const { getInvoce, invoicePost } = useInvoiceStore();
  const { getInvoiceFibre, postClientsDetail, paymetInvoice } = useApiFibre();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState(numerod | 1);
  const [codVend, setCodVend] = useState(user.user);
  const [nameVend, setNameVend] = useState(user.firstname);
  const [codCustomer, setCodCustomer] = useState("");
  const [addresCustomer, setAddresCustomer] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerTlf, setCustomerTlf] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [datosPago, setDatosPago] = useState(0);
  const [datosFecha, setDatosFecha] = useState("");

  const [items, setItems] = useState([
    {
      id: uuid(),
      codItem: "",
      descrp: "",
      unidades: "",
      precio: "",
      imp: "0",
      total:"0",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invoice] = await Promise.all([
          dispatch(getInvoiceFibre(params)),
        ]);

        //Procesar numero de factura
        const invoiceData = invoice.payload.invoice.factura;
        setInvoiceNumber(invoiceData.id || "");
        setDatosFecha(formatDateString(invoiceData.vencimiento));

        //Procesar los item
        const invoiceitems = invoice.payload.invoice.items;
        setItems(invoiceitems);

        // Procesar respuesta del cliente
        const customerData = invoice.payload.client.datos[0];
        setCodCustomer(customerData.cedula || "");
        setAddresCustomer(customerData.direccion_principal || "");
        setCustomerName(customerData.nombre || "");
        setCustomerTlf(customerData.telefono || customerData.movil || "");
        setCustomerEmail(customerData.correo || "");
        setCustomerType(customerData.tipocli || "");
        setLoading(true);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch, params, location, getInvoiceFibre]);

  // agregar item
  const addItemHandler = () => {
    setItems((prevItem) => [
      ...prevItem,
      {
        id: uuid(),
        codItem: "",
        descrp: "",
        unidades: "0",
        precio: "0",
        imp: "0",
        total:"0",
      },
    ]);
  };

  //Borrar item
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  //Editar item
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


  const {
    subtotalExento,
    subtotalImponible,
    total,
    subtotalConIVA,
    subTotal,
    discountRate,
    totalMontoIgtf,
    baseIgtf,
    totalMontoIgtfbs,
    totalAPagar,
    refBaseIm,
    refBaseExento,
    refDescueto,
    refSubtotal,
    refIva,
    refTotal,
    refBaseIgtf,
    refTotalAPagar,
  } = calculateInvoiceTotals(items, discount, datosPago, dolarApi);

  //Funcion de envio
  const reviewInvoiceHandler = async (event) => {
    event.preventDefault();

    if (!selectedDate || !datosFecha) {
      setError("La fecha de vencimiento es obligatoria");
      setIsTouched(true);
      return;
    }

    const formData = {
      invoiceNumber,
      codVend,
      codCustomer,
      customerName,
      customerType,
      customerTlf,
      addresCustomer,
      customerEmail,
      fechaA,
      fechaB,
      datosPago,

      //Valores en Bs
      subtotalImponible,
      subtotalExento,
      discountRate,
      subTotal,
      subtotalConIVA,
      total,
      totalMontoIgtf,
      baseIgtf,
      totalMontoIgtfbs,
      totalAPagar,

      //Valores en dolares
      dolarApi,
      refBaseIm,
      refBaseExento,
      refDescueto,
      refSubtotal,
      refIva,
      refTotal,
      refBaseIgtf,
      refTotalAPagar,
      items,
    };
    console.log(formData);

    try {
      const resEmision = await dispatch(Emision(formData));
      const { payload } = resEmision;
      const numeroControl = payload.resultado.numeroControl; // Desestructurar el payload de la respuesta
      const updatedFormData = {
        ...formData,
        numeroControl, // Agregar numeroControl a formData
      };
      if (payload.codigo == 200) {
        //  await dispatch(paymetInvoice(updatedFormData));
        await dispatch(invoicePost(updatedFormData));
      } else console.log("no se nevio");
      setShowModal(false);
      toast.success("Factura Procesada");
      setIsOpen(true);
    } catch (error) {
      toast.error("Error al Procesar");
      console.error(error);
    }
  };
console.log(items);
  //*--------Modales------------------------------
  const [modalPagoOpen, setModalPagoOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleAbrirModalPago = () => {
    setModalPagoOpen(true);
  };

  const handleSubmitPago = (datos) => {
    setIsOpen(false);
    setDatosPago(datos);
    setModalPagoOpen(true);
  };
  //*--------fecha del Modal ------------------------------

  const [selectedDate, setSelectedDate] = useState(null);
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (date) => {
    setSelectedDate(date);
    setIsTouched(true);
    if (!date) {
      setError("La fecha de vencimiento es obligatoria");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (datosFecha) {
      setSelectedDate(new Date(datosFecha));
    }
  }, [datosFecha]);

  const fechaB = formatDateString(selectedDate);

  //*--------fecha------------------------------
  const itemsWithImp = items.map((item) => {
    const total = item.precio * item.unidades;
    const imp = ((total / 1.16) * 0.16).toFixed(2);
    return { ...item, imp, total };
  });

  
  return (
    <>
      <div>
        <Navbar />

        <form
          //className="flex flex-wrap place-content-between p-2 md:flex-row pt-20 "
          className="flex flex-col md:flex-row pt-20"
          //      onSubmit={reviewInvoiceHandler}
        >
          <div
            className=" rounded-lg md:w-2/3 m-4"

            // className="my-6 flex-1 space-y-2 rounded-lg bg-white p-6 shadow-sm sm:space-y-4 md:p-6"
          >
            <ExchangeRate />

            <div className="h-8 m-2">
              <h6 className="text-green-600 text-2xl">Nueva Factura</h6>
            </div>
            <div className="flex flex-col justify-between space-y-2 m-2 border-gray-900/10 md:flex-row md:items-center md:space-y-0">
              <div className="space-x-2">
                <span className="font-bold">Fecha Actual:</span>
                <span>{today}</span>
              </div>
              <div className="flex flex-row space-y-2 items-center md:flex-row md:items-center md:space-y-0 md:space-x-2">
                <label className="font-bold" htmlFor="invoiceNumber">
                  FACTURA:
                </label>
                <input
                  required
                  className="max-w-[130px] bg-[#F8F9FD] text-red-600 font-bold border border-transparent rounded-lg h-8"
                  type="text"
                  name="invoiceNumber"
                  id="invoiceNumber"
                  min="1"
                  step="1"
                  value={invoiceNumber}
                  onChange={(event) => setInvoiceNumber(event.target.value)}
                  disabled={!!loading}
                />
              </div>
            </div>
            <div className="flex flex-row space-y-2 items-center border-b border-gray-900/10 m-2 md:flex-row md:space-y-0 md:space-x-2">
              <div className="font-bold">Vendedor:</div>
              <h2>{codVend}</h2>
              <span>{nameVend}</span>
              <div>{user.lastname}</div>
            </div>
            <div>
              <MemoizedInvoiceCostumerInfo
                codCustomer={codCustomer}
                setCodCustomer={setCodCustomer}
                handleOpenModal={handleOpenModal}
                customerName={customerName}
                setCustomerName={setCustomerName}
                customerType={customerType}
                setCustomerType={setCustomerType}
                customerTlf={customerTlf}
                setCustomerTlf={setCustomerTlf}
                addresCustomer={addresCustomer}
                setAddresCustomer={setAddresCustomer}
                customerEmail={customerEmail}
                setCustomerEmail={setCustomerEmail}
                loading={loading}
              />
            </div>
            <MemoizedInvoiceTable
              items={itemsWithImp }
              loading={loading}
              deleteItemHandler={deleteItemHandler}
              edtiItemHandler={edtiItemHandler}
            />
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

          <div className=" grow rounded-lg bg-gray-200 p-3 border-1 border-gray-300 my-4 ">
            <div className="flex flex-col p-2">
              <label
                className="text-sm font-bold md:text-base "
                htmlFor="myDatePicker"
              >
                Fecha de Vecimiento
              </label>
              <DatePicker
                locale="es"
                id="myDatePicker"
                minDate={new Date()}
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecciona una Fecha"
                className="block w-full mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" // Estilos del DatePicker
              />
              {isTouched && !selectedDate && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>

            <div className="flex flex-col p-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="discount"
              >
                Descuento
              </label>
              <div className="flex items-center">
                <input
                  className=" bg-white border border-transparent rounded-lg  "
                  type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  step="0.01"
                  placeholder="0.0"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
                <span className="rounded-lg bg-gray-300 py-2 px-4 text-gray-800 shadow-sm items-end">
                  %
                </span>
              </div>
              <div>
                ({discount || "0"}%) Bs {discountRate.toFixed(2)} / $
                {refDescueto.toFixed(2)}
              </div>
            </div>

            {/* ------------------------------------------------------- */}
            <div className="flex flex-col items-center">
              <button
                className="flex flex-col items-center w-32 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                onClick={handleAbrirModalPago}
                type="button"
              >
                Pago
              </button>
              {!isOpenModal && (
                <PagoFactura
                  dolar={dolarApi}
                  monto={totalAPagar}
                  onSubmit={handleSubmitPago}
                  isOpen={modalPagoOpen}
                  setIsOpen={setModalPagoOpen}
                  buttonColor="bg-red-500"
                />
              )}
            </div>

            <MemoizedInvoiceTotals
              refSubtotal={refSubtotal}
              refDescuento={refDescueto}
              refBaseIm={refBaseIm}
              refIva={refIva}
              refTotal={refTotal}
              totalMontoIgtf={totalMontoIgtf}
              refBaseIgtf={refBaseIgtf}
              refTotalAPagar={refTotalAPagar}
              subTotal={subTotal}
              discountRate={discountRate}
              subtotalImponible={subtotalImponible}
              subtotalConIVA={subtotalConIVA}
              total={total}
              totalMontoIgtfbs={totalMontoIgtfbs}
              baseIgtf={baseIgtf}
            />

            <div className="flex flex-col items-center">
              <button
                disabled={datosPago == 0}
                className={`flex flex-col items-center w-32 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600 ${
                  datosPago == 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={reviewInvoiceHandler}
              >
                Procesar Factura
              </button>

              {pending ? (
                <RenderLoading isOpen={loading} setIsOpen={setIsOpen} />
              ) : (
                <ToastContainer />
              )}
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
                  subTotal,
                  totalAPagar,
                  discountRate,
                }}
                items={items}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InvoiceForm;
