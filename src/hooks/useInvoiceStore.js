import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariable";
import { addInvoice } from "../redux/features/invoiceSlice";
import { onLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const { VITE_SANIT_API_URL } = getEnvVariable();

export const useInvoiceStore = () => {
  const pragma = localStorage.getItem("userInfo");
  const sinComillas = pragma.replace(/"/g, "");
  const navigate = useNavigate();

  const invoicesGet = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/invoices/?tipofac=A`,
      headers: {
        Pragma: sinComillas,
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
  const Invoce = (params) => async (dispatch) => {
    const numerod = params.id;
    let config1 = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/invoices/?numerod=${numerod}&tipofac=A`,
      headers: {
        Pragma: sinComillas,
      },
    };
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${VITE_SANIT_API_URL}adm/invoiceitems?numerod=${numerod}&tipofac=A`,
      headers: {
        Pragma: sinComillas,
      },
    };

    try {
      const items = await axios.request(config);
      const itemInvoce = items.data;
      dispatch(addInvoice({ itemData: itemInvoce }));
      return items.data;
    } catch (itemsError) {
      if (itemsError.response && itemsError.response.status === 403) {
        console.log("La sesión ha expirado para la solicitud de items");
        dispatch(onLogout("La sesión ha expirado para la solicitud de items"));
        navigate("/");
      } else {
        console.log("Error en la solicitud de items:", itemsError.message);
      }
    }

    try {
      const invoces = await axios.request(config1);
      const invoce = invoces.data;
      dispatch(addInvoice({ invoiceData: invoce }));
    } catch (invocesError) {
      if (invocesError.response && invocesError.response.status === 403) {
        console.log("La sesión ha expirado para la solicitud de invoces");
      } else {
        console.log("Error en la solicitud de invoces:", invocesError.message);
      }
    }
  };

  const invoicePost =
    ({ invoiceData }) =>
    async (dispatch) => {
      const data = invoiceData;
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${VITE_SANIT_API_URL}adm/invoice`,
        headers: {
          Pragma: sinComillas,
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    };

  return { invoicesGet, Invoce, invoicePost };
};
