import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import incrementString from "../../helpers/incrementString";
import useAuthStore from "../../hooks/useAuthStore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useInvoiceStore } from "../../hooks/useInvoiceStore";
import { useCustomerStore } from "../../hooks/useCustomerStore";
import { selectCustomer } from "../../redux/features/customerSlice";

const date = new Date();
const today = date.toLocaleDateString("es-ES", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const InvoiceForm = () => {
  const customer = useSelector(selectCustomer);
const [data, setdata] = useState(customer);
  console.log(data);
  //selector para traer el cliente
  const params = useParams();
  // obtengo el usuario
  const { user } = useAuthStore();
  // obtengo los item de la facturas
  const { Invoce, invoicePost } = useInvoiceStore();
  //obtener el cliente
  const { getCustomer } = useCustomerStore();
  const dispatch = useDispatch();

  const [invoiceData, setInvoiceData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [codVend, setCodVend] = useState(user.user);
  const [nameVend, setNameVend] = useState(user.firstname);
  const [codCustomer, setCodCustomer] = useState("");
  const [addresCustomer, setAddresCustomer] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerTlf, setCustomerTlf] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerType, setCustomerType] = useState("");

  useEffect(() => {
    dispatch(Invoce(params))
      .then((data) => {
        //   console.log(data);
        const item = data.map(
          ({ id, coditem, descrip1, cantidad, precio, numerod }) => ({
            id,
            coditem,
            numerod,
            name: descrip1,
            qty: cantidad,
            price: precio,
          })
        );

        setItems(item);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCustomer(params))
        if (customer !== null) {
          const customerNames = customer.map(
            ({ codclie, direc1, descrip, telef, email, tipocli, numerouv }) => {
              setCodCustomer(codclie);
              setAddresCustomer(direc1);
              setCustomerName(descrip);
              setCustomerTlf(telef);
              setCustomerEmail(email);
              setCustomerType(tipocli);
              setInvoiceNumber(numerouv);

          //    Retornar un objeto con los valores que desees utilizar
              return {
                codclie,
                direc1,
                descrip,
                telef,
                email,
                tipocli,
                numerouv,
              };
            }
          );
        } 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    
  }, [dispatch]);
// setTimeout(() => {
//   window.location.reload();
// }, 3000);
  const [items, setItems] = useState(invoiceData);

  const reviewInvoiceHandler = async (event) => {
    event.preventDefault();

    const invoiceData = {
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
        contado: 116,
        tipoCli: customerType,
        fechaE: "2024-02-28 14:00:00.000",
        fechaV: "2024-02-28 14:00:00.000",
        Id3: "V01",
        ordenC: "01",
        telef: customerType,
        tipoFac: "A",
      },
      items: [
        {
          codItem: "HP",
          codUbic: "DP01",
          codVend: "v10406231",
          descrip1: "PUNTO SAINT prueba",
          priceO: 100,
          precio: 100,
          cantidad: 1,
          mtoTax: 16,
        },
      ],
      payments: [
        {
          monto: total,
          codTarj: "-EFE-",
          fechae: "2024-02-28 14:00:00.000",
          descrip: "efectivo",
        },
      ],
      taxes: [
        {
          monto: 16,
          codTaxs: "IVA",
          tgravable: 100,
        },
      ],
    };
    console.log(invoiceData);
    try {
      await dispatch(invoicePost(invoiceData));
      setIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uuid(6),
        coditem: "00",
        name: "",
        qty: 1,
        price: "1.00",
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uuid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        coditem: "00",
        name: "",
        qty: 1,
        price: "1.00",
      },
    ]);
  };

  //borrar item
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  //Editar formulario
  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    console.log(curr);
    if (curr.name && curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Fecha Actual: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Factura:
            </label>
            <input
              required
              className="max-w-[130px]"
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
        <h1 className="text-center text-lg font-bold">Datos del Vendedor</h1>
        <div className="grid grid-cols-2 gap-2 pt-2 pb-4">
          <label htmlFor="codVend" className="text-sm font-bold sm:text-base">
            Codigo:
          </label>
          <input
            required
            className="flex-1"
            placeholder=""
            type="text"
            name="codVend"
            id="codVend"
            value={codVend}
            onChange={(event) => setCodVend(event.target.value)}
          />
          <label
            htmlFor="nameVend"
            className="col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Nombre:
          </label>
          <input
            required
            className="flex-1"
            placeholder=""
            type="text"
            name="nameVend"
            id="nameVend"
            value={nameVend}
            onChange={(event) => setNameVend(event.target.value)}
          />
        </div>

        <>
          <h1 className="text-center text-lg font-bold">Datos del Cliente</h1>
          <div className="grid grid-cols-2 gap-2 ">
            <label
              htmlFor="codCustomer"
              className="text-sm font-bold sm:text-base"
            >
              Cedula:
            </label>
            <input
              required
              className="flex-1"
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
              className="flex-1"
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
              Direccion:
            </label>
            <input
              required
              className="flex-1"
              placeholder=""
              type="text"
              name="addresCustomer"
              id="addresCustomer"
              value={addresCustomer}
              onChange={(event) => setAddresCustomer(event.target.value)}
            />
            <label
              htmlFor="customerTlf"
              className=" col-start-2 row-start-1 text-sm font-bold md:text-base"
            >
              Telefono:
            </label>
            <input
              required
              className="flex-1"
              placeholder=""
              type="tel"
              name="customerTlf"
              id="customerTlf"
              value={customerTlf}
              onChange={(event) => setCustomerTlf(event.target.value)}
            />
          </div>
          <label
            htmlFor="customerEmail"
            className=" col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Correo :
          </label>
          <input
            required
            className="flex-1"
            placeholder=""
            type="email"
            name="customerEmail"
            id="customerEmail"
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
          />
          <label
            htmlFor="customerType"
            className=" col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Tipo de cliente :
          </label>
          <input
            required
            className="flex-1"
            placeholder=""
            type="text"
            name="customerType"
            id="customerType"
            value={customerType}
            onChange={(event) => setCustomerType(event.target.value)}
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
                coditem={item.coditem}
                descrip1={item.name}
                name={item.name}
                qty={item.qty}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>

        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Add Item
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
      </div>
      <div>
        <button
          className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="submit"
        >
          Review Invoice
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
    </form>
  );
};

export default InvoiceForm;
