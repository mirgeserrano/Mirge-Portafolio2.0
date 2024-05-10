// //* listo

import axios from "axios";
import { getEnvVariable } from "../helpers/getEnvVariable";
import { getTokenTheFactory, roundToTwoDecimalPlaces } from "../helpers";
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

  const Emision = createAsyncThunk(
    "Emision",
    async (data, { rejectWithValue }) => {
      const {
        invoiceNumber,
        codCustomer,
        customerName,
        customerTlf,
        customerEmail,
        addresCustomer,
        tax,
        discount,
        selectedDate,
        subtotalExento,
        subtotalConIVA,
        subtotal,
        subTotal,
        total,
        totalAPagar,
        dolar,
        IGTF,
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

      const DetallesItems = data.items.map((item) => ({
        NumeroLinea: "1",
        CodigoCIIU: null,
        CodigoPLU: item.codItem,
        IndicadorBienoServicio: "1",
        Descripcion: item.descrip1,
        Cantidad: roundToTwoDecimalPlaces(item.cantidad),
        UnidadMedida: "10",
        PrecioUnitario: "10.00",
        PrecioUnitarioDescuento: null,
        MontoBonificacion: null,
        DescripcionBonificacion: null,
        DescuentoMonto: null,
        PrecioItem: roundToTwoDecimalPlaces(item.priceO),
        CodigoImpuesto: "E",
        TasaIVA: "16",
        ValorIVA: roundToTwoDecimalPlaces(item.mtoTax),
        ValorTotalItem: roundToTwoDecimalPlaces(item.precio),
        InfoAdicionalItem: [],
        ListaItemOTI: null,
      }));

      const theFactory = {
        DocumentoElectronico: {
          Encabezado: {
            IdentificacionDocumento: {
              TipoDocumento: "01",
              NumeroDocumento: "1630",
              TipoProveedor: null,
              TipoTransaccion: "01",
              FechaEmision: "14/03/2024",
              HoraEmision: "10:54:18 pm",
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
              TipoIdentificacion: "J",
              NumeroIdentificacion: codCustomer,
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
              MontoGravadoTotal: "00",
              MontoExentoTotal: roundToTwoDecimalPlaces(subtotalExento),
              Subtotal: roundToTwoDecimalPlaces(subTotal),
              TotalAPagar: roundToTwoDecimalPlaces(totalAPagar),
              TotalIVA: roundToTwoDecimalPlaces(subtotalConIVA),
              MontoTotalConIVA: roundToTwoDecimalPlaces(subTotal),
              MontoEnLetras: null,
              TotalDescuento: "00",
              ListaDescBonificacion: [
                {
                  DescDescuento: "",
                  MontoDescuento: "00",
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
                  BaseImponibleImp: roundToTwoDecimalPlaces(IGTF),
                  ValorTotalImp: roundToTwoDecimalPlaces(IGTF),
                },
                {
                  CodigoTotalImp: "G",
                  AlicuotaImp: "16.00",
                  BaseImponibleImp: roundToTwoDecimalPlaces(subTotal),
                  ValorTotalImp: roundToTwoDecimalPlaces(subtotalConIVA),
                },
              ],
              FormasPago: [
                {
                  Descripcion: "Efectivo Divisa",
                  Fecha: "04/03/2024",
                  Forma: "09",
                  Monto: "2.00",
                  Moneda: "USD",
                  TipoCambio: roundToTwoDecimalPlaces(dolar),
                },
                {
                  Descripcion: "Tarjeta de débito",
                  Fecha: "04/03/2024",
                  Forma: "05",
                  Monto: "35.80",
                  Moneda: "BSD",
                  TipoCambio: roundToTwoDecimalPlaces(dolar),
                },
              ],
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
              TotalDescuento: "0.0",
              ListaDescBonificacion: [
                {
                  DescDescuento: "",
                  MontoDescuento: "0.0",
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
                  BaseImponibleImp: roundToTwoDecimalPlaces(refIgtf),
                  ValorTotalImp: roundToTwoDecimalPlaces(refTotalAPagar),
                },
                {
                  CodigoTotalImp: "G",
                  AlicuotaImp: "16.00",
                  BaseImponibleImp: roundToTwoDecimalPlaces(refIva),
                  ValorTotalImp: roundToTwoDecimalPlaces(refSubtotal),
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
   
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  );

  return { Autenticacion, Emision };
};

export default ApiTheFatory;
