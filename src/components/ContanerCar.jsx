import { useState } from "react";
import Tarjeta from "./Tarjeta";

const ContanerCar = () => {
  const [datos, setDatos] = useState([
    {
      imagen: "Foto.jpg",
      titulo: "FactuPro",
      empresa: "EiA sitemas",
      colorFondo: "#E9F8FF",
    },
    {
      imagen: "Foto.jpg",
      titulo: "POV",
      empresa: "noCountry",
      colorFondo: "#FFF0F8",
    },
    {
      imagen: "imagen3.webp",
      titulo: "MiFinanzas",
      empresa: "noCountry",
      colorFondo: "#FCF4FF",
    },
    {
      imagen: "imagen3.webp",
      titulo: "Bienes raíces",
      empresa: "Educativo",
      colorFondo: "#E9F8FF",
    },
    {
      imagen: "imagen3.webp",
      titulo: "Calendario",
      empresa: "Educativo",
      colorFondo: "#FFFDF5",
    },

  ]);
  console.log();
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {datos.map((dato) => (
        <Tarjeta
          key={dato.imagen}
          srcImagen={dato.imagen}
          altImagen={dato.titulo}
          titulo={dato.titulo}
          empresa={dato.empresa}
          colorFondo={dato.colorFondo}
        />
      ))}
    </div>
  );
};

export default ContanerCar;
