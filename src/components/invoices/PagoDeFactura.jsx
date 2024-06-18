// import { useState, useEffect, Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { useInstrumentoPago } from "../../hooks/useInstrumentoPago";
// import convertirFecha from "../../helpers/convertirFecha";
// import { Delete } from "../../assets";

// const date = new Date();
// const fechaA = convertirFecha(date);

// function PagoFactura({ monto, onSubmit, isOpen, setIsOpen, dolar }) {
//   const [formaPago, setFormaPago] = useState("");
//   const [montoPagado, setMontoPagado] = useState(0);
//   const [montoTotalFactura, setMontoTotalFactura] = useState(monto);
//   const [saldoPendiente, setSaldoPendiente] = useState(monto);
//   const [vuelto, setVuelto] = useState(0);
//   const [pagos, setPagos] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const { data, loading, error, getIntrumentoPago } = useInstrumentoPago();
//   const tasaCambio = dolar;
//   const igftRate = 0.03;

//   useEffect(() => {
//     getIntrumentoPago();
//   }, [getIntrumentoPago]);

//   useEffect(() => {
//     setMontoTotalFactura(monto);
//     setSaldoPendiente(monto);
//     setPagos([]);
//     setVuelto(0);
//   }, [monto]);

//   useEffect(() => {
//     setSaldoPendiente(montoTotalFactura);
//   }, [montoTotalFactura]);

//   const handleFormaPagoChange = (e) => {
//     setFormaPago(e.target.value);
//   };

//   const handleMontoPagadoChange = (e) => {
//     const value = parseFloat(e.target.value);
//     setMontoPagado(isNaN(value) ? "" : value);
//   };

//   function closeModal() {
//     setIsOpen(false);
//   }

//   const handleAgregarPago = () => {
//     if (montoPagado > 0) {
//       let montoPagadoFinal = montoPagado;
//       let montoIgtf = 0;
//       let montoPagadoIgtf = 0;
//       let moneda = "BS";
//       let tipoCambio = "";
//       let montoIgtfBs = 0;

//       if (formaPago === "Efectivo Divisa") {
//         moneda = "USD";
//         tipoCambio = tasaCambio;
//         montoIgtf = montoPagado * igftRate;
//         montoPagadoIgtf = montoIgtf * tasaCambio;
//         montoPagadoFinal = tasaCambio * montoPagado;
//         montoIgtfBs = montoPagado * tasaCambio;
//       }

//       const nuevoSaldoPendiente = parseFloat(
//         (saldoPendiente - montoPagadoFinal + montoPagadoIgtf).toFixed(2)
//       );

//       const pago = {
//         Descripcion: formaPago,
//         Fecha: fechaA,
//         Forma: formaPago.codtarj,
//         montoPagado,
//         montoPagadoIgtf,
//         montoIgtf,
//         Monto: montoPagadoFinal,
//         Moneda: moneda,
//         montoIgtfBs,
//         TipoCambio: tipoCambio,
//       };

//       if (editIndex !== null) {
//         const newPagos = [...pagos];
//         newPagos[editIndex] = pago;
//         setPagos(newPagos);
//         setEditIndex(null);
//       } else {
//         setPagos([...pagos, pago]);
//       }

//       if (nuevoSaldoPendiente >= 0) {
//         setSaldoPendiente(nuevoSaldoPendiente);
//         setVuelto(0);
//       } else {
//         setSaldoPendiente(0);
//         setVuelto(Math.abs(nuevoSaldoPendiente));
//       }

//       setMontoPagado(0);
//       setFormaPago("");
//     } else {
//       alert("Monto inválido o excede el saldo pendiente");
//     }
//   };

//   const handleSubmit = () => {
//     const formasPago = {
//       pagos,
//     };
//     onSubmit(formasPago);
//     setIsOpen(false);
//   };

//   const handleEditPago = (index) => {
//     const pago = pagos[index];
//     setMontoPagado(pago.montoPagado);
//     setFormaPago(pago.Descripcion);
//     setEditIndex(index);
//   };

//   const deleteItemHandler = (id) => {
//     const pagoEliminado = pagos[id];
//     const nuevoSaldoPendiente =
//       saldoPendiente + pagoEliminado.Monto - pagoEliminado.montoPagadoIgtf;
//     const newPagos = pagos.filter((_, i) => i !== id);
//     setPagos(newPagos);
//     setSaldoPendiente(nuevoSaldoPendiente);
//   };

//   const handleReset = () => {
//     setFormaPago("");
//     setMontoPagado(0);
//     setSaldoPendiente(monto);
//     setVuelto(0);
//     setPagos([]);
//     setEditIndex(null);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed inset-0 z-10 overflow-y-auto"
//         onClose={closeModal}
//       >
//         <div className="min-h-screen flex items-center justify-center px-4">
//           <Transition.Child
//             as="div"
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="fixed inset-0 bg-black/50" />
//           </Transition.Child>

//           <Transition.Child
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//             className="p-6 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all"
//           >
//             <div>
//               <h5 className="text-lg font-semibold mb-4">Agregar Pago</h5>

//               <label className="block font-semibold mb-2">
//                 Instrumento de pago:
//                 {data && (
//                   <select
//                     value={formaPago ? formaPago : ""}
//                     onChange={handleFormaPagoChange}
//                     disabled={saldoPendiente === 0}
//                     className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="">Seleccionar forma de pago</option>
//                     {data.map((item) => (
//                       <option key={item.codtarj} value={item.descrip}>
//                         {item.descrip}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               </label>

//               <label className="block font-semibold mb-2">
//                 Monto a pagar:
//                 <input
//                   disabled={!formaPago || saldoPendiente === 0}
//                   type="number"
//                   name="montoPagar"
//                   value={montoPagado}
//                   min="1"
//                   step="0.01"
//                   onChange={handleMontoPagadoChange}
//                   className={`block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
//                     !formaPago ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 />
//               </label>

//               <button
//                 onClick={handleAgregarPago}
//                 className={`w-full py-2 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 ${
//                   saldoPendiente === 0 ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 disabled={saldoPendiente === 0}
//               >
//                 {editIndex !== null ? "Editar pago" : "Agregar pago"}
//               </button>

//               <button
//                 onClick={handleSubmit}
//                 disabled={saldoPendiente > 0}
//                 className={`w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 ${
//                   saldoPendiente > 0 ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 Procesar Pago
//               </button>

//               <div className="mt-4">
//                 <p>Saldo pendiente: <div className="text-red-600 font-bold">Bs {saldoPendiente.toFixed(2)} / $ {(saldoPendiente/dolar).toFixed(2)} </div> </p>
//                 <p>Vuelto: {vuelto.toFixed(2)}</p>
//                 <h6 className="font-semibold">Pagos realizados:</h6>
//                 <ul>
//                   {pagos.map((pago, index) => (
//                     <li key={index}>
//                       <div className="flex justify-between items-center p-2 border-b border-gray-900/10">
//                         <div className="text-gray-700 w-32 p-2">
//                           {pago.Descripcion}
//                         </div>
//                         <div className="text-gray-700 w-32 p-2">
//                            {pago.montoPagado.toFixed(2)}
//                         </div>
//                         <div className="text-gray-700 w-32 p-2">
//                           {pago.montoIgtf
//                             ? `(+ IGTF: ${pago.montoIgtf.toFixed(2)})`
//                             : ""}
//                         </div>
//                         <div className="text-gray-700 w-32 p-2 flex">
//                           <button
//                             className="rounded-md bg-yellow-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-yellow-600 mr-2"
//                             onClick={() => handleEditPago(index)}
//                           >
//                             Editar
//                           </button>

//                           <button
//                             className="rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600"
//                             onClick={() => deleteItemHandler(index)}
//                           >
//                             <Delete />
//                           </button>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//                 <button
//                   onClick={handleReset}
//                   className="w-full mt-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600"
//                 >
//                   Reiniar 
//                 </button>
//               </div>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }

// export default PagoFactura;
import { useState, useEffect, useCallback, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useInstrumentoPago } from "../../hooks/useInstrumentoPago";
import convertirFecha from "../../helpers/convertirFecha";
import { Delete } from "../../assets";

const date = new Date();
const fechaA = convertirFecha(date);

function PagoFactura({ monto, onSubmit, isOpen, setIsOpen, dolar }) {
  const [formaPago, setFormaPago] = useState("");
  const [montoPagado, setMontoPagado] = useState(0);
  const [saldoPendiente, setSaldoPendiente] = useState(monto);
  const [vuelto, setVuelto] = useState(0);
  const [pagos, setPagos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const { data, loading, error, getIntrumentoPago } = useInstrumentoPago();
  const tasaCambio = dolar;
  const igftRate = 0.03;

  useEffect(() => {
    getIntrumentoPago();
  }, [getIntrumentoPago]);

  useEffect(() => {
    setSaldoPendiente(monto);
    setPagos([]);
    setVuelto(0);
  }, [monto]);

  const handleFormaPagoChange = useCallback((e) => {
    setFormaPago(e.target.value);
  }, []);

  const handleMontoPagadoChange = useCallback((e) => {
    const value = parseFloat(e.target.value);
    setMontoPagado(isNaN(value) ? "" : value);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleAgregarPago = useCallback(() => {
    if (montoPagado > 0) {
      let montoPagadoFinal = montoPagado;
      let montoIgtf = 0;
      let montoPagadoIgtf = 0;
      let moneda = "BS";
      let tipoCambio = "";
      let montoIgtfBs = 0;

      if (formaPago === "Efectivo Divisa") {
        moneda = "USD";
        tipoCambio = tasaCambio;
        montoIgtf = montoPagado * igftRate;
        montoPagadoIgtf = montoIgtf * tasaCambio;
        montoPagadoFinal = tasaCambio * montoPagado;
        montoIgtfBs = montoPagado * tasaCambio;
      }

      const nuevoSaldoPendiente = parseFloat(
        (saldoPendiente - montoPagadoFinal + montoPagadoIgtf).toFixed(2)
      );

      const pago = {
        Descripcion: formaPago,
        Fecha: fechaA,
        Forma: formaPago.codtarj,
        montoPagado,
        montoPagadoIgtf,
        montoIgtf,
        Monto: montoPagadoFinal,
        Moneda: moneda,
        montoIgtfBs,
        TipoCambio: tipoCambio,
      };

      if (editIndex !== null) {
        const newPagos = [...pagos];
        newPagos[editIndex] = pago;
        setPagos(newPagos);
        setEditIndex(null);
      } else {
        setPagos((prevPagos) => [...prevPagos, pago]);
      }

      if (nuevoSaldoPendiente >= 0) {
        setSaldoPendiente(nuevoSaldoPendiente);
        setVuelto(0);
      } else {
        setSaldoPendiente(0);
        setVuelto(Math.abs(nuevoSaldoPendiente));
      }

      setMontoPagado(0);
      setFormaPago("");
    } else {
      alert("Monto inválido o excede el saldo pendiente");
    }
  }, [montoPagado, formaPago, tasaCambio, igftRate, saldoPendiente, pagos, editIndex]);

  const handleSubmit = useCallback(() => {
    const formasPago = {
      pagos,
    };
    onSubmit(formasPago);
    setIsOpen(false);
  }, [pagos, onSubmit, setIsOpen]);

  const handleEditPago = useCallback((index) => {
    const pago = pagos[index];
    setMontoPagado(pago.montoPagado);
    setFormaPago(pago.Descripcion);
    setEditIndex(index);
  }, [pagos]);

  const deleteItemHandler = useCallback((id) => {
    const pagoEliminado = pagos[id];
    const nuevoSaldoPendiente =
      saldoPendiente + pagoEliminado.Monto - pagoEliminado.montoPagadoIgtf;
    const newPagos = pagos.filter((_, i) => i !== id);
    setPagos(newPagos);
    setSaldoPendiente(nuevoSaldoPendiente);
  }, [pagos, saldoPendiente]);

  const handleReset = useCallback(() => {
    setFormaPago("");
    setMontoPagado(0);
    setSaldoPendiente(monto);
    setVuelto(0);
    setPagos([]);
    setEditIndex(null);
  }, [monto]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
        <div className="min-h-screen flex items-center justify-center px-4">
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="p-6 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all"
          >
            <div>
              <h5 className="text-lg font-semibold mb-4">Agregar Pago</h5>

              <label className="block font-semibold mb-2">
                Instrumento de pago:
                {data && (
                  <select
                    value={formaPago}
                    onChange={handleFormaPagoChange}
                    disabled={saldoPendiente === 0}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Seleccionar forma de pago</option>
                    {data.map((item) => (
                      <option key={item.codtarj} value={item.descrip}>
                        {item.descrip}
                      </option>
                    ))}
                  </select>
                )}
              </label>

              <label className="block font-semibold mb-2">
                Monto a pagar:
                <input
                  disabled={!formaPago || saldoPendiente === 0}
                  type="number"
                  name="montoPagar"
                  value={montoPagado}
                  min="1"
                  step="0.01"
                  onChange={handleMontoPagadoChange}
                  className={`block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                    !formaPago ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </label>

              <button
                onClick={handleAgregarPago}
                className={`w-full py-2 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 ${
                  saldoPendiente === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={saldoPendiente === 0}
              >
                {editIndex !== null ? "Editar pago" : "Agregar pago"}
              </button>

              <button
                onClick={handleSubmit}
                disabled={saldoPendiente > 0}
                className={`w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 ${
                  saldoPendiente > 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Procesar Pago
              </button>

              <div className="mt-4">
                <p>Saldo pendiente: <div className="text-red-600 font-bold">Bs {saldoPendiente.toFixed(2)} / $ {(saldoPendiente/dolar).toFixed(2)} </div> </p>
                <p>Vuelto: {vuelto.toFixed(2)}</p>
                <h6 className="font-semibold">Pagos realizados:</h6>
                <ul>
                  {pagos.map((pago, index) => (
                    <li key={index}>
                      <div className="flex justify-between items-center p-2 border-b border-gray-900/10">
                        <div className="text-gray-700 w-32 p-2">
                          {pago.Descripcion}
                        </div>
                        <div className="text-gray-700 w-32 p-2">
                           {pago.montoPagado.toFixed(2)}
                        </div>
                        <div className="text-gray-700 w-32 p-2">
                          {pago.montoIgtf
                            ? `(+ IGTF: ${pago.montoIgtf.toFixed(2)})`
                            : ""}
                        </div>
                        <div className="text-gray-700 w-32 p-2 flex">
                          <button
                            className="rounded-md bg-yellow-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-yellow-600 mr-2"
                            onClick={() => handleEditPago(index)}
                          >
                            Editar
                          </button>

                          <button
                            className="rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600"
                            onClick={() => deleteItemHandler(index)}
                          >
                            <Delete />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleReset}
                  className="w-full mt-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600"
                >
                  Reiniar 
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PagoFactura;

