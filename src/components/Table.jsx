
//*depende de servicio ,producto, cuenta por pagar

import { Delete, InvoicesTrue } from "../assets";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useCxcStore } from "../hooks";
import { useDispatch } from "react-redux";
import { useServicesStore } from "../hooks/useServicesStore";
import { useState } from "react";
import ModalConfimation from "./ModalConfimation";
import Pencil from "../assets/Pencil";

export const Table = ({ data, fields, codeMappings, tableName }) => {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { deleteServices } = useServicesStore();
  const { deleteAccountReceivable } = useCxcStore();
  
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

  return (
    <div className="flex flex-col shadow-sm h-screen  ">
      <div className=" p-2 flex place-content-between rounded-lg bg-[#BFE1D5] h-12">
        {fields.map((field, index) => (
          <div className="font-semibold text-gray-700" key={index}>
            <div className="">{field.label}</div>
          </div>
        ))}
        <div className="font-semibold text-gray-700">Acciones</div>
      </div>

      {data &&
        data.map((table, index) => {
          const fieldName = codeMappings;
          return (
            <div
              className="flex place-content-between items-center p-2 bg-slate-200 "
              key={table.id}
            >
              {fields.map((field, index) => (
                <div className="text-gray-700 w-32 p-2 " key={index}>
                  {table[field.name]}
                </div>
              ))}
              <div className="flex place-content-between">
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
