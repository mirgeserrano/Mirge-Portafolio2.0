import axios from "axios";
import {  getEnvVariable, handleApiResponse,} from "../helpers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";

const useApiFibre = () => {
  const { VITE_FIBRE_TOKEN }=getEnvVariable

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//*llama a todas las facturas
  const GetInvoices = async () => {
    setLoading(true);
    setError(null);
    let forma = JSON.stringify({
      token: "MHZkaURaTk5IUG1FdEt4ZEh4b2VHQT09",
      limit: 1700,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/home/api/v1/GetInvoices`, // Utilizar la URL base de la API
      headers: {
        "Content-Type": "application/json",
      },
      data: forma,
    };

    try {
      const response = await axios(config);
      setData(response.data.facturas);
      return response.data.facturas; // Retornar la respuesta si es necesario
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      throw error; // Lanzar el error si es necesario
    } finally {
      setLoading(false);
    }
  };


  const processInvoices = async (page, pageSize) => {
    setLoading(true);
    setError(null);
    const token = "MHZkaURaTk5IUG1FdEt4ZEh4b2VHQT09";
    const estado = 1;
    const limit = 200;
    const offset = (page - 1) * pageSize;
  
    const requestData = JSON.stringify({
      token,
      estado,
      limit,
      offset,
    });
  
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/home/api/v1/GetInvoices",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestData,
    };
  
    try {
      const response = await axios(config);
      const invoices = response.data.facturas;
  
      // Obtener los detalles de cliente para todas las facturas en paralelo
      const clientDetailsPromises = invoices.map(async (invoice) => {
        const clientData = JSON.stringify({
          token,
          idcliente: invoice.idcliente,
        });
        
        const configClient = {
          method: "post",
          maxBodyLength: Infinity,
          url: "/home/api/v1/GetClientsDetails",
          headers: {
            "Content-Type": "application/json",
          },
          data: clientData,
        };
        
        const clientResponse = await axios(configClient);
        return clientResponse.data.datos[0];
      });
  
      // Esperar a que todas las promesas de detalles de cliente se resuelvan
      const clientDetails = await Promise.all(clientDetailsPromises);
  
      // Asignar los detalles de cliente a las facturas correspondientes
      invoices.forEach((invoice, index) => {
        invoice.clientDetails = clientDetails[index];
      });
      setLoading(false);
      return invoices;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      throw error;
    }
  };
  

  // *Regitra las facturas en Fibre
  const paymetInvoice = createAsyncThunk(
    "paymetInvoice",
    async (resp, { rejectWithValue }) => {
      console.log(resp);
      const {
        invoiceNumber,
        totalAPagar,
        fechaA,
        numerod,
      } = resp;

      let data = JSON.stringify({
        token: "MHZkaURaTk5IUG1FdEt4ZEh4b2VHQT09",
        idfactura: invoiceNumber,
        pasarela: "Paypal",
        cantidad: totalAPagar,
        comision: 0,
        idtransaccion: "",
        legal: numerod,
        fecha: fechaA,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/home/api/v1/PaidInvoice",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      console.log(config);
      axios
        .request(config)
        .then((response) => {
          console.log(response);
          const resultado = handleApiResponse(response, "Fibre");
          if (resultado) {
            return resp; // Devolver el número de control
          }
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue(error.response.data);
        });
    }
  );

  const postClientsDetail = async ({ idcliente }) => {
    console.log("ID Cliente:", idcliente);
    const forma = JSON.stringify({
      token: "MHZkaURaTk5IUG1FdEt4ZEh4b2VHQT09",
      idcliente: idcliente,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/home/api/v1/GetClientsDetails`,
      headers: {
        "Content-Type": "application/json",
      },
      data: forma,
    };

    console.log("Config:", config);

    try {
      const response = await axios(config);
      console.log("Response Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      throw error;
    }
  };

  
  //*llama una factura con su cliente
 

  return {
    data,
    loading,
    error,
    GetInvoices,
    getInvoiceFibre,
    postClientsDetail,
    paymetInvoice,
    processInvoices,
  };
};

export default useApiFibre;

export const getInvoiceFibre = createAsyncThunk(
  "getInvoiceFibre",
  async (params, { rejectWithValue }) => {
    const id = params.id;
    const idcliente = params.codclie;
    const invoiceData = JSON.stringify({
      token: "MHZkaURaTk5IUG1FdEt4ZEh4b2VHQT09",
      idfactura: id,
    });

    const clientData = JSON.stringify({
      token: "MHZkaURaTk5IUG1FdEt4ZEh4b2VHQT09",
      idcliente: idcliente,
    });

    const configInvoice = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/home/api/v1/GetInvoice",
      headers: {
        "Content-Type": "application/json",
      },
      data: invoiceData,
    };

    const configClient = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/home/api/v1/GetClientsDetails",
      headers: {
        "Content-Type": "application/json",
      },
      data: clientData,
    };

    try {
      // Realiza ambas solicitudes en paralelo
      const [invoiceResponse, clientResponse] = await Promise.all([
        axios(configInvoice),
        axios(configClient),
      ]);

       //console.log("Invoice Response Data:", invoiceResponse.data);
    
      const invoice = invoiceResponse.data;
      const client = clientResponse.data;
      return {
        invoice,
        client,
      };
    } catch (error) {
      console.error("Error al realizar las solicitudes:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
