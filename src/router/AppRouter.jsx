import "../index.css";
import {
  Customer,
  Cxc,
  Facturacion,
  Home,
  Login,
  NotFound,
  Product,
  Services,
} from "../page";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import InvoiceForm from "../components/invoices/InvoiceForm";
import Modal from "../components/Modal";
import useAuthStore from "../hooks/useAuthStore";
import { useEffect } from "react";
import { ModalServices } from "../components/ModalServices";
import { ModalCxc } from "../components/ModalCxc";
import { Buscador } from "../components/search/Buscador";
import SearchBar from "../components/search/SearchBar";

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
            <Route path="/" element={<Login />} />+
          </>
        ) : (
          <>
            {/* Private routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/invoice" element={<Facturacion />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/product" element={<Product />} />
            <Route path="/services" element={<Services />} />
            <Route path="/cxc" element={<Cxc />} />

            <Route path="/modal-edit/:id" element={<Modal />} />
            <Route
              path="/modal-edit/servicio/:id"
              element={<ModalServices />}
            />
            <Route path="/modal-edit/cxc/:id" element={<ModalCxc />} />
            <Route path="/modal-post" element={<Modal />} />
            <Route path="/invoice/invoiceForm" element={<InvoiceForm />} />
            <Route
              path="/invoice/invoiceForm/:id/:codclie"
              element={<InvoiceForm />}
            />
            <Route path="/notFound" element={<NotFound />} />
            <Route path="/search" element={<Buscador />} />
            <Route path="/searchBar" element={<SearchBar />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
