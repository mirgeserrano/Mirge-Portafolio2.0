import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import incrementString from "../../helpers/incrementString";
import useAuthStore from "../../hooks/useAuthStore";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useInvoiceStore } from "../../hooks/useInvoiceStore";
import { useCustomerStore } from "../../hooks/useCustomerStore";
import convertirFecha from "../../helpers/convertirFecha";

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
  // obtengo el usuario
  const { user } = useAuthStore();
  // obtengo los item de la facturas
  const { Invoce, invoicePost } = useInvoiceStore();
  //obtener el cliente
  const { getCustomer } = useCustomerStore();

  const [invoiceData, setInvoiceData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      try {
        const [invoiceResponse, customerResponse] = await Promise.all([
          dispatch(Invoce(params)),
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
            costo,
            descto,
            esserv,
            factor,
    
          }) => ({
            //id,

            codUbic: codubic,
            codItem: coditem,
            codVend,
            descrip1,
            priceO: precio,
            precio: totalitem,
            cantidad,
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
          })
        );
        // console.log(invoiceData.data[0].id);
        console.log(invoiceData);
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

  const [items, setItems] = useState([
    {
      id: uuid(),
      codItem: "prueba",
      descrip1: "descrip",
      cantidad: 1,
      precio: "1.00",
    },
  ]);
  console.log(items);
  const reviewInvoiceHandler = async (event) => {
    event.preventDefault();
    const invoiceData = [
      {
        invoice: {
          codClie: codCustomer,
          codVend: codVend,
          codUbic: "DP01",
          descrip: customerName,
          direc1: addresCustomer,
          direc2: "Maracaibo, Venezuela",
          mtoTotal: total,
          tgravable: 100,
          texento: 0,
          monto: 100,
          mtoTax: taxRate,
          contado: 116.0,
          tipoCli: customerType,
          fechaE: fechaA,
          fechaV: fechaA,
          Id3: "V01",
          ordenC: "01",
          telef: customerTlf,
          tipoFac: "A",
        },
        items,
        payments: [
          {
            monto: total,
            codTarj: "-EFE-",
            fechae: fechaA,
            descrip: "efectivo",
          },
        ],
        taxes: [
          {
            monto: 16.0,
            codTaxs: "IVA",
            tgravable: 100.0,
          },
        ],
      },
    ];
    try {
      await dispatch(invoicePost(invoiceData));
      setIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  // const addNextInvoiceHandler = () => {
  //   setInvoiceNumber((prevNumber) => incrementString(prevNumber));
  //   setItems([
  //     {
  //       id: uuid(6),
  //       coditem: "00",
  //       name: "",
  //       qty: 1,
  //       price: "1.00",
  //     },
  //   ]);
  // };

  const addItemHandler = () => {
    setItems((prevItem) => [
      ...prevItem,
      {
        id: uuid(),
        codItem: "",
        descrip1: "",
        cantidad: "",
        precio: "",
      },
    ]);
  };

  //Borrar item
  const deleteItemHandler = (id) => {
    console.log(id);
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

  const subtotal = items.reduce((prev, curr) => {
    if (curr.descrip1 && curr.descrip1.trim().length > 0)
      return prev + Number(curr.precio * Math.floor(curr.cantidad));
    else return prev;
  }, 0);

  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row bg-gray-200 "
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Fecha Actual: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2  ">
            <label className="font-bold" htmlFor="invoiceNumber">
              FACTURA:
            </label>
            <input
              required
              className="max-w-[130px] bg-gray-200 text-red-600 font-bold border border-transparent rounded-lg "
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
        <div className="flex space-x-2 ">
          <h2 className="text-green-600 text-lg font-bold ">Vendedor:</h2>
          <div className="flex ">
            <h2>{codVend}</h2>-<span>{nameVend}</span> <p>{user.lastname}</p>
          </div>
        </div>
        <>
          <h1 className="text-center text-lg font-bold text-blue-600">
            DATOS DEL CLIENTE
          </h1>
          <div className="grid grid-cols-2 gap-2 ">
            <label
              htmlFor="codCustomer"
              className="text-sm font-bold sm:text-base"
            >
              Cedula:
            </label>
            <input
              required
              className="flex-1 bg-gray-200 border border-transparent rounded-lg"
              placeholder=""
              type="text"
              name="codCustomer"
              id="codCustomer"
              value={codCustomer}
              onChange={(event) => setCodCustomer(event.target.value)}
            />
            <label
              htmlFor="customerName"
              className="col-start-2 row-start-1 text-sm font-bold md:text-base"
            >
              Nombre:
            </label>
            <input
              required
              className="flex-1 bg-gray-200 border border-transparent rounded-lg"
              placeholder=""
              type="text"
              name="customerName"
              id="customerName"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 pb-4">
            <label
              htmlFor="addresCustomer"
              className="text-sm font-bold sm:text-base"
            >
              Tipo de cliente :
            </label>

            <input
              required
              className="flex-1 bg-gray-200 border border-transparent rounded-lg"
              placeholder=""
              type="text"
              name="customerType"
              id="customerType"
              value={customerType}
              onChange={(event) => setCustomerType(event.target.value)}
            />
            <label
              htmlFor="customerTlf"
              className=" col-start-2 row-start-1 text-sm font-bold md:text-base"
            >
              Telefono:
            </label>
            <input
              required
              className="flex-1 bg-gray-200 border border-transparent rounded-lg"
              placeholder=""
              type="tel"
              name="customerTlf"
              id="customerTlf"
              value={customerTlf}
              onChange={(event) => setCustomerTlf(event.target.value)}
            />
          </div>
          <label
            htmlFor="customerType"
            className=" col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Direccion:
          </label>
          <input
            required
            className="flex-1 bg-gray-200 border border-transparent rounded-lg"
            placeholder=""
            type="text"
            name="addresCustomer"
            id="addresCustomer"
            value={addresCustomer}
            onChange={(event) => setAddresCustomer(event.target.value)}
          />
          <label
            htmlFor="customerEmail"
            className=" col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Correo :
          </label>
          <input
            required
            className="flex-1 bg-gray-200 border border-transparent rounded-lg"
            placeholder=""
            type="email"
            name="customerEmail"
            id="customerEmail"
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
          />
        </>
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th className="text-center">Precio</th>
              <th className="text-center">ACCION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                coditem={item.codItem}
                descrip1={item.descrip1}
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
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Discount:</span>
            <span>
              ({discount || "0"}%)${discountRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Tax:</span>
            <span>
              ({tax || "0"}%)${taxRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              ${total % 1 === 0 ? total : total.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="flex flex-col items-center w-72 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Procesar Factura
          </button>
        </div>
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
    </form>
  );
};

export default InvoiceForm;
