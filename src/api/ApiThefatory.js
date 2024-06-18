// //* listo
import axios from "axios";
import {
  formatearFechaTheFactory,
  getEnvVariable,
  getTokenTheFactory,
  handleApiResponse,
  roundToTwoDecimalPlaces,
  separarIndiceNumero,
} from "../helpers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setNumeroControl } from "../redux/features/invoiceSlice";
import { useDispatch } from "react-redux";
import theFactoryApi from "./theFactoryApi";
import { useInvoiceStore } from "../hooks";

export const ApiTheFatory = () => { 
  const { VITE_THEFACTORY_USUARIO, VITE_THEFACTORY_CLAVE } = getEnvVariable();
  const { invoicePost} = useInvoiceStore();
  const dispatch = useDispatch();
  const Autenticacion = () => {
    return axios
      .post(
        "/api/Autenticacion",
        {
          usuario: VITE_THEFACTORY_USUARIO,
          clave: VITE_THEFACTORY_CLAVE,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem(
            "TokenTheFactory",
            JSON.stringify(response.data.token)
          );
          return response.data; // Devolver los datos de la respuesta
        } else {
          throw new Error("No se recibió un token en la respuesta");
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };


  const Emision = createAsyncThunk(
    "invoice/Emision",
    async (data, { rejectWithValue }) => {
      const {
        invoiceNumber,
        codCustomer,
        customerName,
        customerTlf,
        addresCustomer,
        customerEmail,
        fechaA,
        datosPago,

        //Valores en Bs
        subtotalImponible,
        subtotalExento,
        discountRate,
        subTotal,
        subtotalConIVA,
        total,
        totalMontoIgtf,
        totalAPagar,

        //Valores en dolares
        dolar,
        refBaseIm,
        refBaseExento,
        refDescueto,
        refSubtotal,
        refIva,
        refTotal,
        refIgtf,
        refTotalAPagar,
      } = data;
      const { fecha, hora } = formatearFechaTheFactory(fechaA);
      const { indice, numero } = separarIndiceNumero(codCustomer);
      console.log(data);

      const DetallesItems = data.items.map((item) => ({
        NumeroLinea: "1",
        CodigoCIIU: null,
        CodigoPLU: item.codItem,
        IndicadorBienoServicio: "1",
        Descripcion: item.descrp,
        Cantidad: roundToTwoDecimalPlaces(item.unidades),
        UnidadMedida: "10",
        PrecioUnitario: "10.00",
        PrecioUnitarioDescuento: null,
        MontoBonificacion: null,
        DescripcionBonificacion: null,
        DescuentoMonto: null,
        PrecioItem: roundToTwoDecimalPlaces(item.precio),
        CodigoImpuesto: "E",
        TasaIVA: "16",
        ValorIVA: roundToTwoDecimalPlaces(item.imp),
        ValorTotalItem: roundToTwoDecimalPlaces(item.total),
        InfoAdicionalItem: [],
        ListaItemOTI: null,
      }));

      const theFactory = {
        DocumentoElectronico: {
          Encabezado: {
            IdentificacionDocumento: {
              TipoDocumento: "01",
              NumeroDocumento: "1694",
              TipoProveedor: null,
              TipoTransaccion: "01",
              FechaEmision: fecha,
              HoraEmision: hora,
              Anulado: false,
              Serie: "",
              TipoDePago: "CONTADO",
              TipoDeVenta: "BS",
              Moneda: "VEF",
              Sucursal: "00000",
              RegimenEspTributacion: "",
            },
            Vendedor: null,
            Comprador: {
              TipoIdentificacion: indice,
              NumeroIdentificacion: numero,
              RazonSocial: customerName,
              Direccion: addresCustomer,
              Ubigeo: null,
              Pais: "VE",
              Notificar: null,
              Telefono: [customerTlf],
              Correo: ["eiasistemas.desarrollo@gmail.com"],
              OtrosEnvios: null,
            },
            SujetoRetenido: null,
            Tercero: null,
            Totales: {
              NroItems: "2",
              MontoGravadoTotal: roundToTwoDecimalPlaces(subtotalImponible),
              MontoExentoTotal: roundToTwoDecimalPlaces(subtotalExento),
              Subtotal: roundToTwoDecimalPlaces(subTotal),
              TotalAPagar: roundToTwoDecimalPlaces(totalAPagar),
              TotalIVA: roundToTwoDecimalPlaces(subtotalConIVA),
              MontoTotalConIVA: roundToTwoDecimalPlaces(total),
              MontoEnLetras: null,
              TotalDescuento: roundToTwoDecimalPlaces(discountRate),
              ListaDescBonificacion: [
                {
                  DescDescuento: "",
                  MontoDescuento: roundToTwoDecimalPlaces(discountRate),
                },
              ],
              ImpuestosSubtotal: [
                {
                  CodigoTotalImp: "E",
                  AlicuotaImp: "00.00",
                  BaseImponibleImp: "000",
                  ValorTotalImp: "00.00",
                },
                {
                  CodigoTotalImp: "IGTF",
                  AlicuotaImp: "3.00",
                  BaseImponibleImp: roundToTwoDecimalPlaces(total),
                  ValorTotalImp: roundToTwoDecimalPlaces(totalMontoIgtf),
                },
                {
                  CodigoTotalImp: "G",
                  AlicuotaImp: "16.00",
                  BaseImponibleImp: roundToTwoDecimalPlaces(subtotalImponible),
                  ValorTotalImp: roundToTwoDecimalPlaces(subtotalConIVA),
                },
              ],
              datosPago,
            },
            TotalesRetencion: null,
            TotalesOtraMoneda: {
              Moneda: "USD",
              TipoCambio: roundToTwoDecimalPlaces(dolar),
              MontoGravadoTotal: roundToTwoDecimalPlaces(refBaseIm),
              MontoExentoTotal: roundToTwoDecimalPlaces(refBaseExento),
              Subtotal: roundToTwoDecimalPlaces(refSubtotal),
              TotalAPagar: roundToTwoDecimalPlaces(refTotalAPagar),
              TotalIVA: roundToTwoDecimalPlaces(refIva),
              MontoTotalConIVA: roundToTwoDecimalPlaces(refTotal),
              MontoEnLetras: null,
              TotalDescuento: roundToTwoDecimalPlaces(refDescueto),
              ListaDescBonificacion: [
                {
                  DescDescuento: "",
                  MontoDescuento: roundToTwoDecimalPlaces(refDescueto),
                },
              ],
              ImpuestosSubtotal: [
                {
                  CodigoTotalImp: "E",
                  AlicuotaImp: "00.00",
                  BaseImponibleImp: "0.0",
                  ValorTotalImp: "00.00",
                },
                {
                  CodigoTotalImp: "IGTF",
                  AlicuotaImp: "3.00",
                  BaseImponibleImp: roundToTwoDecimalPlaces(refTotal),
                  ValorTotalImp: roundToTwoDecimalPlaces(refIgtf),
                },
                {
                  CodigoTotalImp: "G",
                  AlicuotaImp: "16.00",
                  BaseImponibleImp: roundToTwoDecimalPlaces(refBaseIm),
                  ValorTotalImp: roundToTwoDecimalPlaces(refIva),
                },
              ],
            },
            Orden: null,
          },
          DetallesItems,
          DetallesRetencion: null,
          Viajes: null,
          InfoAdicional: [
            {
              Campo: "PDF",
              Valor:
                "{'coletilla1':'De conformidad con la Providencia Administrativa SNAT/2022/000013 publicada en la G.O.N 42.339 del 17-03-2022, este pago está sujeto al cobro adicional del 3% del Impuesto a las Grandes Transacciones Financieras (IGTF), siempre que sea pagado en moneda distinta a la del curso legal.'}",
            },
            {
              Campo: "PDF",
              Valor:
                "{'coletilla2':'Esta factura se expresa en Bolívares con su equivalente en Dólares Americanos al tipo de cambio corriente del mercado a la fecha de su emisión, según lo establecido en el articulo 13 numeral 14 de la Providencia Administrativa SNAT /20244/0071 (..) en concordancia con el artículo 128  de la Ley del Banco Central de Venezuela (BCV); artículo 25 de la Ley que establece el Impuesto al Valor Agregado (IVA) y 38 del Reglamento General de la Ley que establece el Impuesto al Valor Agregado (RLIVA).'}",
            },
            {
              Campo: "PDF",
              Valor: "{'mes': 'Enero'}",
            },
            {
              Campo: "PDF",
              Valor: "{'mega': '30'}",
            },
            {
              Campo: "PDF",
              Valor: "{'usd': '10'}",
            },
            {
              Campo: "PDF",
              Valor: "{'mes1': 'Febrero'}",
            },
            {
              Campo: "PDF",
              Valor: "{'mega1': '30'}",
            },
            {
              Campo: "PDF",
              Valor: "{'usd1': '10'}",
            },
            {
              Campo: "PDF",
              Valor: "{'mes2': 'Marzo'}",
            },
            {
              Campo: "PDF",
              Valor: "{'mega2': '30'}",
            },
            {
              Campo: "PDF",
              Valor: "{'usd2': '10'}",
            },
            {
              Campo: "PDF",
              Valor: "{'mes3': 'Abril'}",
            },
            {
              Campo: "PDF",
              Valor: "{'mega3': '30'}",
            },
            {
              Campo: "PDF",
              Valor: "{'usd3': '10'}",
            },
            {
              Campo: "PDF",
              Valor: "{'mes4': 'Mayo'}",
            },
            {
              Campo: "PDF",
              Valor: "{'mega4': '30'}",
            },
            {
              Campo: "PDF",
              Valor: "{'usd4': '10'}",
            },
            {
              Campo: "PDF",
              Valor:
                "{'DomicilioServicio ':'Republica Independiente de Caricuao'}",
            },
          ],
          GuiaDespacho: null,
          Transporte: null,
          EsLote: null,
          EsMinimo: null,
        },
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/api/Emision",
        headers: {
          Authorization: getTokenTheFactory(),
          "Content-Type": "application/json",
        },
        data: theFactory,
      };
      console.log(config);
     return  axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          const resultado = handleApiResponse(response , "The Factory");
        //   if (resultado) {
        //     const numeroControl = response.data.resultado.numeroControl;     
        //     dispatch(setNumeroControl(numeroControl));  
        //  //   dispatch(invoicePost(data))  

        //   }
          return resultado.numeroControl
        })
        .catch((error) => {
          console.log(error.response.data);
          return rejectWithValue(error.response.data);
        });
    }
  );

  return { Autenticacion, Emision };
};

export default ApiTheFatory;
