import axios from "axios";
import { addInvoice } from "../redux/features/invoiceSlice";
import { onLogout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import {
  getToken,
  handleApiResponse,
  useSetupAxiosInterceptors,
  getEnvVariable
} from "../helpers";
import { useDispatch, useSelector } from "react-redux";

export const useInvoiceStore = () => {
   
  const { VITE_SANIT_API_URL } = getEnvVariable();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {numeroControl}= useSelector((state)=> state.invoice)
  useSetupAxiosInterceptors(dispatch)

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

  const invoicePost = (data) => async (dispatch) => {
    console.log(data);
    const {
      //Datos en BS
      addresCustomer,
      codCustomer,
      customerEmail,
      customerName,
      customerTlf,
      customerType,
      codVend,
      dolar,
      invoiceNumber,
      selectedDate,
      numeroControl,
      subtotal,
      subTotal,
      subtotalConIVA,
      subtotalExento,
      tax,
      totalAPagar,
      datosPago,
      items,
      total,
      fechaA,
      fechaB,
      //Valores en dolares
      refBaseIm,
      refBaseExento,
      refDescueto,
      refSubtotal,
      refIva,
      refTotal,
      refIgtf,
      refTotalAPagar,
    } = data;
    const Items = data.items.map((item) => ({
      codUbic: item.codUbic,
      codVend: item.codVend,
      descrip1: item.descrip1,
      priceO: item.priceO,
      precio: item.precio,
      cantidad: item.cantidad,
      mtoTax: item.mtoTax,
    }));
    const payments = data.datosPago.pagos.map((dato) => ({
      monto: dato.montoPagado,
      codTarj: "-EFE-",
      fechae: dato.Fecha,
      descrip: dato.Descripcion,
    }));

    const invoiceData = [
      {
        invoice: {
          numerod: invoiceNumber,
          nroCtrol: numeroControl,
          codClie: codCustomer,
          codUbic: "DP01",
          codVend: codVend,
          credito: total,
          descrip: customerName,
          direc1: addresCustomer,
          direc2: "Maracaibo, Venezuela",
          factor: dolar,
          fechaE: fechaA,
          fechaV: fechaB,
          Id3: codCustomer,
          monto: total,
          montomex: dolar,
          mtoTax: subtotalConIVA,
          mtoTotal: total,
          saldoAct: total,
          telef: customerTlf,
          texento: 0,
          tgravable: subtotal,
          tipoCli: customerType,
          tipoFac: "A",
          totalSrv: subtotal,
          //  debito: 0,
          //* cuando intento ingresar codEsta explota
          //codesta: "MQFERNANDO"
          //terminal: "MQFERNANDO",
        },
        Items,
        payments,
      },
    ];
    dispatch(addInvoice({ invoiceData: invoiceData }));
    let config = {
      method: "post",
      url: `${VITE_SANIT_API_URL}adm/invoice`,
      headers: {
        "Content-Type": "application/json",
        Pragma: getToken(),
      },
      data: invoiceData,
    };

    console.log(config);
    axios(config)
      .then((response) => {
        console.log(response);
        const resultado = handleApiResponse(response, "Saint");
        if (resultado) {
          console.log(JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { invoicesGet, getInvoce, invoicePost };
};
