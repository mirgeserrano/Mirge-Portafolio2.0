import "../index.css";
import { Facturacion, Home, Login, NotFound, Product, Services } from "../page";
import { Navigate, Route, Routes } from "react-router-dom";
import { Search } from "../components/search";
import { Toaster } from "react-hot-toast";
import InvoiceForm from "../components/invoices/InvoiceForm";
import Modal from "../components/Modal";
import useAuthStore from "../hooks/useAuthStore";
import { useEffect } from "react";
import { ModalServices } from "../components/ModalServices";

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
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {/* Private routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/invoice" element={<Facturacion />} />
            <Route path="/services" element={<Services />} />
            <Route path="/product" element={<Product />} />
            <Route path="/modal-edit/:id" element={<Modal />} />
            <Route
              path="/modal-edit/servicio/:id"
              element={<ModalServices />}
            />
            <Route path="/modal-post" element={<Modal />} />
            <Route path="/prueba" element={<Search />} />
            <Route path="/notFound" element={<NotFound />} />
            <Route
              path="/invoice/invoiceForm/:id/:codclie"
              element={<InvoiceForm />}
            />
            <Route path="/invoice/invoiceForm" element={<InvoiceForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
