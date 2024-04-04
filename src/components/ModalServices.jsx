import { useEffect, useState } from "react";
import Modal from "./Modal";
import { UseServicesStore } from "../hooks/UseServicesStore";
import { useNavigate, useParams } from "react-router-dom";

export const ModalServices = () => {
  const id = useParams();
  const navigate = useNavigate();
  const servicesStore = UseServicesStore([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    servicesStore
      .getAccountReceivable(id)
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = [
    { name: "codserv", label: "Codigo de Servicio" },
    { name: "descrip", label: "Nombre" },
    { name: "precio1", label: "Bolivares" },
    { name: "precioi1", label: "Otra moneda" },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <div>
      <Modal
        data={data}
        tableData={services}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </div>
  );
};
