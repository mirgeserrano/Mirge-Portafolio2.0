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
const { VITE_THEFACTORY_USUARIO, VITE_THEFACTORY_CLAVE } = getEnvVariable();

export const ApiTheFatory = () => {
  const Autenticacion = () => {
    // Devolver la promesa devuelta por axios.post()
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
  const descargaArchivo = () => {
    let data = JSON.stringify({
      serie: "",
      tipoDocumento: "01",
      numeroDocumento: "1707",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/DescargaArchivo",
      headers: {
        Authorization: getTokenTheFactory(),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        //       console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { Autenticacion, descargaArchivo };
};

export default ApiTheFatory;

export const Emision = createAsyncThunk(
  "invoice/invoiceEmision",
  async (data, { rejectWithValue }) => {
    const {
     // invoiceNumber,
      codCustomer,
      customerName,
      customerTlf,
      addresCustomer,
      //customerEmail,
      fechaA,
      datosPago,

      //Valores en Bs
      subtotalImponible,
      subtotalExento,
      discountRate,
      subTotal,
      subtotalConIVA,
      total,
      totalMontoIgtfbs,
      totalMontoIgtf,
      baseIgtf,
      totalAPagar,

      //Valores en dolares
      dolarApi,
      refBaseIm,
      refBaseExento,
      refDescueto,
      refSubtotal,
      refIva,
      refTotal,
      refBaseIgtf,
      refIgtf,
      refTotalAPagar,
    } = data;
    const { fecha, hora } = formatearFechaTheFactory(fechaA);
    const { indice, numero } = separarIndiceNumero(codCustomer);
    console.log(data);
    const size = data.items.length;
    console.log(size);
    const DetallesItems = data.items.map((item, index) => ({
      NumeroLinea: index.toString(),
      CodigoCIIU: null,
      CodigoPLU: item.codItem,
      IndicadorBienoServicio: "1",
      Descripcion: item.descrp,
      Cantidad: roundToTwoDecimalPlaces(item.unidades),
      UnidadMedida: "",
      PrecioUnitario: roundToTwoDecimalPlaces(item.precio),
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
            NumeroDocumento: "1730",
            TipoProveedor: null,
            TipoTransaccion: "01",
            FechaEmision: fecha,
            HoraEmision: hora,
            Anulado: false,
            Serie: "",
            TipoDePago: "",
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
            NroItems: size.toString(),
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
                BaseImponibleImp: roundToTwoDecimalPlaces(totalMontoIgtfbs),
                ValorTotalImp: roundToTwoDecimalPlaces(baseIgtf),
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
            TipoCambio: roundToTwoDecimalPlaces(dolarApi),
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
                BaseImponibleImp: roundToTwoDecimalPlaces(totalMontoIgtf),
                ValorTotalImp:  roundToTwoDecimalPlaces(refBaseIgtf),
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
              "{'coletilla2':'En los casos en que la base imponible de la venta o prestación de servicio estuviere expresada en moneda extranjera, se establecerá la equivalencia en moneda nacional, al tipo de cambio corriente en el mercado del día en que ocurra el hecho imponible, salvo que éste ocurra en un día no hábil para el sector financiero, en cuyo caso se aplicará el vigente en el día hábil inmediatamente siguiente al de la operación. (ART. 25 Ley de IVA G.O N° 6.152 de fecha 18/11/2014)'}",
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
    return axios
      .request(config)
      .then((response) => {
        console.log(response);
        const resultado = handleApiResponse(response, "The Factory");
        return resultado;
      })
      .catch((error) => {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      });
  }
);
