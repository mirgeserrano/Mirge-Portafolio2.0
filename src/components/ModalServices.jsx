import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useServicesStore } from "../hooks/useServicesStore";
import { useNavigate, useParams } from "react-router-dom";

export const ModalServices = () => {
  const id = useParams();
  const navigate = useNavigate();
  const servicesStore = useServicesStore([]);
  const [services, setServices] = useState([]);
 
  useEffect(() => {
    servicesStore
      .getService(id)
      .then((data) => {
        if (data.length === 0 || data.length === undefined) {
          // Si no se encontraron datos, redirigir al usuario a la página anterior
          navigate('/');
        } else {
          setServices(data);
        }
        setServices(data);
      })
      .catch((error) => {
      console.log(error);
      });
  }, []);

  const tableName = "servicio";
  console.log(services);
    
  const fields = [
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
      {/* {services.length === 0 || services.length === undefined ? (
        <Modal
          fields={fields}
          data={services}
          tableName={tableName}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      ) : null} */}
      <Modal
        fields={fields}
        data={services}
        tableName={tableName}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </div>
  );
};
