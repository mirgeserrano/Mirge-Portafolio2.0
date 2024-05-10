import axios from "axios";
import { getEnvVariable, getTokenTheFactory } from "../helpers";


export const useTheFactory = () => {
     const { VITE_THEFACTORY_API_URL } = getEnvVariable();


let data = JSON.stringify({
  DocumentoElectronico: {
    Encabezado: {
      IdentificacionDocumento: {
        TipoDocumento: "01",
        NumeroDocumento: "01494",
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
      Vendedor: {
        codigo: "01",
        nombre: "UPLINK",
        numCajero: "00",
      },
      Comprador: {
        TipoIdentificacion: "V",
        NumeroIdentificacion: "10406231",
        RazonSocial: "MARTHA QUINTERO",
        Direccion: "la rotaria",
        Pais: "VE",
        Telefono: [""],
        Correo: ["eiasistemas.desarrollo@gmail.com"],
      },
      Totales: {
        Moneda: "VEF",
        NroItems: "1",
        MontoGravadoTotal: "1399.20",
        MontoExentoTotal: "0.00",
        TotalIVA: "223.87",
        MontoTotalConIVA: "1623.07",
        MontoEnLetras: "un mil seiscientos veintitres con 07/100",
        TotalDescuento: "0.00",
        Subtotal: "1399.20",
        TotalAPagar: "1623.07",
        ImpuestosSubtotal: [
          {
            CodigoTotalImp: "IGTF",
            AlicuotaImp: "16.00",
            BaseImponibleImp: "1399.20",
            ValorTotalImp: "223.87",
          },
        ],
        FormasPago: [
          {
            Forma: "99",
            Moneda: "VEF",
            Monto: "1623.07",
            TipoCambio: "1.00",
          },
        ],
      },
    },
    DetallesItems: [
      {
        NumeroLinea: "1",
        CodigoPLU: "UPL",
        IndicadorBienoServicio: "2",
        Descripcion: "*** SERVICIOS NUEVOS***",
        Cantidad: "1",
        UnidadMedida: "",
        PrecioUnitario: "1399.20",
        PrecioUnitarioDescuento: "0.00",
        MontoBonificacion: "0.00",
        DescripBonificacion: "",
        DescuentoMonto: "0.00",
        PrecioItem: "1399.20",
        CodigoImpuesto: "",
        TasaIVA: "16.00",
        ValorIVA: "223.87",
        ValorTotalItem: "1399.20",
      },
    ],
    InfoAdicional: [
      {
        Campo: "PDF",
        Valor: "{'DiasCredito':'0'}",
      },
    ],
  },
});

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: `${VITE_THEFACTORY_API_URL}Emision`,
  headers: {
    Authorization: getTokenTheFactory(),
    "Content-Type": "application/json",
  },
  data: data,
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}
