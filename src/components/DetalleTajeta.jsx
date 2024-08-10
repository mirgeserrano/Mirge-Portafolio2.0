import { useState } from "react";
import {  useParams } from "react-router-dom";
import pov from "../assets/images/pov.png";
import finanza from "../assets/images/finanza.png";
import factupro from "../assets/images/factupro.png";

const DetalleTarjeta = ({ onClose }) => {
const [onclose, setonclose] = useState(false)
  const [datos] = useState([
    {
      id: "1",
      Proyecto: "FactuPro",
      Lenguaje: "React + Tailwind CSS",
      Cliente: "Un Link",
      link: "https://www.youtube.com/watch?v=hRrg5v0wMfI",
      colorFondo: "#E9F8FF",
      descripcion:
        "Este proyecto de facturación es una aplicación web diseñada para gestionar y generar facturas de manera eficiente. Proporciona funcionalidades clave para administrar clientes, productos, servicios y el ciclo de vida completo de las facturas.",
      imagen: factupro,
    },
    {
      id: "2",
      Proyecto: "POV",
      Lenguaje: "React + Tailwind CSS , Vite, Redux toolkit, Js, DaisyUi ", // Asumimos que es el mismo
      Cliente: "No Country", // Asumimos que es el mismo
      link: "https://pov-chat.netlify.app/",
      colorFondo: "#FFF0F8",
      descripcion:
        "¡Bienvenido a POV, la plataforma que transforma la interacción social! Imagina una red donde puedes conectar de manera directa y personal con tus ídolos, expertos o amigos. Con POV, puedes sumergirte en chats exclusivos y participar activamente en conversaciones significativas",
      imagen: pov,
    },
    {
      id: "3",
      Proyecto: "MiFinanzas",
      Lenguaje: "Mongo db, Nodejs", // Asumimos que es el mismo
      Cliente: "No Country", // Asumimos que es el mismo
      link: "https://mifinanz.vercel.app/",
      colorFondo: "#FCF4FF",
      descripcion: "Este proyecto fue diseñado para ayudar a llevar un control efectivo de tus finanzas personales de una manera sencilla y eficiente.",
      imagen: finanza,
    },
    {
      id: "4",
      Proyecto: "Bienes raíces",
      Lenguaje: "React + Tailwind CSS", // Asumimos que es el mismo
      Cliente: "Estudio", // Asumimos que es el mismo
      link: "",
      colorFondo: "#E9F8FF",
      descripcion: "Descripción de Bienes raíces...",
      imagen: "imagen3.webp",
    },
    {
      id: "5",
      Proyecto: "Calendario",
      Lenguaje: "React + Tailwind CSS", // Asumimos que es el mismo
      Cliente: "Estudio", // Asumimos que es el mismo
      link: "",
      colorFondo: "#FFFDF5",
      descripcion: "Descripción de Calendario...",
      imagen: "imagen3.webp",
    },
  ]);
  
  //const location = useLocation();
  const params = useParams();
  const id = params.id || {};
  console.log(params);

  // Buscar los datos de la tarjeta según el id
  const tarjeta = datos.find((item) => item.id === id);

  if (!tarjeta) {
    return <div>Datos no encontrados</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="w-full md:w-10/12 flex items-center lg:w-[850px] bg-white dark:bg-[#323232] mx-auto rounded-xl p-4 md:p-8 absolute left-1/2 top-1/2 transform -translate-x-[50%] -translate-y-[50%] shadow-lg "
        style={{ backgroundColor: tarjeta.colorFondo }}
      >
        <div className="">
          <button
            onClick={onclose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-[#ef4060] dark:hover:text-[#FA5252] text-4xl text-center font-bold">
            {tarjeta.Proyecto}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 my-6">
           
              <p className="dark:text-white flex items-center text-[15px] sm:text-lg ">
                Cliente :
                <span className="font-medium"> {tarjeta.Cliente} </span>
              </p>
              <p className="dark:text-white flex items-center text-[15px] sm:text-lg ">
                Lenguaje :
                <span className="font-medium"> {tarjeta.Lenguaje} </span>
              </p>
           
          </div>
          <p className="dark:text-white text-2line font-normal text-[15px] sm:text-sm ">
            {tarjeta.descripcion}
          </p>
          <img
            src={tarjeta.imagen}
            alt={tarjeta.titulo}
            className="rounded-lg w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default DetalleTarjeta;
