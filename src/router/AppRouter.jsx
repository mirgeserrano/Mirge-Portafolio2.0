import "../index.css";

import { Route, Routes } from "react-router-dom";

import { Facturacion } from "../page/Facturacion";
import { Home } from "../page/Home";
import InvoiceForm from "../components/invoices/InvoiceForm";
import Login from "../page/Login";
import Modal from "../components/Modal";
import Product from "../page/Product";
import { Search } from "../components/search";
import { Toaster } from "react-hot-toast";

//import { InvoiceForm } from "../components/invoices";

//import Prueba from "../components/MyComponent";
//import { Search } from "../components/search/Search";

const AppRouter = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/invoice" element={<Facturacion />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/modal-edit/:id" element={<Modal />}></Route>
        <Route path="/modal-post" element={<Modal />}></Route>
        <Route path="/prueba" element={<Search />}></Route>
        <Route
          path="/invoice/invoiceForm/:id/:codclie"
          element={<InvoiceForm />}
        ></Route>

        {/* Private routes */}
      </Routes>
    </>
  );
};

export default AppRouter;
