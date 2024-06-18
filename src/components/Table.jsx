toast//*depende de servicio ,producto, cuenta por pagar

import { Delete, InvoicesTrue } from "../assets";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useCustomerStore, useCxcStore } from "../hooks";
import { useDispatch } from "react-redux";
import { useServicesStore } from "../hooks/useServicesStore";
import { useState } from "react";
import ModalConfimation from "./ModalConfimation";
import Pencil from "../assets/Pencil";

const Table = ({ data, fields, codeMappings, tableName }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { deleteServices } = useServicesStore();
  const { deleteAccountReceivable } = useCxcStore();
  const { deleteCustomer } = useCustomerStore();

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setShowModal(true);
  };

  const handleConfirm = (id) => {
    console.log(id);
    switch (tableName) {
      case "servicio":
        dispatch(deleteServices(deleteItemId));
        break;
      case "cxc":
        console.log(deleteItemId);
        dispatch(deleteAccountReceivable(deleteItemId));
        break;
      case "factura":
        break;
      case "cliente":
            console.log(deleteItemId);
            dispatch(deleteCustomer(deleteItemId));
        break;
      default:
        console.error("Tipo de dato no válido");
        return;
    }
    toast.success("Elemento eliminado");
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

// console.log("Hostname:", window.location.hostname);
// console.log("Protocol:", window.location.protocol);
// console.log("Origen:", window.location.origin);

// const navegador = navigator.userAgent;
//  if (window.innerWidth <= 768) {
//    console.log("Es un móvil");
//  }
  return (
    <div className="flex flex-col shadow-sm">
      <div className="flex place-content-between items-center rounded-lg bg-[#8FD3F7] h-12  p-2">
        {fields.map((field, index) => (
          <div className="font-semibold text-gray-700" key={index}>
            <div className="">{field.label}</div>
          </div>
        ))}
        <div className="font-semibold text-gray-700">Acciones</div>
      </div>
      <div className="flex flex-col gap-2 py-4 ">
        {data &&
          data.map((table, index) => {
            const fieldName = codeMappings;
            return (
              <div
                className="flex place-content-between items-center p-2 border-b border-gray-900/10 "
                key={table.id}
              >
                {fields.map((field, index) => (
                  <div className="text-gray-700 w-32 p-2 " key={index}>
                    {table[field.name]}
                  </div>
                ))}
                <div className="flex place-content-between gap-2">
                  <Link to={`/modal-edit/${tableName}/${table[fieldName.cod]}`}>
                    <button className=" rounded-md bg-green-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-green-600">
                      <Pencil />
                    </button>
                  </Link>
                  <button
                    className="rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600"
                    onClick={() => handleDelete(table[fieldName.cod])}
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      {showModal && (
        <div className="modal">
          <ModalConfimation
            message="¿Estás seguro de que quieres hacer esto?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Table;
