import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Plus, Xmark } from "../assets";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { useCxcStore } from "../hooks";

export default function Modal({ fields, data = [], onClose, tableName }) {
  const { putAccountReceivable } = useCxcStore();
  const navigate = useNavigate()
  const [formData, setFormData] = useState([]);
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(true);
 console.log(data);
  useEffect(() => {
    if (data.length === 0 || data.length === undefined) {
      // Si no se encontraron datos, redirigir al usuario a la página anterior
    //navigate(-1);
    } 
    if (!!data && data.length > 0) {
      const dataNew = fields.map((field) => {
        return {
          ...field,
          value: data[0][field.name],
        };
      });
      setFormData(dataNew);
    }
  }, [data]);

  const handleChange = (e) => {
    const dataEdit = formData.map((item) => {
      if (item.name === e.target.name) {
        return {
          ...item,
          value: e.target.value,
        };
      }
      return item;
    });
    setFormData(dataEdit);
  };

  console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = formData.reduce((accumulator, field) => {
      accumulator[field.name] = field.value;
      return accumulator;
    }, {});
    
    console.log(formDataToSend);
    switch (tableName) {
      case "servicio":
        break;

      case "cxc":
     //  dispatch(putAccountReceivable(formDataToSend));
        break;

      case "factura":
        break;

      default:
        console.error("Tipo de dato no válido");
        return;
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
         onClose();
        }}
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
                    Editar Datos
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                       setOpen(false);
                          onClose();
                     }}
                  >
                    <Xmark />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                  {formData.map((field, index) => {
                    return (
                      <div key={index}>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          {field.label}
                        </label>
                        <input
                          className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          type="text"
                          name={field.name}
                          value={field.value}
                          onChange={handleChange}
                        />
                      </div>
                    );
                  })}

                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <Plus />
                    Guardar Cambios
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

// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useEffect, useRef, useState } from "react";
// import { Plus, Xmark } from "../assets";
// import { useCxcStore } from "../hooks";
// import { useDispatch } from "react-redux";

// export default function Modal({ fields, data, onClose, tableName }) {
//   const dispatch = useDispatch();
//   const cancelButtonRef = useRef(null);
//   console.log(data);
//   console.log(fields);
//   //const [formData, setFormData] = useState(data);
//   const [formData, setFormData] = useState();
//   const { putAccountReceivable } = useCxcStore();

//   useEffect(() => {
//     setFormData(data);
//   }, [data]);

//   console.log(formData);
//   const handleChange = (e) => {
//   //  console.log(formData);
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     switch (tableName) {
//       case "servicio":
//         break;
//       case "cxc":
//         dispatch(putAccountReceivable(formData));
//         //  console.log(data);
//         break;
//       case "factura":
//         apiUrl = "URL_DEL_API_PARA_FACTURAS";
//         break;
//       default:
//         console.error("Tipo de tabla no válido");
//         return;
//     }
//   };

//   return (
//     <Transition.Root show={true} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed z-10 inset-0 overflow-y-auto"
//         initialFocus={cancelButtonRef}
//         onClose={onClose}
//       >
//         <div className="flex items-center justify-center min-h-screen">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
//           </Transition.Child>

//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             enterTo="opacity-100 translate-y-0 sm:scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//           >
//             <div className="relative bg-white rounded-lg p-6 sm:p-8 max-w-md w-full mx-auto">
//               <div className="absolute top-0 right-0">
//                 <button
//                   ref={cancelButtonRef}
//                   className="text-gray-400 hover:text-gray-500"
//                   onClick={onClose}
//                 >
//                   <Xmark />
//                   <span className="sr-only">Close modal</span>
//                 </button>
//               </div>
//               <h3 className="text-lg font-semibold mb-4">{`Editar ${tableName}`}</h3>
//               <form onSubmit={handleSubmit}>
//                 {fields.map((field, index) => (
//                   <div key={index} className="mb-4">
//                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                       {field.label}
//                     </label>
//                     <input
//                       type="text"
//                       name={field.name}
//                       //value={item[fields[index].name]}

//                       // value={}
//                       // value={}
//                       value={formData[field.name] || ""}
//                       onChange={handleChange}
//                       className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="submit"
//                   className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                 >
//                   <Plus />
//                   {`Guardar Cambios ${tableName}`}
//                 </button>
//               </form>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }
