import "../index.css";
import { Cxc, Facturacion, Home, Login, NotFound, Product, Services } from "../page";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import InvoiceForm from "../components/invoices/InvoiceForm";
import Modal from "../components/Modal";
import useAuthStore from "../hooks/useAuthStore";
import { useEffect } from "react";
import { ModalServices } from "../components/ModalServices";
import { ModalCxc } from "../components/ModalCxc";
import { Buscador } from "../components/search/Buscador";


const AppRouter = () => {
  const { status, startLoginWithEmailPassword } = useAuthStore();
  console.log(status);

  useEffect(() => {
    startLoginWithEmailPassword();
  }, []);

  if (status === "checking") {
    return <h3>cargandoooo.....</h3>;
  }
  
  return (
    <>
      <Toaster />
      <Routes>
        {status === "not-authenticated" ? (
          <>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </>
        ) : (
          <>
            {/* Private routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/invoice" element={<Facturacion />} />
            <Route path="/services" element={<Services />} />
            <Route path="/cxc" element={<Cxc />} />
            <Route path="/product" element={<Product />} />
            <Route path="/modal-edit/:id" element={<Modal />} />
            <Route
              path="/modal-edit/servicio/:id"
              element={<ModalServices />}
            />
            <Route path="/modal-edit/cxc/:id" element={<ModalCxc />} />
            <Route path="/modal-post" element={<Modal />} />

            <Route path="/notFound" element={<NotFound />} />
            <Route
              path="/invoice/invoiceForm/:id/:codclie"
              element={<InvoiceForm />}
            />
            <Route path="/invoice/invoiceForm" element={<InvoiceForm />} />
            <Route path="/search" element={<Buscador />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
