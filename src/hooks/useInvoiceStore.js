import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariable";
import { addInvoice } from "../redux/features/invoiceSlice";
import { onLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { getToken, setupAxiosInterceptors } from "../helpers";
import { useDispatch } from "react-redux";

export const useInvoiceStore = () => {
  const { VITE_SANIT_API_URL } = getEnvVariable();
  const navigate = useNavigate();
  const dispach = useDispatch()
  setupAxiosInterceptors(dispach);
  
  const invoicesGet = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/invoices/?tipofac=A`,
      headers: {
        Pragma: getToken(),
      },
    };
    try {
      const response = await axios.request(config);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //   const Invoce = (params) => async (dispatch) => {
  //     const numerod = params.id;
  //     console.log(numerod);
  //     let config1 = {
  //       method: "get",
  //       maxBodyLength: Infinity,
  //       url: `${VITE_SANIT_API_URL}adm/invoices/?numerod=${numerod}&tipofac=A`,
  //       headers: {
  //         Pragma: sinComillas,
  //       },
  //     };
  //     let config = {
  //       method: "get",
  //       maxBodyLength: Infinity,
  //       url: `${VITE_SANIT_API_URL}adm/invoiceitems?numerod=${numerod}&tipofac=A`,
  //       headers: {
  //         Pragma: sinComillas,
  //       },
  //     };

  //     try {
  //       const [items, invoces] = await Promise.all([
  //         axios.request(config),
  //         axios.request(config1),
  //       ]);
  //       const itemInvoce = items.data;
  //       const invoce = invoces.data;

  //       dispatch(addInvoice({ invoiceData: invoce, itemData: itemInvoce }));
  //       return items.data;
  //     }
  //      catch (itemsError) {
  //   if (itemsError.response && itemsError.response.status === 403) {
  //     console.log("La sesión ha expirado para la solicitud de items");
  //   } else {
  //     console.log("Error en la solicitud de items:", itemsError.message);
  //   }
  // } catch (invocesError) {
  //   if (invocesError.response && invocesError.response.status === 403) {
  //     console.log("La sesión ha expirado para la solicitud de invoces");
  //   } else {
  //     console.log("Error en la solicitud de invoces:", invocesError.message);
  //   }
  // }

  //   };
  const getInvoce = (params) => async (dispatch) => {
    const numerod = params.id;
    let config1 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/invoices/?numerod=${numerod}&tipofac=A`,
      headers: {
        Pragma: getToken(),
      },
    };
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/invoiceitems/?numerod=${numerod}&tipofac=A`,
      headers: {
        Pragma: getToken(),
      },
    };

    try {
      const items = await axios.request(config);
      const itemInvoce = items.data;
      
      console.log(itemInvoce);
      dispatch(addInvoice({ itemData: itemInvoce }));
      return items.data;
    } catch (itemsError) {
      console.log(itemsError);
      
    }

    try {
      const invoces = await axios.request(config1);
      const invoce = invoces.data;
      
      dispatch(addInvoice({ invoiceData: invoce }));
    } catch (invocesError) {
     console.log(invocesError);
    }
  };

  const invoicePost = (invoiceData) => async (dispatch) => {
    const data = invoiceData;
    console.log(data);
    let config = {
      method: "post",
      url: `${VITE_SANIT_API_URL}adm/invoice`,
      headers: {
        "Content-Type": "application/json",
        Pragma: getToken(),
      },
      data: data,
    };
    
    console.log(config);
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { invoicesGet, getInvoce, invoicePost };
};
