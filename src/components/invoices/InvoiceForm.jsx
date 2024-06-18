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
import { Toaster, toast } from "react-hot-toast";
import es from "date-fns/locale/es"; // Importa la localización en español
import "tailwindcss/tailwind.css";

// Internal hooks
import useAuthStore from "../../hooks/useAuthStore";
import { useInvoiceStore } from "../../hooks/useInvoiceStore";
import useApiFibre from "../../hooks/useApiFibre";

// Internal components
import Navbar from "../Navbar";
import { InvoiceItem, PagoFactura } from "./index.jsx";
import InvoiceModal from "./InvoiceModal";
import ExchangeRate from "../ExchageRate/ExchangeRate.jsx";
import SelectCustomer from "../SelectCustomer";
import RenderLoading from "../RenderLoading";

// Internal helpers
//import  from "../../helpers/convertirFecha";
import {
  formatDateString,
  formatearFechaTheFactory,
  convertirFecha,
} from "../../helpers";
import { Emision } from "../../hooks";
import showToastPromise from "../showToastPromise.jsx";
import ModalConfimation from "../ModalConfimation.jsx";
import InvoiceTable from "./InvoiceTable.jsx";
import InvoiceCostumerInfo from "./InvoiceCostumerInfo.jsx";

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
  const pending = useSelector((state) => state.multiple.invoiceEmision.pending);
  const dolarApi = useSelector((state) => state.multiple.dolarPrice);

  if (pending) {
    console.log("estoy cargando");
  } else {
    console.log("no estpy cargando ");
  }

  const [showModal, setShowModal] = useState(false);
  const { getInvoce, invoicePost } = useInvoiceStore();
  const { getInvoiceFibre, postClientsDetail, paymetInvoice } = useApiFibre();
  const { user } = useAuthStore();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const numerod = params.id;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(numerod | 1);
  const [codVend, setCodVend] = useState(user.user);
  const [nameVend, setNameVend] = useState(user.firstname);
  const [codCustomer, setCodCustomer] = useState("");
  const [addresCustomer, setAddresCustomer] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerTlf, setCustomerTlf] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [datosPago, setDatosPago] = useState(null);
  const [datosFecha, setDatosFecha] = useState("");

  const [items, setItems] = useState([
    {
      id: uuid(),
      codItem: "",
      descrp: "",
      unidades: "",
      precio: "",
      imp: "",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invoice] = await Promise.all([
          dispatch(getInvoiceFibre(params)),
        ]);
        const invoiceitems = invoice.payload.invoice.items;
        const invoiceData = invoice.payload.invoice.factura;
        const data = invoiceData.vencimiento;
        const profin = formatearFechaTheFactory(data);
        console.log(profin);
        const { fecha } = profin;
        console.log(invoiceData);
        setInvoiceNumber(invoiceData.id || "");
        setDatosFecha(fecha || "");

        const prueba = invoiceitems;
        console.log(prueba);
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

    if (numerod && params) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch, params, location]);

  const addItemHandler = () => {
    setItems((prevItem) => [
      ...prevItem,
      {
        id: uuid(),
        codItem: "",
        descrp: "",
        unidades: "",
        precio: "",
        imp: "",
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
    console.log(updatedItems);
    setItems(updatedItems);
  };
  console.log(items);
  //*Procedimientos para facturar en bolivares

  let subtotalExento = 0;
  let subtotalImponible = 0;

  // Utilizamos reduce para calcular ambos subtotales en un solo ciclo
  items.reduce((prev, curr) => {
    // Convertimos el precio del ítem a un número
    const precio = Number(curr.precio);
    // Sumamos el precio del ítem al subtotal correspondiente según si es exento o no
    if (curr.esexento === 1) {
      subtotalExento += precio;
    } else {
      subtotalImponible += precio;
    }
    // No necesitamos devolver nada en el reduce, así que simplemente devolvemos prev
    return prev;
  }, 0);

  const total = items.reduce((prev, curr) => {
    if (curr.descrp && curr.descrp.trim().length > 0)
      return prev + Number(curr.precio * Math.floor(curr.unidades));
    else return prev;
  }, 0);

  //!! el descuento se lo estoy aplicando al total con iva

  let subtotalConIVA = 0;

  subtotalConIVA = items.reduce((prev, curr) => {
    if (curr.descrp && curr.descrp.trim().length > 0) {
      const totalConIVA = Number(curr.precio);
      // Calcula el total del ítem sumando el precio y el impuesto
      const calIva = (totalConIVA / 1.16) * 0.16;
      return prev + calIva; // Suma el total del ítem con IVA al subtotal
    } else {
      return prev;
    }
  }, 0);

  const subTotal = total - subtotalConIVA;
  const discountRate = (discount * subTotal) / 100;

  let totalMontoIgtf = 0;
  let baseIgtf = 0;

  if (datosPago?.pagos?.length > 0) {
    datosPago.pagos.forEach((pago) => {
      if (pago.montoIgtf) {
        totalMontoIgtf += parseFloat(pago.montoIgtf);
      }
      if (pago.montoIgtfBs) {
        baseIgtf += parseFloat(pago.montoIgtfBs);
      }
    });
  }
  console.log(totalMontoIgtf);
  const totalMontoIgtfbs = totalMontoIgtf * dolarApi;
  console.log(totalMontoIgtfbs);
  const totalAPagar = total - discountRate + totalMontoIgtfbs;
  //*Procedimiento para factura en dolares
  const refBaseIm = subtotalImponible / dolarApi;
  const refBaseExento = subtotalExento / dolarApi;
  const refDescueto = discountRate / dolarApi;
  const refSubtotal = subTotal / dolarApi;
  const refIva = subtotalConIVA / dolarApi;
  const refTotal = total / dolarApi;
  const refBaseIgtf = baseIgtf / dolarApi;
  const refTotalAPagar = totalAPagar / dolarApi;

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
  console.log(customerTlf);
  //*--------fecha------------------------------
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
              <p className="font-bold">Vendedor:</p>
              <h2>{codVend}</h2>
              <span>{nameVend}</span>
              <p>{user.lastname}</p>
            </div>
            <div>
              <InvoiceCostumerInfo
                codCustomer={codCustomer}
                setCodCustomer={setCodCustomer}
                handleOpenModal
                customerName={customerName}
                setCustomerName={setCodCustomer}
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
            <InvoiceTable
              items={items}
              loading={loading}
              deleteItemHandler={loading}
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
                <p className="text-red-500 text-sm mt-1">{error}</p>
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

            {/* ------------------------------------------------------- */}
            <div className="flex flex-col p-2">
              {/* Dolares-------------------------------------------------------------------- */}

              <div className="p-4">
                <div className="flex w-full justify-between ">
                  <span className="font-bold">Subtotal:</span>
                  <span>$ {refSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">Descuento:</span>
                  <span>$ {refDescueto.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">Base Imponible(G):</span>
                  <span>$ {refBaseIm.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">IVA 16%:</span>
                  <span>$ {refIva.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">Total:</span>
                  <span>$ {refTotal.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">Base imponible IGTF 3% :</span>
                  <span>$ {totalMontoIgtf.toFixed(2)} </span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">IGTF 3% :</span>
                  <span>$ {refBaseIgtf.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between bg-[#BFE1D5] shadow-lg p-2 rounded-lg ">
                  <span className="font-bold">Total a pagar:</span>
                  <span className="font-bold">
                    $ {refTotalAPagar.toFixed(2)}
                  </span>
                </div>
              </div>
              {/* Bolivares-------------------------------------------------------------------- */}
              <div className=" bg-white p-4 rounded-lg ">
                <div className="flex w-full justify-between ">
                  <span className="font-bold">Subtotal:</span>
                  <span>Bs {subTotal.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">Descuento:</span>
                  <span>Bs {discountRate.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">Base Imponible(G):</span>
                  <span>Bs {subtotalImponible.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">IVA 16%:</span>
                  <span>Bs {subtotalConIVA.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">Total:</span>
                  <span>Bs {total.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">Base Imponible IGTF 3% :</span>
                  <span>Bs {totalMontoIgtfbs.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between ">
                  <span className="font-bold">IGTF 3% :</span>
                  <span>Bs {baseIgtf.toFixed(2)} </span>
                </div>
                <div className="flex w-full justify-between bg-gray-300 shadow-lg p-2 rounded-lg ">
                  <span className="font-bold">Total a pagar:</span>
                  <span className="font-bold  ">
                    Bs {totalAPagar.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                disabled={datosPago == null}
                className={`flex flex-col items-center w-32 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600 ${
                  datosPago == null ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={reviewInvoiceHandler}
              >
                Procesar Factura
              </button>

              {pending ? (
                //<RenderLoading isOpen={loading} setIsOpen={setIsOpen} />
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
