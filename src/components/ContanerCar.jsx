import { useState } from "react";
import Tarjeta from "./Tarjeta";
import lgofactupro from "../assets/images/LogoFactuPro.png";
import logofinaza from "../assets/images/LogoFinanza.png";
import logopov from "../assets/images/LogoPov.png";

const ContanerCar = () => {
  const [datos, setDatos] = useState([
    {
      id: "1",
      imagen: lgofactupro,
      titulo: "FactuPro",
      empresa: "EiA sitemas",
      colorFondo: "#E9F8FF",
    },
    {
      id: "2",
      imagen: logopov,
      titulo: "POV",
      empresa: "noCountry",
      colorFondo: "#FFF0F8",
    },
    {id: "3",
      imagen: logofinaza,
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
          id={dato.id}
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
