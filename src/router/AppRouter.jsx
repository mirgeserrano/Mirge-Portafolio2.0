
import DetalleTarjeta from "../components/DetalleTajeta";
import { About, Contact, Resume, Work } from "../components/NavbarBox";
import "../index.css";
import AppLayouts from "../layouts/AppLayouts";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayouts />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detalle/:id" element={<DetalleTarjeta />} />
      </Routes>
      
    </>
  );
};

export default AppRouter;
